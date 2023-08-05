import Feed from "./components/Feed/Feed";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Discover & Share</h1>
      <br className={styles.line} />
      <span className={styles.gradient}>AI-Powred Prompts</span>
      <p>
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative Prompts
      </p>
      <Feed />
    </section>
  );
}
