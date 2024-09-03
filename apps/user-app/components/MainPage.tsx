import React from "react";
import { SideBar } from "./SideBar";

const MainPage = () => {
  return (
    <div>
      <SideBar title="Transfer" href="/transfer" icon="" />
      <SideBar title="Transactions" href="/transactions" icon="" />
      <SideBar title="P2P" href="/peer" icon="" />
    </div>
  );
};

export default MainPage;
