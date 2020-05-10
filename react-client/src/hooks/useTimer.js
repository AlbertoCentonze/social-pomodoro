import { useState } from "react";

export const useTimer = (rawTime) => {
  const [seconds, setSeconds] = useState(Math.floor(rawTime % 60));
  const [minutes, setMinutes] = useState(Math.floor(rawTime / 60));
  const [active, setActive] = useState(false);

  return [
    seconds,
    minutes,
    (rawTime) => {
      setMinutes(() => {
        let minutes = Math.floor(rawTime / 60);
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        return minutes;
      });
      setSeconds(() => {
        let seconds = Math.floor(rawTime % 60);
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        return seconds;
      });
    },
    active,
    setActive,
  ];
};
