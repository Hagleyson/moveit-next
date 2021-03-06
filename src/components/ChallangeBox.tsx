import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengesContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/ChallangeBox.module.css";
export function ChallangeBox() {
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(
    ChallengeContext
  );
  const { resetCountdown } = useContext(CountdownContext);
  function handleChallengeSucceeded() {
    completedChallenge();
    resetCountdown();
  }
  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }
  return (
    <div className={styles.ChallangeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount}</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description} </p>
          </main>
          <footer>
            <button
              type="button"
              onClick={handleChallengeFailed}
              className={styles.challengeFailedButton}
            >
              Falhei
            </button>
            <button
              onClick={handleChallengeSucceeded}
              type="button"
              className={styles.challengeSucceededButton}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.ChallangeBoxNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
