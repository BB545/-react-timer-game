import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

//let timer;

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    // setTimeRemaining(targetTime * 1000); //초기값 다시 설정
    dialog.current.open(); //시간 내에 멈추지 못함 짐
  } //무한루프 생성 방지

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  //   const [timerStarted, setTimerStarted] = useState(false);
  //   const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open(); //타이머 수동 멈춤 시간 내에 멈춤 이김
    clearInterval(timer.current);
  }

  //     timer.current = setTimeout(() => {
  //       setTimerExpired(true);
  // dialog.current.open(); //modal은 기본적으로 보이지 않도록 되어있으나 showModal함수이용하면 배경 어둡게 하고 팝업창만 보이도록 설정가능
  //       //독립적으로 dialog참조하기 위해(ResultModal컴포넌트의 dialog 요소와 분리=>이제 dialog태그를 div와 같은 다른 태그로 바꿔도 무관) useImperativeHandle사용하여 컴포넌트 변경해주면 open함수 이제 사용 가능(다른 컴포넌트에서 정의해둔 함수이기 때문)
  //     }, targetTime * 1000);

  //     setTimerStarted(true);
  //   }

  //   function handleStop() {
  //     clearTimeout(timer.current);
  //   }

  //   return (
  //     <>
  //       <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
  //       <section className="challenge">
  //         <h2>{title}</h2>
  //         {timerExpired && <p>You lost!</p>}
  //         <p className="challenge-time">
  //           {targetTime} second{targetTime > 1 ? "s" : ""}
  //         </p>
  //         <p>
  //           <button onClick={timerStarted ? handleStop : handleStart}>
  //             {timerStarted ? "Stop" : "Start"} Challenge
  //           </button>
  //         </p>
  //         <p className={timerStarted ? "active" : undefined}>
  //           {timerStarted ? "Time is running..." : "Timer inactive"}
  //         </p>
  //       </section>
  //     </>
  //   );

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        {/* {timerExpired && <p>You lost!</p>} */}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
