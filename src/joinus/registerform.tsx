import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

/**
 * Props típus a RegisterForm komponenshez.
 */
type RegisterFormProps = {
  onRegister: (username: string) => void;
  switchToLogin: () => void;
};

/**
 * RegisterForm komponens, amely lehetővé teszi a felhasználók számára, hogy regisztráljanak.
 * @param {RegisterFormProps} props - A komponens propjai, beleértve a regisztrációs függvényt és a bejelentkezési módra váltás függvényét.
 * @returns {JSX.Element} A RegisterForm komponens JSX eleme.
 */
const RegisterForm = ({ onRegister, switchToLogin }: RegisterFormProps): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  /**
   * Regisztrációs függvény, amely ellenőrzi az adatokat, majd meghívja a regisztrációs függvényt.
   */
  const handleRegister = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = registeredUsers.some((user) => user.username === username);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address.');
      return;
    }

    if (password.length < 6) {
      setError('The password must be at least 6 characters long.');
      return;
    }

    if (userExists) {
      setError('Username already exists.');
    } else {
      registeredUsers.push({ email, username, password });
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      localStorage.setItem('currentUser', username); // Beállítja az aktuális felhasználót
      console.log('Registration successful:', { email, username, password });
      setError('');
      onRegister(username); // Átadja a felhasználónevet a bejelentkezéshez
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      {error && <p className="error-message">{error}</p>}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>
      Registration
      </Button>
      <p>
      Already have an account? <a onClick={switchToLogin}>Login</a>
      </p>
    </div>
  );
};

export default RegisterForm;