import { describe, it, expect } from "vitest";
import { generateParticles } from "./AmbientParticles";

describe("generateParticles", () => {
  describe("deterministic generation", () => {
    it("should return the same output for the same input", () => {
      const particles1 = generateParticles(10);
      const particles2 = generateParticles(10);

      expect(particles1).toEqual(particles2);
    });

    it("should generate different particles for different counts", () => {
      const particles10 = generateParticles(10);
      const particles20 = generateParticles(20);

      expect(particles20.length).toBe(20);
      expect(particles10.length).toBe(10);

      // First 10 particles should be identical
      expect(particles20.slice(0, 10)).toEqual(particles10);
    });
  });

  describe("particle count", () => {
    it("should generate correct number of particles", () => {
      expect(generateParticles(10).length).toBe(10);
      expect(generateParticles(20).length).toBe(20);
      expect(generateParticles(0).length).toBe(0);
      expect(generateParticles(5).length).toBe(5);
    });
  });

  describe("particle properties", () => {
    it("should generate particles with valid x positions (0-100)", () => {
      const particles = generateParticles(20);

      particles.forEach((p) => {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThan(100);
      });
    });

    it("should generate particles with valid y positions (0-100)", () => {
      const particles = generateParticles(20);

      particles.forEach((p) => {
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThan(100);
      });
    });

    it("should generate particles with sizes between 2-6px", () => {
      const particles = generateParticles(20);

      particles.forEach((p) => {
        expect(p.size).toBeGreaterThanOrEqual(2);
        expect(p.size).toBeLessThanOrEqual(6);
      });
    });

    it("should generate particles with delays between 0-10s", () => {
      const particles = generateParticles(20);

      particles.forEach((p) => {
        expect(p.delay).toBeGreaterThanOrEqual(0);
        expect(p.delay).toBeLessThan(10);
      });
    });

    it("should generate particles with valid speed values", () => {
      const particles = generateParticles(20);
      const validSpeeds = ["slow", "medium", "fast"];

      particles.forEach((p) => {
        expect(validSpeeds).toContain(p.speed);
      });
    });

    it("should generate particles with valid color values", () => {
      const particles = generateParticles(20);
      const validColors = ["purple", "white"];

      particles.forEach((p) => {
        expect(validColors).toContain(p.color);
      });
    });

    it("should cycle through speed variants", () => {
      const particles = generateParticles(9);

      // Based on i % 3 pattern
      expect(particles[0].speed).toBe("slow");
      expect(particles[1].speed).toBe("medium");
      expect(particles[2].speed).toBe("fast");
      expect(particles[3].speed).toBe("slow");
      expect(particles[4].speed).toBe("medium");
      expect(particles[5].speed).toBe("fast");
    });

    it("should have every 4th particle as white", () => {
      const particles = generateParticles(20);

      // Based on i % 4 === 0 pattern
      expect(particles[0].color).toBe("white");
      expect(particles[4].color).toBe("white");
      expect(particles[8].color).toBe("white");
      expect(particles[12].color).toBe("white");
      expect(particles[16].color).toBe("white");

      // Non-4th particles should be purple
      expect(particles[1].color).toBe("purple");
      expect(particles[2].color).toBe("purple");
      expect(particles[3].color).toBe("purple");
      expect(particles[5].color).toBe("purple");
    });

    it("should assign sequential IDs", () => {
      const particles = generateParticles(10);

      particles.forEach((p, index) => {
        expect(p.id).toBe(index);
      });
    });
  });

  describe("edge cases", () => {
    it("should handle zero particles", () => {
      const particles = generateParticles(0);
      expect(particles).toEqual([]);
    });

    it("should handle single particle", () => {
      const particles = generateParticles(1);
      expect(particles.length).toBe(1);
      expect(particles[0].id).toBe(0);
    });

    it("should handle large number of particles", () => {
      const particles = generateParticles(100);
      expect(particles.length).toBe(100);

      // All particles should have valid properties
      particles.forEach((p) => {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThan(100);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThan(100);
        expect(p.size).toBeGreaterThanOrEqual(2);
        expect(p.size).toBeLessThanOrEqual(6);
      });
    });
  });

  describe("distribution", () => {
    it("should spread particles across viewport (not clustered)", () => {
      const particles = generateParticles(20);

      // Check that x values are reasonably distributed
      const xValues = particles.map((p) => p.x);
      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);

      // Distribution should span at least 50% of the viewport
      expect(maxX - minX).toBeGreaterThan(50);

      // Check that y values are reasonably distributed
      const yValues = particles.map((p) => p.y);
      const minY = Math.min(...yValues);
      const maxY = Math.max(...yValues);

      // Distribution should span at least 50% of the viewport
      expect(maxY - minY).toBeGreaterThan(50);
    });
  });
});
