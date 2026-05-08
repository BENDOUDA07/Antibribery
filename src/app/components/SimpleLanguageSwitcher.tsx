import { useLanguage } from "../../contexts/LanguageContext";

export default function SimpleLanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "fr" | "ar")}
        className="rounded-md border px-3 py-2 text-sm bg-white text-black"
      >
        <option value="fr">🇫🇷 Français</option>
        <option value="en">🇬🇧 English</option>
        <option value="ar">🇲🇦 العربية</option>
      </select>
    </div>
  );
}