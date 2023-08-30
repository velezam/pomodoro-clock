import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown as ArrowDown,
  faArrowUp as ArrowUp,
  faPlay as Play,
  faPause as Pause,
  faArrowsRotate as Reset,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(true);


  return (
    <>
      <h1 className="title">Pomodoro Clock</h1>

      <div className="timer-control">
        <div id="break-label">Break Length</div>
        <button id="break-decrement">
          <FontAwesomeIcon icon={ArrowDown}></FontAwesomeIcon>
        </button>
        <div id="break-length">5:00{}</div>
        <button id="break-increment">
          <FontAwesomeIcon icon={ArrowUp}></FontAwesomeIcon>
        </button>
      </div>

      <div className="timer-control">
        <div id="session-label">Session Length</div>
        <button id="session-decrement">
          <FontAwesomeIcon icon={ArrowDown}></FontAwesomeIcon>
        </button>

        <div id="session-length">25:00{}</div>
        <button id="session-increment">
          <FontAwesomeIcon icon={ArrowUp}></FontAwesomeIcon>
        </button>
      </div>

      <div className="timer-display">
        <div id="timer-label">Session</div>
        <div id="time-left">Time left{}</div>
      </div>

      <div className="timer-control">
        <button id="start_stop">
          <FontAwesomeIcon icon={Play}></FontAwesomeIcon>
          <FontAwesomeIcon icon={Pause}></FontAwesomeIcon>
        </button>
        <button id="reset">
          <FontAwesomeIcon icon={Reset}></FontAwesomeIcon>
        </button>
      </div>
    </>
  );
}

export default App;
