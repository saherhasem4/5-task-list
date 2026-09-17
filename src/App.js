import "./App.css";
import TaskList from "./components/TaskList";
import {SnackbarProvider} from "./contexts/SnackbarContext";


function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <TaskList />
      </div>
    </SnackbarProvider>
  );
}

export default App;
