import Link from "next/link";

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
          <Link href="/access-request">
            Organization Access Request (request to register an organization for
            OBPS)
          </Link>
        </ul>
        <ul>
          <Link href="/manage-user-access">
            Manage User Access (you can approve/deny a user's request to access
            an organization here)
          </Link>
          <Link href="/access-request">Organization Access Request</Link>
          <Link href="/org-access">Request access to your organization</Link>
        </ul>
        <h2>Pages an IRC user would use:</h2>
        <ul>
          <Link href="/user-organizations">Manage Organization Access</Link>{" "}
          (you can approve/deny an organization here)
        </ul>
      </div>
    </main>
  );
}
