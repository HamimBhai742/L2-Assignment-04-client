import Navbar from "@/Components/Navbar/Navbar";
import { Outlet } from "react-router";

export default function Root() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}
