import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Re Ne Connect</h1>
      <p>The student UI is available on the users page.</p>
      <Link href="/users">Open Students List</Link>
    </main>
  );
}
