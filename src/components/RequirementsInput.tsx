
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Trash2 } from "lucide-react";

interface RequirementsInputProps {
  onAnalyze: (requirements: string) => void;
  isProcessing: boolean;
}

const RequirementsInput = ({ onAnalyze, isProcessing }: RequirementsInputProps) => {
  const [requirements, setRequirements] = useState<string>("");

  const handleSubmit = () => {
    if (requirements.trim()) {
      onAnalyze(requirements);
    }
  };

  const handleClear = () => {
    setRequirements("");
  };

  const exampleText = "Create a customer management system that allows users to add, edit, and delete customer records. The system should include contact information, purchase history, and support ticket tracking. Users need different permission levels, and the system should generate monthly reports.";

  const loadExample = () => {
    setRequirements(exampleText);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Business Requirements</span>
          <Button variant="ghost" onClick={loadExample} className="text-xs h-7 text-muted-foreground">
            Load Example
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter your high-level business requirements here..."
          className="min-h-[300px] font-sans text-sm resize-none"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleClear}
          disabled={!requirements || isProcessing}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={!requirements || isProcessing}
          className="bg-primary"
        >
          {isProcessing ? "Processing..." : "Analyze"}
          {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RequirementsInput;
