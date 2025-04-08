import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

interface PredictionResult {
  predicted_id: number;
  predicted_category: string;
  category_distribution: Record<string, number>;
}

interface PredictionResponse {
  filename: string;
  result: PredictionResult;
}

export const usePredict = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PredictionResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const predict = async (files: File[]) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      console.log(API_URL);
      const response = await fetch(`https://foai-backend.politebay-14b7f84c.polandcentral.azurecontainerapps.io/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Prediction failed");
      }

      const data: PredictionResponse[] = await response.json();
      setResults(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return { predict, isLoading, results, error };
};
