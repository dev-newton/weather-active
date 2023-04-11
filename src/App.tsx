import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Cities from "pages/Cities/Cities";
import Navbar from "components/Navbar/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Cities />} />
      </Routes>
    </>
  );
};

export default App;
