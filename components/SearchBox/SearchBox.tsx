import css from "./SearchBox.module.css";
interface SearchBoxProps {
  onSearch: (search: string) => void;
  searchQuery: string;
}
export default function SearchBox({ onSearch, searchQuery }: SearchBoxProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={searchQuery}
      onChange={handleSearch}
    />
  );
}
