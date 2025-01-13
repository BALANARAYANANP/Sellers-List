import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Use navigate instead of history

  const handleLogin = () => {
    const validUserId = 'admin';
    const validPassword = 'password123';

    // Check if both fields are filled in
    if (!userId || !password) {
      setErrorMessage('Please enter both User ID and Password.');
      return;
    }

    // Validate credentials
    if (userId === validUserId && password === validPassword) {
      setErrorMessage('');
      onLogin(); // Call the onLogin callback to update parent state

      // Redirect to Seller page using navigate
      navigate('/seller'); // Redirect to /seller route
    } else {
      setErrorMessage('Invalid User ID or Password. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Login</h1>
      </header>

      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="admin"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="password123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
        <button onClick={handleLogin} style={styles.submitButton}>
          Login
        </button>
      </div>

      <footer style={styles.footer}>
        <p>&copy; 2025 Seller Management</p>
      </footer>
    </div>
  );
};

// Styles for the login page
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    height: '100vh',
    backgroundColor: '#f7f7f7',
  },
  header: {
    marginBottom: '20px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '200px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
    fontSize: '0.9rem',
    margin: '10px 0',
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px',
    fontSize: '0.9rem',
    color: '#333',
  },
};

export default Login;
