import { useContext, useEffect, useState } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    starCountDown,
    resetCountdown,
  } = useContext(CountdownContext);
  const [minutLeft, minutRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");
  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minutLeft}</span>
          <span>{minutRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Pausar Ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={starCountDown}
            >
              Iniciar Ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
