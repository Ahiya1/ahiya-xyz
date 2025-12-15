/**
 * Availability Configuration
 *
 * Controls the urgency badge display and messaging.
 * Update this file monthly or as availability changes.
 *
 * To update:
 * 1. Change `slotsRemaining` to the current number
 * 2. Update `period` to the current month/quarter
 * 3. Update `message` to reflect the new values
 * 4. Set `showBadge` to false to hide the badge entirely
 */
export interface AvailabilityConfig {
  slotsRemaining: number;
  period: string;
  message: string;
  showBadge: boolean;
}

export const availability: AvailabilityConfig = {
  slotsRemaining: 2,
  period: "January",
  message: "2 slots remaining for January",
  showBadge: true,
};

export default availability;
