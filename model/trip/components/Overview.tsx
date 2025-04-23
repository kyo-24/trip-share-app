import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Pencil } from "lucide-react";
import React from "react";
import { tripDataProps } from "../types";

const Overview = ({ tripData }: { tripData: tripDataProps }) => {
    return (
        <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">基本情報</h2>
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
                        <p className="mt-1 text-gray-900">{tripData.title}</p>
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
                            {tripData.startDate.toLocaleDateString("ja-JP")} -{" "}
                            {tripData.endDate.toLocaleDateString("ja-JP")}
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
    );
};

export default Overview;
