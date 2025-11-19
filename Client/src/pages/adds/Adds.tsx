import { Link } from "react-router"
import "./adds.css"

export const Adds = () => {
    return (
    <div className="adds-sidebar">
            <Link to={"/createAdd"} className="adds-link">Создать объявление</Link>
    </div>
    )
}