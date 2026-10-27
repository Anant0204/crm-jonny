# CRM nErgy AI & ZUNME AI SuperHouse — Master Architecture & Documentation

> **Platform:** CRM nErgy AI Enterprise + ZUNME AI Content Warehouse  
> **Status:** Production-Ready Frontend Architecture (Vite + React 18 SPA)  
> **Target Engine:** Google Gemini Cloud Core (`gemini-1.5-flash` / `gemini-1.5-pro`) & ElevenLabs Neural Voice  
> **Repository:** `d:\Kiaan\OAL-Loan-Marketplace\crm-nergy-ai`

---

## 1. Executive Platform Overview

**CRM nErgy AI** is an all-in-one Enterprise Operations, Commercial CRM, Automotive DMS, and AI Content SuperHouse platform designed for modern enterprises, high-velocity sales organizations, automotive dealerships, and content creation powerhouses.

Integrated within this workspace is **ZUNME (AI Platform for Content)** — an expansive 1,000+ template library and AI Warehouse enabling creators, influencers, marketers, and business owners to build, optimize, monetize, and scale digital media, SEO, and enterprise sales assets at lightning speed.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       UNIFIED GATEWAY & PERSONA ENGINE                                  │
│                                    (/login · /crm/login · /oal/login)                                   │
└────────────────────────────────────────────────────┬────────────────────────────────────────────────────┘
                                                     │
         ┌───────────────────────────────────────────┼──────────────────────────────────────────┐
         ▼                                           ▼                                          ▼
┌──────────────────────────────┐        ┌──────────────────────────────┐       ┌──────────────────────────────┐
│        CRM nErgy AI          │        │        OMP Deals Hub         │       │         OAL Network          │
│     Enterprise Operations    │        │    Automotive Desking & DMS  │       │     Loan & Debt Marketplace  │
└──────────────┬───────────────┘        └──────────────┬───────────────┘       └──────────────┬───────────────┘
               │                                       │                                      │
  • Contacts & Lead Engine                • VIN Scanner & Market Pricing         • Borrower KYC & Risk Rating
  • 8-Stage Sales Pipeline                • Deal Desking & Lender Exchange       • Lender Term Sheets & Bidding
  • ERP, Supply Chain & POs               • Paperless Auto E-Sign                • Broker / Representative Desk
  • HR Talent & Support Tickets           • Buy-Here-Pay-Here (BHPH) Suite       • Master Platform Audit
               │                                       │                                      │
               └───────────────────────────────────────┼──────────────────────────────────────┘
                                                       │
                                                       ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                     ZUNME — AI PLATFORM FOR CONTENT                                     │
│                                      Content Creation & Monetization                                    │
├───────────────────────────────────┬──────────────────────────────────┬──────────────────────────────────┤
│        AI CONTENT BUILDERS        │       AI CONTENT WAREHOUSE       │        AI SEO MARKETING          │
│ • Artistry & Creator Earnings     │ • Enormous Stock Asset Library   │ • Keyword Research & Ranking     │
│ • Monetization by Niche/Industry  │ • 2D/3D, Images, Avatars, Video  │ • Technical SEO & Competitors    │
└───────────────────────────────────┴──────────────────────────────────┴──────────────────────────────────┘
                                                       │
                                                       ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                  CENTRAL AI CORE (geminiService.js)                                     │
│                 Google Gemini 1.5 Flash / Pro REST API + ElevenLabs Neural Audio Relay                   │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Complete End-to-End System Flow (Pura Flow)

### Step 1: Gateway Authentication & Persona Switching
1. The user visits `/login` (or `/crm/login`).
2. The **Unified Gateway** provides 12 pre-configured enterprise personas with instant one-click switching.
3. Upon login, the **Role-Based Access Control (RBAC)** engine checks the role's allowed routes and mounts the custom sidebar navigation.

### Step 2: Inbound Leads & Lead Capture
1. Commercial leads enter the system at `/crm/leads`.
2. Leads are scored (0–100) based on company valuation, budget, and engagement.
3. From the Leads Directory, qualified leads can be referred directly to the **OAL Network** for corporate debt financing.

### Step 3: Contacts & Account Management
1. In `/crm/contacts`, customer accounts are maintained with enterprise-grade multi-tenant isolation.
2. Users can create, edit, filter, search, sort, and bulk-delete contacts with local persistence.
3. In `/crm/contacts/:id`, deep profile tabs provide historical notes, associated deals, communication logs, and account health telemetry.

### Step 4: 8-Stage Visual Sales Pipeline
1. Deals are managed in `/crm/pipeline` across 8 defined stages:
   `New Lead` ➔ `Contacted` ➔ `Qualified` ➔ `Opportunity` ➔ `Proposal` ➔ `Negotiation` ➔ `Won` / `Lost`.
2. Sales executives advance or regress deals through pipeline stages using directional quick controls.
3. Total pipeline value and probability-weighted revenues are calculated in real time.

### Step 5: Enterprise ERP, HR & Support Orchestration
1. **ERP & Operations (`/crm/erp/*`):** Procurement purchase orders, supply chain inventory, and manufacturing workflows.
2. **HR & Talent (`/crm/hr/*`):** Job openings, candidate screening pipelines, and employee directories.
3. **Customer Support (`/crm/support/*`):** Omnichannel ticket resolution, knowledge articles, and live support routing.

### Step 6: ZUNME AI Content Generation & Bestie Copilot
1. Users invoke **Bestie AI Copilot** (`/crm/bestie`) for operational voice/chat guidance, deal risk audits, and automated CRM actions.
2. In **AI Content Studio** (`/crm/ai-studio`) and the **ZUNME Content Warehouse**, creators leverage 1,000+ specialized templates powered by Google Gemini and ElevenLabs to generate music, scripts, marketing campaigns, and video assets.

---

## 3. User Roles & Responsibilities Breakdown (Kiska Kya Kaam Hai?)

CRM nErgy AI incorporates **12 dedicated enterprise personas**. Below is the exact operational responsibility, permission scope, and daily workflow for each role:

| # | User Role | Persona & Email | Core Responsibility (Kaam Kya Hai?) | Default Route | Key Allowed Modules |
|---|---|---|---|---|---|
| **1** | **Business Owners / Executive** | Alexander Wright<br>`a.wright@nergy.io` | **Master Corporate Command:** Oversees global revenue, executive decisions, deals pipeline, company settings, and autonomous AI agents. Full authority across all modules. | `/crm/dashboard` | Dashboard, Contacts, Leads, Pipeline, Tasks, ERP, AI SuperHouse, HR, Support, Admin, Settings |
| **2** | **Content Creators** | Leo Fontaine<br>`l.fontaine@nergy.io` | **Multimedia Production:** Generates video ads, cinematic footage, brand soundtracks, and promotional reels using ZUNME AI Studio and AI Video Agent. | `/crm/ai-studio` | Dashboard, Bestie AI, AI Studio, AI Video, My Fav Apps, Tasks, Knowledge Base |
| **3** | **Influencers & Brand Ambassadors** | Chloe Rivera<br>`c.rivera@nergy.io` | **Viral Growth & Audience Reach:** Tracks campaign impressions, referral conversions, social audience engagement, and affiliate lead capture. | `/crm/leads` | Dashboard, Leads, Marketing Hub, AI Studio, Bestie AI, Tasks, Communication |
| **4** | **AI Marketing Pros** | Tanya Sterling<br>`t.sterling@nergy.io` | **Autonomous Campaigns & Ad Copy:** Builds multi-channel marketing campaigns, generates ad headlines, conducts SEO keyword audits, and optimizes conversion funnels. | `/crm/marketing` | Dashboard, Marketing Hub, Leads, AI Studio, Bestie AI, Tasks, Analytics |
| **5** | **Operations & Sales Admin I** | Sarah Jenkins<br>`s.jenkins@nergy.io` | **Sales Floor Execution:** Manages commercial reps, leads qualification, contact directories, and customer outreach scheduling. | `/crm/contacts` | Dashboard, Contacts, Leads, Pipeline, Tasks, Communication, Support, Settings |
| **6** | **CRM Pros / Pipeline Specialists** | Marcus Vance<br>`m.vance@nergy.io` | **Deal Pipeline Acceleration:** Drives deals through the 8 pipeline stages, analyzes closing probabilities, drafts quotes, and prevents contract stagnation. | `/crm/pipeline` | Dashboard, Pipeline, Contacts, Leads, Tasks, Communication, Bestie AI |
| **7** | **Client & Customer Portal** | Dr. Aris Thorne<br>`a.thorne@biogenix.org` | **Customer Self-Service:** Reviews active enterprise contracts, submits support tickets, tracks SLA status, and reads documentation. | `/crm/contacts` | Dashboard, Contacts, Support Desk, Knowledge Base, Tasks, Settings |
| **8** | **Campaign & Content Builders** | Maya Lin<br>`m.lin@nergy.io` | **Asset Synthesis & Copywriting:** Uses ZUNME templates to write blog articles, email drips, social media carousels, and product descriptions. | `/crm/marketing` | Dashboard, Marketing Hub, AI Studio, Bestie AI, My Fav Apps, Tasks |
| **9** | **Affiliate Deal Partners** | Julian Vance<br>`j.vance@nergypartners.net` | **Channel Partnerships:** Introduces institutional client leads, monitors commission term sheets, and tracks partner pipeline deals. | `/crm/pipeline` | Dashboard, Pipeline, Leads, Tasks, Communication, Settings |
| **10** | **Human Resources Director** | Elena Rostova<br>`e.rostova@nergy.io` | **Talent Acquisition & Employee Ops:** Posts job openings, screens candidate resumes with AI, schedules interviews, and manages company staff. | `/crm/hr` | Dashboard, HR & Recruiting, Tasks, Contacts, Knowledge Base, Settings |
| **11** | **Finance & Compliance Admin II** | David Chen<br>`d.chen@nergy.io` | **Fiscal Audit & Governance:** Reviews MRR reports, capital allocations, procurement billing invoices, SOC-2 audit logs, and contract covenants. | `/crm/admin` | Dashboard, ERP Finance, Reports Hub, Admin, E-Box, Settings |
| **12** | **Master Super Administrator** | Root Sovereign Admin<br>`root.superadmin@nergy.io` | **Global System Governance:** Configures tenant encryption vaults, API bridges, team permissions, security policies, and platform audit feeds. | `/crm/admin` | Unrestricted Access to All System Modules & Admin E-Box |

---

## 4. SOFTWARE — ZUNME (AI Platform for Content & Warehouse)

**ZUNME** is the integrated creative, monetization, and SEO engine inside CRM nErgy AI. It empowers creators, marketing agencies, and business owners to build content rapidly using pre-built AI workflows.

### The 3 Core Pillars of ZUNME

#### 1. AI Content Builders (Content Creation & Monetization)
* **Objective:** Enable creators and professionals to get paid for artistry and creativity.
* **Mechanism:** Free sign-up where users build customized digital assets, scripts, art, and marketing collateral for clients and earn payouts.
* **Taxonomy:** Organized **by Category**, **by Industry**, and **by Niche**.

#### 2. AI Content Warehouse (AI Powered Digital Content)
* **Objective:** Serve as an enormous repository of pre-generated and on-demand digital media.
* **Assets Stored:** Stock images, 2D/3D illustrations, executive avatars, promo videos, game sprite sheets, and digital branding assets.
* **Target Audience:** Content Creators, Influencers, Marketers, Business Owners, and Brand Managers.

#### 3. AI SEO Marketing (Search Engine Optimization)
* **Objective:** Help brands dominate organic search rankings through AI-driven keyword intelligence and technical audits.
* **Capabilities:**
  - **Keyword Research:** High-volume, low-competition commercial keywords.
  - **Content Creation:** Fact-checked, humanized, long-form SEO articles.
  - **Technical Optimization:** Meta descriptions, structured schema, alt tags, and page speed heuristics.
  - **Competitor Analysis:** Gap detection and domain authority benchmarking.
  - **Performance Tracking:** SERP monitoring and conversion attribution.

---

## 5. ZUNME 1,000+ Pre-Built Templates Library Directory

The ZUNME platform houses over 1,000 pre-engineered prompt workflows classified into **18 distinct operational categories**:

### Category 1: Audio & Music
1. **Active to Passive Voice Converter:** Convert text instantly from active voice to passive or vice versa.
2. **AI Music Generator:** Create complete original songs with lyrics or commercial instrumental backing tracks.
3. **AI Song Generator:** Generate rhyming lyrics and song structure using generative AI.
4. **AI Sound Effects:** Generate custom sound design and foley effects for audio/video production.
5. **Album Title Generator:** Generate catchy and evocative album and EP titles.
6. **Author Bio Generator:** Craft professional biographies for authors and creative writers.
7. **Band Name Generator:** Generate unique, memorable band and musical act names.
8. **Song Idea Generator:** Overcome creative block with song concepts, themes, and hooks.
9. **Song Lyrics Generator:** Generate verse, pre-chorus, chorus, and bridge lyrical progressions.
10. **Diss Track Generator:** Create witty, punchy, and hard-hitting rap battle lyrics.
11. **Musician Bio Generator:** Professional press-kit bios for solo artists and bands.
12. **Rap Lyrics Generator:** Rhyme-scheme structured hip-hop and rap verses.
13. **Hook Generator:** High-retention lyrical and auditory opening hooks.
14. **DJ Name Generator:** Stage names for electronic music producers and club DJs.

### Category 2: Branding
1. **About Me Generator:** High-converting personal bio for portfolios and client pitches.
2. **About Us Page Generator:** Comprehensive company story and capability overview for websites.
3. **Artist Statement Generator:** Professional statements for gallery exhibitions, grants, and residencies.
4. **Professional Bio Generator:** Formal executive and consultant third-person biographies.
5. **AIDA Framework:** Attention, Interest, Desire, Action commercial copy synthesizer.
6. **Business Name Generator:** Creative, trademark-friendly enterprise business titles.
7. **Call to Action (CTA) Generator:** High-conversion button copy and closing triggers.
8. **Catchy Tagline:** Memorable corporate slogans and product taglines.
9. **Company Bio Generator:** Concise brand overview for press kits and directories.
10. **Company Mission Statement Generator:** Purpose-driven mission statements.
11. **Company Vision Statement Generator:** Forward-looking vision narratives.
12. **Core Value Generator:** Principles and behavioral standards for organizational culture.
13. **Executive Summary Generator:** High-impact business overview for investors.
14. **Idea Generator:** Lateral-thinking creative brainstorms for campaigns.
15. **Logo Creator:** AI prompts and SVG vector generation concepts with energy aura effects.
16. **Motto Generator:** Short, memorable identity mottos.
17. **Personal Statement Generator:** Academic, fellowship, and grant application statements.
18. **Rhyme Generator:** Multi-syllable rhyme dictionary for copywriting.
19. **Ship Name Generator:** Couple and fandom portmanteau naming.
20. **Slogan Generator:** Brand advertising slogans for TV and print.
21. **Team Name Generator:** Memorable names for corporate divisions and hackathons.

### Category 3: Business
1. **Startup Ideas:** Market-validated startup propositions.
2. **Acceptance Criteria Generator:** Agile user story pass/fail criteria.
3. **Action Items Generator:** Meeting transcript synthesis into assigned task lists.
4. **AI Headshot Generator:** Prompts for photorealistic corporate portraits.
5. **AI Text-to-Speech:** Multi-language voice narration (30+ languages).
6. **Bullet Points Generator:** Key takeaway extraction from dense documents.
7. **Bullet Points to Paragraph Converter:** Expands concise bullet notes into formal prose.
8. **Business Description Generator:** Corporate profile descriptions.
9. **Business Memo Generator:** Formal internal executive memorandums.
10. **Business Plan Generator:** Financial projections, market analysis, and operational plans.
11. **Business Proposal Generator:** Commercial client bid documents.
12. **AI Documentation Generator:** System architecture and user manuals.
13. **Cease and Desist Letter Generator:** Formal legal notices to halt infringement.
14. **Company Profile Generator:** Multi-page enterprise capability decks.
15. **Demand Letter Generator:** Structured pre-litigation settlement requests.
16. **Google Sheets & Excel Formula Generator:** Regex, complex VLOOKUP/INDEX-MATCH, and macros.
17. **Grant Proposal Generator:** Non-profit and research grant applications.
18. **Legal Memo Generator:** Structured issue-rule-analysis-conclusion (IRAC) briefs.
19. **Legalese Translator:** Plain-English translations of complex contracts.
20. **Letter of Request Generator:** Formal corporate petition letters.
21. **LinkedIn Bio Generator:** Profile summary optimized for B2B networking.
22. **LinkedIn Carousel Generator:** Slide-by-slide educational carousel builder.
23. **LinkedIn Connection Request Message Generator:** High-acceptance outreach notes.
24. **LinkedIn Headline Generator:** Keyword-optimized professional headlines.
25. **LinkedIn Post Generator:** Engaging organic thought-leadership posts.
26. **LinkedIn Recommendation Generator:** Endorsement copy for colleagues.
27. **Meeting Invite Generator:** Agendas and scheduling text for Zoom/Meet.
28. **Meeting Minutes Generator:** Clean chronological meeting records.
29. **My Bestie - AI Agent:** Interactive natural conversational partner.
30. **Passion Project Generator:** Novel creative endeavor blueprints.
31. **PDF Summarizer:** Executive briefs from technical PDF uploads.
32. **Project Timeline Generator:** Milestone calendars and Gantt projections.
33. **Real Estate Listing Description Generator:** High-converting property sales copy.
34. **Text Simplifier:** Jargon reduction for clarity and accessibility.

### Category 4: Content Creation & Creative Writing
1. **Acronym Generator:** Meaningful backronyms and project codes.
2. **AI Scrambler:** Natural syntax variation for original phrasing.
3. **AI Story Generator:** Multi-chapter fiction and screenplay outlines.
4. **AI Text Generator:** General purpose generative writing assistant.
5. **Ask AI Writer:** Flexible open-ended writing synthesizer.
6. **Before-After-Bridge Framework:** Persuasive problem/transformation copy.
7. **Blog Post Conclusion:** Memorable wrap-ups with strong next steps.
8. **Blog Post Intro:** Hook-driven introductory hooks.
9. **Blog Post Outline:** Structured H2/H3 header roadmaps.
10. **Blog Post Title:** High-CTR search-optimized headlines.
11. **Book Outline Generator:** Chapter-by-chapter non-fiction or novel structures.
12. **Book Summarizer:** Core thesis extraction from published books.
13. **Book Title Generator:** Commercial market-tested book titles.
14. **Chapter Generator:** Complete narrative scene drafting.
15. **Content Continuer:** Seamless prose extension from existing text.
16. **Content Idea Generator:** High-volume editorial calendar brainstorming.
17. **Conversation Starter Generator:** Icebreakers for networking and live shows.
18. **Custom Generator:** Prompt-engineered open templates.
19. **Content Summarizer:** Rapid distillation of long-form text.
20. **Dialogue Generator:** Realistic, voice-differentiated multi-character dialogue.
21. **Explain Like I'm Five (ELI5):** Complex scientific and legal concepts simplified.
22. **Ghostwriter:** Tone-matched executive article writing.
23. **Grammar Corrector:** Syntax, punctuation, and clarity refinement.
24. **Headline Analyzer:** Click-through and emotional value scoring.
25. **Humanize AI Text To Bypass AI Detection:** Natural cadence variations avoiding repetitive patterns.
26. **Industry Content Creation:** Vertical-specific compliance copy.
27. **Instant Blog Post Generator (V1, V2, V3):** Long-form factual articles with integrated image concepts.
28. **Letter Generator:** Formal, complaint, and personal correspondence.
29. **Manuscript Writer:** Long-form book writing assistant.
30. **Merge Texts:** Cohesive synthesis of disparate source materials.
31. **Metaphor Creator:** Creative analogies for rhetoric.
32. **Monologue Generator:** Dramatic and comedic solo acting auditions.
33. **News Article Generator:** AP-style factual news dispatches.
34. **Paraphrasing Tool:** Multi-tone rephrasing engine.
35. **Paragraph Expander:** Adding contextual depth to short thoughts.
36. **Paragraph Rewriter:** Polishing sentences for maximum impact.
37. **PAS Framework:** Problem-Agitate-Solution marketing copy.
38. **Reflection Writer:** Thoughtful introspective and self-evaluative essays.
39. **Romance Story Generator:** Emotion-driven relationship fiction.
40. **SCQA Framework:** Situation, Complication, Question, Answer business storytelling.
41. **Sentence Expander & Finisher:** Completing unfinished thoughts smoothly.
42. **Synopsis Generator:** Film, television, and novel pitch summaries.
43. **Singlish & Spanish Universal Translators:** Culturally nuanced dialect translations.
44. **Word Count & Tone Analyzer:** Metrics and emotional temperature of text.
45. **Write like Shakespeare / Write like Native Speaker:** Stylistic voice transformations.

### Category 5: Email, Messages & Texts
1. **Backlink Outreach Email:** Collaborative pitches for SEO link-building.
2. **Email Response Generator:** Rapid replies to client inquiries.
3. **Brainstorming Tool:** Creative ideation for communication strategies.
4. **Cold Email Generator:** High-response outbound B2B sales emails.
5. **Email Rewriter:** Polishing rough email drafts into executive notes.
6. **Email Subject Line Generator:** Spam-filter safe, high-open subject lines.
7. **Event Invitation Email:** Engaging invites boosting attendance.
8. **Event Reminder Email Generator:** Time-sensitive pre-event nudges.
9. **Follow Up Email Generator:** Non-intrusive deal-closing follow-ups.
10. **Text Message Generator:** Concise SMS transactional and promotional texts.
11. **Waitlist Email Generator:** Nurturing interest before product launch.

### Category 6: Entertainment & Social Media
1. **AI Joke & Pun Generators:** Humorous one-liners and dad jokes.
2. **AI Interior Design Generator:** Conceptual room renovation ideas.
3. **AI Note Taker & Transcription:** Speech-to-text summaries with timestamps.
4. **AI Roasting Tool:** Playful, witty roasts for entertainment.
5. **AI Sprite Generator:** 2D character animation coordinate cues.
6. **Content Calendar Generator:** Weekly multi-platform social schedules.
7. **Facebook Post Generator:** High-engagement community group updates.
8. **Instagram Bio & Hashtag Generator:** Profile discovery tools.
9. **Instagram Carousel & Reel Captions:** Slide copy, hooks, and call-to-actions.
10. **Pinterest Hashtag Generator:** Search-friendly pins metadata.
11. **Podcast Name, Episode Title & Description Generator:** Complete podcast launch kit.
12. **Podcast Script & Show Notes:** Structured timestamped audio episodes.
13. **Reel Script Generator:** Fast-paced TikTok and Instagram scripts.
14. **Twitter/X Bio, Post, Reply & Thread Generators:** Viral thought leadership threads.

### Category 7: Human Resources (HR)
1. **Career Path Generator:** Skills-to-promotion roadmap planning.
2. **Character & Reference Letters:** Verifiable candidate testimonials.
3. **Complaint & Resignation Letters:** Professional workplace dispute documentation.
4. **Cover Letter Generator:** Role-targeted, ATS-friendly job applications.
5. **Employee Growth & Performance Improvement Plans (PIP):** Structured KPI development.
6. **Employee Recognition Letter:** Morale-boosting corporate awards.
7. **Event & Team Building Activity Planner:** Morale-building group workshops.
8. **Interview Questions, Answers & Feedback Generators:** Comprehensive hiring interview kits.
9. **Job Description, Responsibilities & Qualifications Generators:** Standardized hiring specifications.
10. **Job Offer Letter Generator:** Formal legal compensation agreements.
11. **Resume Bullet Points, Objective, Skills & Summary Generators:** Complete resume overhaul.
12. **SOP Generator:** Standard Operating Procedures documentation.
13. **Staff Schedule Generator:** Shift scheduling matrices.

### Category 8: Images & Videos
1. **AI Art & Photo Prompts:** Detailed parameters for Stable Diffusion and Midjourney.
2. **Awards & Certificates Generator:** Printable company honors.
3. **Character Description & Backstory Generator:** Narrative character bibles.
4. **Free AI Image Upscaler:** Super-resolution image asset optimization.
5. **Logo Creator:** Vector visual identity concepts.
6. **Story Plot & Fanfiction Maker:** Creative fiction scene structuring.
7. **TikTok & YouTube Video Ideas, Titles & Descriptions:** Complete video SEO metadata.
8. **Video Script Outline:** Scene-by-scene audio/video (A/V) two-column scripts.
9. **YouTube Video to Article Generator:** Transcribing video lectures into publication-ready articles.

### Category 9: Marketing
1. **Advertisement Copy Generator:** Multi-platform paid social and display ads.
2. **Clickbait Title Generator:** Pattern-interrupting curiosity headlines.
3. **Elevator Pitch Generator:** 30-second investor summaries.
4. **Facebook & Google Ads Headlines & Primary Text:** High-CTR advertising copy.
5. **Google My Business Updates & Product Descriptions:** Local SEO listings.
6. **Keywords Generator:** Semantic keyword extraction.
7. **JIRA Issue Creator:** Engineering bug and feature tickets.
8. **Landing Page Copy:** Hero, social proof, features, and FAQ section copy.
9. **Meta Description & SEO Title Generator:** Search engine snippet optimization.
10. **Marketing Campaign, Email & Strategy Generators:** Full annual marketing roadmaps.
11. **Newsletter Name & Content Generator:** Recurring email publication issues.
12. **Presentation Slides Text Generator:** Executive slide deck layouts.
13. **User Persona Generator:** Demographic and psychographic buyer personas.
14. **Unique Selling Propositions (USP) & Value Propositions:** Differentiating market positioning.
15. **OKR & KPI Generators:** Objective and key result metric templates.

### Category 10: Motivation & Inspirational
1. **Affirmation Generator:** Personalized daily mindset affirmations.
2. **Speech Writer:** Wedding, Best Man, Maid of Honor, and Keynote speeches.
3. **Birthday & Anniversary Cards:** Personalized greeting messages.
4. **Inspirational Quotes & Poems:** Original motivational prose and sonnets.
5. **Prayer & Sermon Generators:** Theologically structured spiritual sermons.
6. **SMART Goal Generator:** Specific, Measurable, Achievable, Relevant, Time-bound goals.
7. **SWOT Analysis Generator:** Strengths, Weaknesses, Opportunities, Threats matrices.
8. **Workout Plan Generator:** Fitness routines customized to equipment access.

### Category 11: Online Courses & Education
1. **Checklist Generator:** Operational step-by-step checklists.
2. **Classroom Jeopardy & Trivia Game Generators:** Educational interactive games.
3. **Exit Ticket & Worksheet Generators:** Quick comprehension quizzes.
4. **Homework Assignment & Lesson Plan Generators:** Pedagogical teaching curriculum.
5. **IEP Goal Generator:** Individualized Education Program objectives.
6. **Learning Objective & Syllabus Generators:** Accredited course outlines.
7. **Rubric Generator:** Transparent assignment grading criteria.
8. **Social Stories Generator:** Illustrated behavioral guidance for special education.
9. **Study Guide Maker:** Distilled exam preparation guides.

### Category 12: Research & Development (R&D)
1. **Answer & Question Answering Generator:** Deep factual explanations.
2. **ChatGPT Persona Instructions Generator:** System prompts and personality constraints.
3. **Customer Case Study Generator:** Problem-solution-metrics success studies.
4. **Debate Argument Generator:** Affirmative and negative debate arguments.
5. **Essay Generator with Academic References:** Citations, footnotes, and bibliography.
6. **FAQ Generator:** Comprehensive client-facing questions and answers.
7. **Generate SQL with AI:** Plain text converted into ANSI SQL queries.
8. **Literature Review & Research Paper Generators:** Peer-reviewed academic synthesis.
9. **Product Name & Roadmap Generators:** Technology product release roadmaps.
10. **Video Prompt Generator:** Camera angles, lens choices, lighting, and pacing directives.

### Category 13: SALES
1. **Case Converter Tool:** UPPERCASE, lowercase, Title Case, camelCase string transformations.
2. **Contract & Legal Document Generators:** Master Service Agreements (MSA) and NDAs.
3. **Estimate & Quote Generator:** Itemized scope of work fee proposals.
4. **Investment Policy Statement (IPS) Generator:** Risk profile and asset allocation guidelines.
5. **Lead Magnet Generator:** High-value PDF checklists and whitepaper outlines.
6. **Product Description & Brochure Copy:** High-conversion sales collateral.
7. **Sales Email, Pitch & Script Creators:** Cold calls, objection handling, and closing scripts.

### Category 14: Testimonials & Reviews
1. **Agile User Story Generator:** "As a [user], I want to [action] so that [benefit]".
2. **Discussion Board & Peer Review Generators:** Constructive academic and workplace feedback.
3. **Letter of Recommendation Generator:** Academic and professional recommendation letters.
4. **Press Release Generator:** Standard AP wire service press releases.
5. **Review & Testimonial Generators:** Customer satisfaction quotes.
6. **Review Response Generator:** Professional handling of positive and negative Google/Yelp reviews.

### Category 15: AI Everything (STEM & Specialized Solvers)
1. **Accounting Solver:** Step-by-step balance sheet, journal entry, and ledger calculations.
2. **Biology, Chemistry & Physics Solvers:** Scientific problem solving with foundational formulas.
3. **Economics Solver:** Micro/macro models, supply/demand curves, and elasticity equations.
4. **Geometry & Math Solvers:** Proofs, trigonometry, and calculus step-by-step walkthroughs.
5. **Statistics Solver:** Hypothesis testing, p-values, standard deviations, and regressions.
6. **HTML, CSS & Java Code Generators:** Syntax-highlighted production code snippets.
7. **Cornell Notes Generator:** Two-column structured note-taking system.
8. **Amazon & Etsy Product Description Generators:** E-commerce listings with bullet points.
9. **Recipe Generator:** Ingredient-based custom cooking recipes.
10. **Haiku, Sonnet & Limerick Generators:** Traditional poetic verse forms.
11. **Thesis Statement Generator:** Argumentative academic thesis assertions.

---

## 6. Project Architecture & Directory Structure

```
crm-nergy-ai/
├── public/                     # Static media assets & icons
├── src/
│   ├── assets/                 # Brand logos, energy spheres, icons
│   ├── components/             # Atomic design UI components (Buttons, Modals, Cards, Tables)
│   ├── config/                 # Feature flags (SHOW_OAL, SHOW_OMP)
│   ├── context/                # Global React Contexts
│   │   ├── AuthContext.jsx     # 12 CRM personas & mock RBAC switching
│   │   ├── CrmContext.jsx      # Leads, Contacts, Deals, Tasks, Messages state
│   │   ├── ErpContext.jsx      # Inventory, Procurement, and PO state
│   │   ├── HrContext.jsx       # Candidates, Jobs, and Employees state
│   │   ├── SupportContext.jsx  # Support tickets and KB articles
│   │   ├── ThemeContext.jsx    # Dark / Light theme provider
│   │   └── ToastContext.jsx    # Real-time toast notifications
│   ├── data/
│   │   └── mockData.js         # Seed database for all enterprise modules
│   ├── layouts/
│   │   ├── CrmLayout.jsx       # Master enterprise CRM frame (Sidebar + Topbar)
│   │   ├── OalLayout.jsx       # OAL loan network layout
│   │   ├── OmpLayout.jsx       # Automotive dealership desking layout
│   │   └── components/         # Topbar, Sidebar, Mobile Drawer, Bottom Bar
│   ├── pages/
│   │   ├── UnifiedLogin.jsx    # Multi-product gateway with 12 CRM roles
│   │   ├── Showcase.jsx        # Executive presentation showcase
│   │   ├── admin/              # Secured E-Box (SEA)
│   │   ├── crm/                # Core CRM pages
│   │   │   ├── CrmDashboard.jsx
│   │   │   ├── CrmContacts.jsx & CrmContactDetail.jsx
│   │   │   ├── CrmLeads.jsx
│   │   │   ├── CrmPipeline.jsx
│   │   │   ├── CrmTasks.jsx
│   │   │   ├── CrmCommunication.jsx
│   │   │   ├── CrmAiStudio.jsx  # ZUNME AI Studio Core
│   │   │   ├── CrmAnalytics.jsx & CrmReports.jsx
│   │   │   ├── CrmSettings.jsx & CrmAdmin.jsx
│   │   │   ├── ai/             # Bestie AI, AI Video Agent, AI Marketing Hub
│   │   │   ├── erp/            # Enterprise ERP operations
│   │   │   ├── hr/             # HR & recruiting operations
│   │   │   ├── support/        # Ticket desk & knowledge base
│   │   │   └── territory/      # Sales territory management
│   │   ├── oal/                # OAL loan network personas
│   │   └── omp/                # Automotive dealership desking suite
│   ├── routes/
│   │   ├── AppRoutes.jsx       # Master routing registry
│   │   ├── ProtectedRoute.jsx  # RBAC guard
│   │   └── ompFinanceRoutes.jsx# Dealership routes
│   ├── services/
│   │   ├── geminiService.js    # Direct Google Gemini REST connection + 15 Studio Personas
│   │   └── elevenLabsService.js# ElevenLabs TTS integration
│   ├── styles/                 # Design system tokens, variables & utilities
│   ├── utils/
│   │   └── rbac.js             # RBAC permission matrix for all 12 roles
│   ├── App.jsx                 # Provider wrapper root
│   └── main.jsx                # DOM mount entry
├── .env.example                # API key template
├── package.json                # Dependencies & scripts
└── vite.config.js              # Vite bundler config
```

---

## 7. Setup & Execution Instructions

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **npm:** v9.0.0 or higher

### Environment Configuration
Create a `.env` file in the root of `crm-nergy-ai/`:
```env
# Google Gemini AI API Configuration (For Real-Time Generation)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_MODEL=gemini-1.5-flash

# ElevenLabs Neural Voice API (Optional for Voice Synthesis)
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Feature Flags
VITE_SHOW_OAL=true
VITE_SHOW_OMP=true
```

### Installation & Launch Commands
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

### Accessing the App
* **Local URL:** `http://localhost:5173`
* **Direct CRM Login:** `http://localhost:5173/crm/login`
* **Direct AI Content Studio:** `http://localhost:5173/crm/ai-studio`
* **Direct Bestie AI Copilot:** `http://localhost:5173/crm/bestie`

---

*This document was generated as part of the official CRM nErgy AI & ZUNME platform specification. All rights reserved.*
