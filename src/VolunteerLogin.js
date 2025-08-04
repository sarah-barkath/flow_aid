import React, { useState } from "react";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const VolunteerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (email === "" || password === "") {
        setErrorMessage("Please fill in both fields.");
        return;
      }
      setErrorMessage(""); // Clear error message

      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save volunteer information in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          role: "volunteer",
        });

        alert("Volunteer registered successfully!");
        navigate("/interactive-map"); // Redirect to map page
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Volunteer logged in successfully!");
        navigate("/interactive-map"); // Redirect to map page
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{isRegister ? "Register as Volunteer" : "Volunteer Login"}</h2>
      
      {/* Input Fields */}
      <div style={styles.inputContainer}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Error Message */}
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      
      {/* Submit Button */}
      <button onClick={handleSubmit} style={styles.button}>
        {isRegister ? "Register" : "Login"}
      </button>

      {/* Toggle between Login and Register */}
      <p onClick={() => setIsRegister(!isRegister)} style={styles.toggleText}>
        {isRegister ? "Already have an account? Login" : "New here? Register"}
      </p>
    </div>
  );
};

// Styling
const styles = {
  container: {
    width: "300px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  header: {
    color: "#1a73e8",
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  inputContainer: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#1a73e8",
    color: "white",
    padding: "12px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
  },
  toggleText: {
    marginTop: "10px",
    color: "#1a73e8",
    cursor: "pointer",
    textDecoration: "underline",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default VolunteerLogin;
