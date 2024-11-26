import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((newUser) => {
        setUsers([...users, newUser]); 
        event.target.reset(); 
      });
  };

  return (
    <>
      <h1>User Management System</h1>
      <p>Number of users: {users.length}</p>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Add User</button>
      </form>

      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.id} -- {user.name} -- {user.email}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
