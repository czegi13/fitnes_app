import { h, JSX } from 'preact';
import Button from '@mui/material/Button';
import { SelectedPage } from '../../types/types';

/**
 * Props típus a Link komponenshez.
 */
type Props = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

/**
 * Link komponens, amely egy navigációs linket jelenít meg.
 * @param {Props} props - A komponens propjai, beleértve az oldalt, a kiválasztott oldalt és a kiválasztott oldal beállításának függvényét.
 * @returns {JSX.Element} A Link komponens JSX eleme.
 */
const Link = ({ page, selectedPage, setSelectedPage }: Props): JSX.Element => {
  const lowerCasePage = page.toLowerCase().replace(/ /g, '') as SelectedPage;

  return (
    <Button
      variant={selectedPage === lowerCasePage ? 'contained' : 'text'}
      color="primary"
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
    </Button>
  );
};

export default Link;