export type adType = {
    id: number;
    title: string;
    description: string;
    city: string;
    price: number;
    ownerId: number;
    images: {url: string}[];
    crateAt: string;
    updatedAt: string;
    category: string;
    priceFrom: number;
    priceTo: number;
}

export type adFilter ={
    city?: string
    category?: string
    priceFrom?: number
    priceTo?: number
}

