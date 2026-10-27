/**
 * CRM nErgy — WebRTC Call Signaling & Media Context
 * 
 * Provides real-time audio and video calling between CRM nErgy staff and SWMTP Central Hub.
 * Strict Isolation: Internal staff calls ONLY. Customer accounts are forbidden.
 */
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

const CallContext = createContext(null);

export function useCall() {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
}

// Tone generator using Web Audio API
class SoundPlayer {
  constructor() {
    this.audioCtx = null;
    this.interval = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
  }

  playRing() {
    this.init();
    this.stop();
    if (!this.audioCtx) return;

    const playBeep = () => {
      try {
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(480, now + 0.1);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 1.2);
      } catch (_) {}
    };

    playBeep();
    this.interval = setInterval(playBeep, 3000);
  }

  playChime() {
    this.init();
    this.stop();
    if (!this.audioCtx) return;

    const playChimeNote = () => {
      try {
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.12);
          gain.gain.setValueAtTime(0.12, now + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 0.6);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + i * 0.12);
          osc.stop(now + i * 0.12 + 0.6);
        });
      } catch (_) {}
    };

    playChimeNote();
    this.interval = setInterval(playChimeNote, 2500);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

const soundPlayer = new SoundPlayer();

export function CallProvider({ children }) {
  const [callState, setCallState] = useState('idle');
  const [callId, setCallId] = useState(null);
  const [callType, setCallType] = useState('audio');
  const [remoteParticipant, setRemoteParticipant] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const iceCandidatesQueueRef = useRef([]);
  const durationTimerRef = useRef(null);

  const iceServersRef = useRef([
    { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }
  ]);

  const cleanupMediaAndPeer = useCallback(() => {
    soundPlayer.stop();

    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
      durationTimerRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.onicecandidate = null;
      peerConnectionRef.current.ontrack = null;
      peerConnectionRef.current.onconnectionstatechange = null;
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    remoteStreamRef.current = null;
    setLocalStream(null);
    setRemoteStream(null);
    iceCandidatesQueueRef.current = [];
    setIsMuted(false);
    setIsVideoOff(false);
  }, []);

  const fetchIceServers = useCallback(async () => {
    try {
      const token = localStorage.getItem('crm_token');
      const res = await fetch('http://localhost:5002/api/v1/internal-staff/calls/ice-servers', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (data.iceServers) {
          iceServersRef.current = data.iceServers;
        }
      }
    } catch (e) {
      console.warn('[CRM CallContext] Using STUN default:', e.message);
    }
  }, []);

  useEffect(() => {
    fetchIceServers();

    const getAuthToken = () =>
      localStorage.getItem('crm_token') || sessionStorage.getItem('crm_token');

    const socket = io('http://localhost:5002', {
      auth: (cb) => cb({ token: getAuthToken() }),
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 15,
      reconnectionDelay: 2000
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[CRM CallContext] Socket connected:', socket.id);
    });

    // 1. Incoming Call Invitation from SWMTP Master Admin
    socket.on('call:incoming', (data) => {
      console.log('[CRM CallContext] Incoming call:', data);
      setIncomingCall(data);
      setCallId(data.callId);
      setCallType(data.callType || 'audio');
      setRemoteParticipant({
        staffId: data.caller.staffId,
        name: data.caller.displayName,
        platform: data.caller.platformName || 'SWMTP Central Hub'
      });
      setCallState('ringing');
      setStatusMessage('Incoming call...');
      soundPlayer.playChime();
    });

    // 2. Outgoing Call Ringing at SWMTP
    socket.on('call:ringing', (data) => {
      console.log('[CRM CallContext] Ringing remote:', data);
      setCallState('ringing');
      setStatusMessage('Ringing...');
      soundPlayer.playRing();
    });

    // 3. Call Accepted by SWMTP Admin
    socket.on('call:accepted', async (data) => {
      console.log('[CRM CallContext] Accepted:', data);
      soundPlayer.stop();
      setCallState('connecting');
      setStatusMessage('Connecting media...');
      await initiateWebRtcOffer(data.callId);
    });

    // 4. Call Declined
    socket.on('call:declined', (data) => {
      soundPlayer.stop();
      setCallState('declined');
      setStatusMessage(data.message || 'Call was declined by remote staff.');
      setTimeout(() => {
        cleanupMediaAndPeer();
        setCallState('idle');
        setIncomingCall(null);
      }, 3500);
    });

    // 5. Call Cancelled
    socket.on('call:cancelled', () => {
      soundPlayer.stop();
      setCallState('missed');
      setStatusMessage('Call cancelled.');
      setTimeout(() => {
        cleanupMediaAndPeer();
        setCallState('idle');
        setIncomingCall(null);
      }, 2500);
    });

    // 6. Remote Busy
    socket.on('call:busy', (data) => {
      soundPlayer.stop();
      setCallState('busy');
      setStatusMessage(data.message || 'Staff member is currently on another call.');
      setTimeout(() => {
        cleanupMediaAndPeer();
        setCallState('idle');
      }, 3500);
    });

    // 7. Remote Offline
    socket.on('call:unavailable', (data) => {
      soundPlayer.stop();
      setCallState('unavailable');
      setStatusMessage(data.message || 'Staff member is currently offline or unreachable.');
      setTimeout(() => {
        cleanupMediaAndPeer();
        setCallState('idle');
      }, 3500);
    });

    // 8. Timeout
    socket.on('call:timeout', (data) => {
      soundPlayer.stop();
      setCallState('missed');
      setStatusMessage(data.message || 'Call timed out. No answer.');
      setTimeout(() => {
        cleanupMediaAndPeer();
        setCallState('idle');
        setIncomingCall(null);
      }, 3500);
    });

    // 9. WebRTC Signal
    socket.on('call:signal', async (data) => {
      await handleIncomingSignal(data);
    });

    // 10. Call Ended
    socket.on('call:ended', (data) => {
      soundPlayer.stop();
      setCallState('ended');
      setStatusMessage(`Call ended (${formatDuration(data.durationSeconds || 0)})`);
      setTimeout(() => {
        cleanupMediaAndPeer();
        setCallState('idle');
        setIncomingCall(null);
        setCallDuration(0);
      }, 2500);
    });

    return () => {
      socket.disconnect();
      cleanupMediaAndPeer();
    };
  }, [cleanupMediaAndPeer, fetchIceServers]);

  const createPeerConnection = useCallback((targetCallId) => {
    const pc = new RTCPeerConnection({
      iceServers: iceServersRef.current
    });

    pc.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit('call:signal', {
          callId: targetCallId,
          signal: {
            type: 'ice-candidate',
            candidate: event.candidate
          }
        });
      }
    };

    pc.ontrack = (event) => {
      console.log('[CallContext] Remote track received:', event.track.kind, event.track.id);
      let stream = remoteStreamRef.current;
      if (!stream) {
        stream = (event.streams && event.streams[0]) ? event.streams[0] : new MediaStream();
      }
      // Ensure the incoming track is added to the cumulative remote stream without discarding prior tracks
      if (!stream.getTracks().some((t) => t.id === event.track.id)) {
        stream.addTrack(event.track);
      }
      remoteStreamRef.current = stream;
      // Provide a new MediaStream instance containing all cumulative tracks so React detects state change
      setRemoteStream(new MediaStream(stream.getTracks()));
      setCallState('connected');
      setStatusMessage('Connected');
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'connected') {
        setCallState('connected');
        setStatusMessage('Connected');
        if (!durationTimerRef.current) {
          setCallDuration(0);
          durationTimerRef.current = setInterval(() => {
            setCallDuration((prev) => prev + 1);
          }, 1000);
        }
      } else if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
        setCallState('reconnecting');
        setStatusMessage('Reconnecting...');
      } else if (pc.connectionState === 'closed') {
        cleanupMediaAndPeer();
      }
    };

    peerConnectionRef.current = pc;
    return pc;
  }, [cleanupMediaAndPeer]);

  const initiateWebRtcOffer = async (targetCallId) => {
    try {
      const pc = createPeerConnection(targetCallId);
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          pc.addTrack(track, localStreamRef.current);
        });
      }

      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: callType === 'video'
      });
      await pc.setLocalDescription(offer);

      socketRef.current.emit('call:signal', {
        callId: targetCallId,
        signal: {
          type: 'offer',
          sdp: offer
        }
      });
    } catch (err) {
      console.error('[CRM CallContext] Offer error:', err);
      setStatusMessage(`Media setup error: ${err.message}`);
    }
  };

  const handleIncomingSignal = async ({ callId: incomingCallId, signal }) => {
    try {
      let pc = peerConnectionRef.current;

      if (signal.type === 'offer') {
        if (!pc) {
          pc = createPeerConnection(incomingCallId);
          if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((track) => {
              pc.addTrack(track, localStreamRef.current);
            });
          }
        }

        await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));

        while (iceCandidatesQueueRef.current.length > 0) {
          const candidate = iceCandidatesQueueRef.current.shift();
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        }

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socketRef.current.emit('call:signal', {
          callId: incomingCallId,
          signal: {
            type: 'answer',
            sdp: answer
          }
        });
      } else if (signal.type === 'answer') {
        if (pc) {
          await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
          while (iceCandidatesQueueRef.current.length > 0) {
            const candidate = iceCandidatesQueueRef.current.shift();
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          }
        }
      } else if (signal.type === 'ice-candidate' && signal.candidate) {
        if (pc && pc.remoteDescription && pc.remoteDescription.type) {
          await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
        } else {
          iceCandidatesQueueRef.current.push(signal.candidate);
        }
      }
    } catch (err) {
      console.error('[CRM CallContext] Signal handling error:', err);
    }
  };

  const startCall = async ({ targetStaffId = 'staff-admin-01', targetDisplayName = 'Master Administrator', callType: requestedType = 'audio', conversationId = 'conv-swmtp-main' }) => {
    try {
      cleanupMediaAndPeer();
      setCallType(requestedType);
      setRemoteParticipant({
        staffId: targetStaffId,
        name: targetDisplayName,
        platform: 'SWMTP Central Hub'
      });
      setCallState('outgoing');
      setStatusMessage('Requesting media access...');

      const constraints = {
        audio: true,
        video: requestedType === 'video' ? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' } : false
      };

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (mediaErr) {
        setCallState('failed');
        setStatusMessage(`Device Error: ${mediaErr.name === 'NotAllowedError' ? 'Microphone/Camera permission denied.' : mediaErr.message}`);
        setTimeout(() => setCallState('idle'), 4000);
        return;
      }

      localStreamRef.current = stream;
      setStatusMessage('Calling SWMTP Hub...');

      if (socketRef.current) {
        socketRef.current.emit('call:initiate', {
          targetStaffId,
          targetDisplayName,
          callType: requestedType,
          conversationId
        }, (res) => {
          if (!res?.success) {
            soundPlayer.stop();
            setCallState('failed');
            setStatusMessage(res?.error || 'Call initiation failed.');
            setTimeout(() => {
              cleanupMediaAndPeer();
              setCallState('idle');
            }, 3500);
          } else {
            setCallId(res.callId);
          }
        });
      }
    } catch (err) {
      console.error('[CRM CallContext] startCall error:', err);
      setCallState('failed');
      setStatusMessage(err.message);
      setTimeout(() => setCallState('idle'), 3500);
    }
  };

  const acceptCall = async () => {
    if (!incomingCall || !socketRef.current) return;
    soundPlayer.stop();
    setStatusMessage('Accessing media...');

    const requestedType = incomingCall.callType || 'audio';
    const constraints = {
      audio: true,
      video: requestedType === 'video' ? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' } : false
    };

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (mediaErr) {
      setCallState('failed');
      setStatusMessage(`Device Error: ${mediaErr.name === 'NotAllowedError' ? 'Permission denied.' : mediaErr.message}`);
      socketRef.current.emit('call:decline', { callId: incomingCall.callId });
      setTimeout(() => {
        cleanupMediaAndPeer();
        setCallState('idle');
        setIncomingCall(null);
      }, 3500);
      return;
    }

    localStreamRef.current = stream;
    setLocalStream(stream);
    setCallState('connecting');
    setStatusMessage('Connecting...');

    socketRef.current.emit('call:accept', { callId: incomingCall.callId });
  };

  const declineCall = () => {
    soundPlayer.stop();
    if (incomingCall && socketRef.current) {
      socketRef.current.emit('call:decline', { callId: incomingCall.callId });
    }
    cleanupMediaAndPeer();
    setCallState('idle');
    setIncomingCall(null);
  };

  const cancelCall = () => {
    soundPlayer.stop();
    if (callId && socketRef.current) {
      socketRef.current.emit('call:cancel', { callId });
    }
    cleanupMediaAndPeer();
    setCallState('idle');
  };

  const endCall = () => {
    soundPlayer.stop();
    if (callId && socketRef.current) {
      socketRef.current.emit('call:end', { callId, reason: 'normal_hangup' });
    }
    setCallState('ended');
    setStatusMessage(`Call ended (${formatDuration(callDuration)})`);
    setTimeout(() => {
      cleanupMediaAndPeer();
      setCallState('idle');
      setIncomingCall(null);
      setCallDuration(0);
    }, 1500);
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  return (
    <CallContext.Provider
      value={{
        callState,
        callId,
        callType,
        remoteParticipant,
        incomingCall,
        isMuted,
        isVideoOff,
        callDuration,
        statusMessage,
        localStream,
        remoteStream,
        startCall,
        acceptCall,
        declineCall,
        cancelCall,
        endCall,
        toggleMute,
        toggleVideo
      }}
    >
      {children}
    </CallContext.Provider>
  );
}

function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}
