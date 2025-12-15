# 2L Iteration Plan - Landing Page Conversion Optimization

## Project Vision

Transform ahiya.xyz into a high-converting professional portfolio by adding social proof (testimonials), transparent pricing with Cal.com booking integration, and urgency elements that drive potential clients to book discovery calls.

## Success Criteria

Specific, measurable criteria for MVP completion:

- [ ] 3 testimonials displayed with proper attribution on homepage (after "How I Work" section)
- [ ] AI/Agent expertise emphasized in hero area
- [ ] Dedicated /pricing route with 4 service tiers and Cal.com embed
- [ ] "Pricing" link added to navigation (desktop and mobile)
- [ ] Urgency badge component displaying availability status
- [ ] All CTAs updated to use Cal.com booking
- [ ] Mobile responsive design maintained across all new components
- [ ] Premium aesthetic consistent with existing site

## MVP Scope

**In Scope:**
- Testimonials section component with 3 real client testimonials
- New /pricing page with service tiers, launch pricing banner, Cal.com embed
- UrgencyBadge component for availability messaging
- CalcomEmbed wrapper component
- Navigation update with Pricing link
- Homepage hero AI/Agent emphasis update
- Homepage pricing mention near CTA
- Data files for testimonials, pricing, and availability

**Out of Scope (Post-MVP):**
- Payment processing integration
- Client portal functionality
- Blog/content marketing
- Case study deep-dives (projects pages already exist)
- Custom booking system (using Cal.com)
- Testimonial photos/avatars (text-only for MVP)

## Development Phases

1. **Exploration** - Complete
2. **Planning** - Current
3. **Building** - Estimated 2-3 hours (parallel builders)
4. **Integration** - 15 minutes
5. **Validation** - 15 minutes
6. **Deployment** - Final

## Timeline Estimate

- Exploration: Complete
- Planning: Complete
- Building: ~2 hours (3 parallel builders)
- Integration: ~15 minutes
- Validation: ~15 minutes
- Total: ~2.5 hours

## Risk Assessment

### Low Risks
- Navigation update: Simple array modification
- Data files: Straightforward TypeScript exports

### Medium Risks
- Cal.com embed integration: External dependency, but well-documented
- Testimonials styling: Must match existing premium aesthetic

### Mitigation Strategies
- Use @calcom/embed-react official package for reliable integration
- Follow existing component patterns (contemplative-card, useScrollReveal)
- Test Cal.com embed on staging before production

## Integration Strategy

Builder outputs will be integrated as follows:

1. **Builder 1 creates foundation**: Data files and reusable components
2. **Builder 2 creates pricing page**: Uses components from Builder 1
3. **Builder 3 updates homepage**: Uses components from Builder 1, updates navigation

**Potential conflict areas:**
- None expected - builders work on separate files
- Builder 2 and 3 both depend on Builder 1's data files and components

## Deployment Plan

1. Verify all components render correctly in development
2. Test Cal.com embed booking flow end-to-end
3. Verify mobile responsiveness on all new sections
4. Deploy to production via existing deployment pipeline
5. Verify Cal.com embed works in production environment
