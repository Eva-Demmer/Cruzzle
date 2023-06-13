import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function AvatarDoghnut() {
  const barRef = useRef();
  const [counter, setCounter] = useState(0);
  const [ratio, setRatio] = useState(0);

  const { score } = useContext(UserContext);
  const nextScore = 1000; // TODO: add context when db is ok

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
    setRatio(counter / nextScore);
    animeProgressBar(ratio);
  }, [score, nextScore, counter, ratio]);

  const strokeWidth = 24;
  const radius = 130;
  const viewBoxSize = radius * 2 + strokeWidth * 2;

  return (
    <div className="progressBar h-52 absolute">
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="h-full w-full rotate-90 stroke-primary-900 origin-center transition-all duration-1000 ease-in-out"
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

export default AvatarDoghnut;
