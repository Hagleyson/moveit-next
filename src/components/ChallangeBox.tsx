import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ChallangeBox.module.css";
export function ChallangeBox() {
  const { activeChallenge, resetChallenge } = useContext(ChallengeContext);

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
              onClick={resetChallenge}
              className={styles.challengeFailedButton}
            >
              Falhei
            </button>
            <button type="button" className={styles.challengeSucceededButton}>
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
