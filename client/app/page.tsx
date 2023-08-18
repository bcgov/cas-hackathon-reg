import styles from "./page.module.css";
import Organizations from "./organizations";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Welcome to the Operator Portal</h1>
        <Link href="/access-request">Access Request</Link>
      </div>
    </main>
  );
}
