import Link from "next/link";
import styles from "./Form.module.scss";
export default function Form({
  type,
  post,
  setPost,
  submitting,
  handleSubmitting,
}) {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{type} Post</h1>
      <p className={styles.desc}>
        {type} and share amazing prompts with the world, and let your
        imagination run wild any AI-powered platform
      </p>

      <form onSubmit={handleSubmitting} className={styles.form}>
        <label htmlFor="">
          <span className={styles.label}>Your AI-prompt</span>
        </label>
        <textarea
          placeholder="write your prompt here"
          cols="30"
          rows="10"
          value={post.prompt}
          className={styles.textArea}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
        ></textarea>
        <label htmlFor="">
          <span className={styles.label}>
            Tag <span>#product, #webdevelopment, #idea</span>
          </span>
        </label>
        <input
          placeholder="#tag"
          className={styles.input}
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
        />
        <div className={styles.action}>
          <Link href="/" className={styles.cancle}>Cancle</Link>
          <button className={styles.submit} type="submit" disabled={submitting}>{submitting? `${type}...` : type}</button>
        </div>
      </form>
    </div>
  );
}
