import React, { useState } from "react";
import Navbar from "../../common/navbar/Navbar";
import PopulateListings from "../../common/feeds/PopulateListings";

const Dashboard = () => {
  const [keywords, setKeywords] = useState("");
  return (
    <>
      <Navbar keywords={keywords} setKeywords={setKeywords} />
      <PopulateListings keywords={keywords} />
    </>
  );
};

export default Dashboard;
