import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../../../features/auth/authApi";

export default function StudentRegistrationForm() {
  // Dependencies
  const navigate = useNavigate();
  const [registration, { isSuccess }] = useRegistrationMutation();

  // Local states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  // Registration handler function
  const registrationHandler = (e) => {
    e.preventDefault();
    if (password.length < 5) {
      setError("Password should contain at least 5 characters!");
    } else if (password !== confirmPass) {
      setError("Password does not match!");
    } else {
      setError("");
      const data = {
        name,
        email,
        password,
        role: "student",
      };

      // Register the user
      registration(data);
    }
  };

  // Side Effects
  useEffect(() => {
    if (isSuccess) {
      navigate("/videoPlayer/1");
    }
  }, [navigate, isSuccess]);

  return (
    <form className="mt-8 mb-2" onSubmit={registrationHandler}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="login-input mb-1 rounded-md"
            placeholder="Student Name"
          />
        </div>
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input mb-1 rounded-md"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input mb-1 rounded-md"
            placeholder="Password"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="confirm-password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
            className="login-input mb-2 rounded-md"
            placeholder="Confirm Password"
          />
        </div>
      </div>

      {/* Show error if occurs */}
      {error && (
        <div className="flex items-center mb-2 justify-end">
          <div className="text-sm">
            <h2 className="font-medium error-text hover:text-violet-500">
              {error}
            </h2>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
      >
        Create Account
      </button>
    </form>
  );
}
