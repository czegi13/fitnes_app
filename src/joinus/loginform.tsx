import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

/**
 * Props típus a LoginForm komponenshez.
 */
type LoginFormProps = {
  onLogin: (username: string) => void;
  switchToRegister: () => void;
};

/**
 * LoginForm komponens, amely lehetővé teszi a felhasználók számára, hogy bejelentkezzenek.
 * @param {LoginFormProps} props - A komponens propjai, beleértve a bejelentkezési függvényt és a regisztrációs módra váltás függvényét.
 * @returns {JSX.Element} A LoginForm komponens JSX eleme.
 */
const LoginForm = ({ onLogin, switchToRegister }: LoginFormProps): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * Bejelentkezési függvény, amely ellenőrzi a felhasználónevet és jelszót, majd meghívja a bejelentkezési függvényt.
   */
  const handleLogin = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find((user) => user.username === username && user.password === password);

    if (user) {
      
      setError('');
      onLogin(username); // Átadja a felhasználónevet
    } else {
      setError('Incorrect username or password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
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
      <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
        Log in
      </Button>
      <p>
       Don't have an account? <a onClick={switchToRegister}>Sign up</a>
      </p>
    </div>
  );
};

export default LoginForm;