import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  Activity,
  Layers,
  ArrowRight,
  Play,
  Square,
  CheckCircle2,
  Clock,
  Cpu,
  Radio,
  Sliders,
  RefreshCw,
  Zap,
  Shield,
  MessageSquare,
  Headphones,
  Settings2,
  ChevronRight,
  Info
} from 'lucide-react';
import { Breadcrumb, Button, Card, Badge } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';
import { useLanguage } from '../../../context/LanguageContext';

export const AiVoiceAgent = () => {
  const { t } = useLanguage();
  const { addToast } = useToast();

  // Voice Session State
  const [isCalling, setIsCalling] = useState(false);
  const [pipelineState, setPipelineState] = useState('idle'); // 'idle' | 'listening' | 'thinking' | 'speaking'
  const [isMuted, setIsMuted] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);

  // Configuration settings
  const [sttProvider, setSttProvider] = useState('deepgram');
  const [llmProvider, setLlmProvider] = useState('gpt-4o');
  const [ttsProvider, setTtsProvider] = useState('elevenlabs');
  const [voicePersona, setVoicePersona] = useState('sarah');
  const [speakingSpeed, setSpeakingSpeed] = useState(1.0);
  const [activeTab, setActiveTab] = useState('interactive'); // 'interactive' | 'pipeline' | 'implementation'

  // Conversation history
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: 'Hello! I am your CRM nErgy AI Voice Agent. I am connected via a live STT → LLM → TTS streaming pipeline. How can I assist you with your leads, pipeline, or operations today?',
      time: '11:20 AM',
      latency: '210ms',
    },
    {
      id: 2,
      sender: 'user',
      text: 'Can you show me the high-priority enterprise deals closing this month?',
      time: '11:21 AM',
      latency: '82ms STT',
    },
    {
      id: '3',
      sender: 'agent',
      text: 'You have 4 enterprise deals in closing stage totaling $840,000, led by Apex Energy Solutions and Global Logistics Corp.',
      time: '11:21 AM',
      latency: '225ms (End-to-End)',
    },
  ]);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const animFrameRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis || null);

  // Audio level animation during active listening or speaking
  useEffect(() => {
    if (isCalling && (pipelineState === 'listening' || pipelineState === 'speaking')) {
      const interval = setInterval(() => {
        setAudioLevel(Math.floor(Math.random() * 65) + 35);
      }, 120);
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [isCalling, pipelineState]);

  // Clean up speech synthesis & recognition on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Web Speech API initialization (if supported in browser)
  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setPipelineState('listening');
      };

      recognition.onresult = (event) => {
        let currentInterim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const transcriptText = event.results[i][0].transcript;
            handleUserUtterance(transcriptText);
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }
        setLiveTranscript(currentInterim);
      };

      recognition.onerror = (err) => {
        console.warn('Speech recognition notice:', err.error);
      };

      recognitionRef.current = recognition;
    }
  };

  // Start Voice Session
  const startVoiceSession = () => {
    setIsCalling(true);
    setPipelineState('listening');
    addToast({
      title: 'AI Voice Pipeline Active',
      message: 'Streaming audio pipeline engaged: Speech-to-Text is listening.',
      type: 'success',
    });

    initSpeechRecognition();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        // Fallback to interactive mode if recognition is already started or restricted
      }
    }
  };

  // End Voice Session
  const endVoiceSession = () => {
    setIsCalling(false);
    setPipelineState('idle');
    setLiveTranscript('');
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    addToast({
      title: 'Voice Session Ended',
      message: 'Microphone and TTS audio streams disconnected.',
      type: 'info',
    });
  };

  // Process user utterance through the STT -> LLM -> TTS pipeline
  const handleUserUtterance = (text) => {
    if (!text || text.trim() === '') return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      latency: `${Math.floor(Math.random() * 25) + 65}ms STT`,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLiveTranscript('');
    setPipelineState('thinking');

    // Simulate LLM processing & generate response
    timerRef.current = setTimeout(() => {
      let responseText = '';
      const lower = text.toLowerCase();

      if (lower.includes('deal') || lower.includes('sales') || lower.includes('pipeline')) {
        responseText = 'Based on your CRM pipeline, you have $1.42M active in negotiation across 12 qualified accounts. Would you like me to prioritize the highest margin deals?';
      } else if (lower.includes('lead') || lower.includes('contact')) {
        responseText = 'The AI Lead engine captured 18 new inbound leads today with an average quality score of 89. Three leads requested immediate callbacks.';
      } else if (lower.includes('kt') || lower.includes('dev') || lower.includes('sea') || lower.includes('admin')) {
        responseText = 'Your Secured Communications zBox hotline with the KT software dev team is encrypted with AES-256 and active for Super Executive Admin access.';
      } else if (lower.includes('latency') || lower.includes('pipeline') || lower.includes('stt') || lower.includes('tts')) {
        responseText = 'The streaming pipeline latency is 74ms for STT, 95ms for LLM first token, and 48ms for TTS audio generation, maintaining an ultra-fast sub-250ms roundtrip.';
      } else {
        responseText = `Understood. I have logged that request into your CRM nErgy workspace. Is there anything else you would like to inspect or automate?`;
      }

      const agentMsg = {
        id: Date.now() + 1,
        sender: 'agent',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        latency: '228ms (End-to-End)',
      };

      setMessages((prev) => [...prev, agentMsg]);
      setPipelineState('speaking');

      // Trigger TTS playback via browser synthesis if available
      speakText(responseText, () => {
        if (isCalling) {
          setPipelineState('listening');
        } else {
          setPipelineState('idle');
        }
      });
    }, 1100);
  };

  // Text-To-Speech execution
  const speakText = (text, onComplete) => {
    if ('speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speakingSpeed;
      utterance.pitch = 1.0;

      // Select natural sounding voice if available
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find((v) => v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Zira'));
      if (femaleVoice) utterance.voice = femaleVoice;

      utterance.onend = () => {
        if (onComplete) onComplete();
      };
      utterance.onerror = () => {
        if (onComplete) onComplete();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback timer if speech synthesis is disabled or muted
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 3000);
    }
  };

  // Trigger sample query for quick testing
  const triggerQuickSample = (sampleText) => {
    if (!isCalling) {
      setIsCalling(true);
    }
    handleUserUtterance(sampleText);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* Top Header & Breadcrumbs */}
      <div>
        <Breadcrumb
          items={[
            { label: 'Dashboard', path: '/crm/dashboard' },
            { label: 'AI SuperHouse', path: '/crm/bestie' },
            { label: 'AI Voice Agent', active: true },
          ]}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: 'var(--spacing-2)',
            flexWrap: 'wrap',
            gap: 'var(--spacing-4)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(14, 165, 233, 0.4)',
                }}
              >
                <Mic size={24} color="#ffffff" />
              </div>
              <div>
                <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                  {t('AI Voice Agent')}
                  <Badge variant="primary" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t('Streaming Pipeline')}
                  </Badge>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: '12px',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: isCalling ? 'rgba(16, 185, 129, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                      color: isCalling ? '#10b981' : 'var(--text-muted)',
                      border: `1px solid ${isCalling ? 'rgba(16, 185, 129, 0.3)' : 'var(--border)'}`,
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: isCalling ? '#10b981' : '#94a3b8',
                        boxShadow: isCalling ? '0 0 8px #10b981' : 'none',
                      }}
                    />
                    {isCalling ? t('Pipeline Streaming Live') : t('Voice Pipeline Standby')}
                  </span>
                </h1>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: 'var(--font-sm)' }}>
                  {t('Real-time conversational voice system powered by Speech-to-Text (STT) ➔ Large Language Model (LLM) ➔ Text-to-Speech (TTS) streaming architecture.')}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-3)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{t('End-to-End Latency')}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#10b981' }}>~218 ms</div>
              </div>
              <div style={{ width: 1, height: 24, backgroundColor: 'var(--border)' }} />
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{t('Streaming Pipeline')}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#38bdf8' }}>STT ➔ LLM ➔ TTS</div>
              </div>
            </div>

            <Button
              variant={isCalling ? 'danger' : 'primary'}
              onClick={isCalling ? endVoiceSession : startVoiceSession}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                fontWeight: 600,
                boxShadow: isCalling ? '0 0 20px rgba(239, 68, 68, 0.4)' : '0 0 20px rgba(14, 165, 233, 0.4)',
              }}
            >
              {isCalling ? (
                <>
                  <Square size={16} /> {t('Disconnect Voice')}
                </>
              ) : (
                <>
                  <Play size={16} /> {t('Start Live Voice Call')}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border)',
          gap: 'var(--spacing-2)',
        }}
      >
        <button
          onClick={() => setActiveTab('interactive')}
          style={{
            padding: '10px 18px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'interactive' ? '2px solid #0ea5e9' : '2px solid transparent',
            color: activeTab === 'interactive' ? '#0ea5e9' : 'var(--text-muted)',
            fontWeight: activeTab === 'interactive' ? 600 : 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 'var(--font-sm)',
          }}
        >
          <Headphones size={16} /> {t('Live Voice Terminal & Studio')}
        </button>
        <button
          onClick={() => setActiveTab('pipeline')}
          style={{
            padding: '10px 18px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'pipeline' ? '2px solid #0ea5e9' : '2px solid transparent',
            color: activeTab === 'pipeline' ? '#0ea5e9' : 'var(--text-muted)',
            fontWeight: activeTab === 'pipeline' ? 600 : 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 'var(--font-sm)',
          }}
        >
          <Layers size={16} /> {t('Streaming Pipeline Architecture')}
        </button>
        <button
          onClick={() => setActiveTab('implementation')}
          style={{
            padding: '10px 18px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'implementation' ? '2px solid #0ea5e9' : '2px solid transparent',
            color: activeTab === 'implementation' ? '#0ea5e9' : 'var(--text-muted)',
            fontWeight: activeTab === 'implementation' ? 600 : 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 'var(--font-sm)',
          }}
        >
          <Sliders size={16} /> {t('Pipeline Components & Steps Guide')}
        </button>
      </div>

      {/* TAB 1: Live Interactive Voice Agent */}
      {activeTab === 'interactive' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 420px) 1fr', gap: 'var(--spacing-6)' }}>
          {/* Left Column: Glowing Voice Orb & Call Controls */}
          <Card
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--spacing-8) var(--spacing-6)',
              textAlign: 'center',
              background: 'radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.08) 0%, rgba(15, 23, 42, 0) 70%), var(--surface)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Pipeline Stage Indicator */}
            <div
              style={{
                position: 'absolute',
                top: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor:
                  pipelineState === 'listening'
                    ? 'rgba(14, 165, 233, 0.15)'
                    : pipelineState === 'thinking'
                    ? 'rgba(168, 85, 247, 0.15)'
                    : pipelineState === 'speaking'
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(148, 163, 184, 0.1)',
                border: `1px solid ${
                  pipelineState === 'listening'
                    ? 'rgba(14, 165, 233, 0.3)'
                    : pipelineState === 'thinking'
                    ? 'rgba(168, 85, 247, 0.3)'
                    : pipelineState === 'speaking'
                    ? 'rgba(16, 185, 129, 0.3)'
                    : 'var(--border)'
                }`,
              }}
            >
              <Activity
                size={14}
                color={
                  pipelineState === 'listening'
                    ? '#0ea5e9'
                    : pipelineState === 'thinking'
                    ? '#a855f7'
                    : pipelineState === 'speaking'
                    ? '#10b981'
                    : '#94a3b8'
                }
              />
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color:
                    pipelineState === 'listening'
                      ? '#0ea5e9'
                      : pipelineState === 'thinking'
                      ? '#a855f7'
                      : pipelineState === 'speaking'
                      ? '#10b981'
                      : 'var(--text-muted)',
                }}
              >
                {pipelineState === 'listening'
                  ? 'Stage 1: Speech-To-Text (Listening)'
                  : pipelineState === 'thinking'
                  ? 'Stage 2: LLM (Processing Response)'
                  : pipelineState === 'speaking'
                  ? 'Stage 3: Text-To-Speech (Speaking)'
                  : 'Pipeline Idle (Ready)'}
              </span>
            </div>

            {/* Glowing Interactive Voice Orb */}
            <div
              style={{
                marginTop: 'var(--spacing-8)',
                marginBottom: 'var(--spacing-6)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Outer Pulsing Wave Rings */}
              <div
                style={{
                  position: 'absolute',
                  width: 210,
                  height: 210,
                  borderRadius: '50%',
                  border: `2px dashed ${
                    pipelineState === 'listening'
                      ? 'rgba(14, 165, 233, 0.4)'
                      : pipelineState === 'thinking'
                      ? 'rgba(168, 85, 247, 0.4)'
                      : pipelineState === 'speaking'
                      ? 'rgba(16, 185, 129, 0.4)'
                      : 'rgba(148, 163, 184, 0.15)'
                  }`,
                  transform: isCalling ? `scale(${1 + audioLevel * 0.003})` : 'scale(1)',
                  transition: 'transform 0.15s ease-out',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: 175,
                  height: 175,
                  borderRadius: '50%',
                  background:
                    pipelineState === 'listening'
                      ? 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, rgba(14, 165, 233, 0) 70%)'
                      : pipelineState === 'thinking'
                      ? 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0) 70%)'
                      : pipelineState === 'speaking'
                      ? 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0) 70%)'
                      : 'none',
                  filter: 'blur(8px)',
                }}
              />

              {/* Core Orb */}
              <div
                onClick={isCalling ? endVoiceSession : startVoiceSession}
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: '50%',
                  background:
                    pipelineState === 'listening'
                      ? 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)'
                      : pipelineState === 'thinking'
                      ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'
                      : pipelineState === 'speaking'
                      ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
                      : 'linear-gradient(135deg, #334155 0%, #475569 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow:
                    pipelineState === 'listening'
                      ? '0 0 40px rgba(14, 165, 233, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)'
                      : pipelineState === 'thinking'
                      ? '0 0 40px rgba(168, 85, 247, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)'
                      : pipelineState === 'speaking'
                      ? '0 0 40px rgba(16, 185, 129, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)'
                      : '0 4px 20px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: 2,
                }}
              >
                {pipelineState === 'thinking' ? (
                  <Sparkles size={46} color="#ffffff" style={{ animation: 'spin 3s linear infinite' }} />
                ) : pipelineState === 'speaking' ? (
                  <Volume2 size={46} color="#ffffff" />
                ) : (
                  <Mic size={46} color="#ffffff" />
                )}
              </div>
            </div>

            {/* Dynamic Equalizer Bar Waveform */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 36, marginBottom: 'var(--spacing-4)' }}>
              {[15, 28, 45, 60, 85, 70, 45, 90, 65, 35, 75, 50, 30].map((baseHeight, idx) => {
                const computedHeight = isCalling && (pipelineState === 'listening' || pipelineState === 'speaking')
                  ? Math.max(8, (baseHeight * (audioLevel / 50)) % 36)
                  : 6;
                return (
                  <div
                    key={idx}
                    style={{
                      width: 4,
                      height: `${computedHeight}px`,
                      borderRadius: 3,
                      backgroundColor:
                        pipelineState === 'listening'
                          ? '#38bdf8'
                          : pipelineState === 'thinking'
                          ? '#c084fc'
                          : pipelineState === 'speaking'
                          ? '#34d399'
                          : 'var(--border)',
                      transition: 'height 0.1s ease',
                    }}
                  />
                );
              })}
            </div>

            {/* Live Subtitle / Interim Speech Transcript */}
            <div
              style={{
                width: '100%',
                minHeight: 48,
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid var(--border)',
                marginBottom: 'var(--spacing-4)',
                fontSize: '13px',
                color: liveTranscript ? 'var(--text)' : 'var(--text-muted)',
                fontStyle: liveTranscript ? 'normal' : 'italic',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {liveTranscript
                ? `"${liveTranscript}"`
                : isCalling
                ? pipelineState === 'listening'
                  ? 'Listening for speech input... Speak now'
                  : pipelineState === 'thinking'
                  ? 'LLM processing prompt tokens...'
                  : 'Synthesizing voice response...'
                : t('Press "Start Live Voice Call" or choose a prompt below')}
            </div>

            {/* Call Toolbar Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
              <Button
                variant={isMuted ? 'danger' : 'outline'}
                onClick={() => setIsMuted(!isMuted)}
                style={{ borderRadius: 'var(--radius-full)', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                {isMuted ? t('Unmute Audio') : t('Mute Speaker')}
              </Button>
              <Button
                variant={isCalling ? 'danger' : 'primary'}
                onClick={isCalling ? endVoiceSession : startVoiceSession}
                style={{ borderRadius: 'var(--radius-full)', padding: '8px 20px', fontWeight: 600 }}
              >
                {isCalling ? t('End Call') : t('Start Call')}
              </Button>
            </div>

            {/* Quick Demo Prompts */}
            <div style={{ width: '100%', marginTop: 'var(--spacing-6)', textAlign: 'left' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8 }}>
                {t('QUICK SPEECH PROMPTS (CLICK TO TEST PIPELINE):')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  'Show me the high-priority enterprise deals closing this month',
                  'Summarize inbound leads and callback requests',
                  'Verify our Secured Communications zBox hotline with KT team',
                  'What is our streaming STT to TTS pipeline latency?',
                ].map((promptText, i) => (
                  <button
                    key={i}
                    onClick={() => triggerQuickSample(promptText)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--surface-hover)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontSize: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0ea5e9')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <span>"{t(promptText)}"</span>
                    <ArrowRight size={13} color="var(--text-muted)" />
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Right Column: Live Transcript Dialogue Stream */}
          <Card style={{ display: 'flex', flexDirection: 'column', height: '620px', padding: 0 }}>
            {/* Transcript Card Header */}
            <div
              style={{
                padding: 'var(--spacing-4) var(--spacing-6)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--surface)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <MessageSquare size={18} color="#0ea5e9" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{t('Streaming Dialogue Transcript')}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('Real-time STT conversions & TTS responses')}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('Persona')}:</span>
                <select
                  value={voicePersona}
                  onChange={(e) => setVoicePersona(e.target.value)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--text)',
                    fontSize: '12px',
                  }}
                >
                  <option value="sarah">Sarah (US Executive)</option>
                  <option value="marcus">Marcus (Dev Lead / KT)</option>
                  <option value="elena">Elena (Customer Concierge)</option>
                </select>
              </div>
            </div>

            {/* Transcript Feed Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: 'var(--spacing-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
              }}
            >
              {messages.map((msg) => {
                const isAgent = msg.sender === 'agent';
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isAgent ? 'flex-start' : 'flex-end',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: isAgent ? '#0ea5e9' : '#10b981' }}>
                        {isAgent ? t('CRM nErgy AI Voice Agent') : t('User (Voice Input)')}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{msg.time}</span>
                      {msg.latency && (
                        <span
                          style={{
                            fontSize: '10px',
                            padding: '1px 6px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'rgba(14, 165, 233, 0.1)',
                            color: '#0ea5e9',
                          }}
                        >
                          {msg.latency}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        maxWidth: '85%',
                        padding: '12px 16px',
                        borderRadius: isAgent ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                        backgroundColor: isAgent ? 'var(--surface-hover)' : 'rgba(14, 165, 233, 0.12)',
                        border: `1px solid ${isAgent ? 'var(--border)' : 'rgba(14, 165, 233, 0.25)'}`,
                        color: 'var(--text)',
                        fontSize: '13px',
                        lineHeight: 1.5,
                      }}
                    >
                      {t(msg.text)}
                    </div>
                  </div>
                );
              })}

              {pipelineState === 'thinking' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', color: '#a855f7', fontSize: '12px' }}>
                  <Sparkles size={14} style={{ animation: 'spin 2s linear infinite' }} />
                  <span>Large Language Model generating response streaming tokens...</span>
                </div>
              )}
            </div>

            {/* Bottom Input Field for Hybrid Typing / Speaking */}
            <div
              style={{
                padding: 'var(--spacing-4) var(--spacing-6)',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                gap: 'var(--spacing-3)',
                backgroundColor: 'var(--surface)',
              }}
            >
              <input
                type="text"
                placeholder="Or type a command for the Voice Agent to speak back..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: '13px',
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    triggerQuickSample(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <Button
                variant="primary"
                onClick={(e) => {
                  const input = e.currentTarget.previousSibling;
                  if (input && input.value.trim()) {
                    triggerQuickSample(input.value);
                    input.value = '';
                  }
                }}
              >
                Send & Speak
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: Streaming Pipeline Architecture */}
      {activeTab === 'pipeline' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
          {/* Architecture Banner */}
          <Card
            style={{
              padding: 'var(--spacing-6)',
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%), var(--surface)',
              border: '1px solid rgba(14, 165, 233, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div
                style={{
                  padding: 8,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(14, 165, 233, 0.15)',
                  color: '#0ea5e9',
                }}
              >
                <Zap size={20} />
              </div>
              <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, margin: 0 }}>
                Real-Time Streaming Pipeline (STT ➔ LLM ➔ TTS)
              </h2>
            </div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--font-sm)', lineHeight: 1.6 }}>
              To build an AI voice agent, you typically connect a <strong>Speech-to-Text (STT)</strong> model, a{' '}
              <strong>Large Language Model (LLM)</strong>, and a <strong>Text-to-Speech (TTS)</strong> model in a streaming pipeline.
              This setup allows the agent to listen, understand, and respond to users in real-time with sub-250ms ultra-low latency.
            </p>
          </Card>

          {/* 3 Core Pipeline Stages Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-6)' }}>
            {/* Stage 1: STT */}
            <Card style={{ borderTop: '4px solid #0ea5e9', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(14, 165, 233, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0ea5e9',
                  }}
                >
                  <Mic size={18} />
                </div>
                <Badge variant="primary">Stage 1</Badge>
              </div>

              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: 4 }}>
                1. Speech-to-Text (STT)
              </h3>
              <div style={{ fontSize: '11px', color: '#0ea5e9', fontWeight: 600, marginBottom: 12 }}>
                Converts spoken language into text
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 16 }}>
                Essential for understanding user input. Captures raw audio streams from browser microphones, breaks speech into phonemes, and delivers word tokens in under 80 milliseconds.
              </p>

              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-hover)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Function:</span>
                  <span style={{ fontWeight: 600 }}>Audio Input ➔ Text Tokens</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Top Engines:</span>
                  <span style={{ fontWeight: 600 }}>Deepgram Nova-2 / Whisper Large-v3</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Target Latency:</span>
                  <span style={{ fontWeight: 600, color: '#10b981' }}>60 - 90 ms</span>
                </div>
              </div>
            </Card>

            {/* Stage 2: LLM */}
            <Card style={{ borderTop: '4px solid #a855f7', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(168, 85, 247, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#a855f7',
                  }}
                >
                  <Cpu size={18} />
                </div>
                <Badge variant="purple" style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>Stage 2</Badge>
              </div>

              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: 4 }}>
                2. Large Language Model (LLM)
              </h3>
              <div style={{ fontSize: '11px', color: '#a855f7', fontWeight: 600, marginBottom: 12 }}>
                Processes text input to generate intelligent responses
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 16 }}>
                Acts as the core of the agent's conversational abilities. Interprets intent, queries CRM database records, applies business logic, and streams token-by-token output.
              </p>

              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-hover)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Function:</span>
                  <span style={{ fontWeight: 600 }}>Reasoning & Response Generation</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Top Engines:</span>
                  <span style={{ fontWeight: 600 }}>Claude 3.5 Sonnet / GPT-4o / Gemini Flash</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>First-Token TTFT:</span>
                  <span style={{ fontWeight: 600, color: '#10b981' }}>90 - 120 ms</span>
                </div>
              </div>
            </Card>

            {/* Stage 3: TTS */}
            <Card style={{ borderTop: '4px solid #10b981', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                  }}
                >
                  <Volume2 size={18} />
                </div>
                <Badge variant="success">Stage 3</Badge>
              </div>

              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: 4 }}>
                3. Text-to-Speech (TTS)
              </h3>
              <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, marginBottom: 12 }}>
                Converts generated text responses back into spoken language
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 16 }}>
                Provides a natural-sounding voice for the agent. Synthesizes human-like intonation, breath pauses, and emotion, streaming raw PCM audio chunks directly to client speakers.
              </p>

              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-hover)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Function:</span>
                  <span style={{ fontWeight: 600 }}>Text Response ➔ Audio Stream</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Top Engines:</span>
                  <span style={{ fontWeight: 600 }}>ElevenLabs Flash v2.5 / Cartesia Sonic</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Buffer Latency:</span>
                  <span style={{ fontWeight: 600, color: '#10b981' }}>40 - 65 ms</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Streaming Pipeline Flow Matrix Table */}
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <div
              style={{
                padding: 'var(--spacing-4) var(--spacing-6)',
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'var(--surface-hover)',
              }}
            >
              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, margin: 0 }}>
                Streaming Pipeline Specifications Table
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                How the components interact in a synchronized bidirectional streaming pipeline
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
                    <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--text-muted)' }}>Component</th>
                    <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--text-muted)' }}>Core Function</th>
                    <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--text-muted)' }}>Data Input</th>
                    <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--text-muted)' }}>Data Output</th>
                    <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--text-muted)' }}>Streaming Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 600, color: '#0ea5e9' }}>Speech-to-Text (STT)</td>
                    <td style={{ padding: '14px 20px' }}>Converts audio input to text</td>
                    <td style={{ padding: '14px 20px' }}>User Microphone Audio (16kHz PCM)</td>
                    <td style={{ padding: '14px 20px' }}>Interim & Final Text String</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ color: '#10b981', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} /> Active Stream
                      </span>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 600, color: '#a855f7' }}>Large Language Model (LLM)</td>
                    <td style={{ padding: '14px 20px' }}>Generates a response based on the text input</td>
                    <td style={{ padding: '14px 20px' }}>Transcribed Text Prompt + CRM Context</td>
                    <td style={{ padding: '14px 20px' }}>Intelligent Conversational Tokens</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ color: '#10b981', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} /> Active Stream
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px 20px', fontWeight: 600, color: '#10b981' }}>Text-to-Speech (TTS)</td>
                    <td style={{ padding: '14px 20px' }}>Converts the text response back to audio</td>
                    <td style={{ padding: '14px 20px' }}>LLM Generated Token Stream</td>
                    <td style={{ padding: '14px 20px' }}>Synthesized Spoken Audio (MP3/PCM)</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ color: '#10b981', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} /> Active Stream
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: Implementation Steps & Configuration */}
      {activeTab === 'implementation' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-4)' }}>
            {[
              {
                step: 'Step 1',
                title: 'Set Up the STT Model',
                desc: 'Choose a reliable speech recognition service to convert audio to text with high noise resistance.',
                tags: ['Deepgram Nova-2', 'Whisper Large-v3', 'Google STT'],
              },
              {
                step: 'Step 2',
                title: 'Integrate the LLM',
                desc: 'Use a large language model to process the text and generate contextual responses using enterprise prompts.',
                tags: ['GPT-4o Realtime', 'Claude 3.5 Sonnet', 'Gemini 1.5 Flash'],
              },
              {
                step: 'Step 3',
                title: 'Implement the TTS Model',
                desc: 'Select a text-to-speech service to convert the responses back into high-fidelity audio without robotic artifacting.',
                tags: ['ElevenLabs Turbo', 'Cartesia Sonic', 'OpenAI TTS'],
              },
              {
                step: 'Step 4',
                title: 'Test and Optimize',
                desc: 'Ensure that the entire system works smoothly, minimizing latency and improving response accuracy in real production.',
                tags: ['WebRTC Audio', 'Barge-In Interrupts', 'Sub-250ms Target'],
              },
            ].map((item, index) => (
              <Card key={index} style={{ padding: 'var(--spacing-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(14, 165, 233, 0.15)',
                      color: '#0ea5e9',
                      fontSize: '11px',
                      fontWeight: 700,
                    }}
                  >
                    {item.step}
                  </span>
                  <CheckCircle2 size={16} color="#10b981" />
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px 0' }}>{item.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 12px 0', lineHeight: 1.5 }}>{item.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--surface-hover)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Provider Pipeline Settings */}
          <Card style={{ padding: 'var(--spacing-6)' }}>
            <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: 'var(--spacing-4)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Settings2 size={18} color="#0ea5e9" />
              Streaming Engine Configuration
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-4)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>
                  1. STT Speech Recognition Engine
                </label>
                <select
                  value={sttProvider}
                  onChange={(e) => setSttProvider(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text)',
                    fontSize: '13px',
                  }}
                >
                  <option value="deepgram">Deepgram Nova-2 (Ultra-fast streaming WebSocket)</option>
                  <option value="whisper">OpenAI Whisper v3 (High Multilingual Accuracy)</option>
                  <option value="google">Google Cloud Speech-to-Text v2</option>
                  <option value="webspeech">Native Web Speech API (Zero Backend Required)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>
                  2. LLM Reasoning Model
                </label>
                <select
                  value={llmProvider}
                  onChange={(e) => setLlmProvider(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text)',
                    fontSize: '13px',
                  }}
                >
                  <option value="gpt-4o">OpenAI GPT-4o Realtime Audio/Text</option>
                  <option value="claude">Anthropic Claude 3.5 Sonnet</option>
                  <option value="gemini">Google Gemini 1.5 Flash (Sub-100ms TTFT)</option>
                  <option value="llama">Meta LLaMA 3.3 70B Turbo</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>
                  3. TTS Audio Synthesis Engine
                </label>
                <select
                  value={ttsProvider}
                  onChange={(e) => setTtsProvider(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text)',
                    fontSize: '13px',
                  }}
                >
                  <option value="elevenlabs">ElevenLabs Flash v2.5 (Realistic Emotion)</option>
                  <option value="cartesia">Cartesia Sonic (Fastest Sub-40ms Audio)</option>
                  <option value="openai">OpenAI TTS-1 HD (Clean Studio Voice)</option>
                  <option value="speechsynth">Native Browser SpeechSynthesis</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>
                  Speaking Speed Multiplier: {speakingSpeed}x
                </label>
                <input
                  type="range"
                  min="0.75"
                  max="1.5"
                  step="0.05"
                  value={speakingSpeed}
                  onChange={(e) => setSpeakingSpeed(parseFloat(e.target.value))}
                  style={{ width: '100%', marginTop: 8 }}
                />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AiVoiceAgent;
