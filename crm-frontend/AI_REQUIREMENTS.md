# CRM nErgy AI — AI Architecture & Requirements Specification

## 1. Overview & Objectives
**Project:** CRM nErgy AI & OAL Network  
**Target:** 100% Real-Time AI Generation directly within Frontend (Zero Backend Dependency)  
**Primary Engine:** Google Gemini AI API (`gemini-1.5-flash` / `gemini-1.5-pro`)  
**Core Goal:** Enable all CRM nErgy AI modules, Bestie AI Copilot, and 15 Content Sub-Studios to process live user prompts and synthesize intelligent, real-time responses for executive demonstrations, presentations, and active production usage.

---

## 2. Global AI System Architecture (Serverless Frontend Flow)

```
┌─────────────────────────────────────────────────────────────┐
│                    CRM nErgy AI Frontend                    │
│   (Bestie Copilot / 15 Studios / Marketing / AI Search)     │
└──────────────────────────────┬──────────────────────────────┘
                               │
               User Prompt + Studio Persona Rules
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│              Central Service Layer (geminiService.js)       │
│  - Reads API Keys from .env                                 │
│  - Injects Contextual System Instructions for each Studio   │
│  - Handles Rate Limiting, Timeouts, and Network Fallbacks   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                 Direct REST API Call (HTTPS)
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Google Gemini Cloud Core                  │
│       Models: gemini-1.5-flash (Fast) / Pro (Deep)          │
│       + Specialized Media APIs (ElevenLabs, Suno, Kling)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
              Synthesized Real-Time JSON / Markdown
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      UI Render Engine                       │
│  - Live Typing Animation                                    │
│  - Formatted Script, Dialogue & Storyboard Previews         │
│  - Toast Notifications & Error Boundaries                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. HAR AK AI STUDIO KA KAAM KYA HAI (Detailed Breakdown of All 15 Studios)

Neeche har ek AI Studio ka exact kaam, user kya input dega, aur AI kya output banayega, poori detail me diya gaya hai:

---

### 1. Bestie — My AI Agent (Copilot)
* **Category:** Copilot / Operational AI
* **Kaam Kya Hai:**
  - 24/7 Virtual Operating Partner.
  - User ke business decisions, CRM sales pipeline, deals status aur customer queries me live guide karta hai.
* **User Input:** Business questions (e.g. *"Analyze Q3 high-risk deals"* ya *"Draft a strategy for Apex negotiation"*).
* **AI Output:** Real-time strategic recommendations, key findings, risk alerts, aur next action steps.

---

### 2. AAI Muzik Hit Studio
* **Category:** Audio & Music
* **Kaam Kya Hai:**
  - Commercial background tracks, catchy jingles, video background themes aur brand anthems tayar karna.
* **User Input:** Music description ya theme (e.g. *"Energetic synthwave background music for luxury electric car launch ad"*).
* **AI Output:** Complete song lyrics, chord structure, musical tempo (BPM), instrument cues, aur audio production prompt.

---

### 3. AAI Real Talk
* **Category:** Voice & Speech
* **Kaam Kya Hai:**
  - Natural human conversational dialogues aur 2-speaker podcast discussions generate karna.
* **User Input:** Conversation topic (e.g. *"Create a 2-person podcast dialogue discussing AI in enterprise car financing"*).
* **AI Output:** Real-life natural dialogues (Speaker A & Speaker B), tone inflections, laughter/pauses annotations, aur conversational flow.

---

### 4. AI Audio Writer
* **Category:** Audio & Music Scriptwriting
* **Kaam Kya Hai:**
  - Radio ads, commercial voiceover scripts, narration scripts aur sonic brand messaging likhna.
* **User Input:** Product details & target audience (e.g. *"30-second radio commercial voiceover for fast loan approvals"*).
* **AI Output:** Timed voiceover script (0-15s hook, 15-25s value prop, 25-30s CTA) with voice tone guidelines (warm, authoritative, enthusiastic).

---

### 5. AI ConTalk
* **Category:** Voice & Speech / Sales Concierge
* **Kaam Kya Hai:**
  - Live customer handling, sales desking negotiations, aur client FAQs ke instant counter-dialogues banana.
* **User Input:** Customer objection ya query (e.g. *"Customer thinks APR interest rate is too high, how should dealer respond?"*).
* **AI Output:** Professional sales script, objection-handling techniques, alternative financing offers, aur closing pitch.

---

### 6. AI Film Maker
* **Category:** Video Production & Screenplay
* **Kaam Kya Hai:**
  - Full multi-scene cinematic movie scripts, corporate documentaries aur high-budget ad scenes likhna.
* **User Input:** Movie/Ad storyline (e.g. *"4-scene action-packed commercial for next-gen fleet logistics software"*).
* **AI Output:** Hollywood-style screenplay with Scene Headers (INT/EXT), Camera Angles (Wide, Close-up, Drone), Lighting directions, Visual actions, and Character dialogues.

---

### 7. AI Image TalkR
* **Category:** Avatar & 3D Presenter
* **Kaam Kya Hai:**
  - Static photo ya executive headshot ko bolti hui video (spokesperson) banane ke liye lip-sync dialogues aur camera directions tayar karna.
* **User Input:** Presenter identity & message (e.g. *"CEO welcoming new corporate partners with warm confident energy"*).
* **AI Output:** Exact phoneme-timed speech script, eye-contact facial cues, body gestures, aur lip-sync synchronization prompts.

---

### 8. AI Logo Generator
* **Category:** Branding & Design
* **Kaam Kya Hai:**
  - Energy, digital tech aur corporate logos ke visual design concepts aur vector specs create karna.
* **User Input:** Brand identity vision (e.g. *"Futuristic energy logo with cyan smoke aura and metallic emblem"*).
* **AI Output:** Creative design rationale, color palette hex codes, typography selections, layout geometry, aur SVG vector code specs.

---

### 9. AI Photo Life
* **Category:** Image Studio & Commercial Staging
* **Kaam Kya Hai:**
  - Normal car lot/product photography ko luxury showroom grade photo me convert karne ke staging prompts aur visual descriptions banana.
* **User Input:** Vehicle/Product info (e.g. *"2026 Porsche Taycan in neon showroom backdrop with volumetric studio lighting"*).
* **AI Output:** High-definition photography composition prompt, lens specs (85mm f/1.4), reflections, shadow details, aur background replacement prompts.

---

### 10. AI Video Crew
* **Category:** Video Production / Virtual Director
* **Kaam Kya Hai:**
  - Virtual multi-camera switching, studio lighting setup, aur director cues plan karna.
* **User Input:** Video shoot concept (e.g. *"Live keynote product demo with 3 camera setup"*).
* **AI Output:** Multi-camera switching timeline (Cam 1 Wide, Cam 2 Over-the-shoulder, Cam 3 Teleprompter), teleprompter speech, aur lighting cues.

---

### 11. AI Visual Workflow
* **Category:** Automations & Logic
* **Kaam Kya Hai:**
  - CRM aur ERP ke beech no-code automation workflows, conditional rules aur triggers create karna.
* **User Input:** Business automation requirement (e.g. *"When a car loan lead is submitted, check credit score; if >700 send Tier-1 lender, else send to BHPH"*).
* **AI Output:** Step-by-step trigger-condition-action workflow map, JSON logic rules, error fallback actions, aur CRM pipeline hooks.

---

### 12. AI VoiceX Change
* **Category:** Voice & Speech / Localization
* **Kaam Kya Hai:**
  - Business text, marketing campaigns aur sales scripts ko 40+ international languages me culturally accurate translate karna.
* **User Input:** English text + target language (e.g. *"Translate our dealer financing pitch into Spanish, French, and Japanese"*).
* **AI Output:** Accurate multilingual translations with cultural nuances, phonetic pronunciation tips, and regional localized idioms.

---

### 13. AAI BIG Movies Lab
* **Category:** Video Production & Narrative Pitch
* **Kaam Kya Hai:**
  - Long-form cinematic storytelling, brand documentaries aur high-stakes investor pitch presentations banana.
* **User Input:** Big movie or investor theme (e.g. *"10-minute documentary narrative on how AI disrupted American auto lending"*).
* **AI Output:** 3-Act narrative structure (The Problem, The Turning Point, The Future), emotional hooks, narrative voiceovers, and investor slide treatments.

---

### 14. Train AI to Speak
* **Category:** Model Training & Persona Engineering
* **Kaam Kya Hai:**
  - AI ko company ke specific brand voice, executive persona, aur compliance boundaries me bolne ke rules sikhana.
* **User Input:** Company values & tone sample (e.g. *"Train persona for Nova Drive: confident, empathetic, transparent, zero robotic jargon"*).
* **AI Output:** Comprehensive System Prompt, vocabulary whitelist/blacklist rules, response guidelines, and behavioral guardrails.

---

### 15. AI Video Agent
* **Category:** Video Production / Rapid Pipeline
* **Kaam Kya Hai:**
  - Client ka signature 4-step video creation formula: **"Say it, See it, Shape it, Ship it"**.
* **User Input:** Rough video idea (e.g. *"Make a 30-second TikTok ad explaining 100% online car financing"*).
* **AI Output:**
  - **Step 1 (Say it):** Idea clarification & core hook.
  - **Step 2 (See it):** Scene-by-scene visual storyboard (0-5s, 5-15s, 15-25s, 25-30s).
  - **Step 3 (Shape it):** Refinement points & captions.
  - **Step 4 (Ship it):** Final production brief ready for distribution.

---

## 4. DEDICATED AI MODULES KA KAAM KYA HAI

### A. Bestie AI Copilot (`/crm/bestie`)
- **Kaam:** Enterprise-grade intelligent chat hub.
- **Features:** 
  - Cross-checks live CRM records and pipeline deals.
  - Generates interactive Action Chips (*"Analyze Deals"*, *"ERP Audit"*, *"HR Screening"*).
  - Maintains conversation context history.

### B. AI Marketing Hub (`/crm/ai-marketing`)
- **Kaam:** Marketing department ka automation brain.
- **Features:**
  - Google Search Ads (Headlines + Descriptions).
  - Facebook/Instagram Ad creatives with emojis & hooks.
  - Email sequences (Cold outreach, Nurture drip, Re-engagement).
  - Tone switcher (Professional, Direct, Energetic, Executive).

### C. Internal AI Search (`/crm/search`)
- **Kaam:** AI-powered unified search bar for company knowledge.
- **Features:**
  - User can ask natural language questions (e.g. *"What is the commission policy for dealer sub-tiers?"*).
  - AI synthesizes an answer directly citing internal policy chapters instead of just showing keyword links.

---

## 5. REAL PRODUCTION-GRADE KE LIYE KON-KON SI API KEY LAGEGI

Real Production Grade par har tool ko complete end-to-end functional banane ke liye **2 layers of API Keys** hoti hain:

1. **Layer 1: Primary Intelligence Engine (Mandatory - All 15 Tools)**
   - **Google Gemini API Key:** Saare 15 tools ke text, reasoning, prompts, scripts, translations, aur logic ke liye.
   - Env Variable: `VITE_GEMINI_API_KEY`
   - Platform: [Google AI Studio](https://aistudio.google.com/) (Free Tier available, Pay-as-you-go for Production)

2. **Layer 2: Production Media Synthesis Keys (For Final MP3/MP4/Image Files)**

Neeche har studio ke liye exact **Production-Grade API Keys & Platforms** ki complete matrix di gayi hai:

| # | Studio Name | Primary Intelligence Key | Production Media Render Key | Platform & Signup URL | Pricing Type |
|---|---|---|---|---|---|
| 1 | **Bestie AI Copilot** | `VITE_GEMINI_API_KEY` | None needed (Gemini handles 100%) | [Google AI Studio](https://aistudio.google.com/) | Free / Pay-per-token |
| 2 | **AAI Muzik Hit Studio** | `VITE_GEMINI_API_KEY` | `VITE_SUNO_API_KEY` | [Suno AI](https://suno.com/) | Monthly Plan ($10-$30/mo) |
| 3 | **AAI Real Talk** | `VITE_GEMINI_API_KEY` | `VITE_ELEVENLABS_API_KEY` | [ElevenLabs](https://elevenlabs.io/) | Free Tier (10k chars) / Paid |
| 4 | **AI Audio Writer** | `VITE_GEMINI_API_KEY` | `VITE_ELEVENLABS_API_KEY` | [ElevenLabs](https://elevenlabs.io/) | Free Tier / Paid |
| 5 | **AI ConTalk** | `VITE_GEMINI_API_KEY` | `VITE_OPENAI_API_KEY` (Optional Whisper) | [OpenAI Platform](https://platform.openai.com/) | Pay-as-you-go |
| 6 | **AI Film Maker** | `VITE_GEMINI_API_KEY` | `VITE_RUNWAY_API_KEY` ya `VITE_KLING_API_KEY` | [RunwayML](https://runwayml.com/) / [Kling AI](https://klingai.com/) | Paid per video second |
| 7 | **AI Image TalkR** | `VITE_GEMINI_API_KEY` | `VITE_HEYGEN_API_KEY` ya `VITE_DID_API_KEY` | [HeyGen](https://www.heygen.com/) / [D-ID](https://www.d-id.com/) | Paid per minute credit |
| 8 | **AI Logo Generator** | `VITE_GEMINI_API_KEY` | `VITE_OPENAI_API_KEY` (DALL-E 3) | [OpenAI DALL-E 3](https://platform.openai.com/) | $0.04 per image |
| 9 | **AI Photo Life** | `VITE_GEMINI_API_KEY` | `VITE_STABILITY_API_KEY` | [Stability AI](https://platform.stability.ai/) | Pay-per-credit |
| 10 | **AI Video Crew** | `VITE_GEMINI_API_KEY` | `VITE_RUNWAY_API_KEY` | [RunwayML](https://runwayml.com/) | Paid per video second |
| 11 | **AI Visual Workflow** | `VITE_GEMINI_API_KEY` | None needed (Gemini handles 100%) | [Google AI Studio](https://aistudio.google.com/) | Free / Pay-per-token |
| 12 | **AI VoiceX Change** | `VITE_GEMINI_API_KEY` | `VITE_PALABRA_API_KEY` | [Palabra.ai](https://www.palabra.ai/) | API subscription |
| 13 | **AAI BIG Movies Lab** | `VITE_GEMINI_API_KEY` | `VITE_RUNWAY_API_KEY` | [RunwayML](https://runwayml.com/) | Paid |
| 14 | **Train AI to Speak** | `VITE_GEMINI_API_KEY` | `VITE_ELEVENLABS_API_KEY` (Voice Clone) | [ElevenLabs Voice Cloning](https://elevenlabs.io/) | Paid Plan |
| 15 | **AI Video Agent** | `VITE_GEMINI_API_KEY` | `VITE_PEXO_API_KEY` ya `VITE_KLING_API_KEY` | [Pexo.ai](https://pexo.ai/) / [Kling](https://klingai.com/) | Paid API |
| 16 | **AI Marketing Hub** | `VITE_GEMINI_API_KEY` | None needed (Gemini handles 100%) | [Google AI Studio](https://aistudio.google.com/) | Free / Pay-per-token |
| 17 | **Internal AI Search** | `VITE_GEMINI_API_KEY` | None needed (Gemini handles 100%) | [Google AI Studio](https://aistudio.google.com/) | Free / Pay-per-token |

---

## 6. Complete Production `.env` Template

Aapke project ke `.env` file me production ke waqt ye keys set hoti hain:

```env
# ==============================================================================
# 1. PRIMARY AI INTELLIGENCE & LOGIC ENGINE (Mandatory for all 15 studios)
# ==============================================================================
VITE_GEMINI_API_KEY=AIzaSy...your_gemini_api_key_here
VITE_GEMINI_MODEL=gemini-1.5-flash

# ==============================================================================
# 2. VOICE & SPEECH SYNTHESIS (Real Talk, Audio Writer, Voice Cloning)
# ==============================================================================
VITE_ELEVENLABS_API_KEY=sk_...your_elevenlabs_api_key_here
VITE_PALABRA_API_KEY=your_palabra_voice_key_here

# ==============================================================================
# 3. AI MUSIC & AUDIO GENERATION (AAI Muzik Hit Studio)
# ==============================================================================
VITE_SUNO_API_KEY=your_suno_ai_key_here

# ==============================================================================
# 4. AI IMAGE & LOGO SYNTHESIS (AI Logo Generator, AI Photo Life)
# ==============================================================================
VITE_OPENAI_API_KEY=sk-proj-...your_openai_api_key_here
VITE_STABILITY_API_KEY=sk-...your_stability_api_key_here

# ==============================================================================
# 5. AI VIDEO PRODUCTION & TALKING AVATAR (Film Maker, Video Agent, Image TalkR)
# ==============================================================================
VITE_RUNWAY_API_KEY=key_...your_runway_api_key_here
VITE_KLING_API_KEY=your_kling_ai_key_here
VITE_HEYGEN_API_KEY=your_heygen_key_here
VITE_PEXO_API_KEY=your_pexo_key_here
```

---

## 7. Quality Assurance & Verification Criteria

1. **Zero Mock Fallback:** When a valid API key is present, all responses MUST be generated dynamically from Gemini; no hardcoded static strings.
2. **Latency & UX:** Responses should begin streaming or return within 1.5 - 3.5 seconds.
3. **Graceful Error Handling:** If the API key is missing or quota is exhausted, the UI MUST display a clear user-friendly toast message rather than throwing an unhandled runtime error.
4. **State Preservation:** Generated assets in AI Studio must append to the user's session history library with accurate timestamps and studio tags.
