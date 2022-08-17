import "./App.css";
import CommentCard from "./components/CommentCard";
import InputComment from "./components/InputComment";
import { DataProvider } from "../src/context/Context";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <header className="App-header">
          <CommentCard />
          <InputComment />
        </header>
      </div>
    </DataProvider>
  );
}

export default App;
