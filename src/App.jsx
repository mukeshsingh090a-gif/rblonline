import React from "react";
import ContactForm from "./components/ContactForm";

function App() {
  // Static user data (no API)
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" }
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>AxisOnline Users</h1>

      <div>
        {users.map(user => (
          <p key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </p>
        ))}
      </div>

      <hr style={{ margin: "40px 0" }} />

      <h2>Contact Form</h2>
      <ContactForm />
    </div>
  );
}

export default App;
