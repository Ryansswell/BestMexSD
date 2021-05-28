import { useState } from "react";
import { useAuth } from "../../util/auth";
import { Redirect } from "react-router";
import useLoginRedirect from "../../util/useLoginRedirect";

function SignupPage() {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // custom hook redirects to previous page or default page if user is logged in
  useLoginRedirect();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!username) {
      return alert("Must provide a username.");
    }
    if (!email) {
      return alert("Must provide an email address.");
    }
    if (!password || password.length < 8) {
      return alert("Invalid password. Must contain at least 8 characters.");
    }

    auth.signup({ email, username, password });
  };

  const message = auth.pending
    ? "Creating your account..."
    : auth.error || "Please complete the form and click submit.";

  return (
    <div className="container-fluid">
      {/* redirect to home page if user is logged in */}
      {auth.isLoggedIn() && <Redirect to="/" />}
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          id="username"
          type="text"
          readOnly={auth.pending}
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          type="email"
          readOnly={auth.pending}
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          type="password"
          readOnly={auth.pending}
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <br />
        <button className="nav-buttons" type="submit" disabled={auth.pending}>
          {auth.pending ? "⌛" : "Submit"}
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignupPage;
