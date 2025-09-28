import { supabase } from "./supabase";

// 写真一覧取得
// export async function getPhotos(tripId: number) {
//     try {
//         const { userId } = await auth();
//         if (!userId) {
//             return [];
//         }

//         const user = await prisma.user.findUnique({
//             where: { clerkId: userId },
//         });

//         if (!user) {
//             return [];
//         }

//         const trip = await prisma.trip.findFirst({
//             where: {
//                 id: tripId,
//                 OR: [
//                     { ownerId: user.id },
//                     {
//                         members: {
//                             some: {
//                                 userId: user.id,
//                             },
//                         },
//                     },
//                 ],
//             },
//         });

//         if (!trip) {
//             return [];
//         }

//         const photos = await prisma.photo.findMany({
//             where: { tripId },
//             orderBy: { uploadedAt: "desc" },
//         });

//         return photos;
//     } catch (error) {
//         console.error("Get photos error:", error);
//         return [];
//     }
// }

// getPhotoUrlを同期関数に変更
export function getPhotoUrl(fileName: string) {
    const { data } = supabase.storage.from("trip-photo").getPublicUrl(fileName);

    return data.publicUrl;
}
