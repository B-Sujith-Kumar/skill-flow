import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import Loginuser from "./views/Loginuser";
import Loginadmin from "./views/Loginadmin";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<Loginadmin />} />
          <Route path="/user/login" element={<Loginuser />} />
          <Route path="/about" element={<h1 className="">About</h1>} />
          <Route path="/contact" element={<h1 className="">Contact</h1>} />
          <Route path="*" element={<h1 className="">Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
