"use client";

import Pulldown from "@/components/common/Pulldown";
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
import { format } from "date-fns";
import {
    CalendarIcon,
    ChevronLeft,
    ImageIcon,
    Plus,
    Upload,
    X,
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

            <form className="space-y-8">
                <div className="space-y-6">
                    <div>
                        <Subtitle title="旅行タイトル" />
                        <Input
                            id="title"
                            placeholder="例: 家族で行く京都旅行"
                            className="mt-1.5"
                            required
                        />
                    </div>

                    <div>
                        <Subtitle title="カバー画像" />
                        <div className="mt-1.5">
                            {/* {coverImage ? (
                    <div className="relative rounded-md overflow-hidden border">
                        <Image
                        src={coverImage || "/placeholder.svg"}
                        alt="カバー画像"
                        className="w-full aspect-video object-cover"
                        />
                        <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-90"
                        onClick={}
                        >
                        <X className="h-4 w-4" />
                        </Button>
                    </div>
                    ) : ( */}
                            <div className="border border-dashed border-black/30 rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="p-3 rounded-full bg-secondary">
                                        <ImageIcon className="h-6 w-6 text-secondary-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium">
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
                                    >
                                        <Upload className="h-4 w-4 mr-2" />
                                        画像を選択
                                    </Button>
                                </div>
                            </div>
                            {/* )} */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div>
                        <Subtitle title="旅行先" required />
                        <Pulldown />
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
                                            format(startDate, "yyyy年MM月dd日")
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
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
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
                                            format(endDate, "yyyy年MM月dd日")
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
                        </div>
                    </div>

                    <div>
                        <Subtitle title="予算（円）" />
                        <Input
                            id="budget"
                            type="number"
                            placeholder="例: 100000"
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <Subtitle title="メンバー" />
                        <div className="flex gap-2 mt-1.5">
                            <Input
                                placeholder="メンバー名を入力"
                                className="flex-1"
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant="secondary"
                            >
                                <Plus className="h-4 w-4" />
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
