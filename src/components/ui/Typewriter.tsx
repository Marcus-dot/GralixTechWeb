import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

export const Typewriter = ({
    words,
    typingSpeed = 150,
    deletingSpeed = 100,
    pauseDuration = 2000
}: TypewriterProps) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    /* Removed manual blinking logic */

    useEffect(() => {
        if (index === words.length) return;

        if (subIndex === words[index].length + 1 && !reverse) {
            const timeout = setTimeout(() => {
                setReverse(true);
            }, pauseDuration);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className="inline-flex">
            {words[index].substring(0, subIndex)}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1 w-[3px] h-[1em] bg-accent display-inline-block"
            />
        </span>
    );
};
