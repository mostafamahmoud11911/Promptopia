"use client";
import styles from "./Feed.module.scss";
import PromptCard from "../PromptCard/PromptCard";
import { useState, useEffect } from "react";

function PromptCardList({ posts, handleTagClick }) {
  return (
    <div className={styles.prompt_layout}>
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState("");

  function handleSearchChange(e) {
    setSearchText(e.target.value);

    if (e.target.value.length > 0) {
      const regex = new RegExp(e.target.value, "i");
      const filterData = posts.filter(
        (item) =>
          regex.test(item.creator.username) ||
          regex.test(item.tag) ||
          regex.test(item.prompt)
      );
      setPosts(filterData);
    } else {
      fetchPosts();
    }
  }

  async function fetchPosts() {
    const response = await fetch(`/api/prompt`);
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className={styles.feed}>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="search for your tag or username"
          value={searchText}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </form>

      <PromptCardList posts={posts} />
    </section>
  );
}
