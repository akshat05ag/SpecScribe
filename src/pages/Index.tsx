
import { useState } from "react";
import Header from "@/components/Header";
import RequirementsInput from "@/components/RequirementsInput";
import SpecificationOutput, { Specification } from "@/components/SpecificationOutput";
import { mockSpecGenerator } from "@/utils/mockSpecGenerator";

const Index = () => {
  const [specification, setSpecification] = useState<Specification | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleAnalyze = async (requirements: string) => {
    setIsProcessing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, this would call an API endpoint
      const result = mockSpecGenerator(requirements);
      
      setSpecification(result);
    } catch (error) {
      console.error("Error processing requirements:", error);
      // Handle error state here
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">High-Level to Low-Level Architecture Pipeline</h1>
          <p className="text-muted-foreground">
            Convert business requirements into technical specifications with AI assistance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <RequirementsInput onAnalyze={handleAnalyze} isProcessing={isProcessing} />
          </div>
          <div>
            <SpecificationOutput specification={specification} />
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>SpecScribe is a demonstration tool for showing how AI can help bridge business and technical requirements.</p>
        </div>
      </main>
    </div>
  );
};

export default Index;
