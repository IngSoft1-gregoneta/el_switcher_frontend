import { useState, useEffect } from "react";
import { useTimerStore } from "../../../zustand/store";

export default function Timer() {
  const timerValue = useTimerStore((state) => state.Timer);
  const [currentTimer, setCurrentTimer] = useState();

  useEffect(() => {
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
      <h3 className="font-bold md:text-2xl">Tiempo restante</h3>
      <p className="m-2 text-2xl md:text-5xl">
        {currentTimer > 0 ? `${currentTimer} segundos` : "Tiempo agotado"}
      </p>
    </>
  );
}
