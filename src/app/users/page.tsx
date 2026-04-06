// import Link from "next/link";

// export default function Home() {
//   return (
//     <main style={{ padding: "2rem" }}>
//       <h1>Welcome</h1>
//       <Link href="/users">View Students →</Link>
//     </main>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import UserTable from "../../components/UserTable";
import { getStudents, createStudent } from "../../lib/userApi";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
useEffect(() => {
    getStudents().then((data) => {
      setUsers(data);
    });
  }, []);

 const handleAdd = async () => {
    if (!form.firstName || !form.email) return;
    await createStudent(form);
    const updated = await getStudents();
    setUsers(updated);
    setForm({ firstName: "", lastName: "", email: "", department: "" });
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Students List</h1>
      <div style={{ marginBottom: "1rem", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <input placeholder="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        <input placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
        <button onClick={handleAdd} style={{ background: "green", color: "white", padding: "4px 12px" }}>
          + Add Student
        </button>
      </div>
      <UserTable users={users} />
    </main>
  );
}