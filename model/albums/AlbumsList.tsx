"use client";

import { Modal } from "@/components/common/Modal";
import Pulldown from "@/components/common/Pulldown";
import { getPhotoUrl } from "@/lib/getImage";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Photo, Trip } from "../trip/types";

const AlbumsList = ({
    photos,
    trips,
    tripId,
}: {
    photos: Photo[];
    trips: Trip[] | null;
    tripId?: number;
}) => {
    const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleValueChange = useCallback(
        (value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === "all") {
                params.delete("tripId");
            } else {
                params.set("tripId", value);
            }
            router.push(`/albums?${params.toString()}`);
        },
        [router, searchParams]
    );

    const selectedPhoto = photos.find((photo) => photo.id === selectedPhotoId);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center px-4">
                <h1 className="font-bold text-2xl">写真一覧</h1>
                <Pulldown
                    items={
                        trips?.map((trip) => ({
                            id: trip.id,
                            content: trip.title,
                        })) || []
                    }
                    selectedId={tripId ?? undefined}
                    handleValueChange={handleValueChange}
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 py-10">
                {photos.length > 0 ? (
                    photos.map((photo) => (
                        <div key={photo.id}>
                            <div
                                onClick={() => setSelectedPhotoId(photo.id)}
                                className="cursor-pointer relative"
                            >
                                <Image
                                    src={getPhotoUrl(photo.fileName ?? "")}
                                    alt={photo.originalName}
                                    width={300}
                                    height={300}
                                    className="aspect-square object-cover"
                                />
                                {photo.description && (
                                    <p className="absolute bottom-2 left-2 text-xs text-white mt-1 line-clamp-2">
                                        {photo.description}
                                    </p>
                                )}
                            </div>
                            {selectedPhotoId && selectedPhoto && (
                                <Modal
                                    isOpen={selectedPhotoId !== null}
                                    onOpenChange={(open) => {
                                        if (!open) setSelectedPhotoId(null);
                                    }}
                                >
                                    <Image
                                        src={getPhotoUrl(
                                            selectedPhoto.fileName ?? ""
                                        )}
                                        alt={selectedPhoto.originalName}
                                        width={500}
                                        height={500}
                                        className=""
                                    />
                                    {selectedPhoto.description && (
                                        <div className="flex gap-2">
                                            <p className="text-sm text-nowrap">
                                                コメント：
                                            </p>
                                            <p className="text-sm line-clamp-3">
                                                {selectedPhoto.description}
                                            </p>
                                        </div>
                                    )}
                                </Modal>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 py-10">
                        写真がありません
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlbumsList;
