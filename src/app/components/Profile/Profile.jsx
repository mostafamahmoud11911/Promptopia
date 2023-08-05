import PromptCard from "../PromptCard/PromptCard";
import styles from './Profile.module.scss'
export default function Profile({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) {
  return (
    <section className={styles.section}>
      <h1>{name} Profile</h1>
      <p>{desc}</p>

      <div className={styles.card}>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleDelete={()=>handleDelete && handleDelete(post)}
            handleEdit={()=>handleEdit && handleEdit(post)}
          />
        ))}
      </div>
    </section>
  );
}
