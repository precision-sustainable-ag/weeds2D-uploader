import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Container from "./components/Container/Container";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<Container />} />
          <Route path="field" element={<Container />} />
          <Route path="semifield" element={<Container />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
