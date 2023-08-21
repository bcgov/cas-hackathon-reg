import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Welcome to the Operator Portal</h1>
        <div>
          <Link href="/access-request">Access Request</Link>
        </div>
        <div>
          <Link href="/fake-user">Create Fake User</Link>
        </div>
      </div>
    </main>
  );
}
