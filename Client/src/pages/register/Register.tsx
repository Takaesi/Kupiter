import { useState } from "react"
import { api } from "../../api/axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./register.css"

export const Register = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [city, setCity] = useState("")

    const [isSuccess, setIsSuccess] = useState<string>("")

    const navigate = useNavigate()

    const onSubmit = async  (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res =  await api.post("/api/register", {
                firstName,
                lastName,
                password,
                phone,
                email,
                city
            })

            if (res.status === 200) {
                setIsSuccess("Поздраляю. Вы зарегестрированы!")
                localStorage.setItem("user", JSON.stringify(res.data))
                navigate("/main")
            }

            console.log(res)
        }catch(error){
            console.log(error)
        }
        
    }

    return (
        <div className="register-cont">
        <form className="register-form" onSubmit={onSubmit}>
            <h1 className="register-title">Зарегестрироваться</h1>
            <input 
            className="register-input"
            placeholder="Имя"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value.trim())}
            />

            <input
            className="register-input"
            placeholder="Фамилия"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value.trim())}
            />

            <input
            className="register-input"
            placeholder="Номер телефона"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value.trim())}
            />

            <input
            className="register-input"
            placeholder="Почта"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value.trim())}
            />

            <input
            className="register-input"
            placeholder="Пароль"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value.trim())}
            />

            <input
            className="register-input"
            placeholder="Город"
            value={city}
            required
            onChange={(e) => setCity(e.target.value.trim())}
            />
            <button className="register-btn-send">Отправить</button>
            <p>{isSuccess}</p>
            <Link to={"/login"} className="login-link">Уже есть аккаунт?</Link>
        </form>
        </div>
    )
}