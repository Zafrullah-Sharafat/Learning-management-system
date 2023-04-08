import React, { useEffect, useState } from "react";

export default function ProgressBar({ value, max }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent((value / max) * 100);
  }, [value, max]);

  return (
    <div className="progress">
      <div className="progress-bar" style={{ width: `${percent}%` }}>
        {percent !== 0 && percent + "%"}
      </div>
      {percent === 0 && `0%`}
    </div>
  );
}
