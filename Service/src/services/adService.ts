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
    console.log(id)
    const ad = await prisma.ad.delete({
        where: {id},
        
    })

    return ad
}


export const getAllAdsDB = async (query: {
    city?: string;
    category?: string;
    priceFrom?: string;
    priceTo?: string;
}) => {
    const conditionals: any[] = []
   
    if (query.city) {conditionals.push({city: query.city})}
    if (query.category) {conditionals.push({category: query.category})}
    if (query.priceFrom) {conditionals.push({price: {gte: Number(query.priceFrom)}})}
    if (query.priceTo) {conditionals.push({price: {lte: Number(query.priceTo)}})}

    if (conditionals.length === 0) {
        return prisma.ad.findMany({
            include: {images: true}
        })
    }

    return prisma.ad.findMany({
        where: {OR: conditionals},
        include: {images:true}
    })

}