import { Route, Routes } from "react-router-dom";
import FrontLayout from "./pages/FrontLayout";
import StationsInfo from "./pages/StationsInfo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route path="home" element={<StationsInfo />}></Route>
          <Route path="guidelines" element={<StationsInfo />}></Route>
          <Route path="rate" element={<StationsInfo />}></Route>
          <Route path="stations-info" element={<StationsInfo />}></Route>
          <Route path="news" element={<StationsInfo />}></Route>
          <Route path="activity" element={<StationsInfo />}></Route>
          <Route path="login" element={<StationsInfo />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
