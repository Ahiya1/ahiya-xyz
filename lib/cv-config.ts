/**
 * CV Page Configuration
 *
 * This config controls the hidden /cv page content and availability status.
 * Change availabilityStatus to 'closed' when not accepting new engagements.
 */

export type AvailabilityStatus = "open" | "closed";

export interface SystemProject {
  name: string;
  description: string;
  link?: string;
  external?: boolean;
}

export interface CVConfig {
  availabilityStatus: AvailabilityStatus;
  contactEmail: string;
  emailSubject: string;
  systems: SystemProject[];
  copy: {
    headline: string;
    subheadline: string;
    philosophy: string;
    operationalScope: string[];
    availabilityOpen: string;
    availabilityClosed: string;
    contactSupportText: string;
    pdfDownloadText: string;
    footerSignal: string;
  };
}

export const cvConfig: CVConfig = {
  availabilityStatus: "open",

  contactEmail: "ahiya.butman@gmail.com",
  emailSubject: "Part-time Collaboration Inquiry",

  systems: [
    {
      name: "2L",
      description:
        "AI agent orchestration framework for parallel software delivery",
      link: "/2l",
    },
    {
      name: "AI Research Pipeline",
      description:
        "Factorial design engine for controlled academic data generation",
      link: "/projects/ai-research-pipeline",
    },
    {
      name: "StatViz",
      description: "B2B statistical reports platform with Hebrew RTL support",
      link: "https://statviz.xyz",
      external: true,
    },
    {
      name: "SelahReach",
      description: "Intelligent outreach automation with Claude Code integration",
      link: "/projects/selahreach",
    },
  ],

  copy: {
    headline: "Systems-level AI builder.",
    subheadline:
      "I design and ship production-grade software where agents, data pipelines, and execution loops converge. Clarity in architecture. Precision in delivery.",
    philosophy:
      "Independent by default. Selective collaboration when alignment is clear.",
    operationalScope: [
      "Part-time engagements only",
      "Remote-first, timezone-flexible",
      "Systems, agents, AI pipelines, automation",
    ],
    availabilityOpen: "Open to part-time collaboration",
    availabilityClosed: "Currently closed to new engagements",
    contactSupportText: "One channel. Direct communication.",
    pdfDownloadText:
      "For formal internal processes, a one-page PDF version is available.",
    footerSignal: "Select part-time availability for systems roles.",
  },
};

export function getAvailabilityText(config: CVConfig = cvConfig): string {
  return config.availabilityStatus === "open"
    ? config.copy.availabilityOpen
    : config.copy.availabilityClosed;
}

export function getMailtoUrl(config: CVConfig = cvConfig): string {
  const subject = encodeURIComponent(config.emailSubject);
  return `mailto:${config.contactEmail}?subject=${subject}`;
}

export default cvConfig;
