import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

interface FileWithId {
  id: string;
  file: File;
}

interface FileError {
  file: File;
  error: string;
}

export const useFileUpload = () => {
  const [validFiles, setValidFiles] = useState<FileWithId[]>([]);
  const [errors, setErrors] = useState<FileError[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const newValidFiles = acceptedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
      }));

      const newErrors: FileError[] = fileRejections.map((rej) => ({
        file: rej.file,
        error: rej.errors.map((e) => e.message).join(", "),
      }));

      setValidFiles((prev) => [...prev, ...newValidFiles]);
      setErrors((prev) => [...prev, ...newErrors]);
    },
    []
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: { "application/pdf": [] },
    multiple: true,
    onDrop,
  });

  const removeFile = (id: string) => {
    setValidFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const removeErrorFile = (fileName: string) => {
    setErrors((prev) => prev.filter((e) => e.file.name !== fileName));
  };

  const clearAll = () => {
    setValidFiles([]);
    setErrors([]);
  };

  return {
    getRootProps,
    getInputProps,
    validFiles,
    errors,
    removeFile,
    removeErrorFile,
    clearAll,
    isDragActive,
    isDragReject,
  };
};
