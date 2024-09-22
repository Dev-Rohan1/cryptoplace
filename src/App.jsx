import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
