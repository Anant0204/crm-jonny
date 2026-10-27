import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Video,
  Image as ImageIcon,
  Music,
  Mic,
  Box,
  Workflow,
  FolderGit2,
  UploadCloud,
  Play,
  Download,
  Loader2,
  Wand2,
  Zap,
  Cpu,
  Layers,
  Film,
  MessageSquare,
  Volume2,
  Radio,
  Palette,
  Camera,
  ChevronRight,
  Database,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Flame,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Code,
  Headphones,
  Pause,
  VolumeX,
  AlertCircle
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui';
import { useToast } from '../../context/ToastContext';
import { useCrm } from '../../context/CrmContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { generateStudioContent } from '../../services/geminiService';
import { generateElevenLabsSpeech, ELEVEN_VOICES, stopBrowserSpeech, playWithWebSpeech } from '../../services/elevenLabsService';

const categoryThemeMap = {
  'AI Agent': {
    primary: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    bgTint: 'rgba(99, 102, 241, 0.06)',
    border: 'rgba(99, 102, 241, 0.22)',
    badgeBg: 'rgba(99, 102, 241, 0.1)',
    text: '#4f46e5',
    glow: 'rgba(99, 102, 241, 0.22)',
  },
  'Video Production': {
    primary: '#0284c7',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
    bgTint: 'rgba(6, 182, 212, 0.06)',
    border: 'rgba(6, 182, 212, 0.22)',
    badgeBg: 'rgba(6, 182, 212, 0.1)',
    text: '#0284c7',
    glow: 'rgba(6, 182, 212, 0.22)',
  },
  'Voice & Speech': {
    primary: '#059669',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    bgTint: 'rgba(16, 185, 129, 0.06)',
    border: 'rgba(16, 185, 129, 0.22)',
    badgeBg: 'rgba(16, 185, 129, 0.1)',
    text: '#059669',
    glow: 'rgba(16, 185, 129, 0.22)',
  },
  'Audio & Music': {
    primary: '#e11d48',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
    bgTint: 'rgba(244, 63, 94, 0.06)',
    border: 'rgba(244, 63, 94, 0.22)',
    badgeBg: 'rgba(244, 63, 94, 0.1)',
    text: '#e11d48',
    glow: 'rgba(244, 63, 94, 0.22)',
  },
  'Image Studio': {
    primary: '#d97706',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    bgTint: 'rgba(245, 158, 11, 0.06)',
    border: 'rgba(245, 158, 11, 0.22)',
    badgeBg: 'rgba(245, 158, 11, 0.1)',
    text: '#d97706',
    glow: 'rgba(245, 158, 11, 0.22)',
  },
  'Avatar & 3D': {
    primary: '#7c3aed',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
    bgTint: 'rgba(168, 85, 247, 0.06)',
    border: 'rgba(168, 85, 247, 0.22)',
    badgeBg: 'rgba(168, 85, 247, 0.1)',
    text: '#7c3aed',
    glow: 'rgba(168, 85, 247, 0.22)',
  },
  'Branding': {
    primary: '#ea580c',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    bgTint: 'rgba(249, 115, 22, 0.06)',
    border: 'rgba(249, 115, 22, 0.22)',
    badgeBg: 'rgba(249, 115, 22, 0.1)',
    text: '#ea580c',
    glow: 'rgba(249, 115, 22, 0.22)',
  },
  'Automations': {
    primary: '#16a34a',
    gradient: 'linear-gradient(135deg, #84cc16 0%, #16a34a 100%)',
    bgTint: 'rgba(132, 204, 22, 0.06)',
    border: 'rgba(132, 204, 22, 0.22)',
    badgeBg: 'rgba(132, 204, 22, 0.1)',
    text: '#16a34a',
    glow: 'rgba(132, 204, 22, 0.22)',
  },
  'Model Training': {
    primary: '#9333ea',
    gradient: 'linear-gradient(135deg, #c084fc 0%, #9333ea 100%)',
    bgTint: 'rgba(192, 132, 252, 0.06)',
    border: 'rgba(192, 132, 252, 0.22)',
    badgeBg: 'rgba(192, 132, 252, 0.1)',
    text: '#9333ea',
    glow: 'rgba(192, 132, 252, 0.22)',
  },
};

const defaultTheme = {
  primary: '#0284c7',
  gradient: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
  bgTint: 'rgba(6, 182, 212, 0.06)',
  border: 'rgba(6, 182, 212, 0.22)',
  badgeBg: 'rgba(6, 182, 212, 0.1)',
  text: '#0284c7',
  glow: 'rgba(6, 182, 212, 0.22)',
};

export const CrmAiStudio = () => {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const { refreshDeals, refreshActivities } = useCrm();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  React.useEffect(() => {
    if (refreshDeals) refreshDeals();
    if (refreshActivities) refreshActivities();
  }, [refreshDeals, refreshActivities]);

  // The Client-Specified 15 Sub-Studios with Nova Drive #006742 Palette Alignment
  const subStudios = [
    { id: 'bestie', name: 'Zunme AI — My AI Agent', category: 'AI Agent', icon: Sparkles, desc: 'Your 24/7 business operating partner and conversational workflow controller.', badge: 'Live AI Core' },
    { id: 'muzik', name: 'AAI Muzik Hit Studio', category: 'Audio & Music', icon: Music, desc: 'Generate original commercial background tracks, jingles, and brand soundtracks in any genre.', badge: 'Dolby Atmos' },
    { id: 'realtalk', name: 'AAI Real Talk', category: 'Voice & Speech', icon: Radio, desc: 'Ultra-realistic human conversational dialogues and podcast speech generation with natural emotion.', badge: 'Neural Voice' },
    { id: 'audio-writer', name: 'AI Audio Writer', category: 'Audio & Music', icon: Mic, desc: 'Voiceover scriptwriting, voice modulation, and sonic identity branding synthesizer.', badge: 'Script Sync' },
    { id: 'contalk', name: 'AI ConTalk', category: 'Voice & Speech', icon: MessageSquare, desc: 'Continuous conversational agents for sales desking, client FAQs, and customer outreach.', badge: 'Interactive' },
    { id: 'film-maker', name: 'AI Film Maker', category: 'Video Production', icon: Film, desc: 'Full multi-scene cinematic movie and commercial generation from simple script outlines.', badge: 'Cinema 4K' },
    { id: 'image-talkr', name: 'AI Image TalkR', category: 'Avatar & 3D', icon: ImageIcon, desc: 'Animate any still portrait or executive headshot into a speaking, synchronized video presenter.', badge: 'LipSync v3' },
    { id: 'logo-gen', name: 'AI Logo Generator', category: 'Branding', icon: Palette, desc: 'Create vector logos, app icons, and corporate identities with energy aura effects.', badge: 'Vector SVGs' },
    { id: 'photo-life', name: 'AI Photo Life', category: 'Image Studio', icon: Camera, desc: 'Transform ordinary lot & product photography into studio-grade showroom visual assets.', badge: '100+ Backdrops' },
    { id: 'video-crew', name: 'AI Video Crew', category: 'Video Production', icon: Video, desc: 'Automated multi-camera angle switching, virtual director, and post-production rendering.', badge: 'Virtual Crew' },
    { id: 'visual-workflow', name: 'AI Visual Workflow', category: 'Automations', icon: Workflow, desc: 'Visual node-based pipeline connecting AI prompts directly to CRM and ERP triggers.', badge: 'No-Code Nodes' },
    { id: 'voicex-change', name: 'AI VoiceX Change', category: 'Voice & Speech', icon: Volume2, desc: 'Instant multi-language accent translation and corporate voice cloning in 40+ languages.', badge: '40+ Languages' },
    { id: 'big-movies', name: 'AAI BIG Movies Lab', category: 'Video Production', icon: Box, desc: 'Long-form narrative generation, documentary storytelling, and high-impact investor pitches.', badge: 'IMAX Render' },
    { id: 'train-speak', name: 'Train AI to Speak', category: 'Model Training', icon: Cpu, desc: 'Train fine-tuned custom voice models on executive speech samples with zero robotic artifacts.', badge: 'Custom LLM' },
    { id: 'video-agent', name: 'AI Video Agent', category: 'Video Production', icon: Video, desc: 'Say it, See it, Shape it, Ship it. Rapid video pipeline for social channels and ads.', badge: '4-Step Pipeline' },
  ];

  const [activeStudio, setActiveStudio] = useState('bestie');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [prompt, setPrompt] = useState('Produce a sleek 4K product trailer for our CRM nErgy AI platform highlighting enterprise logistics and real-time desking.');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [modelPreset, setModelPreset] = useState('UltraCinema v4.2');
  const [referenceFile, setReferenceFile] = useState(null);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedAsset, setGeneratedAsset] = useState(null);
  const [savedLibrary, setSavedLibrary] = useState([
    { id: '1', title: 'Corporate Logistics Fleet Rendering', type: 'Image', studio: 'AI Photo Life', date: '2 hours ago', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80' },
    { id: '2', title: 'Executive Spokesperson Commercial Pitch', type: 'Video', studio: 'AI Image TalkR', date: '1 day ago', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80' },
    { id: '3', title: 'Enterprise Brand Anthem Score', type: 'Audio', studio: 'AAI Muzik Hit Studio', date: '2 days ago', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80' },
  ]);

  const categories = ['All', 'Video Production', 'Voice & Speech', 'Audio & Music', 'Image Studio', 'Avatar & 3D', 'Branding', 'Automations', 'Model Training'];

  const filteredStudios = selectedCategory === 'All'
    ? subStudios
    : subStudios.filter((s) => s.category === selectedCategory);

  const activeStudioObj = subStudios.find((s) => s.id === activeStudio) || subStudios[0];
  const activeTheme = categoryThemeMap[activeStudioObj.category] || defaultTheme;

  const [monitorTab, setMonitorTab] = useState('output'); // 'output' | 'viewport'
  const [copiedText, setCopiedText] = useState(false);
  const [isImageRendering, setIsImageRendering] = useState(false);

  // Voice State (ElevenLabs & Web Speech API)
  const [selectedVoice, setSelectedVoice] = useState('21m00Tcm4TlvDq8ikWAM'); // Rachel by default
  const [isSynthesizingVoice, setIsSynthesizingVoice] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isNativeSpeaking, setIsNativeSpeaking] = useState(false);
  const audioRef = useRef(null);

  const toggleAudioPlay = () => {
    if (isNativeSpeaking) {
      stopBrowserSpeech();
      setIsNativeSpeaking(false);
      setIsPlayingAudio(false);
      return;
    }

    if (audioBlobUrl && audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlayingAudio(true);
        }).catch((e) => {
          console.error('Audio play error:', e);
        });
      }
      return;
    }

    if (generatedAsset?.content) {
      setIsNativeSpeaking(true);
      setIsPlayingAudio(true);
      playWithWebSpeech(generatedAsset.content, selectedVoice, () => {
        setIsNativeSpeaking(false);
        setIsPlayingAudio(false);
      });
    }
  };

  const handleSynthesizeVoice = async () => {
    if (!generatedAsset?.content) {
      addToast({ title: 'No Script Found', message: 'Generate a script first before synthesizing voice.', type: 'error' });
      return;
    }

    setIsSynthesizingVoice(true);
    try {
      const result = await generateElevenLabsSpeech(generatedAsset.content, selectedVoice, () => {
        setIsPlayingAudio(false);
        setIsNativeSpeaking(false);
      });

      if (result?.url) {
        setAudioBlobUrl(result.url);
        setIsPlayingAudio(true);
        setIsNativeSpeaking(false);
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.src = result.url;
            audioRef.current.play().catch(() => {});
          }
        }, 200);
      } else {
        setIsNativeSpeaking(true);
        setIsPlayingAudio(true);
      }

      addToast({
        title: 'Voice Synthesized 🎙️',
        message: result?.isNative ? 'Neural Speech synthesis active.' : 'ElevenLabs high-fidelity audio stream ready.',
        type: 'success',
      });
    } catch (err) {
      addToast({
        title: 'Voice Notice',
        message: err.message || 'Could not synthesize voice audio.',
        type: 'error',
      });
    } finally {
      setIsSynthesizingVoice(false);
    }
  };

  const handleLoadFromVault = (item) => {
    setGeneratedAsset(item);
    if (item.prompt) {
      setPrompt(item.prompt);
    }
    if (item.studioId) {
      setActiveStudio(item.studioId);
    }
    if (item.type === 'Image' || item.isFluxImage || monitorTab === 'viewport') {
      setMonitorTab('viewport');
    } else {
      setMonitorTab('output');
    }
    addToast({
      title: 'Loaded from Vault',
      message: `"${item.title}" loaded into canvas monitor.`,
      type: 'info',
    });
  };

  const handleDownload = async () => {
    if (!generatedAsset) return;

    // If currently viewing Visual Canvas or asset is an Image:
    if (monitorTab === 'viewport' || generatedAsset.type === 'Image' || generatedAsset.isFluxImage) {
      try {
        addToast({ title: 'Downloading Image', message: 'Saving 4K image file...', type: 'info' });
        const res = await fetch(generatedAsset.url);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `${(generatedAsset.studio || 'ai_render').replace(/\s+/g, '_')}_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
        addToast({ title: 'Image Saved', message: '4K image downloaded to your device.', type: 'success' });
      } catch (e) {
        // Fallback: open in new tab for direct save if cross-origin restricts direct blob
        window.open(generatedAsset.url, '_blank');
      }
      return;
    }

    // Otherwise download text script
    const element = document.createElement('a');
    const file = new Blob([generatedAsset.content || generatedAsset.title], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${generatedAsset.studio.replace(/\s+/g, '_')}_output.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addToast({ title: 'Export Complete', message: 'Script downloaded successfully.', type: 'success' });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      addToast({ title: 'Prompt Required', message: 'Please enter a generation prompt.', type: 'error' });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(20);
    setGeneratedAsset(null);
    setAudioBlobUrl(null);
    setIsPlayingAudio(false);

    const isImageStudio = activeStudio === 'photo-life' || activeStudio === 'logo-gen' || activeStudioObj.category === 'Image Studio' || activeStudioObj.category === 'Branding';

    // Auto-switch to viewport for visual studios so user sees the real generated image instantly
    if (isImageStudio) {
      setMonitorTab('viewport');
    } else {
      setMonitorTab('output');
    }

    const progressInterval = setInterval(() => {
      setGenerationProgress((p) => {
        if (p >= 85) return 90;
        return p + 15;
      });
    }, 300);

    try {
      const aiResult = await generateStudioContent(activeStudio, prompt, {
        aspectRatio,
        modelPreset,
      });

      clearInterval(progressInterval);
      setGenerationProgress(100);
      setIsGenerating(false);

      // Real FLUX.1 Image generation for photo-life & logo-gen
      let realImageUrl = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80';
      if (isImageStudio) {
        setIsImageRendering(true);
        const cleanPrompt = encodeURIComponent(
          prompt.trim() + (activeStudio === 'photo-life'
            ? ', photorealistic luxury automotive commercial staging, 8k uhd, showroom cinematic lighting, 85mm lens'
            : activeStudio === 'logo-gen'
              ? ', minimalist modern corporate vector logo emblem on clean background, crisp edges'
              : ', 8k cinematic lighting, ultra high resolution')
        );
        const randomSeed = Math.floor(Math.random() * 1000000);
        realImageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1024&height=576&nologo=true&seed=${randomSeed}`;
      }

      const newAsset = {
        id: Date.now().toString(),
        title: prompt.slice(0, 42) + (prompt.length > 42 ? '...' : ''),
        studio: activeStudioObj.name,
        studioId: activeStudio,
        type: activeStudioObj.category.includes('Video') ? 'Video' : activeStudioObj.category.includes('Audio') || activeStudioObj.category.includes('Voice') ? 'Audio' : 'Image',
        date: 'Just now',
        url: realImageUrl,
        isFluxImage: isImageStudio,
        prompt,
        content: aiResult.text,
        isRealAi: aiResult.success,
      };

      setGeneratedAsset(newAsset);
      setSavedLibrary((prev) => [newAsset, ...prev]);

      addToast({
        title: aiResult.success ? 'Neural Synthesis Complete' : 'Synthesis Complete (Domain Mode)',
        message: `${activeStudioObj.name} generated real-time asset.`,
        type: 'success',
      });
    } catch (err) {
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setIsGenerating(false);
      addToast({
        title: 'Synthesis Notice',
        message: err.message || 'Error communicating with AI engine.',
        type: 'error',
      });
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '22px',
      maxWidth: '1440px',
      margin: '0 auto',
      paddingBottom: '3rem',
      color: '#1e293b',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* 1. Executive Multi-Modal AI Studio Command Deck */}
      <div style={{
        background: 'linear-gradient(135deg, #090e17 0%, #0f172a 45%, #1e1b4b 100%)',
        borderRadius: '24px',
        padding: '28px 32px',
        color: '#ffffff',
        boxShadow: '0 18px 40px -10px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '22px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient luminous glow spots */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '8%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          left: '4%',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#67e8f9',
            padding: '4px 12px',
            borderRadius: '20px',
            backgroundColor: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            marginBottom: '10px',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22d3ee', boxShadow: '0 0 10px #22d3ee' }} />
            <span>{t('AI SuperHouse • Multi-Modal Studio Engine')}</span>
          </div>

          <h1 style={{
            fontSize: '28px',
            fontWeight: 900,
            letterSpacing: '-0.6px',
            margin: '0 0 8px 0',
            background: 'linear-gradient(90deg, #ffffff 0%, #cbd5e1 60%, #93c5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {t('AI Content Studio & Production Labs')}
          </h1>

          <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0, lineHeight: 1.55 }}>
            {t('Multi-modal generative engine: commercial cinema creation, talking avatars, neural voice synthesis, and sonic brand soundscapes.')}
          </p>

          {/* Capability badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#e2e8f0', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
              ⚡ {t('15 Specialized Studios')}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#e2e8f0', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
              🎯 {t('1.4s Tensor-Core Latency')}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#e2e8f0', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
              🎙️ {t('ElevenLabs Neural Audio')}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#e2e8f0', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
              🎬 {t('UltraCinema v4.2')}
            </span>
          </div>
        </div>

        {/* Action Header Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => navigate('/crm/bestie')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 20px',
              borderRadius: '13px',
              fontSize: '12.5px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              cursor: 'pointer',
              boxShadow: '0 8px 20px -4px rgba(99, 102, 241, 0.45)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 24px -4px rgba(99, 102, 241, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px -4px rgba(99, 102, 241, 0.45)';
            }}
          >
            <Sparkles size={15} />
            <span>{t('Open Zunme AI')}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/crm/ai-video')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 22px',
              borderRadius: '13px',
              fontSize: '12.5px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              cursor: 'pointer',
              boxShadow: '0 8px 20px -4px rgba(6, 182, 212, 0.45)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 24px -4px rgba(6, 182, 212, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px -4px rgba(6, 182, 212, 0.45)';
            }}
          >
            <Video size={15} />
            <span>{t('Launch 4-Step Video Agent')}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Keyframes & Studio Card Animations */}
      <style>{`
        .telemetry-kpi-card {
          position: relative;
          background-color: var(--surface, #ffffff);
          border-radius: 18px;
          padding: 20px 22px;
          border: 1px solid var(--border, #e2e8f0);
          box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.05);
          overflow: hidden;
          transition: all 0.25s ease;
        }
        .telemetry-kpi-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px -4px rgba(15, 23, 42, 0.08);
          border-color: var(--border-strong, #cbd5e1) !important;
        }
        [data-theme="dark"] .telemetry-kpi-card {
          background-color: var(--surface, #0f1523) !important;
          border-color: var(--border, #1e293b) !important;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.5) !important;
        }

        .studio-card-modern {
          position: relative;
          background-color: var(--surface, #ffffff);
          border-radius: 18px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          min-height: 204px;
          cursor: pointer;
          transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          border: 1px solid var(--border, #e2e8f0);
          box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.05);
        }
        .studio-card-modern:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 32px -6px rgba(15, 23, 42, 0.12);
        }
        .studio-card-modern.is-selected {
          transform: translateY(-3px);
        }
        [data-theme="dark"] .studio-card-modern {
          background-color: var(--surface, #0f1523) !important;
          border-color: var(--border, #1e293b) !important;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.45) !important;
        }
        [data-theme="dark"] .studio-card-modern:hover {
          box-shadow: 0 16px 36px -6px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(99, 102, 241, 0.35) !important;
        }

        .category-nav-shell {
          background-color: var(--surface, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }
        [data-theme="dark"] .category-nav-shell {
          background-color: var(--surface, #0f1523) !important;
          border-color: var(--border, #1e293b) !important;
        }

        .studio-surface-card {
          background-color: var(--surface, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.05);
        }
        [data-theme="dark"] .studio-surface-card {
          background-color: var(--surface, #0f1523) !important;
          border-color: var(--border, #1e293b) !important;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.5) !important;
        }

        .studio-action-idle {
          background-color: var(--surface-secondary, #f8fafc);
          border: 1px solid var(--border, #e2e8f0);
          color: var(--text-primary, #334155);
        }
        [data-theme="dark"] .studio-action-idle {
          background-color: var(--surface-secondary, #161e31) !important;
          border-color: var(--border, #1e293b) !important;
          color: var(--text-primary, #f8fafc) !important;
        }

        [data-theme="dark"] textarea,
        [data-theme="dark"] select {
          background-color: var(--surface-secondary, #161e31) !important;
          color: var(--text-primary, #f8fafc) !important;
          border-color: var(--border, #1e293b) !important;
        }
      `}</style>

      {/* 2. Telemetry Metrics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '16px',
        width: '100%',
      }}>
        {/* KPI 1 */}
        <div className="telemetry-kpi-card">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary, #64748b)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{t('TOTAL STUDIOS')}</span>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.12)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={17} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary, #0f172a)', letterSpacing: '-0.5px', marginTop: '10px' }}>{t('15 Sub-Studios')}</div>
          <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span>{t('All Neural Cores Online')}</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="telemetry-kpi-card">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: 'linear-gradient(90deg, #06b6d4, #0284c7)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary, #64748b)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{t('AUDIO / VIDEO RENDERS')}</span>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.12)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Video size={17} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary, #0f172a)', letterSpacing: '-0.5px', marginTop: '10px' }}>{t('1,840 Assets')}</div>
          <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0284c7', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <Activity size={13} />
            <span>{t('+24% output this week')}</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="telemetry-kpi-card">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: 'linear-gradient(90deg, #f59e0b, #ea580c)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary, #64748b)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{t('AVG RENDER LATENCY')}</span>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.12)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={17} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary, #0f172a)', letterSpacing: '-0.5px', marginTop: '10px' }}>{t('1.4 Seconds')}</div>
          <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#d97706', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
            <span>{t('Real-time Tensor Core GPU')}</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="telemetry-kpi-card">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: 'linear-gradient(90deg, #10b981, #059669)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary, #64748b)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{t('STORAGE VAULT')}</span>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Database size={17} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '10px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary, #0f172a)', letterSpacing: '-0.5px' }}>482 GB</span>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--text-secondary, #64748b)' }}>/ 2 TB (24%)</span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border, #e2e8f0)', borderRadius: '4px', overflow: 'hidden', marginTop: '10px' }}>
            <div style={{ width: '24%', height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '4px' }} />
          </div>
        </div>
      </div>

      {/* 3. Category Filter Navigation Segmented Control */}
      <div className="category-nav-shell" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        padding: '6px 8px',
        borderRadius: '16px',
        scrollbarWidth: 'none',
      }}>
        {categories.map((cat) => {
          const isCatActive = selectedCategory === cat;
          const count = cat === 'All' ? subStudios.length : subStudios.filter((s) => s.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '8px 14px',
                borderRadius: '11px',
                fontSize: '12px',
                fontWeight: isCatActive ? 800 : 600,
                border: isCatActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                background: isCatActive ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : 'transparent',
                color: isCatActive ? '#ffffff' : 'var(--text-secondary, #64748b)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                boxShadow: isCatActive ? '0 4px 14px rgba(99, 102, 241, 0.35)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isCatActive) {
                  e.currentTarget.style.backgroundColor = 'var(--surface-secondary, #f8fafc)';
                  e.currentTarget.style.color = 'var(--text-primary, #0f172a)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isCatActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary, #64748b)';
                }
              }}
            >
              {cat === 'All' && <Layers size={13} />}
              {cat === 'Video Production' && <Film size={13} />}
              {cat === 'Voice & Speech' && <Mic size={13} />}
              {cat === 'Audio & Music' && <Music size={13} />}
              {cat === 'Image Studio' && <Camera size={13} />}
              {cat === 'Avatar & 3D' && <ImageIcon size={13} />}
              {cat === 'Branding' && <Palette size={13} />}
              {cat === 'Automations' && <Workflow size={13} />}
              {cat === 'Model Training' && <Cpu size={13} />}
              <span>{t(cat)}</span>
              <span style={{
                fontSize: '10px',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: '8px',
                backgroundColor: isCatActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(128, 128, 128, 0.12)',
                color: isCatActive ? '#ffffff' : 'var(--text-secondary, #64748b)',
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. The 15 Sub-Studio Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', padding: '0 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{
              fontSize: '13.5px',
              fontWeight: 900,
              color: 'var(--text-primary, #0f172a)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span>{t('SELECT PRODUCTION STUDIO')}</span>
              <span style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: '#ffffff',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 800,
                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)',
              }}>
                {filteredStudios.length} {t('AVAILABLE')}
              </span>
            </h2>
          </div>
          <span style={{ fontSize: '11.5px', color: 'var(--text-secondary, #64748b)', fontWeight: 600 }}>{t('Click any studio node to mount workspace')}</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(235px, 1fr))',
          gap: '16px',
          width: '100%',
        }}>
          {filteredStudios.map((studio) => {
            const Icon = studio.icon;
            const isSelected = activeStudio === studio.id;
            const theme = categoryThemeMap[studio.category] || defaultTheme;

            return (
              <div
                key={studio.id}
                onClick={() => {
                  setActiveStudio(studio.id);
                  if (studio.id === 'bestie') navigate('/crm/bestie');
                  if (studio.id === 'video-agent') navigate('/crm/ai-video');
                }}
                className={`studio-card-modern ${isSelected ? 'is-selected' : ''}`}
                style={{
                  border: isSelected ? `2px solid ${theme.primary}` : undefined,
                  boxShadow: isSelected
                    ? `0 14px 30px -4px ${theme.glow}, 0 0 0 1px ${theme.primary}`
                    : undefined,
                }}
              >
                {/* Luminous top accent strip */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3.5px',
                  background: theme.gradient,
                  opacity: isSelected ? 1 : 0.85,
                }} />

                {/* Subtle ambient corner radial glow */}
                <div style={{
                  position: 'absolute',
                  top: '-25px',
                  right: '-25px',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
                  pointerEvents: 'none',
                  opacity: isSelected ? 0.9 : 0.4,
                  transition: 'opacity 0.3s ease',
                }} />

                {/* Top Header: Icon + Rating Badge */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    {/* Domain Icon Container */}
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      background: isSelected ? theme.gradient : theme.bgTint,
                      border: `1px solid ${isSelected ? 'transparent' : theme.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isSelected ? '#ffffff' : theme.primary,
                      boxShadow: isSelected ? `0 6px 16px -2px ${theme.glow}` : 'none',
                      transition: 'all 0.2s ease',
                    }}>
                      <Icon size={19} color={isSelected ? '#ffffff' : theme.primary} strokeWidth={2.4} />
                    </div>

                    {/* Compact Rating Tag */}
                    <div style={{
                      padding: '3px 9px',
                      borderRadius: '20px',
                      backgroundColor: theme.badgeBg,
                      border: `1px solid ${theme.border}`,
                      fontSize: '10px',
                      fontWeight: 800,
                      color: theme.text,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      letterSpacing: '0.2px',
                    }}>
                      <span style={{ fontSize: '9px' }}>★</span>
                      <span>{studio.badge}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 800,
                    color: 'var(--text-primary, #0f172a)',
                    letterSpacing: '-0.3px',
                    lineHeight: 1.3,
                    marginBottom: '5px',
                  }}>
                    {t(studio.name) || studio.name}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'var(--text-secondary, #64748b)',
                    lineHeight: 1.45,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {t(studio.desc) || studio.desc}
                  </div>
                </div>

                {/* Footer Single High-Impact Button */}
                <div style={{ position: 'relative', zIndex: 1, marginTop: '14px' }}>
                  <div
                    className={isSelected ? '' : 'studio-action-idle'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      background: isSelected ? theme.gradient : undefined,
                      color: isSelected ? '#ffffff' : undefined,
                      fontSize: '11px',
                      fontWeight: 800,
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? `0 4px 14px -2px ${theme.glow}` : 'none',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {isSelected ? (
                        <>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff' }} />
                          <span>{t('Active Studio')}</span>
                        </>
                      ) : (
                        <span>{t('Launch Studio')}</span>
                      )}
                    </span>
                    <ChevronRight size={13} color={isSelected ? '#ffffff' : 'var(--text-secondary, #94a3b8)'} strokeWidth={2.4} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Main Studio Workspace Section: Production Lab & Studio Canvas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '22px',
      }}>
        {/* Left Side: Production Lab */}
        <div className="studio-surface-card" style={{
          borderRadius: '20px',
          padding: '24px',
          boxShadow: `0 4px 20px -4px ${activeTheme.glow}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeTheme.primary }} />
              <span style={{ fontSize: '11px', fontWeight: 900, color: activeTheme.primary, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                PRODUCTION LAB WORKSTATION
              </span>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary, #0f172a)', marginTop: '4px' }}>
              {activeStudioObj.name}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary, #64748b)', marginTop: '2px' }}>
              {activeStudioObj.desc}
            </div>
          </div>

          {/* Model Preset Banner */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '12px',
            backgroundColor: activeTheme.bgTint,
            border: `1px solid ${activeTheme.border}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: activeTheme.text }}>
              <Sparkles size={15} color={activeTheme.primary} />
              <span>Configured Model: <strong style={{ color: activeTheme.primary }}>{modelPreset}</strong></span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', background: activeTheme.gradient, color: '#ffffff', textTransform: 'uppercase' }}>
              {activeStudioObj.category}
            </span>
          </div>

          {/* Prompt Directives Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: 'var(--text-primary, #334155)' }}>
              <span>Creative Prompt / Directives</span>
              <span style={{ fontWeight: 500, color: 'var(--text-secondary, #64748b)', fontSize: '11px' }}>{prompt.length} / 500 chars</span>
            </div>

            {/* Quick Inspiration Prompt Chips */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '4px' }}>
              <button
                type="button"
                onClick={() => setPrompt(`Produce a sleek 4K cinema trailer for CRM nErgy platform highlighting enterprise logistics.`)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '7px',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: activeTheme.bgTint,
                  color: activeTheme.text,
                  border: `1px solid ${activeTheme.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                ✨ 4K Cinema Commercial
              </button>
              <button
                type="button"
                onClick={() => setPrompt(`Generate executive voiceover narration discussing high-value commercial enterprise accounts.`)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '7px',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: activeTheme.bgTint,
                  color: activeTheme.text,
                  border: `1px solid ${activeTheme.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                🎙️ Executive Narration
              </button>
              <button
                type="button"
                onClick={() => setPrompt(`High-energy sonic brand anthem score with modern electronic pulse and acoustic elements.`)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '7px',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: activeTheme.bgTint,
                  color: activeTheme.text,
                  border: `1px solid ${activeTheme.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                🎵 Sonic Brand Score
              </button>
            </div>

            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe what you want ${activeStudioObj.name} to generate...`}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid var(--border, #cbd5e1)',
                backgroundColor: 'var(--surface-secondary, #f8fafc)',
                color: 'var(--text-primary, #0f172a)',
                fontSize: '13px',
                resize: 'none',
                boxSizing: 'border-box',
                outline: 'none',
                fontFamily: 'inherit',
                lineHeight: 1.5,
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = activeTheme.primary}
              onBlur={(e) => e.target.style.borderColor = 'var(--border, #cbd5e1)'}
            />
          </div>

          {/* Controls: Aspect Ratio & Preset */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: 'var(--text-secondary, #475569)', marginBottom: '6px' }}>
                Aspect Ratio / Format
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border, #cbd5e1)',
                  backgroundColor: 'var(--surface-secondary, #f8fafc)',
                  color: 'var(--text-primary, #0f172a)',
                  fontSize: '12px',
                  fontWeight: 600,
                  outline: 'none',
                }}
              >
                <option value="16:9">16:9 Cinematic Widescreen</option>
                <option value="9:16">9:16 Vertical Story / Reels</option>
                <option value="1:1">1:1 Square Feed Asset</option>
                <option value="4:3">4:3 Classic Broadcast</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: 'var(--text-secondary, #475569)', marginBottom: '6px' }}>
                Neural Engine Preset
              </label>
              <select
                value={modelPreset}
                onChange={(e) => setModelPreset(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border, #cbd5e1)',
                  backgroundColor: 'var(--surface-secondary, #f8fafc)',
                  color: 'var(--text-primary, #0f172a)',
                  fontSize: '12px',
                  fontWeight: 600,
                  outline: 'none',
                }}
              >
                <option value="UltraCinema v4.2">UltraCinema v4.2 (Highest Fidelity)</option>
                <option value="HyperReal v3.0">HyperReal v3.0 (Photorealistic)</option>
                <option value="Commercial Ad Express">Commercial Ad Express (Fast Turnaround)</option>
                <option value="Studio Voice X2">Studio Voice X2 (Broadcast Quality)</option>
              </select>
            </div>
          </div>

          {/* Reference File Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px dashed var(--border, #cbd5e1)',
            backgroundColor: 'var(--surface-secondary, #f8fafc)',
            fontSize: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary, #64748b)' }}>
              <UploadCloud size={18} color={activeTheme.primary} />
              <span>{referenceFile ? `Reference: ${referenceFile.name}` : 'Upload style reference audio, portrait or script'}</span>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border, #cbd5e1)',
                backgroundColor: 'var(--surface, #ffffff)',
                color: activeTheme.primary,
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Choose File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files[0]) {
                  setReferenceFile(e.target.files[0]);
                  addToast({ title: 'Reference Loaded', message: e.target.files[0].name, type: 'info' });
                }
              }}
            />
          </div>

          {/* Progress Indicator */}
          {isGenerating && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(0, 103, 66, 0.08)',
              border: '1px solid rgba(0, 103, 66, 0.25)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#006742' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Loader2 size={15} className="animate-spin" />
                  Synthesizing Neural Asset via {activeStudioObj.name}...
                </span>
                <span>{generationProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${generationProgress}%`, height: '100%', backgroundColor: '#006742', transition: 'width 0.3s ease' }} />
              </div>
            </div>
          )}

          {/* Generate Button in #006742 */}
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleGenerate}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: activeTheme.gradient,
              color: '#ffffff',
              fontSize: '13.5px',
              fontWeight: 800,
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: `0 8px 22px -4px ${activeTheme.glow}`,
              opacity: isGenerating ? 0.7 : 1,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isGenerating) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.filter = 'brightness(1.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isGenerating) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.filter = 'none';
              }
            }}
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Synthesizing Neural Asset...</span>
              </>
            ) : (
              <>
                <Wand2 size={18} />
                <span>Generate via {activeStudioObj.name}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Side: Studio Canvas Monitor & Recent Vault */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Canvas Monitor */}
          <div className="studio-surface-card" style={{
            borderRadius: '20px',
            padding: '20px',
            boxShadow: `0 4px 16px -2px ${activeTheme.glow}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text-primary, #0f172a)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Studio Canvas Monitor</span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    fontFamily: 'monospace',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: activeTheme.bgTint,
                    color: activeTheme.text,
                    border: `1px solid ${activeTheme.border}`,
                  }}>
                    4K UHD • LIVE
                  </span>
                  {generatedAsset?.isRealAi && (
                    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                      Gemini Live AI
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary, #64748b)', marginTop: '2px' }}>
                  Real-time neural synthesis & generation console
                </div>
              </div>

              {/* View Mode Toggle */}
              <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--surface-secondary, #f1f5f9)', padding: '3px', borderRadius: '10px', border: '1px solid var(--border, #e2e8f0)' }}>
                <button
                  type="button"
                  onClick={() => setMonitorTab('output')}
                  style={{
                    padding: '6px 13px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: monitorTab === 'output' ? activeTheme.gradient : 'transparent',
                    color: monitorTab === 'output' ? '#ffffff' : 'var(--text-secondary, #64748b)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  AI Output & Script
                </button>
                <button
                  type="button"
                  onClick={() => setMonitorTab('viewport')}
                  style={{
                    padding: '6px 13px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: monitorTab === 'viewport' ? activeTheme.gradient : 'transparent',
                    color: monitorTab === 'viewport' ? '#ffffff' : 'var(--text-secondary, #64748b)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Visual Canvas
                </button>
              </div>
            </div>

            {/* Content Display: AI Output Console vs Visual Viewport */}
            {monitorTab === 'output' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* ElevenLabs Real Voice Audio Player Header Bar (Shown for Voice & Audio Studios) */}
                {(activeStudioObj.category.includes('Voice') || activeStudioObj.category.includes('Audio') || activeStudio === 'realtalk' || activeStudio === 'audio-writer' || activeStudio === 'contalk') && generatedAsset?.content && (
                  <div style={{
                    backgroundColor: 'var(--surface-secondary, #f8fafc)',
                    border: '1px solid var(--border, #e2e8f0)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: activeTheme.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                      }}>
                        <Headphones size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-primary, #0f172a)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>ElevenLabs Voice Synthesizer</span>
                          <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '1px 6px', borderRadius: '4px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                            Live Audio API
                          </span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary, #64748b)' }}>
                          Convert script into natural human voice speech
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Voice selector */}
                      <select
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(e.target.value)}
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: '1px solid var(--border, #cbd5e1)',
                          backgroundColor: 'var(--surface, #ffffff)',
                          color: 'var(--text-primary, #1e293b)',
                          cursor: 'pointer',
                          outline: 'none',
                        }}
                      >
                        {ELEVEN_VOICES.map((v) => (
                          <option key={v.id} value={v.id}>{v.label}</option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={handleSynthesizeVoice}
                        disabled={isSynthesizingVoice}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 14px',
                          borderRadius: '8px',
                          fontSize: '11.5px',
                          fontWeight: 800,
                          background: activeTheme.gradient,
                          color: '#ffffff',
                          border: 'none',
                          cursor: isSynthesizingVoice ? 'not-allowed' : 'pointer',
                          opacity: isSynthesizingVoice ? 0.7 : 1,
                          boxShadow: `0 2px 8px ${activeTheme.glow}`,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {isSynthesizingVoice ? (
                          <>
                            <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
                            <span>Synthesizing...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={13} />
                            <span>{audioBlobUrl ? 'Re-Generate Voice' : 'Synthesize Voice 🎙️'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Audio Player Controls Bar (When voice audio is generated) */}
                    {audioBlobUrl && (
                      <div style={{
                        width: '100%',
                        backgroundColor: 'var(--surface, #ffffff)',
                        border: '1px solid var(--border, #cbd5e1)',
                        borderRadius: '10px',
                        padding: '8px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        marginTop: '4px',
                      }}>
                        <audio
                          ref={audioRef}
                          src={audioBlobUrl}
                          onEnded={() => setIsPlayingAudio(false)}
                          style={{ display: 'none' }}
                        />

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button
                            type="button"
                            onClick={toggleAudioPlay}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: activeTheme.gradient,
                              color: '#ffffff',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            {isPlayingAudio ? <Pause size={14} fill="#ffffff" /> : <Play size={14} fill="#ffffff" style={{ marginLeft: '2px' }} />}
                          </button>
                          <div style={{ fontSize: '11.5px', fontWeight: 800, color: activeTheme.text }}>
                            {isPlayingAudio ? 'Playing ElevenLabs Audio...' : 'Audio Ready to Play'}
                          </div>
                        </div>

                        {/* Animated Equalizer Waveform */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '18px' }}>
                          {[12, 18, 8, 22, 14, 26, 16, 10, 24, 18, 12, 20].map((h, i) => (
                            <span
                              key={i}
                              style={{
                                width: '3px',
                                height: isPlayingAudio ? `${Math.max(6, (h * (i % 2 === 0 ? 1 : 0.8)))}px` : '6px',
                                backgroundColor: isPlayingAudio ? activeTheme.primary : 'var(--border, #cbd5e1)',
                                borderRadius: '2px',
                                transition: 'height 0.2s ease',
                              }}
                            />
                          ))}
                        </div>

                        <a
                          href={audioBlobUrl}
                          download={`${generatedAsset.studio.replace(/\s+/g, '_')}_voice.mp3`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '11px',
                            fontWeight: 800,
                            color: activeTheme.text,
                            textDecoration: 'none',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: activeTheme.bgTint,
                            border: `1px solid ${activeTheme.border}`,
                          }}
                        >
                          <Download size={12} />
                          <span>MP3</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div style={{
                  width: '100%',
                  minHeight: '260px',
                  maxHeight: '420px',
                  borderRadius: '14px',
                  overflowY: 'auto',
                  backgroundColor: '#0a0f1d',
                  border: '1px solid var(--border, #1e293b)',
                  padding: '18px 20px',
                  color: '#f8fafc',
                  fontSize: '13px',
                  lineHeight: 1.65,
                  position: 'relative',
                  boxSizing: 'border-box',
                }}>
                  {generatedAsset?.content ? (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Sparkles size={16} color="#34d399" />
                          <span style={{ fontSize: '12px', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                            {generatedAsset.studio} Output
                          </span>
                        </div>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                          Synthesized {generatedAsset.date}
                        </span>
                      </div>

                      <div style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        color: '#e2e8f0',
                        fontFamily: generatedAsset.studioId === 'visual-workflow' || generatedAsset.studioId === 'logo-gen' ? 'monospace' : 'inherit',
                        fontSize: '12.5px',
                      }}>
                        {generatedAsset.content}
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', color: '#64748b', padding: '48px 16px' }}>
                      <FileText size={38} style={{ margin: '0 auto 10px', color: '#38bdf8', opacity: 0.8 }} />
                      <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#f8fafc' }}>Awaiting Directive Input</div>
                      <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '6px', maxWidth: '300px', margin: '6px auto 0' }}>
                        Enter your prompt on the left and click Generate to see live AI screenplay, lyrics, dialogue, or code here.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Visual Viewport Box */
              <div style={{
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: '14px',
                overflow: 'hidden',
                backgroundColor: '#070b14',
                border: `2px solid ${activeTheme.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                {/* Corner crosshairs */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: '12px', height: '12px', borderTop: `2px solid ${activeTheme.primary}`, borderLeft: `2px solid ${activeTheme.primary}`, zIndex: 2 }} />
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '12px', height: '12px', borderTop: `2px solid ${activeTheme.primary}`, borderRight: `2px solid ${activeTheme.primary}`, zIndex: 2 }} />
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '12px', height: '12px', borderBottom: `2px solid ${activeTheme.primary}`, borderLeft: `2px solid ${activeTheme.primary}`, zIndex: 2 }} />
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '12px', height: '12px', borderBottom: `2px solid ${activeTheme.primary}`, borderRight: `2px solid ${activeTheme.primary}`, zIndex: 2 }} />

                {generatedAsset ? (
                  <>
                    {isImageRendering && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#070b14',
                        zIndex: 4,
                        gap: '10px',
                      }}>
                        <Loader2 size={34} color={activeTheme.primary} style={{ animation: 'spin 1s linear infinite' }} />
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>
                          Rendering Neural 4K Canvas...
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                          Synthesizing photorealistic scene via FLUX engine
                        </div>
                      </div>
                    )}
                    <img
                      src={generatedAsset.url}
                      alt={generatedAsset.title}
                      onLoad={() => setIsImageRendering(false)}
                      onError={(e) => {
                        setIsImageRendering(false);
                        e.currentTarget.src = activeStudio === 'logo-gen'
                          ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'
                          : 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop&q=80';
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {generatedAsset.isFluxImage && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        zIndex: 3,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: activeTheme.gradient,
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: 800,
                        backdropFilter: 'blur(4px)',
                      }}>
                        <Sparkles size={11} color="#ffffff" />
                        <span>FLUX.1 Live Neural Render</span>
                      </div>
                    )}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                    >
                      <a
                        href={generatedAsset.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: '10px 18px',
                          borderRadius: '12px',
                          backgroundColor: '#ffffff',
                          color: '#0f172a',
                          textDecoration: 'none',
                          fontSize: '12px',
                          fontWeight: 800,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        }}
                      >
                        <ExternalLink size={14} />
                        <span>Open 4K HD Image</span>
                      </a>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', color: '#94a3b8', padding: '24px' }}>
                    <Film size={34} style={{ margin: '0 auto 8px', color: activeTheme.primary, opacity: 0.9 }} />
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>Awaiting Prompt Execution</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', maxWidth: '280px' }}>
                      Configure directives on the left to render high-fidelity neural assets.
                    </div>
                  </div>
                )}
              </div>
            )}


            {generatedAsset && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-primary, #0f172a)' }}>{generatedAsset.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary, #64748b)' }}>{generatedAsset.studio} • Just now</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {generatedAsset.content && (
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedAsset.content);
                        setCopiedText(true);
                        addToast({ title: 'Copied', message: 'AI output copied to clipboard.', type: 'info' });
                        setTimeout(() => setCopiedText(false), 2000);
                      }}
                      style={{
                        padding: '7px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border, #cbd5e1)',
                        backgroundColor: 'var(--surface, #ffffff)',
                        color: 'var(--text-primary, #334155)',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {copiedText ? <Check size={13} color={activeTheme.primary} /> : <Copy size={13} />}
                      <span>{copiedText ? 'Copied' : 'Copy Output'}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleDownload}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '8px',
                      border: `1px solid ${activeTheme.border}`,
                      backgroundColor: activeTheme.bgTint,
                      color: activeTheme.text,
                      fontSize: '11.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Download size={13} />
                    <span>
                      {monitorTab === 'viewport' || generatedAsset.type === 'Image' || generatedAsset.isFluxImage
                        ? 'Download 4K Image'
                        : 'Download Script'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recent Vault */}
          <div className="studio-surface-card" style={{
            borderRadius: '20px',
            padding: '20px',
            boxShadow: `0 4px 16px -2px ${activeTheme.glow}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--text-primary, #0f172a)' }}>
                  Recent Production Vault
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary, #64748b)' }}>
                  Saved multi-studio assets
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: activeTheme.text, fontFamily: 'monospace' }}>
                {savedLibrary.length} Items
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {savedLibrary.map((item) => {
                const isSelected = generatedAsset?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleLoadFromVault(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '9px 12px',
                      borderRadius: '10px',
                      border: isSelected ? `1.5px solid ${activeTheme.primary}` : '1px solid var(--border, #f1f5f9)',
                      backgroundColor: isSelected ? activeTheme.bgTint : 'var(--surface-secondary, #f8fafc)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'var(--surface-hover, #f1f5f9)';
                        e.currentTarget.style.borderColor = 'var(--border-strong, #cbd5e1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'var(--surface-secondary, #f8fafc)';
                        e.currentTarget.style.borderColor = 'var(--border, #f1f5f9)';
                      }
                    }}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      style={{ width: '48px', height: '36px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary, #0f172a)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-secondary, #64748b)' }}>
                        {item.studio} • {item.date}
                      </div>
                    </div>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: '4px',
                      backgroundColor: isSelected ? activeTheme.bgTint : 'rgba(128, 128, 128, 0.1)',
                      color: isSelected ? activeTheme.text : 'var(--text-secondary, #64748b)',
                      border: `1px solid ${isSelected ? activeTheme.border : 'var(--border, rgba(128,128,128,0.2))'}`,
                      textTransform: 'uppercase',
                    }}>
                      {item.type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrmAiStudio;
