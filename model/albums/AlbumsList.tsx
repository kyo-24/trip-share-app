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
    const [isOpenModal, setIsOpenModal] = useState(false);
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
                        <div key={photo.id.toString()}>
                            <Modal
                                trigger={
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => setIsOpenModal(true)}
                                    >
                                        <Image
                                            src={getPhotoUrl(
                                                photo.fileName ?? ""
                                            )}
                                            alt={photo.originalName}
                                            width={300}
                                            height={300}
                                            className="aspect-square object-cover"
                                        />
                                    </div>
                                }
                                title="写真詳細"
                                isOpen={isOpenModal}
                                onOpenChange={setIsOpenModal}
                            >
                                <div>
                                    {photo.description && (
                                        <p className="text-2xl font-bold mb-4">
                                            {photo.description}
                                        </p>
                                    )}
                                    <Image
                                        src={getPhotoUrl(photo.fileName ?? "")}
                                        alt={photo.originalName}
                                        width={500}
                                        height={500}
                                        className=""
                                    />
                                    <p>{photo.description}</p>
                                </div>
                            </Modal>
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
