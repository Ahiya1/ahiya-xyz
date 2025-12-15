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
  },
  {
    id: "hit",
    quote:
      "The AI results were comprehensive and aligned with our purpose. Exactly what we needed",
    author: "HIT",
    role: "Research Team",
    organization: "Holon Institute of Technology",
    type: "corporate",
  },
  {
    id: "mirror-user",
    quote:
      "The app helped me connect to my aspirations in a transitional period in my life",
    author: "Mirror of Dreams user",
    role: "User",
    organization: "",
    type: "personal",
  },
];

export default testimonials;
