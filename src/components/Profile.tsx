import styles from "../styles/components/Profile.module.css";

export default function profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/hagleyson.png" alt="Hagleyson" />
      <div>
        <strong>Hagleyson Fernandes Leite</strong>

        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1
        </p>
      </div>
    </div>
  );
}
