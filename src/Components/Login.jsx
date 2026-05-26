import { useState } from "react";

export default function Login({ onLogin, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem("user"));

    if (usuario && usuario.email === email && usuario.password === password) {
      onLogin();
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <label>Password</label>

          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <button type="submit"> Login </button>

          <p>Don't have an account?</p>

          <button type="button" onClick={goToRegister} > Register </button>
        </form>
      </div>
    </div>
  );
}