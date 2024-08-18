import Home from "./pages/Home";
import Error from "./pages/Error";
import { Routes, Route } from "react-router-dom";

function App() {
  document.title = "LiteCrack";
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={
            <Error
              name="Page"
              type="404"
              description="This page could not be found. Please try again later."
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
