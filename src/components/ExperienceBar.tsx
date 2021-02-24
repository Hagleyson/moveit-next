import styles from "../styles/components/ExperienceBar.module.css";
export function ExperienceBar() {
  return (
    <header className={styles.experienceBar}>
      <span> 0</span>

      <div>
        <div style={{ width: "50%" }}></div>
        <span className={styles.currentExperience} style={{ left: "50%" }}>
          380xp
        </span>
      </div>
      <span>680 xp</span>
    </header>
  );
}
