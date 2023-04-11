import { Routes, Route } from "react-router-dom";

import Navbar from "components/Navbar/Navbar";
import Cities from "pages/Cities/Cities";
import City from "pages/City/City";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Cities />} />
        <Route path="/city" element={<City />} />
      </Routes>
    </>
  );
};

export default App;
