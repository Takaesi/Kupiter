import { Link } from "react-router"
import "./ads.css"

export const Ads = () => {
    return (
    <div className="adds-sidebar">
            <Link to={"/createAd"} className="adds-link">Создать объявление</Link>
    </div>
    )
}