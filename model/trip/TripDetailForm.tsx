"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Users } from "lucide-react";
import Album from "./components/Album";
import Overview from "./components/Overview";
import Schedule from "./components/Schedule";
import TodoList from "./components/TodoList";
import { scheduleDataProps, tripDataProps } from "./types";

const TripDetailForm = ({
    tripData,
    scheduleData,
}: {
    tripData: tripDataProps;
    scheduleData: scheduleDataProps[];
}) => {
    return (
        <div className="min-h-screen bg-secondary">
            {/* Header */}
            <div
                className="h-64  bg-center relative"
                style={{ backgroundImage: `url(${tripData.coverImageUrl})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40">
                    <div className="container mx-auto px-6 h-full flex items-end pb-8">
                        <div className="text-white">
                            <h1 className="text-4xl font-bold mb-2">
                                {tripData.title}
                            </h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    旅行先
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {tripData.startDate.toLocaleDateString(
                                        "ja-JP"
                                    )}{" "}
                                    -{" "}
                                    {tripData.endDate.toLocaleDateString(
                                        "ja-JP"
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-1" />
                                    {/* 参加メンバーの人数表示 */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="w-full bg-gray/10 p-0 h-auto">
                            <TabsTrigger
                                value="overview"
                                className="flex items-center gap-2 py-4"
                            >
                                旅行概要
                            </TabsTrigger>
                            <TabsTrigger
                                value="schedule"
                                className="flex items-center gap-2 py-4"
                            >
                                スケジュール
                            </TabsTrigger>
                            <TabsTrigger
                                value="todo"
                                className="flex items-center gap-2 py-4"
                            >
                                TODOリスト
                            </TabsTrigger>
                            <TabsTrigger
                                value="album"
                                className="flex items-center gap-2 py-4"
                            >
                                アルバム
                            </TabsTrigger>
                        </TabsList>

                        <Overview tripData={tripData} />
                        <Schedule scheduleData={scheduleData} />
                        <TodoList />
                        <Album />
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default TripDetailForm;
