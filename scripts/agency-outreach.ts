import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load environment variables from mirror-of-dreams
dotenv.config({ path: path.join(__dirname, '../../mirror-of-dreams/.env.local') });

// Agency contact list - Israeli software development agencies
const agencies = [
  {
    name: 'Moblers',
    email: 'hi@moblers.com',
    specialty: 'mobile and web development',
    website: 'moblers.com',
  },
  {
    name: '500Tech',
    email: 'info@500tech.com',
    specialty: 'front-end development and consulting',
    website: '500tech.com',
  },
  {
    name: 'Profisea',
    email: 'info@profisea.com',
    specialty: 'DevOps and cloud solutions',
    website: 'profisea.com',
  },
  {
    name: 'rgbcode',
    email: 'hello@rgbcode.com',
    specialty: 'web development',
    website: 'rgbcode.com',
  },
  {
    name: 'Trivium Solutions',
    email: 'info@3vium.com',
    specialty: 'embedded systems and IoT',
    website: '3vium.com',
  },
  {
    name: 'Dofinity',
    email: 'hello@dofinity.com',
    specialty: 'web development and AI solutions',
    website: 'dofinity.com',
  },
  {
    name: 'Fayrix Israel',
    email: 'israel@fayrix.com',
    specialty: 'custom software development',
    website: 'fayrix.com',
  },
  {
    name: 'Scalo',
    email: 'lukasz.pol@scalosoft.com',
    specialty: 'IT services and software development',
    website: 'scalosoft.com',
  },
  {
    name: 'Comm-IT',
    email: 'info@comm-it.com',
    specialty: 'software and systems development',
    website: 'comm-it.com',
  },
  {
    name: 'Brights',
    email: 'hello@brights.io',
    specialty: 'software design and development',
    website: 'brights.io',
  },
];

// Email template - personalized for each agency
function generateEmailContent(agency: typeof agencies[0]) {
  const subject = `AI Development Partnership Opportunity`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .signature { margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; }
    a { color: #6366f1; }
  </style>
</head>
<body>
  <p>Hi ${agency.name} team,</p>

  <p>I'm Ahiya, a full-stack developer based in Israel specializing in <strong>AI-powered SaaS applications</strong>.</p>

  <p>I noticed you're doing great work in ${agency.specialty}. Many agencies are getting requests for AI features but lack the specialized expertise to deliver them quickly.</p>

  <p><strong>I can help with that.</strong></p>

  <p>I build complete AI solutions in 2-4 weeks:</p>
  <ul>
    <li>LLM integrations (Claude, GPT)</li>
    <li>AI agents and automation workflows</li>
    <li>Full-stack SaaS with AI capabilities</li>
    <li>Data dashboards and analysis tools</li>
  </ul>

  <p>I work as a white-label partner - your clients see your brand, not mine. Check out my recent work at <a href="https://ahiya.xyz">ahiya.xyz</a></p>

  <p>Would you be open to a quick call to explore if there's a fit?</p>

  <div class="signature">
    <p>
      <strong>Ahiya</strong><br>
      Full-Stack AI Developer<br>
      <a href="https://ahiya.xyz">ahiya.xyz</a>
    </p>
  </div>
</body>
</html>
  `.trim();

  const text = `
Hi ${agency.name} team,

I'm Ahiya, a full-stack developer based in Israel specializing in AI-powered SaaS applications.

I noticed you're doing great work in ${agency.specialty}. Many agencies are getting requests for AI features but lack the specialized expertise to deliver them quickly.

I can help with that.

I build complete AI solutions in 2-4 weeks:
- LLM integrations (Claude, GPT)
- AI agents and automation workflows
- Full-stack SaaS with AI capabilities
- Data dashboards and analysis tools

I work as a white-label partner - your clients see your brand, not mine. Check out my recent work at https://ahiya.xyz

Would you be open to a quick call to explore if there's a fit?

---
Ahiya
Full-Stack AI Developer
https://ahiya.xyz
  `.trim();

  return { subject, html, text };
}

// Create transporter
function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

// Send email with delay to avoid rate limiting
async function sendEmail(
  transporter: nodemailer.Transporter,
  agency: typeof agencies[0],
  dryRun: boolean = false
) {
  const { subject, html, text } = generateEmailContent(agency);

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: agency.email,
    subject,
    text,
    html,
  };

  if (dryRun) {
    console.log(`[DRY RUN] Would send to: ${agency.name} <${agency.email}>`);
    console.log(`  Subject: ${subject}`);
    return { success: true, dryRun: true };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✓ Sent to ${agency.name} <${agency.email}> - Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`✗ Failed to send to ${agency.name} <${agency.email}>:`, error);
    return { success: false, error };
  }
}

// Delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Main function
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const sendAll = args.includes('--send');
  const listOnly = args.includes('--list');

  console.log('========================================');
  console.log('  Agency Outreach Script');
  console.log('========================================\n');

  if (listOnly) {
    console.log('Agency List:\n');
    agencies.forEach((a, i) => {
      console.log(`${i + 1}. ${a.name}`);
      console.log(`   Email: ${a.email}`);
      console.log(`   Specialty: ${a.specialty}`);
      console.log(`   Website: ${a.website}\n`);
    });
    console.log(`Total: ${agencies.length} agencies`);
    return;
  }

  if (!dryRun && !sendAll) {
    console.log('Usage:');
    console.log('  --list      List all agencies');
    console.log('  --dry-run   Preview emails without sending');
    console.log('  --send      Actually send the emails\n');
    console.log('Run with --dry-run first to preview!');
    return;
  }

  console.log(`Mode: ${dryRun ? 'DRY RUN (preview only)' : 'SENDING EMAILS'}`);
  console.log(`Agencies: ${agencies.length}\n`);

  const transporter = createTransporter();

  // Verify connection
  if (!dryRun) {
    try {
      await transporter.verify();
      console.log('✓ SMTP connection verified\n');
    } catch (error) {
      console.error('✗ SMTP connection failed:', error);
      process.exit(1);
    }
  }

  const results: { agency: string; success: boolean }[] = [];

  for (let i = 0; i < agencies.length; i++) {
    const agency = agencies[i];
    console.log(`[${i + 1}/${agencies.length}] Processing ${agency.name}...`);

    const result = await sendEmail(transporter, agency, dryRun);
    results.push({ agency: agency.name, success: result.success });

    // Wait 5 seconds between emails to avoid rate limiting
    if (!dryRun && i < agencies.length - 1) {
      console.log('  Waiting 5 seconds before next email...\n');
      await delay(5000);
    }
  }

  // Summary
  console.log('\n========================================');
  console.log('  Summary');
  console.log('========================================');
  const successful = results.filter(r => r.success).length;
  console.log(`Successful: ${successful}/${agencies.length}`);

  if (!dryRun) {
    // Log results to file
    const logPath = path.join(__dirname, 'outreach-log.json');
    const logEntry = {
      timestamp: new Date().toISOString(),
      results,
    };

    let existingLog: any[] = [];
    if (fs.existsSync(logPath)) {
      existingLog = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
    }
    existingLog.push(logEntry);
    fs.writeFileSync(logPath, JSON.stringify(existingLog, null, 2));
    console.log(`\nLog saved to: ${logPath}`);
  }
}

main().catch(console.error);
