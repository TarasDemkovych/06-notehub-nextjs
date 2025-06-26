import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader} role="status" aria-label="Завантаження...">
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
}