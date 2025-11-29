import { useEffect, useState } from "react"
import "./main.css"
import { api } from "../../api/axios"
import type { adFilter, adType } from "../../types/adTypes"


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
     const [activeImageIndex, setActiveImageIndex] = useState<number[]>([])

    const nextImage = (adIndex: number) => {
        setActiveImageIndex(prevIndexes => {
            const updated = [...prevIndexes]
            const ad = ads[adIndex]
            updated[adIndex] = (updated[adIndex] + 1) % ad.images.length 
            return updated
        })
        
    }

    const prevImage = (adIndex: number) => {
        setActiveImageIndex(prevIndexes => {
            const updated = [...prevIndexes]
            const ad = ads[adIndex]
            updated[adIndex] = (updated[adIndex] - 1 + ad.images.length) % ad.images.length
            return updated
        })
    }

    const [filters, setFilters] = useState({
        city: city,
        category: "",
        priceFrom: "",
        priceTo: ""
    })

    const updateFilters = (key: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const [ads, setAds] = useState<adType[]>([])

    useEffect ( () => {
        const getAds = async () => {
            try {

                const params: adFilter = { city: filters.city };
                if (filters.category) params.category = filters.category;
                if (filters.priceFrom) params.priceFrom = Number(filters.priceFrom);
                if (filters.priceTo) params.priceTo = Number(filters.priceTo);
                const res = await api.get("/api/getAllAds", {params})

                setAds(res.data)
                setActiveImageIndex(res.data.map(() => 0));
            }catch(err){
                console.log(err)
            }
        }

        getAds()

    }, [filters.city, filters.category, filters.priceFrom, filters.priceTo])


    return (
        <div className="main-handler">
        <div className="sidebar">
            <form className="filter-group">
                <label className="filter-label">Город: </label>
                <input
                className="filter-input"
                placeholder="город:"
                value={filters.city}
                onChange={(e) => updateFilters("city", e.target.value.trim().toUpperCase())}
                />

                <label className="filter-label">Категория</label>
                <select
                    className="filter-input"
                    value={filters.category}
                    onChange={(e) => updateFilters("category", e.target.value)}
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
                    onChange={(e) => updateFilters("priceFrom", e.target.value.trim())}
                />

                <label className="filter-label">Цена до: </label>
                <input
                    className="filter-input"
                    value={filters.priceTo}
                    placeholder="цена до: "
                    onChange={(e) => updateFilters("priceTo", e.target.value.trim())}
                />   
            </form>
        </div>
        <div className="main-ads">
            {ads.map((ad, index) => (
                <div className="main-card" key={ad.id}>
                    {ad.images.length > 0 && activeImageIndex[index] !== undefined? (
                            <>
                            <img
                                className="main-img"
                                alt="img"
                                src={ad.images[activeImageIndex[index]]?.url || "https://avatars.mds.yandex.net/i?id=23f98141a8009ae09b4ce0c65a8fef161da19deb-5235366-images-thumbs&n=13"}
                            />
                            <div className="img-controllers">
                                <button className="prev-image" onClick={() => prevImage(index)}>Предидущая</button>
                                <button className="next-image" onClick={() => nextImage(index)}>Следующая</button>
                            </div>
                            </>
                        ) : (
                            <h1>Нет фото</h1>
                        )}
                        <h1 className="card-title">{ad.title}</h1>
                        <p className="card-description">{ad.description}</p>
                        <h3 className="card-city">{ad.city}</h3>
                        <p className="card-price">{ad.price}</p>
                </div>
                
            ))}
        </div>
        </div>
    )
}
