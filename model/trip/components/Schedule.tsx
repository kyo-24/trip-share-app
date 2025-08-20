import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createSchedule, deleteSchedule } from "@/lib/actions/schedules";
import { format } from "date-fns";
import { Calendar, Clock, Plus, X } from "lucide-react";
import { useState, useTransition } from "react";
import { ScheduleItem } from "../types";

const Schedule = ({
    scheduleData,
    tripId,
}: {
    scheduleData: ScheduleItem[] | null;
    tripId: number;
}) => {
    const [isPending, startTransition] = useTransition();
    const [isOpenModal, setIsOpenModal] = useState(false);

    // スケジュールを日付ごとにグループ化
    const groupedSchedules = scheduleData?.reduce((acc, schedule) => {
        const date = format(schedule.date, "yyyy年M月d日");
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(schedule);
        return acc;
    }, {} as Record<string, ScheduleItem[]>);

    return (
        <TabsContent value="schedule" className="mt-6">
            <div className="min-h-screen p-6">
                <div className="max-w-3xl mx-auto">
                    <Modal
                        trigger={
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-xl font-semibold">
                                    スケージュール管理
                                </h2>
                                <Button
                                    variant={"default"}
                                    size={"lg"}
                                    className="flex items-center"
                                    onClick={() => setIsOpenModal(true)}
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    予定を追加
                                </Button>
                            </div>
                        }
                        title="新しい予定を追加"
                        isOpen={isOpenModal}
                    >
                        <form
                            className="space-y-6"
                            action={async (formData) => {
                                await createSchedule(formData, tripId);
                                setIsOpenModal(false);
                            }}
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    日付
                                    <Calendar className="inline-block w-4 h-4 ml-1" />
                                </label>
                                <Input
                                    type="date"
                                    name="date"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        開始時間
                                        <Clock className="inline-block w-4 h-4 ml-1" />
                                    </label>
                                    <Input
                                        type="time"
                                        name="startTime"
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        終了時間
                                        <Clock className="inline-block w-4 h-4 ml-1" />
                                    </label>
                                    <Input
                                        type="time"
                                        name="endTime"
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    タイトル
                                </label>
                                <Input
                                    type="text"
                                    name="title"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="予定のタイトル"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    詳細
                                </label>
                                <Textarea
                                    name="description"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="予定の詳細"
                                    rows={3}
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        キャンセル
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    保存
                                </Button>
                            </div>
                        </form>
                    </Modal>
                    {/* フォーム部分 */}

                    {/* スケジュール表示部分 */}

                    <div className="space-y-6">
                        {groupedSchedules &&
                            Object.entries(groupedSchedules).map(
                                ([date, items]) => (
                                    <div
                                        key={date}
                                        className="bg-gray-100 rounded-xl shadow-lg p-6"
                                    >
                                        <h3 className="text-xl font-bold mb-4 text-gray-800">
                                            {date}
                                        </h3>
                                        <div className="space-y-4">
                                            {items.map((schedule, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start space-x-4 p-3 rounded-lg"
                                                >
                                                    <div className="w-32">
                                                        <div className="font-medium text-gray-900">
                                                            {schedule.startTime.toLocaleTimeString(
                                                                "ja-JP",
                                                                {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                }
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {schedule.endTime.toLocaleTimeString(
                                                                "ja-JP",
                                                                {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900">
                                                            {schedule.title}
                                                        </h3>
                                                        {schedule.description && (
                                                            <p className="text-gray-600 mt-1 text-sm">
                                                                {
                                                                    schedule.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    <Button
                                                        onClick={() => {
                                                            startTransition(
                                                                () => {
                                                                    deleteSchedule(
                                                                        schedule.id
                                                                    );
                                                                }
                                                            );
                                                        }}
                                                        disabled={isPending}
                                                        variant="delete"
                                                        className="text-white"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}

                        {(!groupedSchedules ||
                            Object.keys(groupedSchedules).length === 0) && (
                            <div className="text-center">
                                <p className="text-gray">
                                    ※予定が登録されていません
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </TabsContent>
    );
};

export default Schedule;
