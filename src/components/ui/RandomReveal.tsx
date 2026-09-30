"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useAnimationControls,
  useInView,
  type HTMLMotionProps,
  type Target,
  type TargetAndTransition,
} from "framer-motion";
import { EASE_OUT } from "@/components/ui/Reveal";

/**
 * An entrance that changes every time the element scrolls into view.
 * The first pose is picked from `seed` (deterministic, so server and
 * client render the same hidden state); whenever the element leaves the
 * viewport it fades to a new random pose and enters from there next time.
 */
type Entrance = { hidden: Target; duration: number };

const ENTRANCES: Entrance[] = [
  { hidden: { opacity: 0, y: 40 }, duration: 0.65 },
  { hidden: { opacity: 0, y: -32 }, duration: 0.6 },
  { hidden: { opacity: 0, x: -56 }, duration: 0.65 },
  { hidden: { opacity: 0, x: 56 }, duration: 0.65 },
  { hidden: { opacity: 0, scale: 0.84 }, duration: 0.6 },
  { hidden: { opacity: 0, rotateX: -24, y: 28 }, duration: 0.75 },
  { hidden: { opacity: 0, rotate: -4, y: 36, scale: 0.96 }, duration: 0.7 },
  { hidden: { opacity: 0, filter: "blur(14px)", scale: 0.98 }, duration: 0.7 },
];

// Every entrance resolves to this, so a hidden pose only states its own offsets.
const SHOWN: TargetAndTransition = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  rotateX: 0,
  filter: "blur(0px)",
};

function pickNext(exclude: number) {
  let i = Math.floor(Math.random() * (ENTRANCES.length - 1));
  if (i >= exclude) i++;
  return i;
}

const PERSPECTIVE: CSSProperties & { transformPerspective: number } = {
  transformPerspective: 900,
};

/** Spread the result onto any motion element: ref, initial, animate, style. */
export function useRandomEntrance(seed: number, delay = 0) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const controls = useAnimationControls();
  const current = useRef(Math.abs(seed) % ENTRANCES.length);
  const entered = useRef(false);
  const [initial] = useState<Target>(() => ENTRANCES[current.current].hidden);

  useEffect(() => {
    if (inView) {
      entered.current = true;
      const { duration } = ENTRANCES[current.current];
      controls.start({
        ...SHOWN,
        transition: { duration, ease: EASE_OUT, delay },
      });
    } else if (entered.current) {
      current.current = pickNext(current.current);
      controls.start({
        ...SHOWN,
        ...ENTRANCES[current.current].hidden,
        transition: { duration: 0.3, ease: "easeOut" },
      });
    }
  }, [inView, controls, delay]);

  return { ref, initial, animate: controls, style: PERSPECTIVE };
}

type Props = Omit<HTMLMotionProps<"div">, "initial" | "animate" | "style"> & {
  seed: number;
  delay?: number;
};

/** A div with a random entrance — for blocks that don't need a custom tag. */
export function RandomReveal({ seed, delay = 0, children, ...rest }: Props) {
  const entrance = useRandomEntrance(seed, delay);
  return (
    <motion.div
      ref={entrance.ref as React.Ref<HTMLDivElement>}
      initial={entrance.initial}
      animate={entrance.animate}
      style={entrance.style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
