import { useState, useEffect, useRef } from "react";

// TODO: add context when db is ok
const score = 756;
const nextScore = 1000;
const pointsNextLevel = nextScore - score;

function HalfCircleProgress() {
  const barRef = useRef();
  const [counter, setCounter] = useState(0);
  const [ratio, setRatio] = useState(0);

  const animeProgressBar = (rat) => {
    const bar = barRef.current;
    const r = bar.getAttribute("r");
    const c = Math.PI * r * 2;
    const pct = (1 - rat) * c;
    bar.style.strokeDashoffset = pct;
    return pct;
  };

  useEffect(() => {
    setCounter(score);
    setRatio(counter / 2 / nextScore);
    animeProgressBar(ratio);
  }, [score, nextScore, counter, ratio]);

  const strokeWidth = 24;
  const radius = 130;
  const viewBoxSize = radius * 2 + strokeWidth * 2;

  return (
    <div className="progressBar w-[8.7rem] h-[8.7rem] sm:h-44 sm:w-44 lg:h-32 lg:w-36 absolute">
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="h-full w-full rotate-180 stroke-primary-100 origin-center transition-all duration-2000 ease-in-out"
          ref={barRef}
          r={radius}
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          fill="transparent"
          strokeDasharray={2 * Math.PI * radius}
          strokeDashoffset={2 * Math.PI * radius}
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
}

export { HalfCircleProgress, pointsNextLevel };
