import styles from "./page.module.css";
import Organizations from "./organizations/page";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Welcome to the Operator Portal</h1>
        <Link href="/access-request">Access Request</Link>
        <br></br>
        <Link href="/organizations">Organizations</Link>
      </div>
    </main>
  );
}
