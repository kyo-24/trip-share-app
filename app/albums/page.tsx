import { getUserData } from "@/lib/auth";
import { getPhotos } from "@/lib/getPhoto";
import { getTrips } from "@/lib/getTrip";
import AlbumsList from "@/model/albums/AlbumsList";

type AlbumsProps = {
    searchParams: Promise<{ tripId?: string }>;
};

export default async function Albums({ searchParams }: AlbumsProps) {
    const { user } = await getUserData();
    if (!user) {
        return <div>ユーザーが存在しません</div>;
    }

    const params = await searchParams;
    const tripId = params.tripId ? Number(params.tripId) : undefined;

    const photos = await getPhotos(user.id, tripId);
    const trips = await getTrips();

    return <AlbumsList photos={photos} trips={trips} tripId={tripId} />;
}
