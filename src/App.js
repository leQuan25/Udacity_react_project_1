import SearchBooks from "./SearchBooks";
import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";

function App() {
  return (
    <Routes>
        <Route path="/search" element={<SearchBooks />} />
        <Route exact path="/" element={<MainPage />} />
      </Routes>
  );
}

export default App;
