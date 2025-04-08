import React from "react";

interface AlertProps {
  messages: string[];
}

export const Alert: React.FC<AlertProps> = ({ messages }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-left">
      <strong className="font-bold">Error:</strong>
      <ul className="list-disc list-inside mt-1">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};
