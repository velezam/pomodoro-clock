import { useEffect, useState } from "react";
import "./App.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown as ArrowDown,
  faArrowUp as ArrowUp,
  faPlay as Play,
  faPause as Pause,
  faArrowsRotate as Reset,
} from "@fortawesome/free-solid-svg-icons";

import Beep from "./sounds/beep.wav";

//initial variables
const INITIAL_SESSION_LENGTH = 25;
const INITIAL_BREAK_LENGTH = 5;

function App() {
  // Math.floor(totalseconds / 60) = mins
  // totalseconds % 60 = seconds

  const [breakLength, setBreakLength] = useState(INITIAL_BREAK_LENGTH);

  const [sessionLength, setSessionLength] = useState(INITIAL_SESSION_LENGTH);

  const [timeLeft, setTimeLeft] = useState(INITIAL_SESSION_LENGTH * 60);

  const [isActive, setIsActive] = useState(false);

  const [isBreak, setIsBreak] = useState(false);

  const [timeString, setTimeString] = useState("");

  const audio = document.getElementById("beep") as HTMLAudioElement;

  let timer: ReturnType<typeof setInterval>;

  useEffect(() => {
    if (!isBreak) {
      if (isActive) {
        timer = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        console.log("timer " + timeLeft);
      } else if (!isActive && timeLeft !== 0) {
        console.log("timer " + timeLeft);
        clearInterval(timer);
      }

      if (timeLeft < 0) {
        setIsBreak(!isBreak);
        setTimeLeft(breakLength * 60);
        document.getElementById("timer-label")!.innerHTML = "Break";
        audio.play();
      }

      return () => clearInterval(timer);
    } else {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      if (!isActive && timeLeft !== 0) {
        clearInterval(timer);
      }

      if (timeLeft < 0) {
        setIsBreak(!isBreak);
        setTimeLeft(sessionLength * 60);
        document.getElementById("timer-label")!.innerHTML = "Session";
        audio.play();
      }

      return () => clearInterval(timer);
    }
  }, [isActive, timeLeft]);

  useEffect(() => {
    let mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    let seconds = String(timeLeft % 60).padStart(2, "0");

    setTimeString(mins + ":" + seconds);

    if (timeLeft < 60) {
      document.getElementById("timer-display")?.classList.add("warning");
    } else {
      document.getElementById("timer-display")?.classList.remove("warning");
    }
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [breakLength, sessionLength]);

  function handleStartStop() {
    setIsActive(!isActive);
  }

  function handleReset() {
    setIsActive(false);
    setIsBreak(false);
    setBreakLength(INITIAL_BREAK_LENGTH);
    setSessionLength(INITIAL_SESSION_LENGTH);
    setTimeLeft(INITIAL_SESSION_LENGTH * 60);

    clearInterval(timer);

    document.getElementById("timer-label")!.innerHTML = "Session";

    audio.pause();
    audio.currentTime = 0;
  }

  function breakIncrement() {
    if (isActive || breakLength >= 60) {
      return;
    }

    setBreakLength(breakLength + 1);
  }

  function breakDecrement() {
    if (isActive || breakLength <= 1) {
      return;
    }

    setBreakLength(breakLength - 1);
  }
  function sessionIncrement() {
    if (isActive || sessionLength >= 60) {
      return;
    }

    setSessionLength(sessionLength + 1);
  }

  function sessionDecrement() {
    if (isActive || sessionLength <= 1) {
      return;
    }

    setSessionLength(sessionLength - 1);
  }

  return (
    <>
      <h1 className="title">Pomodoro Clock</h1>

      <div className="timer-control">
        <div id="break-label">Break Length</div>
        <button id="break-decrement" onClick={breakDecrement}>
          <FontAwesomeIcon icon={ArrowDown}></FontAwesomeIcon>
        </button>

        <div id="break-length">{breakLength}</div>

        <button id="break-increment" onClick={breakIncrement}>
          <FontAwesomeIcon icon={ArrowUp}></FontAwesomeIcon>
        </button>
      </div>

      <div className="timer-control">
        <div id="session-label">Session Length</div>
        <button id="session-decrement" onClick={sessionDecrement}>
          <FontAwesomeIcon icon={ArrowDown}></FontAwesomeIcon>
        </button>

        <div id="session-length">{sessionLength}</div>
        <button id="session-increment" onClick={sessionIncrement}>
          <FontAwesomeIcon icon={ArrowUp}></FontAwesomeIcon>
        </button>
      </div>

      <div id="timer-display" className="timer-display">
        <div id="timer-label">Session</div>
        <div id="time-left">{timeString}</div>
      </div>

      <div className="timer-control">
        <button id="start_stop" onClick={handleStartStop}>
          <FontAwesomeIcon icon={Play}></FontAwesomeIcon>
          <FontAwesomeIcon icon={Pause}></FontAwesomeIcon>
        </button>
        <button id="reset" onClick={handleReset}>
          <FontAwesomeIcon icon={Reset}></FontAwesomeIcon>
        </button>
      </div>

      <audio id="beep" src={Beep}></audio>
    </>
  );
}

export default App;
