import { h, JSX } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import '../../styles/navbar.less';
import Logo from '../../assets/logo.png';
import Link from '../../components/navbar/link';
import { SelectedPage } from '../../types/types';
import JoinUs from '../../joinus/joinus';

/**
 * Props típus a Navbar komponenshez.
 */
type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  currentUser: string;
  setCurrentUser: (value: string) => void; // Az aktuális felhasználó beállítása
};

/**
 * Navbar komponens, amely a navigációs sávot jeleníti meg.
 * @param {Props} props - A komponens propjai, beleértve a kiválasztott oldalt, a kiválasztott oldal beállításának függvényét és az aktuális felhasználó beállításának függvényét.
 * @returns {JSX.Element} A Navbar komponens JSX eleme.
 */
const Navbar = ({ selectedPage, setSelectedPage, currentUser, setCurrentUser }: Props): JSX.Element => {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Ellenőrzi, hogy van-e mentett felhasználó a localStorage-ban, és beállítja a bejelentkezési állapotot
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setIsLoggedIn(true);
      setCurrentUser(savedUser);
    }
  }, []);

  // Megnyitja a csatlakozási modált
  const openJoin = () => setIsJoinOpen(true);

  // Bezárja a csatlakozási modált
  const closeJoin = () => setIsJoinOpen(false);

  /**
   * Bejelentkezési függvény, amely beállítja a bejelentkezési állapotot és menti az aktuális felhasználót a localStorage-ba.
   * @param {string} username - A bejelentkezett felhasználó neve.
   */
  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setCurrentUser(username); // Beállítja az aktuális felhasználót
    localStorage.setItem('currentUser', username); // Mentés a localStorage-ba
  };

  /**
   * Kijelentkezési függvény, amely törli a bejelentkezési állapotot és eltávolítja az aktuális felhasználót a localStorage-ból.
   */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(''); // Törli az aktuális felhasználót
    localStorage.removeItem('currentUser'); // Törlés a localStorage-ból
    setSelectedPage(SelectedPage.Home); // Átirányítás a főoldalra
  };

  return (
    <nav>
      <div className="navbar-container">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="navbar-logo" />

        {/* Navigációs Linkek */}
        <div className="nav-links">
          <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
          <Link page="Trainings" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
          <Link page="About" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
          {isLoggedIn && <Link page="TrainingLog" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />}
        </div>

        {/* Felhasználónév és CTA (Call-To-Action) Gomb */}
        <div className="user-info">
          {isLoggedIn && <span className="username">{currentUser}</span>}
          {isLoggedIn ? (
            <button className="cta-button" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <a href="#joinus" className="cta-button" onClick={openJoin}>
              Join us Now!
            </a>
          )}
        </div>
      </div>
      <JoinUs isOpen={isJoinOpen} onClose={closeJoin} onLogin={handleLogin} />
    </nav>
  );
};

export default Navbar;