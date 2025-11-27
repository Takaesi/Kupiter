import {useState} from "react"
import "./createAd.css"
import { api } from "../../api/axios"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"


export const CreateAd = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState<number>(0)
    const [category, setCategory] = useState("")
    const [city, setCity] = useState("")
    const [images, setImages] = useState<string[]>(["", "", ""])
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    const navigate = useNavigate()

    const handleAdImage = (index: number, value: string) => {
        const updated = [...images];
        updated[index] = value
        setImages(updated)
    }

    const nextImage = () => {
        setActiveImageIndex ((prev) =>
        prev + 1 < images.length ? prev + 1 : 0
        )

    }

    const prevImage = () => {
        setActiveImageIndex((prev) => 
        prev - 1 >= 0 ? prev -1 : images.length -1 
        )
    }

    const  onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await api.post("/api/createAd", {
                title,
                description,
                price,
                category,
                city,
                images: images.filter((url) => url.trim() !== "")


            } )
            if (res.status === 201) {
                prompt("Успешно")
                navigate("/ads")
            }

        } catch (e) {
            const err = e as AxiosError
            prompt("Ошибка, попробуйте еще раз")
            console.log(err.response?.data)
        }
    }

    return (
        <div className="ad-handler">
        <form className="create-ad-form" onSubmit={onSubmit}>
            <input 
                className="create-input"
                placeholder="название"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea   
                className="create-input"
                placeholder="описание"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
            />

            <input  
                className="create-input"
                placeholder="цена"
                value={price}
                required
                onChange={(e) => setPrice(parseFloat(e.target.value))}
            />

            <input
                className="create-input"
                placeholder="город"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
            />
            
            <label className="create-label">Категория</label>
            <select
                className="create-input"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value={""}>Все категории</option>
                <option value={"phones"}>Телефоны</option>
                <option value={"cars"}>Автомобили</option>
                <option value={"apartaments"}>Недвижимость</option>
            </select>

            <label className="create-label">Фото</label>
            {images.map((img, index) => (
                <input  
                    className="create-input"
                    placeholder={`ссылка на фото #${index + 1}`}
                    key={index}
                    type="text"
                    value={img}
                    onChange={(e) => handleAdImage(index, e.target.value)}
                />
            ))}

            <button className="create-btn">Отправить</button>
        </form>
        <div className="preview-wrapper">
            <div className="preview">
                <h1 className="preview-text">Предпросмотр</h1>

                <div className="ad">
                    <h1>{title}</h1>
                    {images[activeImageIndex] ? (
                        <img 
                            className="ad-image"
                            alt="previw"
                            src = {images[activeImageIndex]}
                        />
                    ) : (
                        <h1>нет фото</h1>
                    )}

                    <div className="ad-controllers">
                        <button className="btn-next" onClick={prevImage}>
                            Назад
                        </button>
                        <button className="btn-prev" onClick={nextImage}>
                            Вперед
                        </button>
                    </div>
                    <h3 className="ad-description-title">Описание</h3>
                    <p className="ad-description">{description}</p>
                    <p className="ad-price">Цена: {price}</p>
                    <p className="ad-city">Город: {city}</p>
                </div>
            </div>

        </div>
     </div>
    )
}