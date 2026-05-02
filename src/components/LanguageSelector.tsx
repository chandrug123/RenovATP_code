import { useLanguage } from "@/hooks/useLanguage";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSelector = () => {
  const { language, setLanguage, languageNames } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "te" | "kn")}>
      <SelectTrigger className="w-auto gap-2 border-primary/20 hover:border-primary transition-colors bg-background/50 backdrop-blur-sm">
        <Globe className="w-4 h-4 text-primary" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en" className="cursor-pointer">
          {languageNames.en}
        </SelectItem>
        <SelectItem value="te" className="cursor-pointer">
          {languageNames.te}
        </SelectItem>
        <SelectItem value="kn" className="cursor-pointer">
          {languageNames.kn}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
