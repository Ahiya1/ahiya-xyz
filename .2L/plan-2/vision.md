# Project Vision: Portfolio Project Pages & Link Fixes

**Created:** 2025-12-02T10:45:00Z
**Plan:** plan-2

---

## Problem Statement

The current portfolio on ahiya.xyz has incorrect project links and lacks detailed project pages. The AI Research Pipeline is undersold with a narrow description that doesn't capture its full capability.

**Current issues:**
- Mirror of Dreams links to wrong URL (mirror-of-truth.xyz instead of selahmirror.xyz)
- Wealth and StatViz have no links
- AI Research Pipeline description is too narrow ("youth sports dropout" vs general questionnaire research)
- No dedicated project pages to showcase depth of work

---

## Target Users

**Primary user:** Potential clients/agencies viewing the portfolio
- Want to understand the depth of each project
- Need to see concrete examples of capabilities
- Looking for evidence of technical and domain expertise

**Secondary users:** Recruiters, collaborators, curious visitors

---

## Core Value Proposition

Showcase portfolio projects with dedicated detail pages AND live site links (where applicable), especially highlighting the AI Research Pipeline's ability to generate culturally nuanced, emotionally authentic content at scale.

---

## Linking Strategy

| Project | Has Detail Page | Has Live Site Link |
|---------|-----------------|-------------------|
| Mirror of Dreams | ✅ `/projects/mirror-of-dreams` | ✅ `selahmirror.xyz` |
| Wealth | ✅ `/projects/wealth` | ✅ `selahwealth.xyz` |
| StatViz | ✅ `/projects/statviz` | ✅ `statviz.xyz` |
| AI Research Pipeline | ✅ `/projects/ai-research-pipeline` | ❌ Contact only |

**Homepage Portfolio Cards:** Link to detail pages (not directly to live sites)
**Detail Pages:** Include "Visit Live Site" button where applicable

---

## Feature Breakdown

### Must-Have (MVP)

1. **Create Project Detail Pages**
   - `/projects/mirror-of-dreams` - With link to selahmirror.xyz
   - `/projects/wealth` - With link to selahwealth.xyz
   - `/projects/statviz` - With link to statviz.xyz
   - `/projects/ai-research-pipeline` - With sample outputs showcase (NO external link)

2. **Update Portfolio Data**
   - Fix Mirror of Dreams URL: `selahmirror.xyz`
   - Add Wealth URL: `selahwealth.xyz`
   - Add StatViz URL: `statviz.xyz`
   - Update AI Research Pipeline description
   - Change all cards to link to detail pages

3. **AI Research Pipeline Description Update**
   - Current: "Research tool for generating controlled prompts for academic study on youth sports dropout in Israel"
   - New: "Factorial design research tool for generating culturally nuanced, emotionally authentic questionnaire responses at scale. Supports any research domain with precise demographic control."

4. **AI Research Pipeline Page Must Include All 5 Sample Outputs**
   - See "Complete Sample Outputs" section below

### Should-Have (Post-MVP)

1. Screenshots/demos for each project
2. Projects index page at /projects

### Could-Have (Future)

1. Video walkthroughs
2. Case study metrics

---

## Page Specifications

### Mirror of Dreams Page (`/projects/mirror-of-dreams`)

```
Title: Mirror of Dreams
Subtitle: AI Reflection Tool
Status: Live

Description:
Tiered AI-powered reflection platform with PayPal subscriptions. Users explore
dreams through 5 sacred questions and receive personalized insights. Features
subscription tiers (Free/Pro/Unlimited) with PayPal payment integration and
evolution tracking over time.

Tech Stack: Next.js, TypeScript, Claude API, PayPal, Supabase, tRPC

Features:
- Subscription tiers (Free/Pro/Unlimited)
- AI-powered personalized reflections
- PayPal payment integration
- Evolution tracking over time

CTA: Visit Live Site → https://selahmirror.xyz
```

### Wealth Page (`/projects/wealth`)

```
Title: Wealth
Subtitle: Personal Finance SaaS
Status: Live

Description:
Complete financial tracking system with AI-powered categorization, Israeli bank
connections, budgeting, and goal tracking. Helps users understand their spending
patterns and make informed financial decisions with an intelligent advisor.

Tech Stack: Next.js, TypeScript, Prisma, PostgreSQL, Claude API, tRPC

Features:
- Bank account sync (Israeli banks)
- AI transaction categorization
- Budget management with alerts
- Financial advisor chat

CTA: Visit Live Site → https://selahwealth.xyz
```

### StatViz Page (`/projects/statviz`)

```
Title: StatViz
Subtitle: Statistical Reports Platform
Status: Live

Description:
Secure B2B platform for delivering interactive statistical reports to academic
students. Features password-protected access, admin panel for project management,
and full Hebrew RTL support for the Israeli market.

Tech Stack: Next.js, TypeScript, Prisma, PostgreSQL, JWT

Features:
- Admin panel for project management
- Password-protected student access
- Interactive HTML reports + DOCX
- Hebrew RTL support

CTA: Visit Live Site → https://statviz.xyz
```

### AI Research Pipeline Page (`/projects/ai-research-pipeline`)

```
Title: AI Research Pipeline
Subtitle: Factorial Design Research Tool
Status: Custom Solution
Badge: "Contact for Access"

Hero Section:
- Tagline: "Culturally nuanced, emotionally authentic research responses at scale"

Section 1: The Challenge
Traditional survey research faces significant challenges:
- Expensive and time-consuming data collection
- Difficulty reaching diverse demographic groups
- Inconsistent response quality across populations
- Limited ability to generate controlled factorial designs

Section 2: The Solution
AI-powered response generation that understands cultural context:
- Precise demographic control (age, location, religion, socioeconomic factors)
- Emotionally authentic first-person narratives
- Multiple distribution methods (random, equal, weighted)
- Bilingual support (English + Hebrew)
- Scalable from 100 to 10,000+ responses

Section 3: Sample Outputs (SHOWCASE - USE EXACT TEXT FROM BELOW)
Display all 5 sample responses with their demographic profiles.
Each sample should show:
- Demographic profile badge/card
- Full narrative text
- Highlight the cultural nuance

Section 4: Technical Capabilities
- Factorial design variables (any combination)
- Output formats (structured data, narratives)
- Integration options (n8n workflows, API)
- Quality controls and validation

Section 5: Use Cases
- Academic research studies
- Market research and consumer insights
- UX research persona generation
- Content generation for diverse audiences
- Training data for ML models

Section 6: CTA
"Interested in custom research generation for your project?"
Contact button → mailto:ahiya.butman@gmail.com or scroll to #contact

Tech Stack: Next.js 15, TypeScript, React 19, Tailwind CSS
```

---

## Complete Sample Outputs for AI Research Pipeline

**IMPORTANT: Use these exact texts on the AI Research Pipeline project page.**

### Sample 1: Orthodox Jewish Basketball Player

**Demographic Profile:**
- Age: 17-18 years old
- Sport: Basketball
- Region: South
- City Size: Large City
- Background: Ultra-Orthodox Jewish
- Training: 16-18 hours/week
- Travel: 1+ hour each way
- Cost: Few hundred shekels/month

**Full Narrative:**

I started playing basketball at 12, when my mother was looking for suitable physical activity for Orthodox girls. The club was one of the few that offered a framework adapted to our background—all training respected modesty rules.

Training 16-18 hours a week became my entire life. Between my younger sisters, homework, and house chores, I only had time left for sleep. I'd wake at 5:30 AM for strength training, return for classes, then back to practice in the afternoon. Every day.

The hour-and-a-half drive each way completely destroyed me. Dad drove me every time, and I could see how it exhausted him too. He left work, waited in the car for two hours, then another hour and a half home. It was hard on the whole family.

Our Orthodox background created unique challenges—finding appropriate facilities, proper clothing, and dealing with stares from people who didn't understand how a Haredi girl could play basketball at a high level. Sometimes I felt like an alien between two worlds.

A few hundred shekels a month doesn't sound like much, but for a family with limited income, it was extremely hard. Counting every shekel, while knowing I needed better equipment, personal training, overseas competitions.

I decided to leave when I realized I wasn't enjoying it anymore. The physical, emotional, and financial pressure became unbearable. At 17, I felt like an old woman who had already given everything. I wanted to live a normal life like other girls my age.

---

### Sample 2: Muslim Arab Sailor

**Demographic Profile:**
- Age: 15-16 years old
- Sport: Sailing
- Region: North
- City Size: Small City
- Background: Muslim Arab
- Training: 18-20 hours/week
- Travel: Under 1 hour
- Cost: Free

**Full Narrative:**

My Experience as a Muslim Sailor Who Left Competitive Sport

I started sailing almost by accident. One summer, the local yacht club opened a free youth program, and my parents encouraged me to try. From the first moment I went out on the water, I felt a freedom I'd never known. The sea doesn't recognize religion or gender—only talent and determination.

18-20 hours of training per week meant my life revolved around the club. I woke at five in the morning, returned at seven or eight in the evening. Teachers at school complained about absences, and close friends drifted away. The 45-minute drive to the club was my only time to rest, listen to music, or just review lessons.

My cultural background added complex challenges. I wore a special suit that covered my entire body, even in the heavy Galilee summer heat. Some Jewish parents at the club weren't comfortable with my presence, and I always felt I needed to prove myself twice as hard. On the other hand, I received surprising support from my community—everyone was proud of my achievements.

The fact that training was free opened doors that could never have opened otherwise. The club provided everything—equipment, transportation to competitions, even food.

I left because of emotional pressure. At 16, I felt I was missing my childhood. I decided to focus on studies and preparing for matriculation exams, instead of dedicating all my time to athletic professionalism that might lead nowhere.

---

### Sample 3: Druze Basketball Player

**Demographic Profile:**
- Age: 13-14 years old
- Sport: Basketball
- Region: South
- City Size: Small City
- Background: Druze
- Training: 16-18 hours/week
- Travel: 1+ hour each way
- Cost: Free

**Full Narrative:**

I started playing basketball at 11 when a coach from a club in a nearby city saw me at "Sports Day" at school. My height and speed attracted him, and he invited me to join. As a Druze girl from a small village in the Upper Galilee, it was a dream—to play basketball at a high level!

Training 16-18 hours a week was exhausting. I'd come home from school at 3, immediately eat and prepare for the drive. Every Monday, Wednesday, and Friday we drove to Safed—over an hour each way. In total, we spent 4-5 hours away from home every training day. My grandfather drove me most of the time because mom worked, and he was so proud.

My Druze background was both an advantage and disadvantage. On one hand, our community strongly supports education and achievement, and my family celebrated every accomplishment. But on the other hand, not many Druze girls play at a competitive level, and sometimes I felt alone. Saturdays were also complicated because of living near a Jewish town.

The cost was zero, but the gas and family time cost a lot. Grandfather spent hours on the road for me, and mom gave up extra shifts to come to games.

In the end, I decided to leave because the tension between school and training was too hard. Grades dropped, and I felt I was missing adolescence—friends, parties, time with extended family. At 14, I chose to return to a more "normal" life.

---

### Sample 4: Christian Arab Taekwondo Athlete

**Demographic Profile:**
- Age: 19-20 years old
- Sport: Taekwondo
- Region: Center
- City Size: Small City
- Background: Christian Arab
- Training: 16-18 hours/week
- Travel: 1+ hour each way
- Cost: Free (municipal scholarship)

**Full Narrative:**

I started taekwondo at 12 when I was looking for a way to strengthen my self-confidence. As a Christian Arab from a small city in the center, I felt a need to prove myself and find a place where I could excel. This sport gave me an inner strength and sense of personal achievement I'd never experienced anywhere else.

Training 16-18 hours a week took over my entire life. I woke at five in the morning, drove over an hour to the training facility, returned home exhausted in the evening. The long drives stole another three hours daily—time I could have invested in studies or friendships. I felt disconnected from my peers, and my social life centered only around the dojo.

As a Christian Arab, I sometimes faced strange looks and questions about my background. Some parents were surprised to hear me speaking Arabic with my mom, but most of the sports community welcomed me warmly. My coach always emphasized that in taekwondo we're equal, regardless of background.

The zero financial cost was thanks to a municipal scholarship program, which allowed my family to support my dream. Without it, I couldn't have afforded to continue.

I left at 19 when I realized academic career was more important. I wanted to study psychology, and combining long drives, exhausting training, and studies became impossible. It was very hard, but I knew it was the right choice for my future.

---

### Sample 5: Christian Arab Handball Player

**Demographic Profile:**
- Age: 17-18 years old
- Sport: Handball
- Region: Center
- City Size: Large City
- Background: Christian Arab
- Training: 20-22 hours/week
- Travel: 1+ hour each way
- Cost: Free

**Full Narrative:**

I started handball at 11, after my mother looked for an activity to help me express myself and release school pressures. In our Arab-Christian community, sport was always seen as good for girls—something that builds confidence and develops discipline.

Training 20-22 hours weekly was insane. I woke at 5:30 AM to drive to the training facility in the north, a journey of an hour and fifteen minutes each way. I only got home at 9 PM, tired and hungry. Those long drives took another three hours from my day, meaning my day was 15-16 hours just because of sport.

As a Christian Arab in a sport where most athletes are Jewish, I sometimes felt disconnected. The language at home was Arabic, but in training everything was perfect Hebrew. On Christian holidays, I was the only one absent from practice, and sometimes I felt I needed to explain and justify my culture.

The fact that financial investment was zero was a huge blessing for our family. Without that support, we couldn't have afforded this sport at all. Dad worked three jobs to fund gas and equipment.

In the end, I left at 17 because the physical and mental pressure became unbearable. I missed too much family and social time, and realized I wanted to focus on studies and a more normal life. Sport gave me so much, but at some point it took more than it gave.

---

## Data Model Updates

### Portfolio Data (`app/data/portfolio.ts`)

```typescript
export const portfolioProjects: PortfolioProject[] = [
  {
    id: "mirror-of-dreams",
    title: "Mirror of Dreams",
    subtitle: "AI Reflection Tool",
    description: "Tiered AI-powered reflection platform with PayPal subscriptions. Users explore dreams through 5 sacred questions and receive personalized insights.",
    status: "live",
    liveUrl: "https://selahmirror.xyz",  // FIXED
    detailUrl: "/projects/mirror-of-dreams",  // NEW
    techStack: ["Next.js", "TypeScript", "Claude API", "PayPal", "Supabase", "tRPC"],
  },
  {
    id: "wealth",
    title: "Wealth",
    subtitle: "Personal Finance SaaS",
    description: "Complete financial tracking system with AI-powered categorization, Israeli bank connections, budgeting, and goal tracking.",
    status: "live",
    liveUrl: "https://selahwealth.xyz",  // ADDED
    detailUrl: "/projects/wealth",  // NEW
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Claude API", "tRPC"],
  },
  {
    id: "statviz",
    title: "StatViz",
    subtitle: "Statistical Reports Platform",
    description: "Secure B2B platform for delivering interactive statistical reports to academic students. Password-protected access with Hebrew support.",
    status: "live",
    liveUrl: "https://statviz.xyz",  // ADDED
    detailUrl: "/projects/statviz",  // NEW
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "JWT"],
  },
  {
    id: "ai-research-pipeline",
    title: "AI Research Pipeline",
    subtitle: "Factorial Design Research Tool",
    description: "Factorial design research tool for generating culturally nuanced, emotionally authentic questionnaire responses at scale. Supports any research domain with precise demographic control.",  // UPDATED
    status: "live",
    // NO liveUrl - custom solution, contact only
    detailUrl: "/projects/ai-research-pipeline",  // NEW
    techStack: ["Next.js 15", "TypeScript", "React 19", "Tailwind CSS"],
  },
];
```

### PortfolioCard Update

Update PortfolioCard to link to `detailUrl` instead of `liveUrl`:
- Card click → detail page
- Detail page has "Visit Live Site" button (where applicable)

---

## URL Structure

```
/projects/mirror-of-dreams     → Detail page with live site link
/projects/wealth               → Detail page with live site link
/projects/statviz              → Detail page with live site link
/projects/ai-research-pipeline → Detail page with samples (no live link)
```

---

## Technical Requirements

**Must support:**
- Static generation (Next.js App Router)
- Mobile responsive design
- Consistent styling with existing site (contemplative-card, gentle-button, etc.)

**File Structure:**
```
app/
  projects/
    mirror-of-dreams/
      page.tsx
    wealth/
      page.tsx
    statviz/
      page.tsx
    ai-research-pipeline/
      page.tsx
```

---

## Success Criteria

1. **All 4 project detail pages exist and are accessible**
2. **Portfolio cards link to detail pages**
3. **Detail pages have correct live site links (except AI Pipeline)**
4. **AI Research Pipeline page displays all 5 sample outputs**
5. **Updated descriptions are accurate**
6. **Build passes without errors**
7. **Mobile responsive**

---

## Out of Scope

- Screenshots/demos
- Video content
- Projects index page (/projects/)
- GitHub repository links
- Analytics/metrics

---

## Assumptions

1. The 5 sample narratives can be displayed publicly
2. No privacy concerns with AI-generated content
3. User prefers detail pages over direct links from homepage

---

**Vision Status:** VISIONED
**Ready for:** Master Planning / Execution
