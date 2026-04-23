
"use client";
import { useState } from "react";
import { deleteStudent, updateStudent } from "../lib/userApi";

export default function UserTable({ users }) {
  const [list, setList] = useState(users);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  // Keep list in sync when users prop changes
  useState(() => {
    setList(users);
  });

  const handleDelete = async (id) => {
    await deleteStudent(id);
    setList(list.filter((u) => u.id !== id));
  };

  const handleEditClick = (user) => {
    setEditId(user.id);
    setEditData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      department: user.department,
    });
  };

  const handleUpdate = async (id) => {
    await updateStudent(id, editData);
    setList(list.map((u) => (u.id === id ? { ...u, ...editData } : u)));
    setEditId(null);
  };

  return (
    <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead style={{ background: "#1e1e2e", color: "white" }}>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            {editId === user.id ? (
              <>
                <td><input value={editData.firstName} onChange={(e) => setEditData({ ...editData, firstName: e.target.value })} /></td>
                <td><input value={editData.lastName} onChange={(e) => setEditData({ ...editData, lastName: e.target.value })} /></td>
                <td><input value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} /></td>
                <td><input value={editData.department} onChange={(e) => setEditData({ ...editData, department: e.target.value })} /></td>
              </>
            ) : (
              <>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
              </>
            )}
            <td>{new Date(user.createdAt).toLocaleString()}</td>
            <td>
              {editId === user.id ? (
                <>
                  <button onClick={() => handleUpdate(user.id)} style={{ color: "green", marginRight: 8 }}>Save</button>
                  <button onClick={() => setEditId(null)} style={{ color: "gray" }}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditClick(user)} style={{ color: "blue", marginRight: 8 }}>Edit</button>
                  <button onClick={() => handleDelete(user.id)} style={{ color: "red" }}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}