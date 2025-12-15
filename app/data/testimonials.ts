/**
 * Testimonials Data
 *
 * Client testimonials from various project types:
 * - Institutional (academic)
 * - Corporate (business)
 * - Personal (individual users)
 */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  type: "institutional" | "corporate" | "personal";
  logo: {
    type: "emoji" | "text";
    value: string;
    gradient: string;
  };
  project: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "herzog-college",
    quote:
      "The students were very satisfied with the efficiency and the results in StatViz",
    author: "Michal Schriber",
    role: "Head of Department",
    organization: "Herzog College",
    type: "institutional",
    project: "StatViz",
    logo: {
      type: "text",
      value: "HC",
      gradient: "from-blue-500 to-indigo-600",
    },
  },
  {
    id: "hit",
    quote:
      "The AI results were comprehensive and aligned with our purpose. Exactly what we needed",
    author: "Research Team",
    role: "",
    organization: "Holon Institute of Technology",
    type: "corporate",
    project: "AI Research Pipeline",
    logo: {
      type: "text",
      value: "HIT",
      gradient: "from-emerald-500 to-teal-600",
    },
  },
  {
    id: "mirror-user",
    quote:
      "The app helped me connect to my aspirations in a transitional period in my life",
    author: "Early User",
    role: "",
    organization: "Mirror of Dreams",
    type: "personal",
    project: "Mirror of Dreams",
    logo: {
      type: "emoji",
      value: "🪞",
      gradient: "from-purple-500 to-pink-600",
    },
  },
];

export default testimonials;
