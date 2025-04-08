import { FileUpload } from "./components/FileUpload";

const App = () => {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Upload CV</h1>
      <FileUpload />
    </div>
  );
};

export default App;
