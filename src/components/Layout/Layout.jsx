import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <h5 className="p-2 bg-slate-300 ">@Developer/Ibrahim AL-shabrawishy</h5>
    </div>
  );
}
