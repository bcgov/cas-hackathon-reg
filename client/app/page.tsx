import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Welcome!</h1>
        <ul>
          <Link href="/access-request">Access Request</Link>
        </ul>
        <ul>
          <Link href="/organizations">Organizations</Link>
        </ul>
        <ul>
          <Link href="/fake-user">Create a Fake User</Link>
        </ul>
      </div>
    </main>
  );
}
