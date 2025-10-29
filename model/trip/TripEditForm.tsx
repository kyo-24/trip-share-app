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
import { updateTrip } from "@/lib/actions/trips";
import { getCoverImage } from "@/lib/getImage";
import { formatYmd } from "@/lib/utils";
import { CalendarIcon, ImageIcon, Plus, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { tripDataProps } from "./types";

const TripEditForm = ({ tripData }: { tripData: tripDataProps }) => {
    const [startDate, setStartDate] = React.useState<Date | undefined>(
        new Date(tripData.startDate)
    );
    const [endDate, setEndDate] = React.useState<Date | undefined>(
        new Date(tripData.endDate)
    );
    const [file, setFile] = React.useState<File | null>(null);
    const [coverImageUrl, setCoverImageUrl] = React.useState<string | null>(
        tripData.fileName ? getCoverImage(tripData.fileName) : null
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (formData: FormData) => {
        const data = {
            title: formData.get("title") as string,
            destination: formData.get("destination") as string,
            budget: formData.get("budget")
                ? Number(formData.get("budget"))
                : undefined,
            description: formData.get("description") as string,
            startDate: formData.get("startDate") as string,
            endDate: formData.get("endDate") as string,
            coverImage: formData.get("coverImage") as File,
        };
        await updateTrip(tripData.id, data);
    };

    const selectFile = () => {
        setFile(fileInputRef.current?.files?.[0] || null);
    };

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}年${month}月${day}日`;
    };

    return (
        <div className="container max-w-4xl py-10 px-4 mx-auto relative">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">旅行プランを編集</h1>
            </div>

            <form className="space-y-8" action={handleSubmit}>
                <div className="space-y-6">
                    <div>
                        <Subtitle title="旅行タイトル" />
                        <Input
                            id="title"
                            name="title"
                            defaultValue={tripData.title}
                            placeholder="例: 夏の京都旅行"
                            className="mt-1.5"
                            required
                        />
                    </div>

                    <div>
                        <Subtitle title="カバー画像" />
                        <div className="mt-1.5">
                            {coverImageUrl ? (
                                <div className="relative rounded-md overflow-hidden border">
                                    <Image
                                        src={coverImageUrl}
                                        alt="カバー画像"
                                        width={1200}
                                        height={400}
                                        className="w-full h-80 object-top object-cover"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-90 cursor-pointer"
                                        onClick={() => setCoverImageUrl(null)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : file ? (
                                <div className="relative rounded-md overflow-hidden border">
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt="カバー画像"
                                        className="w-full h-80 object-top object-cover"
                                        width={1200}
                                        height={200}
                                    />
                                </div>
                            ) : (
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
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                        >
                                            <Upload className="h-4 w-4 mr-2" />
                                            画像を選択
                                        </Button>
                                    </div>
                                </div>
                            )}
                            <Input
                                type="file"
                                name="coverImage"
                                ref={fileInputRef}
                                accept="image/*"
                                className="hidden"
                                onChange={selectFile}
                            />
                        </div>
                    </div>

                    <div>
                        <Subtitle title="旅行先" required />
                        <Input
                            id="destination"
                            name="destination"
                            placeholder="例: 京都"
                            className="mt-1.5"
                            defaultValue={tripData.destination}
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
                                    />
                                </PopoverContent>
                            </Popover>
                            <Input
                                type="hidden"
                                name="startDate"
                                value={startDate ? formatYmd(startDate) : ""}
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
                                value={endDate ? formatYmd(endDate) : ""}
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
                            defaultValue={tripData.budget || ""}
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <Subtitle title="メンバー" />
                        <div className="flex gap-2 mt-1.5">
                            <Input
                                placeholder="メンバー招待機能は今後実装予定"
                                className="flex-1"
                                disabled
                            />
                            <Button type="button" size="icon" variant="default">
                                <Plus className="h-4 w-4 text-white" />
                            </Button>
                        </div>
                    </div>

                    <div>
                        <Subtitle title="メモ" />
                        <Textarea
                            id="notes"
                            name="description"
                            placeholder="旅行に関する備考や注意点など"
                            defaultValue={tripData.description || ""}
                            rows={4}
                            className="mt-1.5"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <div className="flex justify-end gap-4">
                        <Link href={`/trip/${tripData.id}`}>
                            <Button variant="outline">キャンセル</Button>
                        </Link>
                        <Button type="submit">編集する</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TripEditForm;
