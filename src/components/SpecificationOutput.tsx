
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Copy, CheckCircle } from "lucide-react";

export interface Specification {
  modules: string;
  schemas: string;
  pseudoCode: string;
}

interface SpecificationOutputProps {
  specification: Specification | null;
}

const SpecificationOutput = ({ specification }: SpecificationOutputProps) => {
  const [activeTab, setActiveTab] = useState<string>("modules");
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    const contentMap: Record<string, string> = {
      "modules": specification?.modules || "",
      "schemas": specification?.schemas || "",
      "pseudoCode": specification?.pseudoCode || ""
    };
    
    const contentToCopy = contentMap[activeTab];
    
    if (contentToCopy) {
      navigator.clipboard.writeText(contentToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExport = () => {
    if (!specification) return;
    
    const allContent = `
# Modules
${specification.modules}

# Schemas
${specification.schemas}

# Pseudo Code
${specification.pseudoCode}
    `.trim();
    
    const blob = new Blob([allContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'specification.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!specification) {
    return (
      <Card className="shadow-md h-full flex items-center justify-center bg-muted/30">
        <div className="text-center p-8">
          <h3 className="text-lg font-medium text-muted-foreground mb-2">No Output Yet</h3>
          <p className="text-sm text-muted-foreground">
            Enter your business requirements and click "Analyze" to see the results here.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-md h-full">
      <CardHeader>
        <CardTitle>Technical Specification</CardTitle>
      </CardHeader>
      <Tabs defaultValue="modules" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="schemas">Schemas</TabsTrigger>
            <TabsTrigger value="pseudoCode">Pseudo Code</TabsTrigger>
          </TabsList>
        </div>
        <CardContent>
          <TabsContent value="modules" className="mt-0">
            <pre className="bg-muted p-4 rounded-md text-sm overflow-auto max-h-[400px] font-mono whitespace-pre-wrap">
              {specification.modules}
            </pre>
          </TabsContent>
          <TabsContent value="schemas" className="mt-0">
            <pre className="bg-muted p-4 rounded-md text-sm overflow-auto max-h-[400px] font-mono whitespace-pre-wrap">
              {specification.schemas}
            </pre>
          </TabsContent>
          <TabsContent value="pseudoCode" className="mt-0">
            <pre className="bg-muted p-4 rounded-md text-sm overflow-auto max-h-[400px] font-mono whitespace-pre-wrap">
              {specification.pseudoCode}
            </pre>
          </TabsContent>
        </CardContent>
      </Tabs>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleCopy}>
          {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SpecificationOutput;
