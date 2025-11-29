import jwt  from "jsonwebtoken";

export const authMiddlewar = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({message: "Нет токена"})
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT_SECRET не найден" });
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        if(!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET не найден")
        }
        console.log(decoded)

        req.user = decoded
        next()
    }catch (e){
        return res.status(401).json({message: "Токен недействителен"})
    }
}