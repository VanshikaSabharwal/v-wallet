import React from "react";
import { SideBar } from "./SideBar";

const MainPage = async () => {
  return (
    <div>
      <h1 className="text-lg">Welcome to V Wallet !</h1>
      <SideBar title="Transfer" href="/transfer" icon="" />
      <SideBar title="Transactions" href="/transactions" icon="" />
      <SideBar title="P2P" href="/peer" icon="" />
    </div>
  );
};

export default MainPage;
