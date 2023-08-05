import Image from "next/image";
import styles from "./PromptCard.module.scss";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function PromptCard({
  post,
  handleTagClick,
  handleDelete,
  handleEdit,
}) {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  function handleCopy() {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 1000);
  }

  return (
    <div className={styles.prompt_card}>
      <div>
        <Image src={post.creator.image} className={styles.image} alt="" width={35} height={35} />
        <div>
          <h3>{post.creator.username}</h3>
          <p>{post.creator.email}</p>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt=""
            width={13}
            height={14}
          />
        </div>
      </div>

      <p className={styles.prompt}>{post.prompt}</p>
      <p className={styles.tag} onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>
      {session?.user.id == post.creator._id && pathName === "/profile" && (
        <div className={styles.action}>
          <p className={styles.delete} onClick={handleDelete}>Delete</p>
          <p className={styles.update} onClick={handleEdit}>Update</p>
        </div>
      )}
    </div>
  );
}
