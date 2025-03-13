import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Calendar from "./pages/calendar/Calendar";
import RequireUser from "./components/RequireUser";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RequireUser />}>
          <Route path="/calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
