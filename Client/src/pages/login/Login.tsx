import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { api } from "../../api/axios"
import "./login.css"

export const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [ifError, setIfError] = useState<string>("")
    const [ifSuccess, setIfSuccess] = useState<string>("")

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await api.post("/api/login", {
                email,
                password
            })

            if (res.status === 200) {
                setIfSuccess("Удачно!")
                localStorage.setItem("token", res.data.token)
                navigate("/main")
            }
        }catch(err){
            console.error(err)
            setIfError("Неверный email или пароль")
            setEmail("")
            setPassword("")
        }
    }

    return (
        <div className="login-cont">
            <form className="login-form" onSubmit={onSubmit}>

                <h1 className="login-title">Войти</h1>

                <input 
                className="login-input"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                />

                <input
                className="login-input"
                placeholder="Пароль"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                />

                <p className="ifError">{ifError}</p>
                <button className="btn-send">Отправить</button>
                <Link to={"/register"} className="register-link">Ещё нет аккаунта?</Link>
                <p className="ifSuccess">{ifSuccess}</p>

            </form>
        </div>
    )
}