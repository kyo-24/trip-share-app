import { getTripDetail } from "@/lib/getTrip";
import TripDetailForm from "@/model/trip/TripDetailForm";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function TripDetail({ params }: Props) {
    const { id } = await params;
    console.log(id);
    const tripData = await getTripDetail(Number(id));

    console.log(tripData);

    if (!tripData) {
        return <div>旅行が見つかりませんでした。</div>;
    }

    const scheduleData = [
        {
            id: 1,
            day: "2025年4月1日",
            items: [
                {
                    time: "10:00",
                    title: "新千歳空港到着",
                    description: "JAL123便",
                },
                {
                    time: "11:30",
                    title: "ホテルチェックイン",
                    description: "札幌グランドホテル",
                },
                {
                    time: "13:00",
                    title: "すすきのでランチ",
                    description: "蟹専門店",
                },
                { time: "15:00", title: "大通公園散策", description: "観光" },
                {
                    time: "18:00",
                    title: "ジンギスカン夕食",
                    description: "サッポロビール園",
                },
            ],
        },
        {
            id: 2,
            day: "2025年4月2日",
            items: [
                { time: "09:00", title: "小樽へ移動", description: "JR特急" },
                { time: "10:30", title: "小樽運河散策", description: "観光" },
                { time: "12:00", title: "寿司ランチ", description: "小樽市場" },
                {
                    time: "14:00",
                    title: "ガラス工房見学",
                    description: "体験あり",
                },
                { time: "17:00", title: "札幌に戻る", description: "JR特急" },
            ],
        },
    ];
    return <TripDetailForm tripData={tripData} scheduleData={scheduleData} />;
}
