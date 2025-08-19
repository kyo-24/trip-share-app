import { getSchedules } from "@/lib/getSchedule";
import { getTripDetail } from "@/lib/getTrip";
import TripDetailForm from "@/model/trip/TripDetailForm";

export default async function TripDetail({
    params,
}: {
    params: { id: number };
}) {
    const tripId = Number(params.id);
    const tripData = await getTripDetail(Number(params.id));

    const scheduleData = await getSchedules({ tripId: tripId });

    if (!tripData) {
        return <div>旅行が見つかりませんでした。</div>;
    }

    return <TripDetailForm tripData={tripData} scheduleData={scheduleData} />;
}
