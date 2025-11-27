import { prisma } from "../db"


export const createAdDB = async (userId: number, data: any) => {
    const {title, description, price, category, images, city} = data

    const newAd = await prisma.ad.create({
        data:{
            title,
            description,
            price,
            city,
            category,
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

export const getAllAdsUser = async (ownerId: number) => {
    const ads = await prisma.ad.findMany({
        where: {ownerId},
        include: {
            images: true
        }
    })

    return ads
}


export const deleteAdUser = async (id: number) => {
    const ad = await prisma.ad.delete({
        where: {id},
        
    })

    return ad
}