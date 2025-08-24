import { getSchedules } from "@/lib/getSchedule";
import { getTripDetail } from "@/lib/getTrip";
import TripDetailForm from "@/model/trip/TripDetailForm";

export default async function TripDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const tripData = await getTripDetail(Number(id));

    const scheduleData = await getSchedules({ tripId: Number(id) });

    if (!tripData) {
        return <div>旅行が見つかりませんでした。</div>;
    }
    console.log("Trip Data:", tripData);

    return (
        <TripDetailForm
            tripData={tripData}
            scheduleData={scheduleData}
            todos={tripData.todos}
        />
    );
}
