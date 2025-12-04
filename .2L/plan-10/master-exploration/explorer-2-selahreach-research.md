# Master Explorer 2: SelahReach & AI Research Pipeline Analysis

## Explorer ID
master-explorer-2

## Focus Area
SelahReach (Automatic Outreach System), AI Research Pipeline, and Research-Viz

---

## SelahReach (Automatic Outreach System)

### What It Actually Is

SelahReach is a **full-stack CRM and outreach automation system** built specifically for managing B2B agency outreach campaigns. It is NOT just a contact list - it is a sophisticated pipeline management tool with:

1. **Kanban-style Pipeline View** - Visual drag-and-drop interface for moving contacts through sales stages
2. **Claude Code Integration** - AI-powered email drafting and sending via Gmail MCP
3. **Activity Tracking** - Complete history of all interactions with each contact
4. **Email Logging** - Bi-directional email tracking (sent and received)
5. **tRPC API** - Full REST-like API for programmatic access by Claude Code

**Key Insight:** The system is designed to be operated primarily through Claude Code conversations. The user asks Claude Code to "send outreach to 500Tech" and Claude:
1. Reads contact info from the Sealhreach API
2. Drafts a personalized email based on the contact's specialization
3. Shows the draft for approval
4. Sends via Gmail MCP
5. Logs the email to Sealhreach
6. Updates the contact's stage to "contacted"

### Claude Code Integration

This is the **most innovative aspect** of SelahReach. The integration works as follows:

**Workflow Pattern:**
```
User Request: "Send outreach email to 500Tech"
    |
    v
Claude Code reads contact via tRPC API:
    curl "http://localhost:3000/api/trpc/contacts.search?input={query:'500Tech'}"
    |
    v
Claude Code drafts personalized email using template + specialization
    |
    v
User approves the draft
    |
    v
Claude Code sends via Gmail MCP:
    mcp__gmail__send_email(to, subject, body, htmlBody)
    |
    v
Claude Code logs to Sealhreach:
    POST /api/trpc/emails.create
    |
    v
Claude Code updates stage:
    POST /api/trpc/contacts.updateStage (stage: "contacted")
```

**The P.S. Line:** Every outreach email includes:
> "P.S. This email was composed and sent by an AI system I built - happy to show you how it works if you're curious."

This serves as both a differentiator and a demonstration of Ahiya's AI capabilities.

### Client Tracking System

**Database Schema (SQLite with Drizzle ORM):**

**Contacts Table:**
- id, name, email (unique), website, specialization
- notes, stage, createdAt, updatedAt

**Emails Table:**
- id, contactId (FK), subject, body
- gmailThreadId, gmailMessageId, direction ('sent' | 'received')
- sentAt

**Activities Table:**
- id, contactId (FK), type, description, metadata (JSON)
- createdAt

**Pipeline Stages (7 total):**
```
lead -> contacted -> replied -> call_scheduled -> proposal -> closed_won
                                                          \-> closed_lost
```

### Automation Features

1. **Email Drafting Automation** - Claude Code uses HTML templates with personalization variables
2. **Stage Progression** - Automatic stage updates after email sent
3. **Activity Logging** - Every action creates an activity record
4. **Reply Detection** - Gmail MCP can search for replies from contacted agencies
5. **Follow-up Reminders** - API endpoint to find contacts in "contacted" stage for 7+ days

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | Full-stack framework with App Router |
| **React 19** | UI components |
| **TypeScript** | Type-safe development |
| **tRPC** | Type-safe API with React Query integration |
| **Drizzle ORM** | Type-safe SQLite database |
| **better-sqlite3** | SQLite driver |
| **@dnd-kit** | Drag-and-drop kanban board |
| **Radix UI** | Dialog, dropdown, select, scroll area |
| **Tailwind CSS** | Styling |
| **Sonner** | Toast notifications |
| **Gmail MCP** | Email sending via Claude Code |

### Demo Content Recommendations

**The /projects/selahreach page should showcase:**

1. **Hero Section:**
   - Title: "SelahReach - AI-Powered Outreach Automation"
   - Subtitle: "Let Claude Code handle your B2B outreach while you focus on closing deals"
   - Visual: Terminal/code aesthetic showing the Claude Code workflow

2. **The Problem:**
   - Manual outreach is time-consuming
   - Personalization at scale is hard
   - Tracking conversations across email and CRM is fragmented

3. **The Solution:**
   - AI-drafted personalized emails
   - One command to send and track
   - Unified pipeline view

4. **Interactive Demo - Pipeline View:**
   - Show the Kanban board with sample contacts
   - Animate a card being dragged from "Lead" to "Contacted"
   - Show the activity timeline updating in real-time

5. **Interactive Demo - Claude Code Workflow:**
   - Terminal-style display showing:
     ```
     > "Send outreach to 500Tech"

     Reading contact info...
     Found: 500Tech (info@500tech.com)
     Specialization: Front-end consultancy

     Drafting personalized email...

     Subject: AI Development Partnership - Quick Question

     [Email preview shown]

     > Approved. Sending...

     Email sent successfully
     Contact stage: lead -> contacted
     Activity logged
     ```

6. **Key Differentiator:**
   - The P.S. line - "This email was sent by an AI system I built"
   - Shows the capability while doing the work

7. **Tech Stack Section:**
   - Next.js 15 + tRPC + Drizzle ORM
   - Gmail MCP integration
   - Claude Code as the orchestrator

---

## AI Research Pipeline

### What It Actually Is

The AI Research Pipeline is a **synthetic data generation system** for academic research. It generates culturally-aware, emotionally authentic first-person narratives based on factorial demographic designs.

**Use Case in Vision:** The pipeline was used to generate research data about female athletes in Israel who dropped out of competitive sports. Each narrative is a detailed first-person story capturing:
- Demographic profile (age, sport, region, ethnicity, etc.)
- Training hours and travel distance
- Financial burden
- Emotional and cultural challenges
- Reasons for leaving

**Key Insight:** This is NOT about collecting real data - it is about generating synthetic but realistic research data that captures cultural nuances and emotional authenticity at scale.

### Pipeline Stages

**Input Configuration:**
1. Define demographic variables (age groups, sports, regions, ethnicities, etc.)
2. Set distribution method (random, equal, weighted)
3. Specify output count (100 to 10,000+)
4. Choose language (English, Hebrew, or both)

**Generation Process:**
1. Claude API generates individual narratives
2. Each narrative follows the factorial design constraints
3. Cultural nuances are embedded based on demographic profile
4. Emotional authenticity is prioritized

**Output:**
- Structured JSON with all demographic fields + narrative
- Ready for qualitative analysis
- Can be visualized in Research-Viz

### Cultural Nuance Handling

The pipeline demonstrates sophisticated cultural awareness:

**From the sample data analyzed:**

1. **Ultra-Orthodox Jewish Athletes:**
   - Modesty requirements (special clothing, appropriate facilities)
   - Feeling "like an alien between two worlds"
   - Limited income considerations

2. **Muslim Arab Athletes:**
   - Special full-body suits for modesty
   - Need to "prove yourself twice as hard"
   - Surprising community support despite cultural barriers

3. **Druze Athletes:**
   - Strong community support for achievement
   - Isolation from other Druze girls in competitive sports
   - Extended family time considerations

4. **Christian Arab Athletes:**
   - Language switching (Arabic at home, Hebrew in training)
   - Holiday scheduling conflicts
   - Cultural explanation burden

**Each narrative captures:**
- Family dynamics and pressure
- Financial constraints specific to community
- Geographic/travel challenges
- Emotional toll and burnout
- Social isolation from peers
- Decision process for leaving

### Inputs & Outputs

**Inputs:**
```typescript
interface ResearchRecord {
  id: number;
  age: string;            // "17-18", "15-16", etc.
  sportCode: string;      // "L10", "L3", etc.
  sport: string;          // "Basketball", "Sailing", etc.
  location: string;       // "South", "North", "Center"
  settlementType: string; // "Large City", "Small City", "Rural"
  ethnicity: string;      // Cultural background
  trainingHours: string;  // "16-18", "18-20", etc.
  trainingDistance: string; // Travel time
  monthlyCost: string;    // Financial burden
  narrative: string;      // Full first-person story
}
```

**Outputs:**
- JSON file with all records (research_data.json - 1.3MB in sample)
- Can generate thousands of unique narratives
- Ready for statistical analysis and visualization

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | Generation UI and API |
| **TypeScript** | Type-safe factorial design |
| **React 19** | UI components |
| **Claude API** | Narrative generation with cultural awareness |
| **Tailwind CSS** | UI styling |

---

## Research-Viz

### What It Actually Is

Research-Viz is a **visualization dashboard** for displaying AI-generated research data. It provides interactive exploration of themes, demographics, and insights from the generated narratives.

**Key Insight:** This is the VISUAL PROOF component - it transforms raw generated data into compelling, interactive visualizations that demonstrate the quality and depth of the AI Research Pipeline output.

### Visual Components

**1. StatsCard Component:**
- Animated number counters
- Icon + color theming
- Metrics: Total participants, sports represented, themes identified, average narrative length

**2. ThemeClusterChart Component:**
- Horizontal bar chart with theme names
- Sentiment indicators (positive/negative/neutral)
- Click to select and explore themes
- Background fill animation based on count

**3. NetworkGraph Component (MOST IMPRESSIVE):**
- Force-directed graph visualization
- Animated node simulation with physics
- Nodes sized by record count
- Lines connect themes sharing keywords
- Interactive - click to select themes
- SVG-based with custom collision detection

**4. WordCloud Component:**
- Hebrew text word extraction
- Stopword filtering
- Size based on frequency
- Animated spring entrance
- Color-coded categories

**5. SentimentChart Component:**
- Stacked horizontal bar chart
- Recharts integration
- Positive/Neutral/Negative breakdown
- Custom tooltip

**6. DemographicPieChart Component:**
- Pie chart distribution
- Recharts ResponsiveContainer
- Multiple demographic breakdowns

**7. QuoteExplorer Component:**
- Shows actual narrative excerpts
- Filtered by selected theme
- Displays demographic profile badges
- Animated list with stagger

**8. InsightCard Component:**
- Key research findings
- Type-coded (positive/negative/neutral)
- Statistics display
- Staggered animation

### Integration Approach

**For the AI Research Pipeline page on ahiya.xyz:**

1. **Embed Key Visualizations:**
   - NetworkGraph showing theme clusters
   - ThemeClusterChart with clickable themes
   - QuoteExplorer showing sample narratives

2. **Option A - iFrame Integration:**
   - Host Research-Viz on a subdomain
   - Embed specific views via iframe

3. **Option B - Component Port:**
   - Port key components to ahiya-xyz
   - Include sample data subset
   - Simpler maintenance

4. **Option C - Screenshots + Animation:**
   - Capture static visualizations
   - Add subtle animations
   - Link to full dashboard

**Recommended: Option B** - Port the NetworkGraph and ThemeClusterChart as interactive demos directly into the AI Research Pipeline page.

### Demo Content Recommendations

**The enhanced AI Research Pipeline page should show:**

1. **Current Sample Outputs Section (already exists):**
   - Tab-based narrative viewer
   - Demographic profile display
   - Full narrative text with streaming reveal
   - **KEEP THIS - it is already excellent**

2. **NEW: Theme Visualization Section:**
   - Port NetworkGraph component
   - Show how themes emerge from narratives
   - Interactive - click themes to see related narratives

3. **NEW: Demographics Dashboard:**
   - Pie charts showing distribution
   - Sentiment analysis by demographic
   - Visual proof of balanced factorial design

4. **NEW: Key Insights Section:**
   - InsightCards showing research findings
   - Statistics on coverage
   - Cultural nuance examples

---

## SelahReach Page Design

### Detailed Recommendations for NEW Project Page

**Route:** `/projects/selahreach`

**Visual Approach:** Terminal/Code Aesthetic (like the 2L page energy)

### Hero Section
```
Title: "SelahReach"
Subtitle: "AI-Powered Outreach, Human Connection"

Visual: Split screen
- Left: Terminal showing Claude Code workflow
- Right: Kanban board preview with animated card movement

Badge: "Built with Claude Code"
```

### Demo Flow (Interactive)

**Demo 1: The Pipeline View**
```jsx
// Interactive Kanban with sample data
// Shows 3-4 cards across stages
// One card animates from Lead -> Contacted when user clicks "Send Outreach"
```

**Demo 2: Claude Code Conversation**
```jsx
// Terminal-style component showing:
// User: "Send outreach email to 500Tech"
// System: Shows step-by-step process
// Typewriter effect for each step
// Final: "Email sent! Stage updated."
```

**Demo 3: Email Preview**
```jsx
// Shows the actual HTML email template
// Highlights personalization: {SPECIALIZATION}
// Shows the P.S. line about AI
```

### Content Structure

1. **The Problem**
   - "Traditional outreach is manual and time-consuming"
   - "Personalization at scale is nearly impossible"
   - "CRM and email are disconnected tools"

2. **The Solution**
   - "Claude Code as your outreach assistant"
   - "One conversation to research, draft, send, and track"
   - "Every email is personalized and logged automatically"

3. **How It Works (Visual Flow)**
   ```
   [User Request] -> [Contact Lookup] -> [Email Draft] -> [Approval] -> [Send] -> [Log & Track]
   ```

4. **The Innovation**
   - "This email was sent by an AI system I built"
   - "Demonstrates capability while doing the work"
   - "Every cold email is a portfolio piece"

5. **Technical Deep-Dive**
   - tRPC API architecture
   - Gmail MCP integration
   - Real-time pipeline updates
   - Activity logging

6. **Key Metrics (animate counters)**
   - "7 Pipeline Stages"
   - "3 Click Workflow" (approve, send, done)
   - "100% AI-Drafted"
   - "0 Copy-Paste"

### Key Selling Points

1. **Claude Code Integration is the Hero:**
   - This is unique - most CRMs don't work with AI assistants
   - The conversational interface is the differentiator

2. **Full-Stack Technical Excellence:**
   - Modern stack (Next.js 15, tRPC, Drizzle)
   - Type-safe from database to API to UI
   - Real-time updates with React Query

3. **Practical Business Tool:**
   - Actually being used for agency outreach
   - Real results (contacts tracked, emails sent)
   - Not just a demo

4. **Self-Demonstrating:**
   - The P.S. line in every email
   - "Meta-marketing" - the tool markets itself

### Visual Elements to Create

1. **Pipeline Kanban Mock:**
   - 7 columns with stage names
   - Sample contact cards with avatars
   - Drag indicator animations

2. **Terminal Conversation:**
   - Claude Code style terminal
   - Green/amber text on dark background
   - Typewriter cursor effect

3. **Email Template Preview:**
   - Browser-style email viewer
   - HTML email with logo
   - Highlighted personalization vars

4. **Activity Timeline:**
   - Vertical timeline component
   - Icons for each activity type
   - Timestamp and descriptions

---

## Summary for Builders

### SelahReach Page Builder Should:

1. Create a NEW page at `/app/projects/selahreach/page.tsx`
2. Follow terminal/code aesthetic similar to the current 2L page
3. Include interactive demos:
   - Pipeline view with drag animation
   - Claude Code conversation simulator
   - Email preview with template
4. Show the full workflow from request to logged email
5. Emphasize Claude Code integration as the key differentiator
6. Include the P.S. line messaging as a unique selling point

### AI Research Pipeline Page Builder Should:

1. KEEP the existing Sample Outputs section (it is excellent)
2. ADD visual components from Research-Viz:
   - NetworkGraph for theme clustering
   - ThemeClusterChart for theme selection
   - QuoteExplorer connected to theme selection
3. Consider porting these React components directly
4. Ensure the visualizations are bilingual (Hebrew themes, English labels)
5. Add an "Insights" section with key findings

### Homepage Update Builder Should:

1. Replace Wealth in the portfolio grid with SelahReach
2. Update the project card:
   - Title: "SelahReach"
   - Description: "AI-Powered Outreach Automation"
   - Route: `/projects/selahreach`
   - Tag: "Claude Code" or "AI Automation"
3. Remove any navigation links to /projects/wealth
4. Ensure consistent ordering in portfolio

---

*Exploration completed: 2025-12-04*
*This report informs master planning decisions for Plan-10*
