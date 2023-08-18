import styles from "./page.module.css";
import Organizations from "./organizations";

export default function Home() {
  return (
    <main className={styles.main}>
        <Organizations />
    </main>
  );
}
