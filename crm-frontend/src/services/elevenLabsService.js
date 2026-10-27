/**
 * CRM nErgy AI — Voice Synthesis Service (ElevenLabs + Keyless Web Speech API)
 * Direct client-side speech generation for RealTalk, Audio Writer, ConTalk & Bestie
 */

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';

export const ELEVEN_VOICES = [
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', label: 'Rachel (Executive Female)', gender: 'female' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', label: 'Adam (Authoritative Male Closer)', gender: 'male' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', label: 'Charlie (Conversational Dynamic)', gender: 'male' },
];

/**
 * Smart extractor to pull out spoken dialogue from screenplay/scripts
 * Removes stage directions, [0:00-0:05], (SOUND OF...), and Markdown tags
 */
export function extractSpokenDialogue(rawScript) {
  if (!rawScript) return '';

  let clean = rawScript
    // Remove parenthesized directions e.g. (SOUND of subtle data processing...)
    .replace(/\([^)]*\)/g, '')
    // Remove timestamps like [0:00 - 0:05] or [pause]
    .replace(/\[[^\]]*\]/g, '')
    // Remove metadata headers like **Studio Mode:** or **Customer says:**
    .replace(/\*\*[^*]+\*\*/g, '')
    // Remove markdown symbols
    .replace(/[#*`_>~]/g, '')
    // Replace multiple spaces and newlines
    .replace(/\s+/g, ' ')
    .trim();

  // Limit character length to 500 chars for optimal audio flow
  if (clean.length > 500) {
    clean = clean.slice(0, 500) + '...';
  }

  return clean;
}

/**
 * Stop any ongoing speech in the browser
 */
export function stopBrowserSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Play speech using the browser's native speech synthesis engine
 */
export function playWithWebSpeech(spokenText, voiceId = '21m00Tcm4TlvDq8ikWAM', onEnd = () => {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    throw new Error('Speech synthesis is not supported on this browser.');
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(spokenText);
  utterance.rate = 1.0;
  utterance.pitch = voiceId === 'pNInz6obpgDQGcFmaJgB' ? 0.9 : 1.05;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    const isMale = voiceId === 'pNInz6obpgDQGcFmaJgB';
    const matchedVoice = voices.find(v =>
      isMale
        ? (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('george'))
        : (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha'))
    ) || voices[0];

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }
  }

  utterance.onend = () => {
    onEnd();
  };

  utterance.onerror = (e) => {
    console.warn('[SpeechSynthesis Error]:', e);
    onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

/**
 * Call Voice Synthesis (ElevenLabs if key configured, otherwise Native Web Speech)
 * @param {string} text Spoken dialogue text
 * @param {string} voiceId ElevenLabs voice ID
 * @param {Function} onFinish Optional callback when speech ends
 * @returns {Promise<{ isNative: boolean, url?: string }>} Audio source or native confirmation
 */
export async function generateElevenLabsSpeech(text, voiceId = '21m00Tcm4TlvDq8ikWAM', onFinish = () => {}) {
  const apiKey = ELEVENLABS_API_KEY;
  const spokenText = extractSpokenDialogue(text);

  if (!spokenText || spokenText.length < 3) {
    throw new Error('No spoken dialogue found in the text to synthesize.');
  }

  // 1. If ElevenLabs API Key is provided, call ElevenLabs REST API
  if (apiKey && apiKey !== 'your_elevenlabs_api_key_here') {
    try {
      const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: spokenText,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.55,
            similarity_boost: 0.8,
            style: 0.15,
            use_speaker_boost: true,
          },
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        return {
          isNative: false,
          url: URL.createObjectURL(audioBlob),
        };
      }
    } catch (err) {
      console.warn('[ElevenLabs API]: Error, switching to Keyless Native Speech Engine...', err.message);
    }
  }

  // 2. Keyless Native Web Speech Fallback
  playWithWebSpeech(spokenText, voiceId, onFinish);
  return {
    isNative: true,
    spokenText,
  };
}

