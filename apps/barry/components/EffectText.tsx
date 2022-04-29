import React from "react";
import { useSelector } from "./StateProvider";

type Props = {
  children: string;
  className?: string;
};
export const EffectText = React.memo<Props>(({ children, className }) => {
  const phase = useSelector((state) => state.phase);
  const loops = useSelector((state) => state.loops);

  if (phase === "preEvent" || phase === "expand" || phase === "collapse") {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={className}>
      {removeGrammar(addConfusion(addScreaming(children, loops), loops), loops)}
    </span>
  );
});

const addConfusion = (text: string, loops: number) => {
  const chance = 0.05 * Math.min(loops, 10);
  const num = Math.random();

  if (num < chance) {
    const index1 = Math.floor(Math.random() * text.length);
    const index2 = Math.floor(Math.random() * text.length);

    return swapChars(text, index1, index2);
  }
  return text;
};

const removeGrammar = (text: string, loops: number) => {
  const chance = 0.01 * Math.min(loops, 10);
  const num = Math.random();

  if (num < chance) {
    return text.toLowerCase().replace(/[.!?:,;]/g, "");
  }
  return text;
};

const addScreaming = (text: string, loops: number) => {
  const chance = 0.01 * Math.min(loops, 10);
  const num = Math.random();

  if (num < chance / 3) {
    return `${text} I'm fine. I am Fine. BARRY #${loops} IS FINE.`;
  } else if (num < chance * (2 / 3)) {
    return text.toUpperCase().replace(/[\.\?]$/, "!!");
  } else if (num < chance) {
    return text.replace(/[\.\?]$/, "!");
  }
  return text;
};

// this is bugged but I like the results
const swapChars = (str: string, first: number, last: number) => {
  return (
    str.slice(0, first) +
    str[last] +
    str.slice(first + 1, last) +
    str[first] +
    str.slice(last + 1)
  );
};
