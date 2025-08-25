import { getTripDetail } from "@/lib/getTrip";
import TripEditForm from "@/model/trip/TripEditForm";

export default async function TripEdit({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const tripData = await getTripDetail(Number(id));

    if (!tripData) {
        return <div>旅行が見つかりませんでした。</div>;
    }

    return <TripEditForm tripData={tripData} />;
}
