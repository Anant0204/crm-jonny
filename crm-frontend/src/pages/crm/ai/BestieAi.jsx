import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  User,
  Copy,
  Check,
  RotateCw,
  TrendingUp,
  Boxes,
  Users,
  Search,
  Zap,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Database,
  ShieldCheck,
  CornerDownLeft,
  Trash2,
  Download,
  Calendar,
  UserCheck,
  ArrowRight,
  PlusCircle,
  ExternalLink,
  Sliders
} from 'lucide-react';
import { Breadcrumb, Badge } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';
import { useCrm } from '../../../context/CrmContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { generateBestieChat } from '../../../services/geminiService';

// Helper for parsing inline bold, italics, bullets, and linebreaks
const renderFormattedText = (content) => {
  if (!content) return null;
  const lines = content.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
    const cleanLine = isBullet ? trimmed.replace(/^[•-]\s*/, '') : line;

    // Parse **bold** and *italic*
    const parts = cleanLine.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    const parsedLine = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={pIdx} style={{ fontStyle: 'italic' }}>
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });

    if (isBullet) {
      return (
        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.3rem', marginBottom: '0.3rem' }}>
          <span style={{ color: '#0284c7', fontWeight: 800, lineHeight: 1.5, fontSize: '14px' }}>•</span>
          <span style={{ flex: 1, lineHeight: 1.6 }}>{parsedLine}</span>
        </div>
      );
    }

    if (!trimmed) {
      return <div key={idx} style={{ height: '0.4rem' }} />;
    }

    return (
      <p key={idx} style={{ margin: '0 0 0.35rem 0', lineHeight: 1.65 }}>
        {parsedLine}
      </p>
    );
  });
};

const DEFAULT_CONVERSATION = [
  {
    id: 'msg-1',
    sender: 'bestie',
    time: '10:00 AM',
    text: "Hello! I'm **Bestie**, your CRM nErgy AI Autonomous Operating Partner. I'm connected to your enterprise platform to help you analyze deals, qualify leads, manage tasks, and optimize sales and ERP workflows.\n\nHow can I assist your business operations today?",
    actions: [
      { label: 'Analyze Sales Velocity', query: 'Analyze current sales pipeline velocity and identify high-risk deals closing this month.' },
      { label: 'Schedule Follow-up Task', query: 'Schedule an executive follow-up task for tomorrow at 10 AM.' },
    ],
    executedActions: [],
    sources: ['CRM Database', 'ERP Module', 'Sales Pipeline'],
  },
];

export const ZunmeAi = () => {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const { addLead, addTask, refreshDeals, refreshTasks, refreshLeads } = useCrm();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (refreshDeals) refreshDeals();
    if (refreshTasks) refreshTasks();
    if (refreshLeads) refreshLeads();
  }, [refreshDeals, refreshTasks, refreshLeads]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Voice States
  const [isListening, setIsListening] = useState(false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState(null);
  const recognitionRef = useRef(null);

  // Load conversation from localStorage or default
  const [conversation, setConversation] = useState(() => {
    try {
      const saved = localStorage.getItem('crm_bestie_chat_history');
      return saved ? JSON.parse(saved) : DEFAULT_CONVERSATION;
    } catch {
      return DEFAULT_CONVERSATION;
    }
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('crm_bestie_chat_history', JSON.stringify(conversation));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [conversation]);

  const quickActionPrompts = [
    { label: t('Create New Lead'), icon: PlusCircle, query: 'Create a high-priority enterprise lead for Jordan Reed at Apex Logistics, budget $120,000.' },
    { label: t('Executive Priorities'), icon: Bot, query: 'What are the top 3 priorities for our executive leadership team today?' },
    { label: t('Analyze Deals'), icon: TrendingUp, query: 'Run AI Win-Probability scoring on all open opportunities in Negotiation stage.' },
    { label: t('Automate Tasks'), icon: Zap, query: 'Schedule an automated SLA follow-up trigger for enterprise customer inquiries.' },
    { label: t('Open Pipeline'), icon: ArrowRight, query: 'Take me to the sales pipeline deals kanban.' },
    { label: t('ERP Inventory Audit'), icon: Boxes, query: 'Scan ERP warehouse inventory for parts below minimum threshold reorder point.' },
    { label: t('HR Screening'), icon: Users, query: 'Review active applicants for Senior Supply Chain Manager and rank top 3 candidates.' },
  ];

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, isTyping]);

  // Speech-to-Text Initialization
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        addToast({ title: 'Bestie Listening', message: 'Speak your prompt clearly...', type: 'info' });
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputPrompt(transcript);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        addToast({ title: 'Microphone Notice', message: `Voice input: ${event.error}`, type: 'warning' });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [addToast]);

  // Voice Toggle (STT)
  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      addToast({
        title: 'Voice Not Supported',
        message: 'Your browser does not support Web Speech Recognition. Please use Chrome, Edge, or Safari.',
        type: 'warning',
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Recognition start err:', err);
      }
    }
  };

  // Text-to-Speech (TTS) Function
  const speakMessage = (messageId, textToSpeak) => {
    if (!('speechSynthesis' in window)) return;

    if (currentlySpeakingId === messageId) {
      window.speechSynthesis.cancel();
      setCurrentlySpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown symbols for cleaner speech
    const cleanSpeech = textToSpeak
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/•/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/#/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick a natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find((v) => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David')) && v.lang.startsWith('en')) || voices[0];
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      setCurrentlySpeakingId(messageId);
    };

    utterance.onend = () => {
      setCurrentlySpeakingId(null);
    };

    utterance.onerror = () => {
      setCurrentlySpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Execute Autonomous CRM Action
  const executeClientAction = async (action) => {
    if (!action || !action.type) return;

    try {
      if (action.type === 'CREATE_LEAD') {
        const lead = action.payload || {};
        if (addLead) {
          await addLead({
            name: lead.name || 'New Inbound Lead',
            phone: lead.phone || '',
            email: lead.email || '',
            company: lead.company || 'Direct Inbound',
            value: lead.budget || 50000,
            status: 'New',
          });
        }

        addToast({
          title: 'Lead Registered in CRM',
          message: `Lead ${lead.name || 'New Lead'} saved to live CRM database.`,
          type: 'success',
        });
      } else if (action.type === 'SCHEDULE_TASK') {
        const task = action.payload || {};
        if (addTask) {
          await addTask({
            title: task.title || 'Follow up with Client',
            dueDate: task.dueDate || 'Tomorrow',
            priority: task.priority || 'High',
            assignedTo: task.assignee || 'Alexander Wright',
          });
        }

        addToast({
          title: 'Task Added to Board',
          message: `Scheduled: "${task.title || 'Follow up'}" [${task.priority || 'High'} Priority]`,
          type: 'success',
        });
      } else if (action.type === 'NAVIGATE') {
        if (action.payload?.path) {
          navigate(action.payload.path);
        }
      } else if (action.type === 'EXPORT_REPORT') {
        const title = action.payload?.title || 'CRM_Executive_Brief';
        const content = action.payload?.summary || action.payload?.content || 'CRM nErgy AI Executive Briefing Data.';
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = `${title.replace(/\s+/g, '_')}_${Date.now()}.md`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        addToast({
          title: 'Executive Report Downloaded',
          message: `${title}.md exported to your local device.`,
          type: 'success',
        });
      }
    } catch (e) {
      console.warn('Action execution error:', e);
    }
  };

  const handleSend = async (textToSend) => {
    const promptText = typeof textToSend === 'string' ? textToSend : inputPrompt;
    if (!promptText || !promptText.trim()) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: promptText,
    };

    setConversation((prev) => [...prev, userMessage]);
    setInputPrompt('');
    setIsTyping(true);

    try {
      const aiResult = await generateBestieChat(conversation, promptText);

      // Execute any autonomous actions detected
      const executed = [];
      if (aiResult.actions && aiResult.actions.length > 0) {
        aiResult.actions.forEach((act) => {
          executeClientAction(act);
          executed.push(act);
        });
      }

      let actionTags = [
        { label: 'Export Executive Brief', query: 'Export this brief summary to file' },
        { label: 'Create Workflow Trigger', query: 'Create automated workflow rule for this' },
      ];

      if (promptText.toLowerCase().includes('sale') || promptText.toLowerCase().includes('deal')) {
        actionTags = [
          { label: 'View Pipeline Deals', query: 'Take me to deals kanban' },
          { label: 'Generate Contract Addendum', query: 'Draft contract addendum for Apex Global' },
        ];
      } else if (promptText.toLowerCase().includes('lead') || promptText.toLowerCase().includes('client')) {
        actionTags = [
          { label: 'View All Leads', query: 'Open CRM leads list' },
          { label: 'Schedule Intro Meeting', query: 'Schedule intro meeting with the new lead tomorrow at 2 PM' },
        ];
      } else if (promptText.toLowerCase().includes('erp') || promptText.toLowerCase().includes('inventory')) {
        actionTags = [
          { label: 'Approve Reorder PR-2026', query: 'Approve PR-2026 purchase order' },
          { label: 'Export Inventory Ledger', query: 'Export inventory stock report' },
        ];
      }

      const bestieReplyId = `bestie-${Date.now()}`;
      const bestieReply = {
        id: bestieReplyId,
        sender: 'bestie',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: aiResult.text,
        actions: actionTags,
        executedActions: executed,
        sources: ['Google Gemini Neural Cloud', 'CRM nErgy Knowledge Mesh', 'Internal Telemetry'],
      };

      setConversation((prev) => [...prev, bestieReply]);
      setIsTyping(false);

      // Auto-speak response if voice output is enabled
      if (isVoiceOutputEnabled) {
        speakMessage(bestieReplyId, aiResult.text);
      }
    } catch (err) {
      setIsTyping(false);
      addToast({
        title: 'Bestie Offline',
        message: 'Showing local telemetry fallback.',
        type: 'error',
      });
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast({ title: 'Copied to Clipboard', message: 'Zunme AI response copied.', type: 'info' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setConversation(DEFAULT_CONVERSATION);
    localStorage.removeItem('crm_bestie_chat_history');
    addToast({ title: 'Memory Reset', message: 'Bestie conversation history cleared.', type: 'info' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - var(--topbar-height) - 3rem)',
        maxHeight: 'calc(100vh - var(--topbar-height) - 3rem)',
        gap: '0.875rem',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', flexShrink: 0 }}>
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI', href: '/crm/dashboard' }, { label: t('AI SuperHouse'), href: '/crm/ai-studio' }, { label: t('Zunme AI Agent') }]} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {t('Zunme AI — My AI Agent')}
            </h1>
            <Badge variant="primary" style={{ backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 700, fontSize: '11px', letterSpacing: '0.04em' }}>
              {t('Autonomous Operating Partner')}
            </Badge>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>
            {t('Your 24/7 autonomous operating partner & AI agent with live speech recognition, voice synthesis, CRM lead dispatch, and task automation.')}
          </p>
        </div>

        {/* Action controls & Status indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
          {/* Voice Auto-Speak Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !isVoiceOutputEnabled;
              setIsVoiceOutputEnabled(next);
              if (!next && window.speechSynthesis) window.speechSynthesis.cancel();
              addToast({
                title: next ? t('Voice Output Enabled') : t('Voice Output Muted'),
                message: next ? t('Bestie will read responses aloud.') : t('Bestie responses are now silent.'),
                type: 'info',
              });
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '9999px',
              border: '1px solid var(--border)',
              backgroundColor: isVoiceOutputEnabled ? 'rgba(2, 132, 199, 0.1)' : 'var(--surface)',
              color: isVoiceOutputEnabled ? '#0284c7' : 'var(--text-secondary)',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
            title={isVoiceOutputEnabled ? t('Click to Mute Voice') : t('Click to Enable Voice')}
          >
            {isVoiceOutputEnabled ? <Volume2 size={14} color="#0284c7" /> : <VolumeX size={14} />}
            <span>{isVoiceOutputEnabled ? t('Voice: On') : t('Voice: Muted')}</span>
          </button>

          {/* Reset Memory Button */}
          <button
            type="button"
            onClick={handleClearHistory}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '9999px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text-secondary)',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            title={t('Clear Chat History')}
          >
            <Trash2 size={13} />
            <span>{t('Clear Chat')}</span>
          </button>

          {/* Status Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.875rem',
              borderRadius: '9999px',
              border: '1px solid rgba(2, 132, 199, 0.25)',
              backgroundColor: 'rgba(56, 189, 248, 0.08)',
              fontSize: '12px',
              fontWeight: 600,
              color: '#0284c7',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '#10b981', display: 'inline-block' }} />
            <span>{t('Vault Live')}</span>
            <span style={{ color: 'var(--text-tertiary)', opacity: 0.6 }}>|</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700 }}>{t('Autonomous v4.0')}</span>
          </div>
        </div>
      </div>

      {/* Quick Action Suggestion Pills */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem',
          flexShrink: 0,
        }}
      >
        {quickActionPrompts.map((q, idx) => {
          const Icon = q.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q.query)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-primary)',
                transition: 'all 150ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.08)';
                e.currentTarget.style.color = '#0284c7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.backgroundColor = 'var(--surface)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              <Icon size={14} style={{ color: '#0284c7' }} />
              <span>{q.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Chat Workspace Card */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--surface)',
          boxShadow: 'var(--shadow-sm)',
          minHeight: 0,
        }}
      >
        {/* Chat Feed */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {conversation.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '0.875rem',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                width: '100%',
              }}
            >
              {/* Bestie Avatar */}
              {msg.sender === 'bestie' && (
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
                  }}
                >
                  <Sparkles size={18} />
                </div>
              )}

              {/* Message Bubble */}
              <div
                style={{
                  maxWidth: '740px',
                  borderRadius: '16px',
                  padding: '1.1rem 1.25rem',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border)',
                  backgroundColor: msg.sender === 'user' ? '#0284c7' : 'var(--surface-secondary)',
                  color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                  boxShadow: msg.sender === 'user' ? '0 4px 14px rgba(2, 132, 199, 0.25)' : 'none',
                  borderTopLeftRadius: msg.sender === 'bestie' ? '4px' : '16px',
                  borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '0.5rem',
                    paddingBottom: '0.35rem',
                    borderBottom: msg.sender === 'user' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid var(--border)',
                    fontSize: '11px',
                    opacity: msg.sender === 'user' ? 0.9 : 0.75,
                  }}
                >
                  <span style={{ fontWeight: 700, color: msg.sender === 'bestie' ? '#0284c7' : '#ffffff' }}>
                    {msg.sender === 'bestie' ? t('Zunme AI Agent') : 'Alexander Wright (Owner)'}
                  </span>
                  <span>{msg.time}</span>
                </div>

                {/* Body Text */}
                <div style={{ color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)' }}>
                  {msg.sender === 'bestie' ? renderFormattedText(t(msg.text)) : msg.text}
                </div>

                {/* Executed Action Widgets (Real CRM Execution) */}
                {msg.executedActions && msg.executedActions.length > 0 && (
                  <div style={{ marginTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {msg.executedActions.map((act, aIdx) => {
                      if (act.type === 'DEAL_RISK') {
                        const deal = act.payload;
                        return (
                          <div
                            key={aIdx}
                            style={{
                              padding: '12px 16px',
                              borderRadius: '12px',
                              backgroundColor: 'rgba(239, 68, 68, 0.06)',
                              border: '1.5px solid rgba(239, 68, 68, 0.3)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
                                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                                  Deal Risk Intervention: {deal.dealName || 'Apex Global Technologies'}
                                </span>
                              </div>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <span style={{ padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontSize: '11px', fontWeight: 800 }}>
                                  {deal.riskLevel || 'High'} Risk
                                </span>
                                <span style={{ padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(2, 132, 199, 0.15)', color: '#0284c7', fontSize: '11px', fontWeight: 800 }}>
                                  {deal.value || '$100,000'}
                                </span>
                              </div>
                            </div>

                            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                              Pipeline Stage: <strong>{deal.stage || 'Contract Negotiation'}</strong> • Target Close: <strong>This Friday</strong>
                            </div>

                            {/* 1-Click Action Buttons */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '4px', borderTop: '1px solid rgba(239, 68, 68, 0.15)' }}>
                              <button
                                type="button"
                                onClick={() => {
                                  executeClientAction({
                                    type: 'SCHEDULE_TASK',
                                    payload: {
                                      title: `Emergency Call: ${deal.dealName || 'Apex Global'} Decision Maker`,
                                      dueDate: 'Tomorrow 10:00 AM',
                                      priority: 'High',
                                      assignee: 'Alexander Wright',
                                    },
                                  });
                                }}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: '8px',
                                  backgroundColor: '#ef4444',
                                  color: '#ffffff',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  border: 'none',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                }}
                              >
                                <Calendar size={13} />
                                <span>Schedule Emergency Call (10 AM)</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  executeClientAction({
                                    type: 'EXPORT_REPORT',
                                    payload: {
                                      title: `Concession_Addendum_${(deal.dealName || 'Apex').replace(/\s+/g, '_')}`,
                                      summary: `# CONTRACT CONCESSION ADDENDUM\n\n**Client:** ${deal.dealName || 'Apex Global'}\n**Value:** ${deal.value || '$100,000'}\n**Adjustment:** 10% Enterprise Incentive\n**Terms:** Signed commitment by Friday 5:00 PM EST.\n\nApproved by Executive AI Partner.`,
                                    },
                                  });
                                }}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: '8px',
                                  backgroundColor: 'rgba(2, 132, 199, 0.1)',
                                  color: '#0284c7',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  border: '1px solid rgba(2, 132, 199, 0.3)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                }}
                              >
                                <Download size={13} />
                                <span>Draft 10% Discount Addendum</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => navigate('/crm/pipeline')}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: '8px',
                                  backgroundColor: 'var(--surface)',
                                  color: 'var(--text-primary)',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  border: '1px solid var(--border)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                }}
                              >
                                <span>View in Pipeline</span>
                                <ChevronRight size={12} />
                              </button>
                            </div>
                          </div>
                        );
                      }

                      if (act.type === 'INVENTORY_ALERT') {
                        const inv = act.payload;
                        return (
                          <div
                            key={aIdx}
                            style={{
                              padding: '12px 16px',
                              borderRadius: '12px',
                              backgroundColor: 'rgba(245, 158, 11, 0.08)',
                              border: '1.5px solid rgba(245, 158, 11, 0.35)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Boxes size={16} color="#d97706" />
                                <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                                  Inventory Alert: {inv.category || 'Automotive Warehouse'}
                                </span>
                              </div>
                              <span style={{ fontSize: '10.5px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#fef3c7', color: '#b45309' }}>
                                Low Stock Action
                              </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {(inv.items || []).map((it, iIdx) => (
                                <div key={iIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                                  <span>{it.name}</span>
                                  <span style={{ fontWeight: 700, color: '#ef4444' }}>Current: {it.stock} / Min: {it.min}</span>
                                </div>
                              ))}
                            </div>

                            <div style={{ display: 'flex', gap: '8px', paddingTop: '6px', borderTop: '1px solid rgba(245, 158, 11, 0.2)' }}>
                              <button
                                type="button"
                                onClick={() => {
                                  addToast({ title: 'PO Approved', message: `Purchase order ${inv.reorderPo || 'PO-2026'} submitted to supplier.`, type: 'success' });
                                }}
                                style={{
                                  padding: '5px 12px',
                                  borderRadius: '6px',
                                  backgroundColor: '#d97706',
                                  color: '#ffffff',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  border: 'none',
                                  cursor: 'pointer',
                                }}
                              >
                                ⚡ One-Click Reorder ({inv.reorderPo || 'PO-2026'})
                              </button>
                              <button
                                type="button"
                                onClick={() => navigate('/crm/erp')}
                                style={{
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  backgroundColor: 'var(--surface)',
                                  border: '1px solid var(--border)',
                                  color: 'var(--text-primary)',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                }}
                              >
                                Open ERP Logistics →
                              </button>
                            </div>
                          </div>
                        );
                      }

                      if (act.type === 'HR_SCREENING') {
                        const hr = act.payload;
                        return (
                          <div
                            key={aIdx}
                            style={{
                              padding: '12px 16px',
                              borderRadius: '12px',
                              backgroundColor: 'rgba(99, 102, 241, 0.08)',
                              border: '1.5px solid rgba(99, 102, 241, 0.3)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Users size={16} color="#6366f1" />
                                <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                                  HR Match Scorecard: {hr.role || 'Senior Candidate'}
                                </span>
                              </div>
                              <span style={{ fontSize: '10.5px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#ede9fe', color: '#4338ca' }}>
                                Vetted
                              </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {(hr.candidates || []).map((cand, cIdx) => (
                                <div key={cIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                                  <span>#{cIdx + 1} {cand.name} ({cand.experience})</span>
                                  <span style={{ fontWeight: 800, color: '#6366f1' }}>{cand.score}</span>
                                </div>
                              ))}
                            </div>

                            <div style={{ display: 'flex', gap: '8px', paddingTop: '6px', borderTop: '1px solid rgba(99, 102, 241, 0.2)' }}>
                              <button
                                type="button"
                                onClick={() => {
                                  executeClientAction({
                                    type: 'SCHEDULE_TASK',
                                    payload: {
                                      title: `Interview: ${hr.candidates?.[0]?.name || 'Top Candidate'} for ${hr.role}`,
                                      dueDate: 'Thursday 3:00 PM',
                                      priority: 'High',
                                      assignee: 'HR Director',
                                    },
                                  });
                                }}
                                style={{
                                  padding: '5px 12px',
                                  borderRadius: '6px',
                                  backgroundColor: '#6366f1',
                                  color: '#ffffff',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  border: 'none',
                                  cursor: 'pointer',
                                }}
                              >
                                📅 Schedule Interview (#{hr.candidates?.[0]?.name || 'Candidate #1'})
                              </button>
                              <button
                                type="button"
                                onClick={() => navigate('/crm/hr')}
                                style={{
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  backgroundColor: 'var(--surface)',
                                  border: '1px solid var(--border)',
                                  color: 'var(--text-primary)',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                }}
                              >
                                Open HR Portal →
                              </button>
                            </div>
                          </div>
                        );
                      }

                      if (act.type === 'CREATE_LEAD') {
                        return (
                          <div
                            key={aIdx}
                            style={{
                              padding: '10px 14px',
                              borderRadius: '10px',
                              backgroundColor: 'rgba(16, 185, 129, 0.08)',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '10px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <UserCheck size={16} color="#10b981" />
                              <div>
                                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>
                                  Lead Registered: {act.payload.name || 'Executive Contact'}
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                  {act.payload.company} • Budget: {act.payload.budget || 'Custom'} • {act.payload.phone || 'Phone verified'}
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => navigate('/crm/leads')}
                              style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                backgroundColor: '#10b981',
                                color: '#ffffff',
                                fontSize: '11px',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                            >
                              <span>View Leads</span>
                              <ChevronRight size={12} />
                            </button>
                          </div>
                        );
                      }

                      if (act.type === 'SCHEDULE_TASK') {
                        return (
                          <div
                            key={aIdx}
                            style={{
                              padding: '10px 14px',
                              borderRadius: '10px',
                              backgroundColor: 'rgba(2, 132, 199, 0.08)',
                              border: '1px solid rgba(2, 132, 199, 0.3)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '10px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Calendar size={16} color="#0284c7" />
                              <div>
                                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>
                                  Task Scheduled: {act.payload.title}
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                  Due: {act.payload.dueDate} • Priority: {act.payload.priority}
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => navigate('/crm/tasks')}
                              style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                backgroundColor: '#0284c7',
                                color: '#ffffff',
                                fontSize: '11px',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                            >
                              <span>Task Board</span>
                              <ChevronRight size={12} />
                            </button>
                          </div>
                        );
                      }

                      if (act.type === 'NAVIGATE') {
                        return (
                          <div
                            key={aIdx}
                            style={{
                              padding: '8px 12px',
                              borderRadius: '8px',
                              backgroundColor: 'var(--surface)',
                              border: '1px solid var(--border)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                              Requested Portal Route: {act.payload.label || act.payload.path}
                            </span>
                            <button
                              type="button"
                              onClick={() => navigate(act.payload.path)}
                              style={{
                                padding: '4px 8px',
                                borderRadius: '6px',
                                backgroundColor: 'rgba(2, 132, 199, 0.1)',
                                color: '#0284c7',
                                fontSize: '11px',
                                fontWeight: 700,
                                border: '1px solid rgba(2, 132, 199, 0.3)',
                                cursor: 'pointer',
                              }}
                            >
                              Open Page →
                            </button>
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                )}

                {/* Sources Citation */}
                {msg.sources && msg.sources.length > 0 && (
                  <div
                    style={{
                      marginTop: '0.75rem',
                      paddingTop: '0.625rem',
                      borderTop: '1px solid var(--border)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '11px',
                    }}
                  >
                    <span style={{ fontWeight: 700, color: 'var(--text-tertiary)' }}>{t('Verified Sources:')}</span>
                    {msg.sources.map((s, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          backgroundColor: 'var(--surface)',
                          border: '1px solid var(--border)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: '#0284c7',
                          fontWeight: 600,
                        }}
                      >
                        {t(s)}
                      </span>
                    ))}
                  </div>
                )}

                {/* Interactive Action Chips */}
                {msg.actions && msg.actions.length > 0 && (
                  <div
                    style={{
                      marginTop: '0.75rem',
                      paddingTop: '0.625rem',
                      borderTop: '1px solid var(--border)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                  >
                    {msg.actions.map((act, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSend(act.query)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.4rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          backgroundColor: 'rgba(2, 132, 199, 0.1)',
                          border: '1px solid rgba(2, 132, 199, 0.25)',
                          color: '#0284c7',
                          transition: 'all 150ms ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#0284c7';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(2, 132, 199, 0.1)';
                          e.currentTarget.style.color = '#0284c7';
                        }}
                      >
                        <span>{t(act.label)}</span>
                        <ChevronRight size={13} />
                      </button>
                    ))}
                  </div>
                )}

                {/* Message Footer Controls for Bestie */}
                {msg.sender === 'bestie' && (
                  <div
                    style={{
                      marginTop: '0.75rem',
                      paddingTop: '0.5rem',
                      borderTop: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                      {/* Read Aloud Button */}
                      <button
                        type="button"
                        onClick={() => speakMessage(msg.id, msg.text)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          color: currentlySpeakingId === msg.id ? '#0284c7' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                        title={currentlySpeakingId === msg.id ? t('Stop Audio') : t('Listen')}
                      >
                        {currentlySpeakingId === msg.id ? (
                          <>
                            <VolumeX size={13} color="#0284c7" />
                            <span style={{ color: '#0284c7' }}>{t('Stop Audio')}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={13} />
                            <span>{t('Listen')}</span>
                          </>
                        )}
                      </button>

                      {/* Copy */}
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.text)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          color: copiedId === msg.id ? '#10b981' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                      >
                        {copiedId === msg.id ? <Check size={13} style={{ color: '#10b981' }} /> : <Copy size={13} />}
                        <span>{copiedId === msg.id ? t('Copied!') : t('Copy')}</span>
                      </button>

                      {/* Download Markdown */}
                      <button
                        type="button"
                        onClick={() => {
                          const element = document.createElement('a');
                          const file = new Blob([msg.text], { type: 'text/markdown' });
                          element.href = URL.createObjectURL(file);
                          element.download = `Bestie_Brief_${Date.now()}.md`;
                          document.body.appendChild(element);
                          element.click();
                          document.body.removeChild(element);
                          addToast({ title: t('Exported'), message: t('Brief saved as Markdown.'), type: 'info' });
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                        title={t('Download Markdown')}
                      >
                        <Download size={13} />
                        <span>{t('Export')}</span>
                      </button>

                      {/* Regenerate */}
                      <button
                        type="button"
                        onClick={() => handleSend(`Regenerate response for: "${msg.text.slice(0, 30)}..."`)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                      >
                        <RotateCw size={13} />
                        <span>{t('Regenerate')}</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => addToast({ title: 'Feedback Recorded', message: 'Marked as helpful.', type: 'success' })}
                        style={{ padding: '3px 6px', borderRadius: '6px', color: 'var(--text-tertiary)', cursor: 'pointer' }}
                        title="Helpful"
                      >
                        <ThumbsUp size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => addToast({ title: 'Feedback Recorded', message: 'We will improve this response model.', type: 'info' })}
                        style={{ padding: '3px 6px', borderRadius: '6px', color: 'var(--text-tertiary)', cursor: 'pointer' }}
                        title="Not Helpful"
                      >
                        <ThumbsDown size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {msg.sender === 'user' && (
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '12px',
                    flexShrink: 0,
                  }}
                >
                  AW
                </div>
              )}
            </div>
          ))}

          {/* Typing Animation */}
          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={18} />
              </div>
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '14px',
                  borderTopLeftRadius: '4px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                }}
              >
                <span>Bestie is synthesizing enterprise records and executing CRM triggers...</span>
                <span style={{ display: 'inline-flex', gap: '3px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '9999px', backgroundColor: '#0284c7', display: 'inline-block' }} />
                  <span style={{ width: '5px', height: '5px', borderRadius: '9999px', backgroundColor: '#38bdf8', display: 'inline-block' }} />
                  <span style={{ width: '5px', height: '5px', borderRadius: '9999px', backgroundColor: '#93c5fd', display: 'inline-block' }} />
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar (Permanently Docked at Bottom) */}
        <div
          style={{
            padding: '0.875rem 1.25rem',
            borderTop: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            flexShrink: 0,
          }}
        >
          {isListening && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                marginBottom: '8px',
                borderRadius: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                fontSize: '11.5px',
                fontWeight: 700,
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', animation: 'pulse 1s infinite' }} />
              <span>Microphone Active — Bestie is listening to your speech in real-time...</span>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.6rem',
              borderRadius: '14px',
              border: isListening ? '1.5px solid #ef4444' : '1.5px solid var(--border)',
              backgroundColor: 'var(--surface-secondary)',
              transition: 'border-color 150ms ease',
            }}
          >
            {/* Input Box */}
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={isListening ? t('Listening to speech...') : t('Ask Zunme AI anything, create leads, schedule tasks, or use the mic to speak...')}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '13px',
                color: 'var(--text-primary)',
                padding: '0.25rem 0.5rem',
                fontWeight: 500,
                width: '100%',
              }}
            />

            {/* Voice Input (Microphone) */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              style={{
                padding: '0.45rem',
                borderRadius: '8px',
                backgroundColor: isListening ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                color: isListening ? '#ef4444' : 'var(--text-tertiary)',
                border: isListening ? '1px solid #ef4444' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 150ms ease',
              }}
              title={isListening ? t('Stop listening') : t('Start speaking (Web Speech)')}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isTyping}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                backgroundColor: !inputPrompt.trim() || isTyping ? 'var(--border)' : '#0284c7',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '12px',
                cursor: !inputPrompt.trim() || isTyping ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: !inputPrompt.trim() || isTyping ? 'none' : '0 2px 8px rgba(2, 132, 199, 0.3)',
                transition: 'all 150ms ease',
              }}
            >
              <span>{t('Send')}</span>
              <CornerDownLeft size={14} />
            </button>
          </form>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: 'var(--text-tertiary)',
              marginTop: '0.5rem',
              padding: '0 0.25rem',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <span>{t('Autonomous CRM AI Agent • 2-Way Voice Active')}</span>
            <span>{t('Press Enter ↵ or Speak into Mic • Local Storage Vault Connected')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZunmeAi;

export const BestieAi = ZunmeAi;
