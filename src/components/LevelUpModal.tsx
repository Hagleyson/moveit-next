import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/LeveUpModal.module.css";
export function LevelUpModal() {
  const { level, closeLevelUpModalOpen } = useContext(ChallengeContext);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>
        <button onClick={closeLevelUpModalOpen} type="button">
          <img src="/icons/close.svg" alt="Fechar modal" />
        </button>
      </div>
    </div>
  );
}
