import { prisma } from "../db"


export const createAdDB = async (userId: string, data: any) => {
    const {title, description, price, category, images, owner} = data

    const newAd = await prisma.ad.create({
        data:{
            title,
            description,
            price,

            category: {
                connect: {id: Number(category)}
            },

            owner: {
                connect: {id: Number(userId)}
            },
            
            images: {
                create: images.map((url: string) => ({
                    url
                }))
            }
        },

        include:{
            images: true,
            owner: true
        }
    })
    return newAd
}