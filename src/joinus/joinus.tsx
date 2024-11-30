import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import '../styles/joinus.less';
import LoginForm from './loginform';
import RegisterForm from './registerform';

/**
 * Props típus a JoinUs komponenshez.
 */
type JoinUsProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string) => void;
};

/**
 * JoinUs komponens, amely lehetővé teszi a felhasználók számára, hogy bejelentkezzenek vagy regisztráljanak.
 * @param {JoinUsProps} props - A komponens propjai, beleértve a modál nyitott állapotát, a modál bezárásának függvényét és a bejelentkezési függvényt.
 * @returns {JSX.Element | null} A JoinUs komponens JSX eleme vagy null, ha a modál nincs nyitva.
 */
const JoinUs = ({ isOpen, onClose, onLogin }: JoinUsProps): JSX.Element | null => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>X</button>
        {isLogin ? (
          <LoginForm onLogin={(username) => { onLogin(username); onClose(); }} switchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onRegister={(username) => { onLogin(username); onClose(); }} switchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default JoinUs;