import { getSchedules } from "@/lib/getSchedule";
import { getTripDetail } from "@/lib/getTrip";
import TripDetailForm from "@/model/trip/TripDetailForm";

export default async function TripDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // id が undefined または空文字なら待機UIを返す
    if (!id) {
        return <div>読み込み中...</div>;
    }
    const [tripData, scheduleData] = await Promise.all([
        getTripDetail(Number(id)),
        getSchedules({ tripId: Number(id) }),
    ]);

    if (!tripData) {
        return <div>旅行が見つかりませんでした。</div>;
    }

    return (
        <TripDetailForm
            tripData={tripData}
            scheduleData={scheduleData}
            todos={tripData.todos}
        />
    );
}
