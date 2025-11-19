import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const saved = localStorage.getItem("user")
    const user = saved ? JSON.parse(saved) : null;
    const token = user ? user.token : null;

    if(!token){
        return <Navigate to="/login" replace/>
    }

    return children 
}