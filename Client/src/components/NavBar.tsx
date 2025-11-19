import {Link, useNavigate} from "react-router-dom"
import { useState, useEffect} from "react"

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
                    <Link to={"/register"} className="register-btn">Регистрация</Link>
                    <Link to={"/login"} className="login-btn">Логин</Link>
                    </>
                )}

                {user && (
                    <>
                    <button onClick={ifFavClick} className="favorite-btn">Понравившиеся</button>
                    <button onClick={ifAddsClick} className="myAds-btn">Мои объявления</button>
                    <button onClick={ifProfileClick} className="profile-btn">Профиль</button>
                    </>
                )}
            </div>
        </nav>
    )
}