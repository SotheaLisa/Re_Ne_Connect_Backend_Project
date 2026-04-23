
const BASE_URL = "http://localhost:8080";

export async function getStudents() {
  const res = await fetch(`${BASE_URL}/api/v1/students`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch students");
  const data = await res.json();
  return data.payload || data;
}

export async function getStudentById(id) {
  const res = await fetch(`${BASE_URL}/api/v1/students/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch student");
  const data = await res.json();
  return data.payload || data;
}

export async function createStudent(studentData) {
  const res = await fetch(`${BASE_URL}/api/v1/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });
  if (!res.ok) throw new Error("Failed to create student");
  const data = await res.json();
  return data.payload || data;
}

export async function updateStudent(id, studentData) {
  const res = await fetch(`${BASE_URL}/api/v1/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });
  if (!res.ok) throw new Error("Failed to update student");
  const data = await res.json();
  return data.payload || data;
}

export async function deleteStudent(id) {
  const res = await fetch(`${BASE_URL}/api/v1/students/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete student");
}