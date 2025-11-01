import { prisma } from "./prisma";

// 写真一覧取得
export async function getPhotos(userId: number, tripId?: number) {
    const photos = await prisma.photo.findMany({
        where: {
            userId: userId,
            ...(tripId && { tripId: tripId }),
        },
    });
    return photos;
}
