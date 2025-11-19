import {Link, useNavigate} from "react-router-dom"
import { useState, useEffect} from "react"
import "./navbar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null
    })

    useEffect(() => {
        function handleRipToken () {
            setUser(null)
        }

        window.addEventListener("user-rip-token", handleRipToken)

        return () => window.removeEventListener("user-rip-token", handleRipToken)
    }, [])

    const ifFavClick = () => {
        if (!user) {
            navigate("/login")
            return
        }
        navigate("/favorites")
    }

    const ifAddsClick = () => {
        if (!user) {
            navigate("/login")
            return
        }
        navigate("/adds")
    }

    const ifProfileClick = () => {
        if (!user) {
            navigate("/login")
            return
        }
        navigate("/profile")
    }

    return (
        <nav className="navbar">
            <Link to={"/main"} className="logo">
                Kupiter
            </Link>

            <div className="nav-right">
                {!user && (
                    <>
                    <Link to={"/registe"} className="link">Регистрация</Link>
                    <Link to={"/login"} className="link">Логин</Link>
                    </>
                )}

                {user && (
                    <>
                    <button onClick={ifFavClick} className="btn">Понравившиеся</button>
                    <button onClick={ifAddsClick} className="btn">Мои объявления</button>
                    <button onClick={ifProfileClick} className="btn">Профиль</button>
                    </>
                )}
            </div>
        </nav>
    )
}