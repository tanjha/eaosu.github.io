import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal — wraps any content and fades/slides it in on scroll.
 * Props:
 *   delay   (number) — stagger offset in seconds (default 0)
 *   y       (number) — starting Y offset in px (default 40)
 */
export default function ScrollReveal({ children, delay = 0, y = 40 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const anim = gsap.fromTo(
      el,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
