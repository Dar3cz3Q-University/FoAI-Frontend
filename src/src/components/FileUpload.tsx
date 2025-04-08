import { useFileUpload } from "../hooks/useFileUpload";
import { usePredict } from "../hooks/usePredict";

export const FileUpload = () => {
  const {
    getRootProps,
    getInputProps,
    validFiles,
    errors,
    removeFile,
    removeErrorFile,
    clearAll,
    isDragActive,
  } = useFileUpload();

  const { predict, isLoading, results, error: predictError } = usePredict();

  const handlePredict = () => {
    const files = validFiles.map((f) => f.file);
    predict(files);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition ${
          isDragActive ? "bg-blue-50 border-blue-500" : "border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        <p>Drag & Drop or Choose file to upload</p>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-left space-y-1">
          <strong className="font-bold">Error:</strong>
          <ul className="mt-2">
            {errors.map((e, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span>
                  {e.file.name}: {e.error}
                </span>
                <button
                  onClick={() => removeErrorFile(e.file.name)}
                  className="text-sm text-red-600 hover:text-red-800 underline ml-2"
                >
                  Usuń
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {validFiles.length > 0 && (
        <div className="text-left">
          <p className="font-semibold mb-2">Attached files:</p>
          <ul className="space-y-1">
            {validFiles.map(({ id, file }) => (
              <li
                key={id}
                className="flex items-center justify-between px-3 py-2 rounded"
              >
                <span>{file.name}</span>
                <button
                  onClick={() => removeFile(id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Wyczyść wszystkie
            </button>

            <button
              onClick={handlePredict}
              disabled={errors.length > 0 || isLoading}
              className={`px-4 py-2 rounded transition ${
                errors.length > 0 || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isLoading ? "Predicting..." : "Predict"}
            </button>
          </div>
        </div>
      )}

      {predictError && (
        <div className="text-red-500 font-semibold">Error: {predictError}</div>
      )}

      {results && (
        <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded text-left space-y-4">
          <strong className="font-bold">Wyniki predykcji:</strong>

          {results.map((res, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <p className="font-semibold">{res.filename}</p>
              <p>
                <span className="font-medium">Predykcja:</span>{" "}
                {res.result.predicted_category}
              </p>

              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Rozkład kategorii:</p>
                <ul className="text-sm list-disc list-inside grid grid-cols-2 gap-x-4">
                  {Object.entries(res.result.category_distribution).map(
                    ([category, value]) => (
                      <li key={category}>
                        {category}: {value.toFixed(2)}%
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
