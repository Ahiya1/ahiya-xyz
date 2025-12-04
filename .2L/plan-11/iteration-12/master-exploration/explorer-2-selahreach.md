# Explorer 2: SelahReach Analysis

## Executive Summary

SelahReach is a Claude Code-operated CRM built for outreach to Israeli software agencies. It features a drag-and-drop Kanban pipeline, activity timeline, email logging, and API endpoints designed for AI operation. The application demonstrates AI-human collaboration with the clever P.S. line: "This email was composed and sent by an AI system I built - happy to show you how it works if you're curious."

---

## Pipeline Stages

The outreach pipeline consists of 7 stages in the following order:

1. **Lead** - Initial contact, not yet reached out
2. **Contacted** - Outreach email sent, awaiting response
3. **Replied** - Contact responded to outreach
4. **Call Scheduled** - Meeting/call booked
5. **Proposal** - Proposal sent, negotiating
6. **Closed Won** - Deal closed successfully
7. **Closed Lost** - Deal did not proceed

### Stage Configuration (from schema)
```typescript
export const PIPELINE_STAGES = [
  'lead',
  'contacted',
  'replied',
  'call_scheduled',
  'proposal',
  'closed_won',
  'closed_lost',
] as const
```

### Stage Display Labels
```typescript
const labels: Record<PipelineStage, string> = {
  lead: 'Lead',
  contacted: 'Contacted',
  replied: 'Replied',
  call_scheduled: 'Call Scheduled',
  proposal: 'Proposal',
  closed_won: 'Won',
  closed_lost: 'Lost',
}
```

---

## Email Template Structure

### Subject Format
```
AI Development Partnership - Quick Question
```

### Body Structure
The email template follows this pattern:

1. **Greeting**: Simple "Hi,"
2. **Hook**: Reference to their specialization (personalized placeholder)
3. **Value Proposition**: AI-powered tools expertise (Claude, GPT)
4. **Offer**: White-label partnership, rapid delivery (2-4 weeks)
5. **Call to Action**: 15-minute call request
6. **Sign-off**: "Best, Ahiya"
7. **The P.S. Line**: AI disclosure that doubles as a portfolio piece
8. **Signature Block**: Logo, website link

### Key Elements

**Personalization Placeholders:**
- `{SPECIALIZATION}` - Agency's area of expertise

**Email Template (Plain Text):**
```
Hi,

I'm reaching out because I noticed your work in {SPECIALIZATION} and thought there might be an interesting collaboration opportunity.

I specialize in building AI-powered tools and integrations using Claude and GPT - things like automated workflows, intelligent assistants, and custom AI features for SaaS products.

I'm currently looking to partner with agencies that could use an AI specialist for client projects. The setup is simple: white-label partnership, rapid delivery (typically 2-4 weeks), and I handle the AI complexity so you can focus on your core services.

Would you be open to a quick 15-minute call to see if there's a fit?

Best,
Ahiya

P.S. This email was composed and sent by an AI system I built - happy to show you how it works if you're curious.

---
ahiya.xyz
```

### The P.S. Line (CRITICAL - Portfolio Proof Point)
```
"P.S. This email was composed and sent by an AI system I built - happy to show you how it works if you're curious."
```

This line is genius because it:
1. Transparently discloses AI involvement
2. Demonstrates the exact capability being sold
3. Creates curiosity and conversation starter
4. Differentiates from typical cold outreach

---

## Activity Log Format

### Activity Types
```typescript
export const ACTIVITY_TYPES = [
  'email_sent',
  'stage_change',
  'note',
  'reply_received',
] as const
```

### Activity Log Examples

Activities are logged with timestamps and descriptions:

| Type | Icon | Color | Example Description |
|------|------|-------|---------------------|
| `email_sent` | Mail | Blue (`bg-blue-100 text-blue-800`) | `Email sent: "AI Development Partnership - Quick Question"` |
| `stage_change` | ArrowRight | Purple (`bg-purple-100 text-purple-800`) | `Stage changed: lead -> contacted` |
| `note` | MessageSquare | Gray (`bg-gray-100 text-gray-800`) | `Contact created: 500Tech` |
| `reply_received` | Reply | Green (`bg-green-100 text-green-800`) | `Reply received: "Re: AI Development Partnership"` |

### Activity Timeline Display
```
[Blue Circle] Email sent: "AI Development Partnership - Quick Question"
             2 hours ago

[Purple Circle] Stage changed: lead -> contacted
               2 hours ago

[Green Circle] Reply received: "Re: AI Development Partnership"
              1 day ago
```

---

## Visual Identity

### Stage Colors (Header)
```typescript
const STAGE_HEADER_COLORS: Record<PipelineStage, string> = {
  lead: 'bg-gray-200 border-gray-300',
  contacted: 'bg-blue-100 border-blue-200',
  replied: 'bg-yellow-100 border-yellow-200',
  call_scheduled: 'bg-purple-100 border-purple-200',
  proposal: 'bg-orange-100 border-orange-200',
  closed_won: 'bg-green-100 border-green-200',
  closed_lost: 'bg-red-100 border-red-200',
}
```

### Stage Colors (Background)
```typescript
const STAGE_BG_COLORS: Record<PipelineStage, string> = {
  lead: 'bg-gray-50',
  contacted: 'bg-blue-50',
  replied: 'bg-yellow-50',
  call_scheduled: 'bg-purple-50',
  proposal: 'bg-orange-50',
  closed_won: 'bg-green-50',
  closed_lost: 'bg-red-50',
}
```

### Stage Badge Colors
```typescript
const colors: Record<PipelineStage, string> = {
  lead: 'bg-gray-100 text-gray-800',
  contacted: 'bg-blue-100 text-blue-800',
  replied: 'bg-yellow-100 text-yellow-800',
  call_scheduled: 'bg-purple-100 text-purple-800',
  proposal: 'bg-orange-100 text-orange-800',
  closed_won: 'bg-green-100 text-green-800',
  closed_lost: 'bg-red-100 text-red-800',
}
```

### Terminal/Operational Aesthetic Elements

While SelahReach uses standard shadcn/ui styling, there are opportunities to enhance the "command center" feel:

1. **Activity Icons**: Mail, ArrowRight, MessageSquare, Reply (Lucide icons)
2. **Timestamps**: Relative time format ("2 hours ago", "1 day ago")
3. **Card States**: Visual feedback during drag (rotate, scale, shadow)
4. **Stage Indicators**: Color-coded badges and backgrounds
5. **Empty States**: "No contacts" with dashed border

### Typography
- Font: Inter (system)
- Headings: Bold, size-based hierarchy
- Timestamps: Smaller, muted color

---

## Kanban Structure

### Columns
7 columns representing pipeline stages, displayed horizontally with overflow scroll:
- Min-width: 280px per column
- Flexible spacing with gap-4
- Rounded corners (rounded-lg)
- Stage-specific background colors

### Card States

**Default State:**
- White card with border
- Hover: shadow-md
- Cursor: grab

**Dragging State:**
```typescript
isDragging && 'opacity-90 shadow-xl rotate-2 scale-105'
```

**Drop Target State:**
```typescript
isOver && 'ring-2 ring-primary ring-offset-2 scale-[1.02]'
```

**Empty Column State:**
```typescript
'text-sm text-muted-foreground text-center py-12 border-2 border-dashed rounded-lg'
isOver && 'border-primary bg-primary/5'
```

### Card Content
Each contact card displays:
1. Grip handle icon (for drag affordance)
2. Contact name (truncated)
3. Email (with Mail icon)
4. Website (with Globe icon, optional)
5. Specialization badge (optional)
6. "Updated X ago" timestamp

### Drag-and-Drop Implementation
- Library: @dnd-kit/core, @dnd-kit/sortable
- Sensors: PointerSensor (8px activation), TouchSensor (250ms delay), KeyboardSensor
- Custom collision detection for empty columns
- Optimistic UI updates with rollback on error
- Toast notifications for stage changes

---

## Tech Stack

### Core Framework
- **Next.js 15** with App Router + Turbopack
- **React 19**
- **TypeScript 5.7**

### Database
- **SQLite** via better-sqlite3
- **Drizzle ORM** for schema and queries
- File-based storage: `data/sealhreach.db`

### API Layer
- **tRPC** (v11) for type-safe API
- React Query integration for data fetching
- superjson for serialization

### UI Components
- **shadcn/ui** components (Button, Card, Badge, Dialog, Select, etc.)
- **Radix UI** primitives
- **Tailwind CSS** with tailwindcss-animate
- **Lucide React** icons
- **Sonner** for toast notifications

### Drag-and-Drop
- **@dnd-kit/core** - Core DnD functionality
- **@dnd-kit/sortable** - Sortable lists
- **@dnd-kit/utilities** - Helper utilities

### Utilities
- **date-fns** for time formatting
- **clsx** + **tailwind-merge** for className handling
- **zod** for validation

---

## tRPC API Reference

### Contacts Router
| Endpoint | Method | Description |
|----------|--------|-------------|
| `contacts.list` | Query | List all contacts, optionally filter by stage |
| `contacts.getById` | Query | Get contact with emails and activities |
| `contacts.getByEmail` | Query | Find contact by email address |
| `contacts.search` | Query | Search by name, email, or specialization |
| `contacts.create` | Mutation | Create new contact |
| `contacts.update` | Mutation | Update contact details |
| `contacts.updateStage` | Mutation | Move contact to new pipeline stage |
| `contacts.delete` | Mutation | Delete contact |
| `contacts.listByStage` | Query | Get contacts grouped by stage (for Kanban) |

### Emails Router
| Endpoint | Method | Description |
|----------|--------|-------------|
| `emails.listByContact` | Query | List emails for a contact |
| `emails.create` | Mutation | Log sent email |
| `emails.createReceived` | Mutation | Log received reply |
| `emails.getById` | Query | Get email by ID |
| `emails.findByThreadId` | Query | Find email by Gmail thread ID |

### Activities Router
| Endpoint | Method | Description |
|----------|--------|-------------|
| `activities.listByContact` | Query | List activities for a contact |
| `activities.create` | Mutation | Create activity/note |
| `activities.getById` | Query | Get activity by ID |
| `activities.listRecent` | Query | Get recent activities across all contacts |

### Pipeline Router
| Endpoint | Method | Description |
|----------|--------|-------------|
| `pipeline.getStats` | Query | Get pipeline statistics by stage |
| `pipeline.getByStage` | Query | Get contacts in specific stage |
| `pipeline.getStageHistory` | Query | Get stage history for contact |
| `pipeline.getRecentStageChanges` | Query | Get recent stage changes |
| `pipeline.getStaleContacted` | Query | Get contacts needing follow-up |

---

## The Command Center Vibe

What makes SelahReach feel operational and powerful:

1. **Visual Pipeline Overview**: Instant view of all outreach status at a glance
2. **Drag-and-Drop Stage Management**: Physical interaction with data
3. **Activity Timeline**: Complete audit trail of all interactions
4. **Color-Coded Status**: Immediate visual recognition of stage
5. **AI-Operated**: Claude Code runs the system, human observes and approves
6. **Real-Time Feedback**: Toast notifications for actions
7. **Optimistic Updates**: Instant UI response, background sync

### The "Mission Control" Metaphor
- Each contact is a "mission" being tracked
- Pipeline stages represent mission phases
- Activity log is the mission log
- Emails are communications records
- Stage changes are status updates

---

## Recommendations for Portfolio Page

### 1. Interactive Kanban Demo
Create a simplified, interactive Kanban board showing:
- 3-4 mock contacts across different stages
- Drag-and-drop working (even if just visual)
- Stage colors matching the real app
- Contact cards with agency names like "500Tech", "Moblers"

### 2. Live Activity Feed
Display scrolling activity log with examples:
```
[09:32] Email sent to 500Tech: "AI Development Partnership"
[09:32] 500Tech moved: lead -> contacted
[11:15] Reply received from 500Tech
[11:15] 500Tech moved: contacted -> replied
```

### 3. Email Preview Panel
Show the actual email template with:
- Syntax highlighting for the P.S. line
- Hover effect revealing "This was sent by AI"
- The signature with ahiya.xyz logo

### 4. Terminal Aesthetic Enhancements
For command center feel:
- Monospace font for logs/timestamps
- Blinking cursor effect
- Green-on-dark for activity feed
- "Status: OPERATIONAL" indicator
- Glowing border on hover

### 5. Stats Dashboard Mock
Show pipeline statistics:
```
Total Contacts: 10
Active Pipeline: 7
Contacted: 4
Replies: 2
Conversion Rate: 20%
```

### 6. Key Tech Badges
Highlight the stack:
- Next.js 15
- tRPC
- Claude Code Operated
- Gmail MCP Integration

### 7. The P.S. Line Feature
Make the P.S. line a prominent feature:
- Quote block with special styling
- Explanation of why it's clever
- Connection to "AI as a Service" value prop

### 8. Demo Data Structure
Mock contacts for demo:
```typescript
const DEMO_CONTACTS = [
  { name: '500Tech', stage: 'replied', specialization: 'Front-end' },
  { name: 'Moblers', stage: 'contacted', specialization: 'Mobile/IoT' },
  { name: 'Profisea', stage: 'call_scheduled', specialization: 'DevOps' },
  { name: 'Brights', stage: 'lead', specialization: 'Design' },
]
```

### 9. Command Center Title Treatment
Instead of "SelahReach", frame it as:
- "Outreach Command Center"
- "AI-Operated CRM"
- "The System That Sold Itself"

### 10. Call-to-Action Integration
Link the P.S. line to portfolio messaging:
- "Every email proves our capability"
- "The tool becomes the portfolio"
- "AI that demonstrates AI"

---

## Files Referenced

| File | Path | Purpose |
|------|------|---------|
| Schema | `/home/ahiya/Ahiya/2L/Prod/sealhreach/lib/db/schema.ts` | Database models |
| Pipeline Router | `/home/ahiya/Ahiya/2L/Prod/sealhreach/lib/trpc/routers/pipeline.ts` | Pipeline API |
| Contacts Router | `/home/ahiya/Ahiya/2L/Prod/sealhreach/lib/trpc/routers/contacts.ts` | Contacts API |
| KanbanBoard | `/home/ahiya/Ahiya/2L/Prod/sealhreach/components/pipeline/KanbanBoard.tsx` | Main board |
| StageColumn | `/home/ahiya/Ahiya/2L/Prod/sealhreach/components/pipeline/StageColumn.tsx` | Column component |
| ActivityItem | `/home/ahiya/Ahiya/2L/Prod/sealhreach/components/timeline/ActivityItem.tsx` | Activity display |
| Utils | `/home/ahiya/Ahiya/2L/Prod/sealhreach/lib/utils.ts` | Formatting helpers |
| Globals CSS | `/home/ahiya/Ahiya/2L/Prod/sealhreach/app/globals.css` | Theme variables |
| Outreach Guide | `/home/ahiya/Ahiya/2L/Prod/sealhreach/OUTREACH-GUIDE.md` | Email template |
| Vision | `/home/ahiya/Ahiya/2L/Prod/sealhreach/.2L/plan-1/vision.md` | Project requirements |
