import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function HalfCircleProgress({ userGamification }) {
  const barRef = useRef();
  let ratio = 0;

  const animeProgressBar = (rat) => {
    const bar = barRef.current;
    const r = bar.getAttribute("r");
    const c = Math.PI * r * 2;
    const pct = (1 - rat) * c;
    bar.style.strokeDashoffset = pct;
    return pct;
  };

  useEffect(() => {
    const { currentScore, nextLevelScore } = userGamification;
    ratio = currentScore / 2 / nextLevelScore;
    animeProgressBar(ratio);
  }, [userGamification]);

  const strokeWidth = 24;
  const radius = 130;
  const viewBoxSize = radius * 2 + strokeWidth * 2;

  return (
    <div className="progressBar w-[8.7rem] md:w-[8.5rem] h-[8.7rem] md:h-[8.5rem] sm:h-44 sm:w-44 lg:h-32 lg:w-36">
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

HalfCircleProgress.propTypes = {
  userGamification: PropTypes.shape({
    currentLevel: PropTypes.number,
    currentScore: PropTypes.number,
    nextLevelScore: PropTypes.number,
  }),
};

HalfCircleProgress.defaultProps = {
  userGamification: {
    currentLevel: 0,
    currentScore: 0,
    nextLevelScore: 0,
  },
};