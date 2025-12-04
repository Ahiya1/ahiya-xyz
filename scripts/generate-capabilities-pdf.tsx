import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  renderToFile,
} from '@react-pdf/renderer';
import path from 'path';

// Professional one-page PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    borderBottom: '2px solid #7c3aed',
    paddingBottom: 15,
  },
  logo: {
    width: 100,
  },
  headerRight: {
    textAlign: 'right',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 3,
  },
  tagline: {
    fontSize: 10,
    color: '#7c3aed',
    fontStyle: 'italic',
    marginTop: 4,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: '1px solid #e2e8f0',
  },
  contactItem: {
    fontSize: 9,
    color: '#64748b',
  },
  valueProposition: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  valueText: {
    fontSize: 11,
    color: '#334155',
    lineHeight: 1.5,
    textAlign: 'center',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '50%',
    paddingRight: 15,
    marginBottom: 10,
  },
  capabilityTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  capabilityDesc: {
    fontSize: 9,
    color: '#64748b',
    lineHeight: 1.4,
  },
  projectRow: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottom: '1px solid #f1f5f9',
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  projectSubtitle: {
    fontSize: 9,
    color: '#7c3aed',
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 8,
    color: '#64748b',
    lineHeight: 1.4,
  },
  techStackGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  techPill: {
    fontSize: 8,
    color: '#334155',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    borderTop: '1px solid #e2e8f0',
    paddingTop: 12,
  },
  footerText: {
    fontSize: 9,
    color: '#64748b',
  },
  footerCta: {
    fontSize: 10,
    color: '#7c3aed',
    fontWeight: 'bold',
    marginTop: 4,
  },
});

// Capabilities data
const capabilities = [
  {
    title: 'Full-Stack SaaS Systems',
    description: 'User management, dashboards, admin panels, auth, analytics',
  },
  {
    title: 'AI Pipelines & Orchestration',
    description: 'Embedding workflows, RAG systems, multi-agent reasoning',
  },
  {
    title: 'Research Tools & Statistical Systems',
    description: 'Factorial design engines, dataset generation, analysis',
  },
  {
    title: 'Business Automation Tools',
    description: 'Internal dashboards, workflow automation, CRM-like tools',
  },
  {
    title: 'Custom APIs & Infrastructure',
    description: 'Fast, scalable, containerized, production-ready',
  },
  {
    title: 'UX-Light Tools, Heavy Logic',
    description: 'Minimal interfaces backed by powerful systems',
  },
];

// Selected work
const selectedWork = [
  {
    title: 'StatViz',
    subtitle: 'Statistical Reports Platform',
    description: 'B2B platform for interactive statistical reports with Hebrew support and password-protected access.',
  },
  {
    title: 'Wealth',
    subtitle: 'Personal Finance SaaS',
    description: 'Complete budgeting with Israeli bank connections, AI categorization, and forecasting.',
  },
  {
    title: 'Mirror of Dreams',
    subtitle: 'AI Reflection Engine',
    description: 'Semantic journaling with insights, prompt flows, vector search, and daily reflection cycles.',
  },
  {
    title: 'AI Research Pipeline',
    subtitle: 'Factorial Design Tool',
    description: 'Controlled, demographically weighted narrative generation for academic research at scale.',
  },
];

// Tech stack
const techStack = [
  'Python', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'FastAPI', 'Flask', 'PostgreSQL', 'MongoDB', 'Supabase',
  'Docker', 'OpenAI API', 'Claude API', 'Vector Stores',
  'Tailwind CSS', 'Vercel', 'GitHub Actions',
];

// PDF Document Component
const CapabilitiesDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image
          src={path.join(process.cwd(), 'public', 'logo-text.png')}
          style={styles.logo}
        />
        <View style={styles.headerRight}>
          <Text style={styles.title}>Ahiya Butman</Text>
          <Text style={styles.subtitle}>Systems Developer & AI Architect</Text>
          <Text style={styles.tagline}>Intention. Clarity. Results.</Text>
        </View>
      </View>

      {/* Contact Row */}
      <View style={styles.contactRow}>
        <Text style={styles.contactItem}>ahiya.xyz</Text>
        <Text style={styles.contactItem}>ahiya.butman@gmail.com</Text>
        <Text style={styles.contactItem}>github.com/Ahiya1</Text>
      </View>

      {/* Value Proposition */}
      <View style={styles.valueProposition}>
        <Text style={styles.valueText}>
          I build intelligent software systems that solve real business problems.
          From research automation to SaaS tools to AI pipelines, I take projects
          from concept to deployed product in weeks, not months.
        </Text>
      </View>

      {/* Capabilities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Capabilities</Text>
        <View style={styles.grid}>
          {capabilities.map((cap, index) => (
            <View key={index} style={styles.gridItem}>
              <Text style={styles.capabilityTitle}>{cap.title}</Text>
              <Text style={styles.capabilityDesc}>{cap.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Selected Work */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected Work</Text>
        {selectedWork.map((project, index) => (
          <View key={index} style={styles.projectRow}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectSubtitle}>{project.subtitle}</Text>
            <Text style={styles.projectDesc}>{project.description}</Text>
          </View>
        ))}
      </View>

      {/* Tech Stack */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tech Stack</Text>
        <View style={styles.techStackGrid}>
          {techStack.map((tech, index) => (
            <Text key={index} style={styles.techPill}>{tech}</Text>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Available for 1-2 mid-size projects per month
        </Text>
        <Text style={styles.footerCta}>
          Let's build something great together
        </Text>
      </View>
    </Page>
  </Document>
);

// Generate PDF function
async function generatePDF() {
  const outputPath = path.join(process.cwd(), 'public', 'ahiya-capabilities.pdf');

  console.log('Generating capabilities PDF...');

  await renderToFile(<CapabilitiesDocument />, outputPath);

  console.log(`PDF generated successfully: ${outputPath}`);
}

generatePDF().catch((error) => {
  console.error('Failed to generate PDF:', error);
  process.exit(1);
});
