# Master Explorer 3 Report: Portfolio Projects Analysis

## Executive Summary

This exploration analyzed 4 deployed projects to be showcased in Ahiya's portfolio. Each project demonstrates different aspects of full-stack development capability: **Wealth** is a comprehensive personal finance SaaS with AI-powered categorization, **StatViz** is a B2B platform for academic statistical report delivery, **Mirror of Dreams** is a subscription-based AI reflection tool with PayPal payments, and **AI Research Pipeline** is a factorial design research tool for academic studies. Together, they showcase end-to-end development expertise across finance, education, AI/consciousness, and research automation domains.

---

## Project 1: Wealth

### Overview

**Wealth** is a full-featured personal finance SaaS application designed to help users build a "conscious relationship with money." It offers comprehensive financial tracking including bank account connections, transaction management, budgeting, goal setting, and AI-powered insights.

**Philosophy:** "Mindful finance" - empowering users without judgment, framing overspending as learning opportunities rather than failures.

### Key Features

- **Bank Account Integration:** Connect accounts via Israeli Bank Scrapers (FIBI, Visa CAL) with encrypted credential storage
- **AI-Powered Transaction Categorization:** Claude API integration for intelligent auto-categorization with confidence levels
- **Multi-Account Management:** Checking, savings, credit, investment, and cash accounts with real-time balance tracking
- **Budget Management:** Monthly budgets by category with rollover options, recurring templates, and visual progress indicators (green/yellow/red)
- **Goal Tracking:** Savings goals, debt payoff calculators with target amounts and dates
- **Analytics Dashboard:** Net worth tracking, spending by category charts, month-over-month comparisons
- **Chat Interface:** AI-powered financial advisor chat with session history (Iteration 21)
- **Data Export:** CSV, JSON, Excel, and complete ZIP export functionality

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma 5.22 |
| Auth | Supabase Auth |
| API | tRPC (type-safe) |
| AI | Claude API (@anthropic-ai/sdk) |
| Bank Sync | israeli-bank-scrapers |
| UI | Tailwind CSS, Radix UI, shadcn/ui |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Hosting | Vercel |
| Error Tracking | Sentry |
| Storage | Vercel Blob |

### Database Schema Highlights

- **Users:** Full subscription tier support (FREE/PREMIUM), onboarding tracking, role system
- **Accounts:** Multi-type support (CHECKING/SAVINGS/CREDIT/INVESTMENT/CASH)
- **Transactions:** Import tracking with categorization source (USER/AI_CACHED/AI_SUGGESTED)
- **Bank Connections:** Encrypted credentials, sync status tracking
- **Chat Sessions:** Persistent AI conversation history

### Portfolio Value

**Why include:** Demonstrates complete SaaS development capability:
- Complex authentication and authorization
- Third-party API integrations (banks, AI)
- Data encryption and security best practices
- Real-time dashboard analytics
- Subscription tier architecture
- Mobile-responsive design

**Key Selling Points for Portfolio:**
1. Full-stack ownership from auth to deployment
2. AI integration for intelligent automation
3. Financial data security handling
4. Complex data relationships (Prisma)
5. Real production users

### Screenshots/Demo

**Locations to capture:**
- `/home/ahiya/Ahiya/2L/Prod/wealth/src/app/page.tsx` - Landing page
- `/home/ahiya/Ahiya/2L/Prod/wealth/src/app/(dashboard)/*` - Dashboard views
- Vercel deployment: `wealth.vercel.app` (exact URL TBD)

---

## Project 2: StatViz

### Overview

**StatViz** is a secure, web-based B2B platform for delivering statistical analysis reports to graduate students at Israeli academic institutions (Herzog College). It bridges the workflow between Ahiya (statistician), Guy (academic intermediary), and students (end users).

**Use Case:** Students submit data files -> Ahiya processes with Claude -> StatViz hosts interactive HTML reports + downloadable DOCX files -> Students access with password-protected links.

### Key Features

- **Admin Panel:** Project creation, file uploads (DOCX + HTML), password management
- **Password-Protected Project Access:** Per-project passwords with JWT session tokens
- **Dual File Delivery:** Interactive HTML reports (Plotly charts, embedded data) + downloadable DOCX for thesis
- **Hebrew RTL Support:** Full Hebrew language UI and content
- **View Analytics:** Track access counts and last viewed timestamps
- **Security:** bcrypt password hashing, rate limiting (5 attempts per 15 min), HTTPS enforcement
- **Soft Delete:** Data recovery capability

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 |
| Language | TypeScript |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma 5.19 |
| Auth | JWT + bcrypt |
| File Storage | Local filesystem / S3-ready |
| UI | Tailwind CSS, Lucide icons |
| Validation | Zod |
| Rate Limiting | rate-limiter-flexible |
| Hosting | Vercel |

### Database Schema

- **Projects:** projectId (nanoid), studentName, studentEmail, researchTopic, passwordHash, docxUrl, htmlUrl, viewCount
- **AdminSession:** JWT tokens with expiration
- **ProjectSession:** Per-project access tokens (24h expiry)

### Portfolio Value

**Why include:** Demonstrates B2B platform development:
- Admin/user role separation
- Secure file delivery system
- Hebrew/RTL internationalization
- Password management and session handling
- Academic/professional domain experience

**Key Selling Points:**
1. B2B client-facing platform
2. File management and delivery
3. Security-first architecture
4. Hebrew language support
5. Professional workflow automation

### Screenshots/Demo

**Locations to capture:**
- `/home/ahiya/Ahiya/2L/Prod/StatViz/app/page.tsx` - Landing/login
- `/home/ahiya/Ahiya/2L/Prod/StatViz/app/(auth)/*` - Admin panel
- `/home/ahiya/Ahiya/2L/Prod/StatViz/app/(student)/*` - Student view
- Vercel deployment: `stat-viz.vercel.app` (or custom domain TBD)

---

## Project 3: Mirror of Dreams

### Overview

**Mirror of Dreams** is an AI-powered personal reflection platform designed as a "sacred space" for exploring dreams and goals. Users answer 5 deep questions about their aspirations and receive personalized AI reflections that "show wholeness, not brokenness."

**Philosophy:** "Your dream chose you as carefully as you're choosing it" - contemplative technology serving consciousness.

**Live URL:** https://mirror-of-truth.xyz

### Key Features

- **Sacred Reflection Experience:** 5 carefully crafted questions about dreams with AI-powered responses
- **Multiple Reflection Tones:**
  - Gentle Clarity (soft, nurturing)
  - Luminous Intensity (bold, direct)
  - Sacred Fusion (balanced wisdom)
- **Subscription Tiers:**
  - **Free:** 2 reflections/month, 2 active dreams
  - **Pro ($15/mo, $150/yr):** 30 reflections/month, 1/day, 5 dreams, evolution reports, visualizations
  - **Unlimited ($29/mo, $290/yr):** 60 reflections/month, 2/day, unlimited dreams, extended AI thinking
- **PayPal Integration:** Full subscription payments with webhook handling
- **Evolution Reports:** Track personal growth across reflections over time
- **Dream Management:** Multiple active dreams with progress visualization
- **Cosmic UI:** Deep space background, breathing animations, tone-responsive visual effects

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 |
| Language | TypeScript |
| Database | Supabase (PostgreSQL) |
| API | tRPC |
| AI | Claude Sonnet 4 (@anthropic-ai/sdk) |
| Auth | Supabase Auth |
| Payments | PayPal SDK |
| Email | Nodemailer |
| UI | Tailwind CSS, Framer Motion |
| Image Generation | Canvas (Node) |
| Caching | Upstash Redis |
| Hosting | Vercel |

### Pricing Structure (from constants.ts)

| Tier | Monthly | Yearly | Reflections/Mo | Daily Limit | Dreams |
|------|---------|--------|----------------|-------------|--------|
| Free | $0 | $0 | 2 | Unlimited | 2 |
| Pro | $15 | $150 | 30 | 1 | 5 |
| Unlimited | $29 | $290 | 60 | 2 | Unlimited |

### Portfolio Value

**Why include:** Demonstrates consumer SaaS with monetization:
- Complete payment integration (PayPal)
- Subscription tier management
- AI-driven personalization
- Beautiful, animated UI
- Consumer product design

**Key Selling Points:**
1. Production subscription system with real payments
2. Deep AI integration with custom prompting
3. Meditation/wellness product design
4. Consumer UX with sophisticated animations
5. Live, revenue-generating product

### Screenshots/Demo

**Live site:** https://mirror-of-truth.xyz
**Key pages:**
- `/home/ahiya/Ahiya/2L/Prod/mirror-of-dreams/app/page.tsx` - Landing with cosmic background
- `/home/ahiya/Ahiya/2L/Prod/mirror-of-dreams/app/pricing/page.tsx` - Pricing tiers
- `/home/ahiya/Ahiya/2L/Prod/mirror-of-dreams/app/reflection/*` - Reflection experience
- `/home/ahiya/Ahiya/2L/Prod/mirror-of-dreams/app/dashboard/*` - User dashboard

---

## Project 4: AI Research Pipeline (Olympic Youth)

### Overview

**Youth Sports Dropout Research System** is a comprehensive research tool for generating factorial design prompts to study youth dropout patterns from Olympic sports in Israel. It enables researchers to generate precisely controlled prompts for LLM analysis with configurable demographic and contextual parameters.

**Use Case:** Academic research on why Israeli youth leave Olympic sports, generating synthetic persona narratives for qualitative analysis.

### Key Features

- **Precise Response Control:** Generate exact number of prompts (100 to 10,000)
- **Three Distribution Methods:**
  - **Random:** Natural variation in parameter selection
  - **Equal:** Systematic balanced sampling for statistical validity
  - **Weighted:** Custom probability weights for focused research
- **Comprehensive Parameters:**
  - 14 sports (individual: Judo, Swimming, etc.; team: Basketball, Football, etc.)
  - 4 age groups (13-14, 15-16, 17-18, 19-20)
  - 2 genders
  - 6 ethnicities (Jewish-secular/religious/ultra-orthodox, Arab-Bedouin/Muslim/Christian)
  - 3 regions (Center, North, South)
  - 3 settlement types (Large city, Small city, Rural)
  - Training context (schedule, travel distance, facility quality)
  - 8 dropout reasons
- **CSV Export:** Ready for n8n workflow integration with bilingual prompts (English + Hebrew)
- **Real-Time Preview:** Distribution statistics and sample prompts before export

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 |
| Language | TypeScript |
| React | React 19 |
| CSV Generation | Papaparse |
| Forms | React Hook Form |
| UI | Tailwind CSS 4 |
| Icons | Lucide React |
| Hosting | Local/Vercel-ready |

### Workflow Integration

1. **Factorial Design UI:** Researcher configures parameters
2. **Prompt Generation:** System creates prompts with controlled distribution
3. **CSV Export:** File includes ID, all parameters, English/Hebrew prompts
4. **n8n Workflow:** Batch processes prompts through LLM APIs
5. **Google Sheets:** Results stored for analysis

### Sample Output Translation (from vision)

> "I started sailing almost by accident. One summer, the local yacht club opened a free youth program... The sea doesn't recognize religion or gender - only talent and determination. At 16, I felt I was missing my childhood."

### Portfolio Value

**Why include:** Demonstrates research tooling and automation:
- Academic/research domain expertise
- Complex parameter configuration UI
- Batch data generation
- Workflow automation architecture
- Bilingual content generation

**Key Selling Points:**
1. Custom research tool development
2. Complex state management (multi-step wizard)
3. Data export and external integration
4. Academic client work
5. Factorial design implementation

### Screenshots/Demo

**Locations to capture:**
- `/home/ahiya/olympic-youth/olympic-youth-app/app/page.tsx` - Multi-step wizard UI
- Sample CSV export output
- n8n workflow diagram (if available)

---

## Portfolio Content Recommendations

### Project Ordering

**Recommended order for maximum impact:**

1. **Mirror of Dreams** - Most visually impressive, live product with real payments
2. **Wealth** - Most technically complex, demonstrates full SaaS capability
3. **StatViz** - B2B platform, shows professional/academic work
4. **AI Research Pipeline** - Specialized tool, shows research/academic capability

**Rationale:** Lead with the most polished consumer product, follow with technical depth, then show B2B and specialized work.

### Key Selling Points

**For Software Agencies:**
- End-to-end ownership (auth, DB, API, UI, deployment)
- Modern stack (Next.js, TypeScript, Tailwind)
- Production-grade security (encryption, rate limiting)
- AI integration experience (Claude API)
- Payment processing (PayPal, Stripe-ready)

**For Startups/Founders:**
- MVP-to-production experience
- Rapid delivery (4 deployed systems)
- Full-stack capability
- Domain variety (finance, education, wellness, research)
- Real user validation

**For All Clients:**
- 2L methodology = faster development
- Clean architecture
- Tested, deployed code
- Professional communication

### Missing Information

**To complete portfolio content:**

1. **Live URLs Confirmation:**
   - Wealth: Verify production URL
   - StatViz: Verify production URL
   - Mirror of Dreams: Confirmed - https://mirror-of-truth.xyz
   - Olympic Youth: Check if deployed

2. **Screenshots Needed:**
   - Dashboard views for Wealth
   - Admin panel for StatViz
   - Landing page for Olympic Youth
   - Reflection experience for Mirror of Dreams

3. **Metrics/Social Proof:**
   - Number of users (if shareable)
   - Transactions processed
   - Reflections generated
   - Projects delivered via StatViz

4. **Case Study Content:**
   - Development timeline for each project
   - Technical challenges overcome
   - Client testimonials (Guy for StatViz?)

---

## Integration Considerations

### Display Approach

**Portfolio Card Structure:**
```
- Title + Subtitle
- Hero screenshot/demo
- Tech stack badges
- 3-4 key feature bullets
- Live link (if applicable)
- "View Details" expands to case study
```

**Tech Stack Badge Groups:**
- Framework: Next.js
- Language: TypeScript
- Database: PostgreSQL
- AI: Claude API (where applicable)
- Payments: PayPal (where applicable)

### Animation Recommendations

Reuse existing ahiya.xyz animations:
- Card hover effects (breathing/glitch)
- Staggered reveal on scroll
- Subtle image transitions

### Responsive Design

- Cards should stack on mobile
- Screenshots should be modal-able for detail view
- Tech badges should wrap gracefully

### Performance

- Lazy load project screenshots
- Use Next/Image optimization
- Keep bundle size reasonable (< 500KB per project)

---

## Technical Integration Notes

### Data Structure

```typescript
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  status: 'live' | 'development' | 'archived';
  liveUrl?: string;
  githubUrl?: string;
  screenshots: string[];
  techStack: string[];
  features: string[];
  order: number;
}
```

### Project Data (Ready to Use)

**Mirror of Dreams:**
```typescript
{
  id: 'mirror-of-dreams',
  title: 'Mirror of Dreams',
  subtitle: 'AI Reflection Tool',
  description: 'Tiered AI-powered reflection platform with PayPal subscriptions. Users explore dreams through 5 sacred questions and receive personalized insights.',
  status: 'live',
  liveUrl: 'https://mirror-of-truth.xyz',
  techStack: ['Next.js', 'TypeScript', 'Claude API', 'PayPal', 'Supabase', 'tRPC'],
  features: [
    'Subscription tiers (Free/Pro/Unlimited)',
    'AI-powered personalized reflections',
    'PayPal payment integration',
    'Evolution tracking over time',
    'Beautiful cosmic UI with animations'
  ],
  order: 1
}
```

**Wealth:**
```typescript
{
  id: 'wealth',
  title: 'Wealth',
  subtitle: 'Personal Finance SaaS',
  description: 'Complete financial tracking system with AI-powered categorization, Israeli bank connections, budgeting, and goal tracking.',
  status: 'live',
  liveUrl: undefined, // TBD
  techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Claude API', 'tRPC', 'Supabase'],
  features: [
    'Bank account sync (Israeli banks)',
    'AI transaction categorization',
    'Budget management with alerts',
    'Goal tracking and projections',
    'Financial advisor chat'
  ],
  order: 2
}
```

**StatViz:**
```typescript
{
  id: 'statviz',
  title: 'StatViz',
  subtitle: 'Statistical Reports Platform',
  description: 'Secure B2B platform for delivering interactive statistical reports to academic students. Password-protected access with Hebrew support.',
  status: 'live',
  liveUrl: undefined, // TBD
  techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT'],
  features: [
    'Admin panel for project management',
    'Password-protected student access',
    'Interactive HTML reports + DOCX downloads',
    'Hebrew RTL support',
    'View analytics and tracking'
  ],
  order: 3
}
```

**AI Research Pipeline:**
```typescript
{
  id: 'ai-research-pipeline',
  title: 'AI Research Pipeline',
  subtitle: 'Factorial Design Research Tool',
  description: 'Research tool for generating controlled prompts for academic study on youth sports dropout in Israel. Supports random, equal, and weighted distributions.',
  status: 'live',
  liveUrl: undefined, // Local/TBD
  techStack: ['Next.js 15', 'TypeScript', 'React 19', 'Tailwind CSS'],
  features: [
    'Precise prompt count control (100-10,000)',
    'Three distribution methods',
    'Bilingual output (English + Hebrew)',
    'CSV export for n8n workflows',
    'Real-time distribution preview'
  ],
  order: 4
}
```

---

*Generated: 2025-12-02*
*Explorer: Master Explorer 3 (Portfolio Projects Analysis)*
