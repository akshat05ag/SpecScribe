
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-2xl tracking-tight">SpecScribe</span>
        <span className="bg-white/20 text-xs px-2 py-1 rounded-full">Beta</span>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 hover:bg-white/20">
          <Github className="h-4 w-4 mr-2" />
          GitHub
        </Button>
      </div>
    </header>
  );
};

export default Header;
