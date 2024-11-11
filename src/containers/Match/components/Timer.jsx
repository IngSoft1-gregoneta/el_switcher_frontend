import { useState, useEffect } from "react";
import { useTimerStore } from "../../../zustand/store";

export default function Timer() {
  const timerValue = useTimerStore((state) => state.Timer);
  const [currentTimer, setCurrentTimer] = useState();

  useEffect(() => {
    console.log(timerValue)
    if (timerValue) {
      const countdownInterval = setInterval(() => {
        const formattedDateString = timerValue.replace(" ", "T");
        const timeWhenTurnStart = new Date(formattedDateString).getTime();
        const endTime = timeWhenTurnStart + 120 * 1000; // 120 seconds after start

        if (!isNaN(timeWhenTurnStart)) {
          const currentTime = new Date().getTime();
          const difference = endTime - currentTime; // Remaining time in ms
          const remainingTime = Math.floor(difference / 1000); // Convert to seconds

          console.log("current", currentTime);
          console.log("start", timeWhenTurnStart);
          console.log("remainingTime", remainingTime);

          if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            setCurrentTimer(0);
          } else {
            setCurrentTimer(remainingTime);
          }
        }
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [timerValue]);

  return (
    <>
      <div className="relative my-4 flex items-center justify-center">
        <div className="h-24 w-24 md:h-32 md:w-32 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-green-400 to-yellow-400 animate-pulse"></div>
          <svg className="absolute inset-0" viewBox="0 0 36 36">
            <circle
              className="stroke-current text-gray-200"
              strokeWidth="3"
              fill="none"
              r="16"
              cx="18"
              cy="18"
            />
            <circle
              className="stroke-current text-red-500"
              strokeWidth="3"
              strokeDasharray="100"
              strokeDashoffset={(100 - (currentTimer / 120) * 100).toFixed(1)}
              fill="none"
              r="16"
              cx="18"
              cy="18"
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-2xl md:text-4xl font-extrabold text-[#f8f4e8]">
            {currentTimer > 0 ? currentTimer : "⏰"}
          </div>
        </div>
      </div>

    </>
  );
}
