"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, ImageIcon, MapPin, Pencil, Plus, Users } from "lucide-react";
import React, { useState } from "react";

interface tripDataProps {
    title: string;
    coverImage: string;
    startDate: Date;
    endDate: Date;
    description: string;
    tags: string[];
    participants: string[];
}

interface scheduleDataProps {
    id: number;
    day: string;
    items: {
        time: string;
        title: string;
        description: string;
    }[];
}

const TripDetailForm = ({
    tripData,
    scheduleData,
}: {
    tripData: tripDataProps;
    scheduleData: scheduleDataProps[];
}) => {
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    return (
        <div className="min-h-screen bg-secondary">
            {/* Header */}
            <div
                className="h-64  bg-center relative"
                style={{ backgroundImage: `url(${tripData.coverImage})` }}
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
                                    {tripData.participants}
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

                        <TabsContent value="overview" className="mt-6">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">
                                        基本情報
                                    </h2>
                                    <Button
                                        className="flex items-center"
                                        variant={"default"}
                                        size={"lg"}
                                    >
                                        <Pencil className="w-4 h-4 mr-1" />
                                        編集
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            旅行タイトル
                                        </label>
                                        <p className="mt-1 text-gray-900">
                                            {tripData.title}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            旅行先
                                        </label>
                                        <p className="mt-1 text-gray-900"></p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            期間
                                        </label>
                                        <p className="mt-1 text-gray-900">
                                            {tripData.startDate.toLocaleDateString(
                                                "ja-JP"
                                            )}{" "}
                                            -{" "}
                                            {tripData.endDate.toLocaleDateString(
                                                "ja-JP"
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            予算
                                        </label>
                                        <p className="mt-1 text-gray-900"></p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="schedule" className="mt-6">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">
                                        スケジュール
                                    </h2>
                                    <Button
                                        variant={"default"}
                                        size={"lg"}
                                        onClick={() =>
                                            setShowScheduleForm(
                                                !showScheduleForm
                                            )
                                        }
                                        className="flex items-center"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        予定を追加
                                    </Button>
                                </div>

                                {showScheduleForm && (
                                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                        <h3 className="text-lg font-medium mb-4">
                                            新しい予定を追加
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    日付
                                                </label>
                                                <input
                                                    type="date"
                                                    className="w-full rounded-md border-gray-300 shadow-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    時間
                                                </label>
                                                <input
                                                    type="time"
                                                    className="w-full rounded-md border-gray-300 shadow-sm"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    タイトル
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded-md border-gray-300 shadow-sm"
                                                    placeholder="予定のタイトル"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    詳細
                                                </label>
                                                <textarea
                                                    className="w-full rounded-md border-gray-300 shadow-sm"
                                                    rows={3}
                                                    placeholder="予定の詳細"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end gap-2">
                                            <button
                                                onClick={() =>
                                                    setShowScheduleForm(false)
                                                }
                                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
                                            >
                                                キャンセル
                                            </button>
                                            <button className="px-4 py-2 text-white bg-blue-600 rounded-lg">
                                                保存
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-8">
                                    {scheduleData.map((day) => (
                                        <div
                                            key={day.id}
                                            className="border rounded-lg p-6"
                                        >
                                            <h3 className="text-lg font-semibold mb-4">
                                                {day.day}
                                            </h3>
                                            <div className="space-y-4">
                                                {day.items.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-start"
                                                        >
                                                            <div className="w-20 flex-shrink-0 text-gray-600">
                                                                {item.time}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-medium">
                                                                    {item.title}
                                                                </h4>
                                                                <p className="text-sm text-gray-600">
                                                                    {
                                                                        item.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="todo" className="mt-6">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">
                                        TODOリスト
                                    </h2>
                                    <Button
                                        variant={"default"}
                                        size={"lg"}
                                        className="flex items-center"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        タスクを追加
                                    </Button>
                                </div>
                                <div className="border rounded-lg p-4 text-center text-gray-500">
                                    まだTODOが登録されていません
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="album" className="mt-6">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">
                                        アルバム
                                    </h2>
                                    <Button
                                        className="flex items-center"
                                        variant={"default"}
                                        size={"lg"}
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        写真を追加
                                    </Button>
                                </div>
                                <div className="border-2 border-dashed rounded-lg p-8 text-center text-gray-500">
                                    <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                    <p>
                                        写真をドラッグ&ドロップするか、クリックしてアップロード
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default TripDetailForm;
