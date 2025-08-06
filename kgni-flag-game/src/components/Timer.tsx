import NumberFlow from "@number-flow/react";
import React, { useState, useEffect, useRef } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div>
      <NumberFlow value={seconds} />
      <button onClick={() => setIsActive(true)}>Start</button>
      <button onClick={() => setIsActive(false)}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Timer;
