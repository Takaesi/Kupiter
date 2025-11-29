import { Link, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import type { adType } from "../../types/adTypes"
import "./ads.css"
import { api } from "../../api/axios"

export const Ads = () => {
    
    const [ads, setAds] = useState<adType[]>([])
    const [activeImageIndex, setActiveImageIndex] = useState<number[]>([])
    const navigate = useNavigate()

    useEffect( () => {
        const getAds = async () => {
            const response= await api.get("/api/getAllAdsUser")
            setAds(response.data)
            setActiveImageIndex(response.data.map(() => 0))
            console.log(response.data)
            
        }
        getAds()
    }, [])

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
    

    const deliteBtn = async (id: number) => {
        try {
            await api.delete(`api/deleteAd/${Number(id)}`)
            setAds(prev => prev.filter(ad => ad.id !== id))

        }catch(err){
            console.log("Ошибка запроса или обновления", err)
        }
    }

    const editeBtn = async (id: number) => {
        navigate(`/edit/${id}`)
    }

    return (
        <div className="ads">
            <div className="ads-sidebar">
                <Link to={"/createAd"} className="ads-link">Создать объявление</Link>
            </div>

            <div className="ads-list">
                {ads.map( (ad, index) => (
                    <div key={ad.id} className="ad-card">

                        {ad.images.length > 0 ? (
                            <>
                            <img
                                className="img"
                                alt="img"
                                src={ad.images[activeImageIndex[index]].url}
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
                        <div className="card-buttons">
                            <button className="delete-btn" onClick={() =>deliteBtn(ad.id)}>Удалить</button>
                            <button className="edite-btn" onClick={() => editeBtn(ad.id)}>Редактировать</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
