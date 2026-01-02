import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <p key={user._id}>{user.name} - {user.email}</p>
      ))}
    </div>
  );
}

export default App;
