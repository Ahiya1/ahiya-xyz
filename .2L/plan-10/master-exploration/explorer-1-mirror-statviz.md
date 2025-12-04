# Master Explorer 1: Mirror of Dreams & StatViz Analysis

**Explorer ID:** master-explorer-1
**Focus Area:** External Project Codebase Analysis
**Created:** 2025-12-04

---

## Mirror of Dreams

### What It Actually Is

**Mirror of Dreams is an AI-powered reflection companion for tracking and connecting with LIFE DREAMS (aspirations, goals, ambitions) - NOT sleep dreams.**

The app helps users:
1. Create and track their life aspirations (career goals, personal growth, creative projects)
2. Reflect on their relationship with these dreams through 4 structured questions
3. Receive AI-generated insights that help them see themselves more clearly
4. Track their evolution over time as they pursue their dreams

**Core Philosophy (from SYNTHESIZED_VISION.md):**
> "Mirror of Dreams is a soft, glossy, sharp AI companion that helps you see how you connect to your dreams and helps you connect to them better."

The emphasis is on:
- **Soft**: Gentle, nurturing, understanding tone
- **Glossy**: Polished cosmic glass aesthetics (earned beauty, not decorative)
- **Sharp**: Precise insights that cut through self-deception
- **Companion**: Feels alive, knows your journey, reflects truth with compassion

**NOT a productivity tool with spiritual decoration. IS a consciousness companion with earned beauty and real substance.**

---

### Key Features

1. **Dream Creation & Tracking**
   - Create dreams with title, description, target date, category
   - Categories: Health, Career, Relationships, Financial, Personal Growth, Creative, Spiritual, Entrepreneurial, Educational
   - Days remaining countdown
   - Active/completed status tracking

2. **4-Question Reflection Flow**
   - Single-page experience (not multi-step wizard)
   - Questions are dream-specific (refer to THE SPECIFIC dream being reflected on)
   - Each reflection links to a specific dream

3. **Three AI Reflection Tones**
   - **Gentle Clarity**: Warm recognition with kindness, truth delivered with care
   - **Luminous Intensity**: Fierce, uncompromising directness that cuts through self-deception
   - **Sacred Fusion**: Adaptive intelligence that reads the user and calibrates response accordingly

4. **Evolution Reports**
   - Unlocked after 4+ reflections on a specific dream
   - Analyze patterns across reflections
   - Show growth over time with specific quotes from user's own words
   - Temporal comparison (early vs recent reflections)

5. **Visualizations**
   - Achievement narrative from future-self perspective
   - Immersive, sensory language
   - Personalized with user's actual reflection content

6. **Subscription Tiers**
   - Free: 2 reflections/month, 2 dreams
   - Premium tiers with more reflections and deeper analysis

---

### User Flow

**Creating a Dream:**
```
Dashboard -> Create Dream button
-> Simple form: Title, Description, Target Date (optional), Category
-> Dream appears on dashboard with days remaining
```

**Reflection Experience:**
```
Dashboard -> "Reflect Now" or select dream -> Reflect
-> Select which dream to reflect on (if multiple)
-> One-page form with all 4 questions visible:
   1. "What is [Dream Title]?" (elaborate on this specific dream)
   2. "What is your plan for [Dream Title]?"
   3. "What's your relationship with [Dream Title]?"
   4. "What are you willing to give for [Dream Title]?"
-> Select tone (Gentle/Intense/Fusion)
-> "Gaze into the Mirror" button
-> Loading state: "Gazing into the mirror... Crafting your insight..."
-> AI response displayed with styled formatting
-> Reflection saved to history
```

**Viewing Evolution:**
```
Dashboard -> Dream Card -> Evolution button (requires 4+ reflections)
-> Evolution report generated with pattern analysis
-> Shows specific quotes from user's reflections
-> Temporal comparison of growth
```

---

### AI Companion Functionality

The AI (using Claude Sonnet 4) analyzes user responses and generates reflections based on the selected tone:

**Gentle Clarity:**
- Warm recognition, truth with tenderness
- "I see someone who..." pattern
- Notices capability in actions they dismiss
- Creates safety for self-recognition

**Luminous Intensity:**
- Uncompromising directness
- "You're not confused, you're avoiding..."
- Calls out self-deception directly
- Refuses to participate in inadequacy stories

**Sacred Fusion (Default):**
- Adaptive intelligence
- Reads user's state and calibrates response
- Matches communication style
- Finds exact pressure needed for breakthrough

**Key AI Behaviors:**
- References user's specific answers
- Pattern recognition that feels authentic
- Avoids generic spiritual platitudes
- Delivers actionable insights, not just validation

---

### 4 Reflection Questions

The questions are designed to be dream-specific (referring to THE SPECIFIC dream being reflected on):

1. **What is your dream?** - Elaborate on this specific dream's vision
2. **What is your plan?** - Concrete steps for THIS dream
3. **What's your relationship with this dream?** - Emotional/psychological connection
4. **What are you willing to give?** - Sacrifice, commitment, offering

**Important**: Originally had 5 questions, reduced to 4 by removing "Have you set a date?" (date is already in dream object)

Character limits apply to ensure focused responses.

---

### Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI**: React with TypeScript, Tailwind CSS
- **State**: tRPC for API, React Query for caching
- **AI**: Anthropic Claude API (Sonnet 4)
- **Auth**: Custom auth with JWT (hooks/useAuth)
- **Database**: Supabase (PostgreSQL)
- **Animation**: Framer Motion
- **Payments**: PayPal integration (referenced in README)
- **Email**: Gmail with nodemailer
- **Deployment**: Vercel
- **Live URL**: selahmirror.xyz

---

### Visual Aesthetic

**Design System - "Cosmic Glass":**
- Deep navy/space background (#020617 to #0f172a)
- Radial gradients creating depth and vignette
- Glass morphism cards with subtle borders
- Purple (#9333ea) and gold (#fbbf24) accent colors
- Animated cosmic particles floating upward
- Tone-responsive ambient effects:
  - Fusion: Golden breathing orbs
  - Gentle: Twinkling stars
  - Intense: Purple swirling energy

**Restraint Principles:**
- Every element serves function, not decoration
- Beauty emerges from well-functioning systems
- Minimal emoji usage (1-2 per page max)
- Generous white space
- High contrast, readable text
- No excessive gradients or glows

**Typography:**
- Clean, light headings with gradient text treatment
- 16-18px base for body text
- Line-height 1.7-1.8 for comfortable reading

---

### Demo Content Recommendations

**For the portfolio showcase, the demo should show:**

1. **Dream Creation Flow** (NOT sleep dream interpretation):
   - Example dream: "Launch My Sustainable Fashion Brand"
   - Category: Entrepreneurial
   - Target: 180 days from now
   - Show the simple, clean creation form

2. **Reflection Experience**:
   - Show the 4-question single-page form
   - Questions visibly referencing the specific dream title
   - Example answers that demonstrate depth:
     - Dream: "Building a brand that proves fashion can be ethical and beautiful..."
     - Plan: "Phase 1: Design 5 signature pieces using recycled materials..."
     - Relationship: "Excited but scared. This has been a dream since college..."
     - Offering: "15 hours/week, my savings, willingness to fail publicly..."
   - Tone selector with the three options visible

3. **AI Response Preview**:
   - Show a sample AI reflection that:
     - References their specific answers
     - Demonstrates the "soft, glossy, sharp" quality
     - Offers genuine insight, not platitudes
   - Example snippet:
     > "Your dream of sustainable fashion reveals a deep alignment between your values and your ambitions. You speak about 'willingness to fail publicly' - this isn't fear, this is courage that has already decided. The 15 hours weekly you're offering isn't sacrifice; it's investment in becoming who you already are..."

4. **Dashboard Preview**:
   - Multiple dreams with progress (reflection counts, days remaining)
   - Clear "Reflect Now" primary action
   - Evolution Report button visible on dreams with 4+ reflections

5. **Key Differentiators to Highlight**:
   - AI companion (not just journal)
   - Dream-specific reflections (not generic prompts)
   - Evolution tracking over time
   - Three calibrated tones for different needs

---

## StatViz

### What It Actually Is

**StatViz is a secure web platform for delivering statistical analysis reports to graduate students at Israeli academic institutions (primarily Herzog College).**

The platform bridges three roles:
1. **Ahiya (Statistician/Admin)**: Creates projects, uploads reports, generates access links
2. **Guy (Academic Intermediary)**: Receives links, shares with students
3. **Students (End Users)**: View interactive reports, download DOCX for thesis

**Core Value Proposition:**
- Students get professional statistical analysis
- Results in both traditional (DOCX) and interactive (HTML) formats
- Hebrew language support throughout (RTL)
- Pedagogical focus: Students learn while viewing results
- Secure, password-protected project access

---

### Key Features

1. **Project Management (Admin)**
   - Create new projects with metadata:
     - Project name (Hebrew)
     - Student name and email
     - Research topic
     - Upload DOCX and HTML files
     - Auto-generated or custom password
   - View all projects with stats (view count, last accessed)
   - Delete projects (soft delete)
   - Copy shareable link and password

2. **Dual Report Format**
   - **DOCX**: Traditional Word document for thesis submission
     - Hebrew RTL formatting
     - Follows academic standards
     - Ready for printing/submission
   - **Interactive HTML**: Self-contained web report
     - Embedded Plotly charts
     - All data as inline JSON
     - No external dependencies (works offline)
     - Interactive data exploration

3. **Security Features**
   - Password-protected project access
   - bcrypt password hashing
   - JWT session tokens (24-hour expiry)
   - Rate limiting (5 login attempts per 15 minutes)
   - httpOnly cookies
   - HTTPS enforcement
   - Security headers (CSP, X-Frame-Options)

4. **Admin Authentication**
   - Separate admin login (/admin)
   - JWT tokens with 30-minute expiry
   - Session stored in database for revocation

---

### User Flow

**Admin Flow (Ahiya):**
```
/admin -> Login with username/password
-> /admin/dashboard -> View all projects
-> Create New Project:
   - Enter project name, student info
   - Upload DOCX and HTML files
   - Set or auto-generate password
   - Receive shareable link + password
-> Share link with Guy via email
-> Guy forwards to student
```

**Student Flow:**
```
Receive email with link: statviz.xyz/preview/[project-id]
-> Password prompt screen
-> Enter password from email
-> View project:
   - Header with project name, student name, research topic
   - Embedded interactive HTML report (full viewport)
   - Download button for DOCX
-> Explore interactive visualizations
-> Download DOCX for thesis submission
```

---

### Report Delivery System

**Input (From Student to Ahiya - outside platform):**
1. Data file: Excel/CSV with participant data
2. Codebook: Word document with variable descriptions, value labels

**Processing (Claude Chat - outside platform):**
1. Ahiya opens Claude Chat
2. Pastes system prompt
3. Uploads data + codebook
4. Claude validates, processes, generates reports
5. Outputs two files for download

**Output (Uploaded to StatViz):**

1. **Hebrew DOCX (`findings_hebrew.docx`)**
   - Microsoft Word 2016+ format
   - Hebrew RTL text
   - Academic sections:
     - Research population
     - Reliability analysis
     - Research findings
   - Graph specifications (not embedded graphics)
   - Size: 5-15 KB typical

2. **Self-Contained HTML (`interactive_report.html`)**
   - Single HTML5 file
   - All CSS, JS, data inline
   - Embedded Plotly charts
   - Hebrew RTL
   - Size: 1-5 MB
   - Works offline after download
   - 7 interactive sections

---

### Security Features

**Project Security:**
- Per-project passwords (hashed with bcrypt, 10 rounds)
- No project listing (direct links only)
- Token-based session (24-hour expiry)
- Rate limiting on password attempts

**Admin Security:**
- Strong password requirement
- JWT tokens in httpOnly cookies
- 30-minute session expiry
- Rate limiting (5 attempts/15 min)
- Base64-encoded password hash (avoids .env parsing issues)

**Data Security:**
- Soft delete (data recovery possible)
- View tracking (access logs)
- Secure file storage
- No long-term personal data storage beyond project metadata

---

### Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI**: React with TypeScript, Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT + bcrypt
- **File Storage**: Local filesystem (with S3 option)
- **Validation**: Zod schemas
- **Toast/Feedback**: Sonner
- **Font**: Rubik (Hebrew/Latin)
- **Deployment**: Vercel
- **Live URL**: statviz.xyz

**Database Schema:**
```
Project:
  - projectId (unique, nanoid)
  - projectName, studentName, studentEmail
  - researchTopic
  - passwordHash
  - docxUrl, htmlUrl
  - viewCount, lastAccessed
  - deletedAt (soft delete)

AdminSession:
  - token, expiresAt, ipAddress

ProjectSession:
  - projectId, token, expiresAt
```

---

### Demo Content Recommendations

**For the portfolio showcase, the demo should show:**

1. **Student Access Flow**:
   - Password prompt screen (clean, professional)
   - Hebrew text: "Enter password sent to your email"
   - Password visibility toggle
   - Loading state with Hebrew feedback

2. **Project Viewer**:
   - Header with project metadata (student name, research topic)
   - Full-viewport embedded HTML report
   - Interactive chart preview (show data visualization)
   - Download DOCX button prominently placed
   - Professional blue/indigo gradient aesthetic

3. **Admin Dashboard Preview**:
   - Project list with stats (view count, dates)
   - Create Project button
   - Project cards with actions (View, Delete, Copy Link)
   - Hebrew RTL layout

4. **Key Differentiators to Highlight**:
   - Dual delivery format (DOCX + Interactive HTML)
   - Password-protected secure access
   - Self-contained offline-capable reports
   - Academic/professional focus
   - Hebrew language support

5. **Report Quality Example**:
   - Show a glimpse of an interactive Plotly chart
   - Statistical data visualization
   - Professional, academic styling

---

## Integration Recommendations

### For ahiya.xyz Portfolio Showcase:

**Mirror of Dreams Page Should:**
1. **Correct the core mistake**: Remove ALL references to "sleep dreams" or "dream analysis" in the sense of night dreams
2. **Lead with the AI companion angle**: "An AI companion that helps you reflect on your life aspirations"
3. **Show the 4-question flow**: Make it clear this is structured reflection, not dream interpretation
4. **Demonstrate real value**: Show how the AI provides genuine insights, not generic encouragement
5. **Highlight evolution tracking**: This is the "magic" - seeing growth over time with your own words reflected back
6. **Use accurate demo content**:
   - Dream examples: "Launch a Business", "Write a Novel", "Run a Marathon"
   - NOT: "I dreamed about flying" or sleep-related content
7. **Visual style**: Match the cosmic glass aesthetic with restraint

**StatViz Page Should:**
1. **Lead with the professional/academic angle**: "Secure statistical reports for graduate research"
2. **Show the dual format**: DOCX for submission + Interactive HTML for exploration
3. **Emphasize security**: Password protection, privacy for student data
4. **Demonstrate the viewing experience**: Interactive charts, full-viewport report
5. **Show admin capability**: Project management, analytics, easy sharing
6. **Use appropriate demo content**:
   - Hebrew text visible
   - Statistical visualization preview
   - Professional/academic styling

**Technical Considerations:**
- Both projects use Next.js - portfolio can reference similar tech stack
- Both have authentication systems - can highlight full-stack capability
- Both have payment/subscription potential - business viability
- Both serve real users - production-ready quality

---

## Exploration Summary

| Aspect | Mirror of Dreams | StatViz |
|--------|------------------|---------|
| **Purpose** | AI reflection companion for life aspirations | Secure statistical report delivery |
| **Users** | Individuals pursuing personal dreams | Graduate students & statisticians |
| **Core Feature** | 4-question reflection + AI insights | Dual report format (DOCX + HTML) |
| **Unique Value** | Evolution tracking over time | Self-contained interactive reports |
| **Visual Style** | Cosmic glass, dark theme | Professional, light gradient |
| **Language** | English | Hebrew (RTL) |
| **Tech Stack** | Next.js, tRPC, Supabase, Anthropic | Next.js, Prisma, PostgreSQL |
| **Live URL** | selahmirror.xyz | statviz.xyz |

---

*Exploration completed: 2025-12-04*
*This report informs the Plan-10 Premium Project Pages implementation*
