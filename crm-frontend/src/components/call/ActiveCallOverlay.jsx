/**
 * CRM nErgy — Real-Time WebRTC Active Call Overlay & Incoming Modal
 * 
 * Features:
 * - Persistent incoming-call notification dialog on any page
 * - Live bidirectional video preview & remote stream rendering
 * - Bidirectional audio transmission with mute/unmute
 * - Call timer, status indicators, clean hangup controls
 */
import React, { useEffect, useRef } from 'react';
import { useCall } from '../../context/CallContext';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, AlertCircle } from 'lucide-react';

export function ActiveCallOverlay() {
  const {
    callState,
    callType,
    remoteParticipant,
    incomingCall,
    isMuted,
    isVideoOff,
    callDuration,
    statusMessage,
    localStream,
    remoteStream,
    acceptCall,
    declineCall,
    cancelCall,
    endCall,
    toggleMute,
    toggleVideo
  } = useCall();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteAudioRef = useRef(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream, callState]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
    if (remoteAudioRef.current && remoteStream) {
      remoteAudioRef.current.srcObject = remoteStream;
      remoteAudioRef.current.play().catch(() => {});
    }
  }, [remoteStream, callState]);

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // 1. Incoming Call Dialog (Rings when SWMTP Master Admin calls)
  if (incomingCall && callState === 'ringing') {
    return (
      <div style={styles.incomingBackdrop}>
        <div style={styles.incomingModal}>
          <div style={styles.pulsingRing}>
            {incomingCall.callType === 'video' ? (
              <Video size={38} color="#3b82f6" />
            ) : (
              <Phone size={38} color="#10b981" />
            )}
          </div>

          <div style={styles.incomingPlatformTag}>
            {incomingCall.caller?.platformName || 'SWMTP Central Hub'}
          </div>

          <h3 style={styles.incomingCallerName}>
            {incomingCall.caller?.displayName || 'Master Administrator'}
          </h3>

          <p style={styles.incomingSubtitle}>
            Incoming {incomingCall.callType === 'video' ? 'Live Video Call' : 'Internal Audio Call'}...
          </p>

          <div style={styles.incomingButtonRow}>
            <button
              onClick={declineCall}
              style={{ ...styles.callBtn, ...styles.declineBtn }}
              title="Decline Call"
            >
              <PhoneOff size={20} />
              <span>Decline</span>
            </button>

            <button
              onClick={acceptCall}
              style={{ ...styles.callBtn, ...styles.acceptBtn }}
              title="Accept Call"
            >
              {incomingCall.callType === 'video' ? <Video size={20} /> : <Phone size={20} />}
              <span>Accept</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (callState === 'idle') {
    return null;
  }

  return (
    <div style={styles.callOverlayBackdrop}>
      <audio ref={remoteAudioRef} autoPlay playsInline />

      <div style={styles.callCard}>
        <div style={styles.callHeader}>
          <div>
            <div style={styles.headerPlatform}>
              {remoteParticipant?.platform || 'SWMTP Central Hub'}
            </div>
            <div style={styles.headerName}>
              {remoteParticipant?.name || 'Master Administrator'}
            </div>
          </div>

          <div style={styles.statusBadge(callState)}>
            {callState === 'connected' ? (
              <span>🟢 {formatTime(callDuration)}</span>
            ) : (
              <span>{statusMessage || callState}</span>
            )}
          </div>
        </div>

        <div style={styles.mediaContainer}>
          {callType === 'video' ? (
            <div style={styles.videoStage}>
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                style={styles.remoteVideo}
              />

              {(!remoteStream || callState !== 'connected') && (
                <div style={styles.videoPlaceholder}>
                  <div style={styles.avatarCircle}>
                    {remoteParticipant?.name ? remoteParticipant.name[0] : 'A'}
                  </div>
                  <div style={{ marginTop: 12, color: '#94a3b8', fontSize: 14 }}>
                    {callState === 'ringing' ? 'Waiting for answer...' : 'Connecting live camera...'}
                  </div>
                </div>
              )}

              <div style={styles.localVideoContainer}>
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  style={styles.localVideo}
                />
                {isVideoOff && (
                  <div style={styles.cameraOffOverlay}>Camera Off</div>
                )}
              </div>
            </div>
          ) : (
            <div style={styles.audioStage}>
              <div style={styles.audioAvatarPulse(callState === 'connected')}>
                <div style={styles.audioAvatar}>
                  {remoteParticipant?.name ? remoteParticipant.name[0] : 'A'}
                </div>
              </div>

              <div style={styles.audioTitle}>
                {remoteParticipant?.name || 'Master Administrator'}
              </div>

              <div style={styles.audioSub}>
                {callState === 'connected' ? (
                  <span style={{ color: '#10b981' }}>Live Audio Connected</span>
                ) : (
                  <span style={{ color: '#94a3b8' }}>{statusMessage}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {['declined', 'missed', 'busy', 'unavailable', 'failed'].includes(callState) && (
          <div style={styles.alertBanner}>
            <AlertCircle size={18} style={{ marginRight: 8 }} />
            <span>{statusMessage}</span>
          </div>
        )}

        <div style={styles.controlBar}>
          {(callState === 'outgoing' || callState === 'ringing') ? (
            <button
              onClick={cancelCall}
              style={{ ...styles.controlBtn, ...styles.hangupBtn, padding: '12px 28px' }}
            >
              <PhoneOff size={20} style={{ marginRight: 8 }} />
              <span>Cancel Call</span>
            </button>
          ) : (
            <>
              <button
                onClick={toggleMute}
                style={{
                  ...styles.controlBtn,
                  backgroundColor: isMuted ? '#ef4444' : '#334155'
                }}
                title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
              >
                {isMuted ? <MicOff size={20} color="#fff" /> : <Mic size={20} color="#fff" />}
              </button>

              {callType === 'video' && (
                <button
                  onClick={toggleVideo}
                  style={{
                    ...styles.controlBtn,
                    backgroundColor: isVideoOff ? '#ef4444' : '#334155'
                  }}
                  title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
                >
                  {isVideoOff ? <VideoOff size={20} color="#fff" /> : <Video size={20} color="#fff" />}
                </button>
              )}

              <button
                onClick={endCall}
                style={{ ...styles.controlBtn, ...styles.hangupBtn }}
                title="End Call"
              >
                <PhoneOff size={22} color="#fff" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  incomingBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999
  },
  incomingModal: {
    backgroundColor: '#1e293b',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: '36px 32px',
    width: '90%',
    maxWidth: 420,
    textAlign: 'center',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
  },
  pulsingRing: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px auto',
    boxShadow: '0 0 0 10px rgba(59, 130, 246, 0.08)'
  },
  incomingPlatformTag: {
    fontSize: 12,
    fontWeight: 600,
    color: '#38bdf8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 8
  },
  incomingCallerName: {
    fontSize: 22,
    fontWeight: 700,
    color: '#f8fafc',
    margin: '0 0 8px 0'
  },
  incomingSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    margin: '0 0 28px 0'
  },
  incomingButtonRow: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center'
  },
  callBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    flex: 1,
    padding: '12px 20px',
    borderRadius: 12,
    border: 'none',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  acceptBtn: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
  },
  declineBtn: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)'
  },
  callOverlayBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99998
  },
  callCard: {
    backgroundColor: '#0f172a',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: 24,
    width: '92%',
    maxWidth: 720,
    overflow: 'hidden',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
    display: 'flex',
    flexDirection: 'column'
  },
  callHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
  },
  headerPlatform: {
    fontSize: 11,
    fontWeight: 600,
    color: '#38bdf8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  headerName: {
    fontSize: 18,
    fontWeight: 700,
    color: '#f8fafc',
    marginTop: 2
  },
  statusBadge: (state) => ({
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    backgroundColor: state === 'connected' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
    color: state === 'connected' ? '#34d399' : '#60a5fa',
    border: state === 'connected' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)'
  }),
  mediaContainer: {
    position: 'relative',
    height: 400,
    backgroundColor: '#020617',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoStage: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden'
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  videoPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#090d16'
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: '50%',
    backgroundColor: '#0284c7',
    color: '#fff',
    fontSize: 36,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  localVideoContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 140,
    height: 95,
    borderRadius: 12,
    overflow: 'hidden',
    border: '2px solid rgba(255, 255, 255, 0.25)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
    backgroundColor: '#1e293b'
  },
  localVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  cameraOffOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    color: '#94a3b8',
    fontSize: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  audioStage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  audioAvatarPulse: (isConnected) => ({
    width: 110,
    height: 110,
    borderRadius: '50%',
    backgroundColor: isConnected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    boxShadow: isConnected ? '0 0 0 16px rgba(16, 185, 129, 0.08)' : '0 0 0 16px rgba(59, 130, 246, 0.08)'
  }),
  audioAvatar: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  audioTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#f8fafc',
    marginBottom: 6
  },
  audioSub: {
    fontSize: 14,
    fontWeight: 500
  },
  alertBanner: {
    padding: '12px 20px',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    color: '#fca5a5',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: '1px solid rgba(239, 68, 68, 0.25)'
  },
  controlBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: '20px 24px',
    backgroundColor: '#0b1120',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
  },
  controlBtn: {
    width: 52,
    height: 52,
    borderRadius: '50%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  hangupBtn: {
    backgroundColor: '#ef4444',
    width: 'auto',
    borderRadius: 28,
    padding: '12px 24px',
    color: '#ffffff',
    fontWeight: 600,
    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)'
  }
};
