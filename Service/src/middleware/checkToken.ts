import jwt  from "jsonwebtoken";

export const authMiddlewar = (req: any, res: any, next: any) => {
    const authHeader = req.headers.Authorization

    if (!authHeader) {
        return res.status(401).jason({message: "Нет токена"})
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        if(!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET не найден")
        }

        req.user = decoded
        next()
    }catch (e){
        return res.status(401).json({message: "Токен недействителен"})
    }
}