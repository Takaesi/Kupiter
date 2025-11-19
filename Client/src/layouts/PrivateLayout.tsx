import { Outlet } from "react-router";
import { NavBar } from "../components/NavBar";

export const PrivateLayout = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    )
}