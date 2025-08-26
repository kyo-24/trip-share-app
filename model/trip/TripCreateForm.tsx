"use client";

import Subtitle from "@/components/common/Subtitle";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { createTrip } from "@/lib/actions/trips";
import {
    CalendarIcon,
    ChevronLeft,
    ImageIcon,
    Plus,
    Upload,
} from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

const TripCreateForm = () => {
    const [startDate, setStartDate] = React.useState<Date | undefined>(
        new Date()
    );
    const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());
    const fileInputRef = useRef<HTMLInputElement>(null);

    const selectFile = () => {
        fileInputRef?.current?.click();
    };

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}年${month}月${day}日`;
    };

    return (
        <div className="container max-w-4xl py-10 px-4 mx-auto relative">
            <div className="flex items-center mb-6">
                <Link href="/" className="mr-4">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">新しい旅行プランを作成</h1>
            </div>

            <form className="space-y-8" action={createTrip}>
                <div className="space-y-6">
                    <div>
                        <Subtitle title="旅行タイトル" required />
                        <Input
                            id="title"
                            name="title"
                            placeholder="例: 家族で行く京都旅行"
                            className="mt-1.5"
                            required
                        />
                    </div>

                    <div>
                        <Subtitle title="カバー画像" />
                        <div className="mt-1.5">
                            <div className="border border-dashed border-black/30 rounded-md p-8 text-center cursor-pointer hover:bg-gray/10 duration-500 transition-color bg-white">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <ImageIcon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            画像をアップロード
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            クリックして画像を選択するか、ここにドラッグ&ドロップしてください
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="default"
                                        size="lg"
                                        className="mt-2"
                                        onClick={selectFile}
                                        disabled={true}
                                    >
                                        <Upload className="h-4 w-4 mr-2" />
                                        画像を選択
                                    </Button>
                                    {/* 画像アップロード機能は実装時削除 */}
                                    <p className="text-destructive">
                                        ※画像アップロード機能は今後実装予定
                                    </p>
                                </div>
                            </div>
                            {/* <input
                                type="file"
                                name="coverImageUrl"
                                ref={fileInputRef}
                                accept="image/*"
                                className="hidden"
                            /> */}
                        </div>
                    </div>

                    <div>
                        <Subtitle title="旅行先" required />
                        <Input
                            id="destination"
                            name="destination"
                            placeholder="例: 京都"
                            className="mt-1.5"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Subtitle title="出発日" required />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal mt-1.5"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startDate ? (
                                            formatDate(startDate)
                                        ) : (
                                            <span className="text-muted-foreground">
                                                日付を選択
                                            </span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <Input
                                type="hidden"
                                name="startDate"
                                value={startDate ? startDate.toISOString() : ""}
                            />
                        </div>

                        <div>
                            <Subtitle title="帰着日" required />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal mt-1.5"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {endDate ? (
                                            formatDate(endDate)
                                        ) : (
                                            <span className="text-muted-foreground">
                                                日付を選択
                                            </span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <Input
                                type="hidden"
                                name="endDate"
                                value={endDate ? endDate.toISOString() : ""}
                            />
                        </div>
                    </div>

                    <div>
                        <Subtitle title="予算（円）" />
                        <Input
                            id="budget"
                            name="budget"
                            type="number"
                            placeholder="例: 100000"
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <Subtitle title="メンバー" />
                        <div className="flex gap-2 mt-1.5">
                            <Input
                                placeholder="メンバー招待機能は今後実装予定"
                                className="flex-1 text-destructive"
                                disabled={true}
                            />
                            <Button type="button" size="icon" variant="default">
                                <Plus className="h-4 w-4 text-white" />
                            </Button>
                        </div>

                        {/* {members.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                    {members.map((member, index) => (
                        <div
                        key={index}
                        className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                        >
                        {member}
                        <button
                            type="button"
                            onClick={() => handleRemoveMember(index)}
                            className="ml-1 text-secondary-foreground/70 hover:text-secondary-foreground"
                        >
                            <X className="h-3 w-3" />
                        </button>
                        </div>
                    ))}
                    </div>
                )} */}
                    </div>

                    <div>
                        <Subtitle title="メモ" />
                        <Textarea
                            id="notes"
                            name="description"
                            placeholder="旅行に関する備考や注意点など"
                            rows={4}
                            className="mt-1.5"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-6">
                        旅行プランを作成すると、後からスケジュール、Todo、写真を追加できます。
                    </p>
                    <div className="flex justify-end gap-4">
                        <Link href="/">
                            <Button variant="outline">キャンセル</Button>
                        </Link>
                        <Button type="submit">作成する</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TripCreateForm;
