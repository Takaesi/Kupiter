import { Outlet } from "react-router";
import { NavBar } from "../components/navBar/NavBar";

export const PrivateLayout = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    )
}