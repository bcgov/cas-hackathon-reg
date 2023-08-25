import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Welcome!</h1>

        <h2>Pages an organization would use:</h2>
        <ul>
          <Link href="/access-request">Organization Access Request</Link>{" "}
          (organization admins can request to register their organization for
          OBPS)
        </ul>
        <ul>
          <Link href="/manage-user-access">Manage User Access</Link>{" "}
          (organization admins can approve/deny requests to access their
          organization here)
        </ul>
        <ul>
          <Link href="/facility">Create or Update Facility</Link> (all approved
          organization users can access this)
        </ul>
        <ul>
          <Link href="/access-request">Organization Access Request</Link>
        </ul>
        <ul>
          <Link href="/org-access">Request access to your organization</Link>
        </ul>
        <h2>Pages an Clean Growth user would use:</h2>
        <ul>
          <Link href="/user-organizations">Manage Organization Access</Link>{" "}
          (Clean Growth users can approve/deny organizations' registration
          requests here)
        </ul>
        <h2>Demo-only pages:</h2>
        <ul>
          <Link href="/fake-user">Create a Fake User</Link>
        </ul>
      </div>
    </main>
  );
}
