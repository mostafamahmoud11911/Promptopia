"use client";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function providers() {
      const providers = await getProviders();
      setProviders(providers);
    }
    providers();
  }, []);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <Image src="/assets/images/logo.svg" width={30} height={30} alt="" />
        <p>Promptopia</p>
      </Link>
      {/*Disktop Navbar */}
      <div className={styles.links}>
        {session?.user ? (
          <div className={styles.link}>
            <Link href="/create-prompt" className={styles.post}>
              Create Post
            </Link>
            <button onClick={() => signOut()}>Signout</button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                alt=""
                width={35}
                height={35}
                className={styles.profile}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  className={styles.black_btn}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}
