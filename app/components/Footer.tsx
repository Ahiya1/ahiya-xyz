"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Custom hook for scroll-triggered fade-in
function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export function Footer() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <footer
      ref={ref}
      className={`py-12 border-t border-white/5 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="container-content">
        <Link
          href="/cv"
          className="block text-center text-slate-600 text-xs mb-3 hover:text-slate-500 transition-colors"
        >
          Select part-time availability for systems roles.
        </Link>
        <p className="text-center text-slate-500 text-sm mb-1">
          Ahiya — Systems Architect
        </p>
        <p className="text-center text-slate-600 text-xs">
          2025
        </p>
      </div>
    </footer>
  );
}

export default Footer;
