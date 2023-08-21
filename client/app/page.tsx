import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Welcome!</h1>
        <h2>Demo-only pages:</h2>
        <ul>
          <Link href="/fake-user">Create a Fake User</Link>
        </ul>
        <h2>Pages an organization would use:</h2>
        <ul>
          <Link href="/access-request">Organization Access Request</Link>
        </ul>
        <h2>Pages an IRC user would use:</h2>
        <ul>
          <Link href="/organizations">List of Organizations</Link>
        </ul>
      </div>
    </main>
  );
}
