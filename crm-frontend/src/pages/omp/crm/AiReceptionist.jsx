import React, { useState } from 'react';
import {
  PhoneCall,
  Mic,
  MicOff,
  Bot,
  Play,
  Pause,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  PhoneForwarded,
  Volume2,
  Sliders,
  Settings,
  Car
} from 'lucide-react';
import { toast } from '../../../utils/ompToast';

export const AiReceptionist = () => {
  const [isAiActive, setIsAiActive] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState('1');

  const callLogs = [
    {
      id: '1',
      caller: '+1 (214) 555-0194',
      name: 'Michael Chang',
      time: 'Today, 2:14 PM',
      duration: '1m 48s',
      intent: 'Vehicle Pricing & Availability',
      vehicle: '2023 Toyota RAV4 XLE',
      status: 'Test Drive Booked',
      summary: 'Caller inquired about the 2023 RAV4 asking price and warranty. AI confirmed stock status and booked test drive for Friday 3:00 PM.',
      transcript: [
        { speaker: 'AI', text: 'Thank you for calling Dallas Central Motors! I am your AI dealership assistant. How can I help you today?' },
        { speaker: 'Caller', text: 'Hi, I saw a white 2023 Toyota RAV4 on your website. Is it still available?' },
        { speaker: 'AI', text: 'Yes, Mr. Chang! That vehicle is in stock with 14,200 miles and priced at $29,400. It includes our certified 1-year powertrain warranty. Would you like to schedule a test drive?' },
        { speaker: 'Caller', text: 'Yes, can I come this Friday around 3 PM?' },
        { speaker: 'AI', text: 'Perfect! I have scheduled your VIP test drive for Friday at 3:00 PM. A confirmation text has been sent to this number.' },
      ],
    },
    {
      id: '2',
      caller: '+1 (817) 555-0842',
      name: 'Jessica Ramos',
      time: 'Today, 11:30 AM',
      duration: '2m 10s',
      intent: 'Buy Here Pay Here Financing',
      vehicle: '2019 Nissan Rogue SV',
      status: 'Pre-Approval Link Sent',
      summary: 'Caller inquired about in-house zero-credit financing. AI explained our BHPH program and texted the secure 60-second credit application link.',
      transcript: [
        { speaker: 'AI', text: 'Welcome to Dallas Central Motors! How may I assist you with your vehicle search today?' },
        { speaker: 'Caller', text: 'Do you guys do Buy Here Pay Here financing? My credit is not the best.' },
        { speaker: 'AI', text: 'Absolutely! We offer flexible in-house Buy Here Pay Here financing with guaranteed approval options based on your proof of income. May I text you our instant pre-approval link?' },
        { speaker: 'Caller', text: 'Yes please, send it right over.' },
        { speaker: 'AI', text: 'Sent! You can complete it in under 60 seconds on your phone.' },
      ],
    },
  ];

  const activeLog = callLogs.find((c) => c.id === selectedLogId) || callLogs[0];

  const toggleAi = () => {
    setIsAiActive(!isAiActive);
    toast.info(isAiActive ? 'AI Phone Receptionist Paused' : 'AI Phone Receptionist Active 24/7');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#0284c7', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
              TASK E-12 • PILLAR 3
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Voice AI Assistant & 24/7 After-Hours Desking</span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            24/7 AI Phone Voice Receptionist
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Natural language conversational voice agent answering dealer phone calls, querying live inventory specs, and booking test-drive appointments.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={toggleAi}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: isAiActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              color: isAiActive ? '#10b981' : '#ef4444',
              border: isAiActive ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
              padding: '0.55rem 1.1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Bot size={16} /> {isAiActive ? 'AI RECEPTIONIST: LIVE 24/7' : 'AI RECEPTIONIST: OFFLINE'}
          </button>
        </div>
      </div>

      {/* Voice Waveform Simulator & Call Stream Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.25rem' }}>
        {/* Left Column: Call Transcript & Live Audio Player */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase' }}>
                Active Recording Analysis
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0.15rem 0 0 0' }}>
                {activeLog.name} • {activeLog.caller}
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 600, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              {activeLog.status}
            </span>
          </div>

          {/* Simulated Audio Waveform Bar */}
          <div style={{ backgroundColor: 'var(--surface-secondary)', borderRadius: '10px', padding: '1rem', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0284c7', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
            >
              {isPlayingAudio ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                <span>AI Voice Synthesis: HD Ultra Natural (ElevenLabs / OpenAI Voice)</span>
                <span>{isPlayingAudio ? '0:34 / 1:48' : '1:48'}</span>
              </div>
              {/* Animated Waveform Visualizer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '28px' }}>
                {[14, 22, 10, 28, 16, 24, 8, 26, 18, 12, 28, 20, 15, 25, 18, 22, 14, 28, 10, 16, 24, 20, 12, 18].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: isPlayingAudio ? `${Math.max(6, (h * (i % 2 === 0 ? 1.2 : 0.8)))}px` : `${h}px`,
                      backgroundColor: isPlayingAudio ? '#0284c7' : 'var(--border)',
                      borderRadius: '2px',
                      transition: 'height 0.15s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Call Summary Box */}
          <div style={{ backgroundColor: 'rgba(2, 132, 199, 0.08)', border: '1px solid rgba(2, 132, 199, 0.2)', borderRadius: '8px', padding: '0.75rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: '#0284c7' }}>AI Action Summary:</strong> {activeLog.summary}
          </div>

          {/* Transcript Dialogue */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '250px', overflowY: 'auto' }}>
            {activeLog.transcript.map((line, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.82rem' }}>
                <span
                  style={{
                    fontWeight: 700,
                    color: line.speaker === 'AI' ? '#0284c7' : '#d97706',
                    minWidth: '55px',
                  }}
                >
                  {line.speaker}:
                </span>
                <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{line.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Call Logs & Knowledge Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Call History List */}
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.75rem 0' }}>
              Recent AI Voice Inquiries
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {callLogs.map((log) => {
                const isSelected = log.id === selectedLogId;
                return (
                  <div
                    key={log.id}
                    onClick={() => setSelectedLogId(log.id)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? 'rgba(2, 132, 199, 0.1)' : 'var(--surface-secondary)',
                      border: isSelected ? '1px solid #0284c7' : '1px solid var(--border)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{log.name}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{log.time}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#0284c7', marginTop: '0.2rem', fontWeight: 600 }}>{log.vehicle}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Duration: {log.duration} • {log.intent}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Settings Widget */}
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
              AI Persona & Knowledge Link
            </h4>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Inventory Sync:</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Active (142 Vehicles Live)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Booking Calendar:</span>
                <span style={{ color: '#0284c7', fontWeight: 600 }}>Connected (Google & Outlook)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Voice Speed / Pitch:</span>
                <span style={{ color: 'var(--text-primary)' }}>1.0x (Natural Professional)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
