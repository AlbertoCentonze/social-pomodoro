import { useState } from "react";

export const useTimer = (rawTime) => {
  const [seconds, setSeconds] = useState(Math.floor(rawTime % 60));
  const [minutes, setMinutes] = useState(Math.floor(rawTime / 60));
  const [active, setActive] = useState(false);

  return {
    seconds,
    minutes,
    setTime: rawTime => {
      setMinutes(Math.floor(rawTime / 60));
      setSeconds(Math.floor(rawTime % 60))},
    active,
    setActive,
  };
};
