import { describe, it, expect, vi } from "vitest";
import { ObjectPool } from "../ObjectPool";

describe("ObjectPool", () => {
  interface TestObj {
    value: number;
    name: string;
  }

  const factory = () => ({ value: 0, name: "" });
  const reset = (obj: TestObj) => {
    obj.value = 0;
    obj.name = "";
  };

  describe("construction", () => {
    it("pre-populates pool on construction", () => {
      const pool = new ObjectPool(factory, reset, 10);
      expect(pool.available).toBe(10);
    });

    it("creates empty pool when initialSize is 0", () => {
      const pool = new ObjectPool(factory, reset, 0);
      expect(pool.available).toBe(0);
    });

    it("creates pool with default size when not specified", () => {
      const pool = new ObjectPool(factory, reset);
      expect(pool.available).toBe(50); // default size
    });

    it("calls factory for each initial object", () => {
      const mockFactory = vi.fn(factory);
      new ObjectPool(mockFactory, reset, 5);
      expect(mockFactory).toHaveBeenCalledTimes(5);
    });
  });

  describe("acquire", () => {
    it("returns object from pool when available", () => {
      const pool = new ObjectPool(factory, reset, 5);
      const obj = pool.acquire();
      expect(obj).toBeDefined();
      expect(obj.value).toBe(0);
      expect(obj.name).toBe("");
    });

    it("decreases available count when acquiring", () => {
      const pool = new ObjectPool(factory, reset, 5);
      expect(pool.available).toBe(5);
      pool.acquire();
      expect(pool.available).toBe(4);
    });

    it("creates new object when pool is empty", () => {
      const mockFactory = vi.fn(factory);
      const pool = new ObjectPool(mockFactory, reset, 0);

      const obj = pool.acquire();

      expect(obj).toBeDefined();
      expect(mockFactory).toHaveBeenCalledTimes(1);
    });

    it("returns different objects on multiple acquires", () => {
      const pool = new ObjectPool(factory, reset, 5);
      const obj1 = pool.acquire();
      const obj2 = pool.acquire();

      obj1.value = 42;
      obj2.value = 99;

      expect(obj1.value).toBe(42);
      expect(obj2.value).toBe(99);
    });
  });

  describe("release", () => {
    it("increases available count when releasing", () => {
      const pool = new ObjectPool(factory, reset, 5);
      const obj = pool.acquire();
      expect(pool.available).toBe(4);

      pool.release(obj);

      expect(pool.available).toBe(5);
    });

    it("resets object state on release", () => {
      const pool = new ObjectPool(factory, reset, 1);
      const obj = pool.acquire();

      obj.value = 42;
      obj.name = "modified";

      pool.release(obj);
      const reacquired = pool.acquire();

      expect(reacquired.value).toBe(0);
      expect(reacquired.name).toBe("");
    });

    it("calls reset function on release", () => {
      const mockReset = vi.fn(reset);
      const pool = new ObjectPool(factory, mockReset, 1);
      const obj = pool.acquire();

      pool.release(obj);

      expect(mockReset).toHaveBeenCalledTimes(1);
      expect(mockReset).toHaveBeenCalledWith(obj);
    });

    it("can release and reacquire the same object", () => {
      const pool = new ObjectPool(factory, reset, 1);
      const obj1 = pool.acquire();
      obj1.value = 100;

      pool.release(obj1);
      const obj2 = pool.acquire();

      // After reset, value should be 0
      expect(obj2.value).toBe(0);
      // Could be the same object reference (pool typically reuses)
    });
  });

  describe("clear", () => {
    it("empties the pool completely", () => {
      const pool = new ObjectPool(factory, reset, 10);
      expect(pool.available).toBe(10);

      pool.clear();

      expect(pool.available).toBe(0);
    });

    it("allows acquiring after clear (creates new objects)", () => {
      const mockFactory = vi.fn(factory);
      const pool = new ObjectPool(mockFactory, reset, 5);
      mockFactory.mockClear(); // Clear initial calls

      pool.clear();
      const obj = pool.acquire();

      expect(obj).toBeDefined();
      expect(mockFactory).toHaveBeenCalledTimes(1);
    });
  });

  describe("available", () => {
    it("returns correct count initially", () => {
      const pool = new ObjectPool(factory, reset, 7);
      expect(pool.available).toBe(7);
    });

    it("returns 0 when all objects are acquired", () => {
      const pool = new ObjectPool(factory, reset, 3);
      pool.acquire();
      pool.acquire();
      pool.acquire();
      expect(pool.available).toBe(0);
    });

    it("tracks count correctly through acquire/release cycles", () => {
      const pool = new ObjectPool(factory, reset, 5);

      pool.acquire();
      expect(pool.available).toBe(4);

      pool.acquire();
      expect(pool.available).toBe(3);

      const obj = pool.acquire();
      expect(pool.available).toBe(2);

      pool.release(obj);
      expect(pool.available).toBe(3);
    });
  });

  describe("stress tests", () => {
    it("handles many acquire/release cycles", () => {
      const pool = new ObjectPool(factory, reset, 5);
      const acquired: TestObj[] = [];

      // Acquire all
      for (let i = 0; i < 5; i++) {
        acquired.push(pool.acquire());
      }
      expect(pool.available).toBe(0);

      // Modify all
      acquired.forEach((obj, i) => {
        obj.value = i;
        obj.name = `obj-${i}`;
      });

      // Release all
      acquired.forEach((obj) => pool.release(obj));
      expect(pool.available).toBe(5);

      // Re-acquire and verify reset
      for (let i = 0; i < 5; i++) {
        const obj = pool.acquire();
        expect(obj.value).toBe(0);
        expect(obj.name).toBe("");
      }
    });

    it("handles more acquires than initial pool size", () => {
      const pool = new ObjectPool(factory, reset, 2);

      const obj1 = pool.acquire();
      const obj2 = pool.acquire();
      const obj3 = pool.acquire(); // Should create new
      const obj4 = pool.acquire(); // Should create new

      expect(obj1).toBeDefined();
      expect(obj2).toBeDefined();
      expect(obj3).toBeDefined();
      expect(obj4).toBeDefined();
      expect(pool.available).toBe(0);

      // Release all - pool should now have 4
      pool.release(obj1);
      pool.release(obj2);
      pool.release(obj3);
      pool.release(obj4);
      expect(pool.available).toBe(4);
    });

    it("maintains object independence", () => {
      const pool = new ObjectPool(factory, reset, 3);

      const a = pool.acquire();
      const b = pool.acquire();
      const c = pool.acquire();

      a.value = 1;
      b.value = 2;
      c.value = 3;

      // Ensure modifying one doesn't affect others
      expect(a.value).toBe(1);
      expect(b.value).toBe(2);
      expect(c.value).toBe(3);
    });
  });

  describe("edge cases", () => {
    it("handles complex object types", () => {
      interface ComplexObj {
        id: number;
        data: { x: number; y: number };
        items: string[];
      }

      const complexFactory = (): ComplexObj => ({
        id: 0,
        data: { x: 0, y: 0 },
        items: [],
      });

      const complexReset = (obj: ComplexObj) => {
        obj.id = 0;
        obj.data.x = 0;
        obj.data.y = 0;
        obj.items = [];
      };

      const pool = new ObjectPool(complexFactory, complexReset, 2);
      const obj = pool.acquire();

      obj.id = 99;
      obj.data.x = 100;
      obj.data.y = 200;
      obj.items.push("test");

      pool.release(obj);
      const reacquired = pool.acquire();

      expect(reacquired.id).toBe(0);
      expect(reacquired.data.x).toBe(0);
      expect(reacquired.data.y).toBe(0);
      expect(reacquired.items).toEqual([]);
    });

    it("handles objects with Set properties", () => {
      interface SetObj {
        connections: Set<number>;
      }

      const setFactory = (): SetObj => ({
        connections: new Set<number>(),
      });

      const setReset = (obj: SetObj) => {
        obj.connections.clear();
      };

      const pool = new ObjectPool(setFactory, setReset, 2);
      const obj = pool.acquire();

      obj.connections.add(1);
      obj.connections.add(2);
      obj.connections.add(3);
      expect(obj.connections.size).toBe(3);

      pool.release(obj);
      const reacquired = pool.acquire();

      expect(reacquired.connections.size).toBe(0);
    });
  });
});
