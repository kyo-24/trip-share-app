import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { syncUser } from "@/lib/actions/sync";
import { getUserData } from "@/lib/auth";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const TripDummyData = [
    {
        id: 1,
        title: "北海道旅行",
        date: "2025年4月1日",
        location: "北海道札幌市",
        participants: 3,
    },
    {
        id: 2,
        title: "沖縄旅行",
        date: "2025年6月15日",
        location: "沖縄県那覇市",
        participants: 5,
    },
    {
        id: 3,
        title: "東京旅行",
        date: "2025年8月20日",
        location: "東京都新宿区",
        participants: 2,
    },
];

export default async function Home() {
    const userResult = await getUserData();

    // ユーザーが存在しない場合は同期を実行
    if (!userResult.success) {
        await syncUser();
    }
    return (
        <div className="p-6">
            <div className="flex justify-between items-center px-4">
                <h1 className="font-bold text-2xl">旅行プラン一覧</h1>
                <Link href={"/trip/create"}>
                    <Button variant="main" size="lg">
                        <PlusCircle size={24} />
                        <span>新規プラン作成</span>
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-10">
                {TripDummyData.map((trip) => (
                    <Link href={`/trip/${trip.id}`} key={trip.id}>
                        <Card className="py-0 border-0 shadow-lg cursor-pointer bg-white">
                            <CardHeader className="px-0">
                                <div className="w-full h-[200px] bg-gray-200 rounded-xl rounded-b-none"></div>
                            </CardHeader>
                            <CardContent className="p-4">
                                <h2 className="font-semibold text-2xl ">
                                    {trip.title}
                                </h2>
                                <div className="text-sm text-gray-500 mt-2">
                                    <p>{trip.date}</p>
                                    <p>{trip.location}</p>
                                    <p>{trip.participants}人の参加者</p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between"></CardFooter>
                        </Card>
                    </Link>
                ))}
                <Link href="/trip/create">
                    <Card className="border-dashed border-gray/30 shadow-lg flex flex-col items-center justify-center p-6 h-full min-h-[300px] bg-white hover:bg- transition-colors">
                        <div className="rounded-full bg-gray/10  p-4 mb-4">
                            <PlusCircle className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">
                            新しい旅行プラン
                        </h3>
                        <p className="text-center text-muted-foreground mb-4">
                            新しい旅行の計画を始めましょう
                        </p>
                        <Button>プランを作成</Button>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
