import { useState } from "react";

export default function Register({ onRegister, goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    const user = {name: name, email: email, password: password};

    localStorage.setItem("user", JSON.stringify(user));

    onRegister();
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>

          <input type="text" id="name" maxLength={25} value={name} onChange={(e) => setName(e.target.value)}/>

          <label htmlFor="email">Email</label>

          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor="password">Password</label>

          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <button type="submit"> Register </button>

          <p>Already have an account?</p>

          <button type="button" onClick={goToLogin}> Login </button>
        </form>
      </div>
    </div>
  );
}