import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ReactNode, useRef } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "right" | "scale";
}

const variants = {
    up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
    scale: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
};

const AnimatedSection = ({ children, className = "", delay = 0, direction = "up" }: AnimatedSectionProps) => (
    <motion.div
        initial={variants[direction].initial}
        whileInView={variants[direction].animate}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={className}
    >
        {children}
    </motion.div>
);

// Parallax wrapper that shifts content based on scroll position
export const ParallaxLayer = ({
    children,
    className = "",
    speed = 0.3,
}: {
    children: ReactNode;
    className?: string;
    speed?: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);
    const hasPositionClass = /\b(static|fixed|absolute|relative|sticky)\b/.test(className);

    return (
        <div ref={ref} className={`${hasPositionClass ? "" : "relative"} ${className}`}>
            <motion.div style={{ y }}>{children}</motion.div>
        </div>
    );
};

// Floating animation for decorative elements
export const FloatingElement = ({
    children,
    className = "",
    duration = 6,
    distance = 15,
}: {
    children: ReactNode;
    className?: string;
    duration?: number;
    distance?: number;
}) => (
    <motion.div
        animate={{ y: [-distance, distance, -distance] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

// Stagger container for child animations
export const StaggerContainer = ({
    children,
    className = "",
    staggerDelay = 0.1,
}: {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
            visible: { transition: { staggerChildren: staggerDelay } },
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export default AnimatedSection;
