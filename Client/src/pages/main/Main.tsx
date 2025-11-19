import { useState } from "react"
import "./main.css"

export const Main = () => {
    
    let city = ""
    try {
        const savedUser = localStorage.getItem("user")
        if (savedUser){
            city = JSON.parse(savedUser).city
        }
    } catch {
        city = ""
    }
     

    const [filters, setFilters] = useState({
        city: city,
        category: "",
        priceFrom: "",
        priceTo: ""
    })

    const updateFliters = (key: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }

    console.log(city)

    return (
        <>
        <div className="sidebar">
            <div className="filter-group">
                <label className="filter-label">Город: </label>
                <input
                className="filter-input"
                placeholder="город:"
                value={filters.city}
                onChange={(e) => updateFliters("city", e.target.value)}
                />

                <label className="filter-label">Категория</label>
                <select
                    className="filter-input"
                    value={filters.category}
                    onChange={(e) => updateFliters("category", e.target.value)}
                >
                    <option value={""}>Все категории</option>
                    <option value={"phones"}>Телефоны</option>
                    <option value={"cars"}>Автомобили</option>
                    <option value={"apartaments"}>Недвижимость</option>
                </select>

                <label className="filter-label">Цена от: </label>
                <input
                    className="filter-input"
                    value={filters.priceFrom}
                    placeholder="цена от: "
                    onChange={(e) => updateFliters("priceFrom", e.target.value)}
                />

                <label className="filter-label">Цена до: </label>
                <input
                    className="filter-input"
                    value={filters.priceTo}
                    placeholder="цена до: "
                    onChange={(e) => updateFliters("priceTo", e.target.value)}
                />    
            </div>
        </div>
        </>
    )
}