"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { deletePhoto, uploadPhoto } from "@/lib/actions/photos";
import { getPhotoUrl } from "@/lib/getImage";
import { ImageIcon, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Photo } from "../types";

interface AlbumProps {
    tripId: number;
    photos: Photo[];
}

const Album = ({ tripId, photos }: AlbumProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFile(file || null);
    };

    const photosWithUrls = photos.map((photo) => ({
        ...photo,
        photoUrl: getPhotoUrl(photo.fileName),
    }));

    return (
        <TabsContent value="album" className="mt-6">
            <div className="space-y-6">
                {/* ヘッダー部分 */}
                <Modal
                    trigger={
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">アルバム</h2>
                            <Button
                                className="flex items-center"
                                variant={"default"}
                                size={"lg"}
                                onClick={() => setIsOpenModal(true)}
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                写真を追加
                            </Button>
                        </div>
                    }
                    title="写真をアップロード"
                    isOpen={isOpenModal}
                    onOpenChange={setIsOpenModal}
                >
                    <form
                        className="space-y-6"
                        action={async (formData) => {
                            await uploadPhoto(formData, tripId);
                            setIsOpenModal(false);
                        }}
                    >
                        <div>
                            <Button
                                variant="default"
                                size="lg"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                写真を選択してください
                            </Button>
                            <Input
                                ref={fileInputRef}
                                type="file"
                                name="photo"
                                accept="image/*"
                                className="hidden"
                                required
                                onChange={handleFileChange}
                            />
                            {file && (
                                <div className="flex items-center gap-2 mt-2">
                                    <Button
                                        size="sm"
                                        onClick={() => setFile(null)}
                                        className="bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        ×
                                    </Button>
                                    <p className="text-sm text-gray-500">
                                        {file.name}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                説明（任意）
                            </label>
                            <Textarea
                                name="description"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="写真の説明を入力"
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
                                アップロード
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* 写真一覧表示 */}
                {photosWithUrls.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {photosWithUrls.map((photo) => (
                            <div
                                key={photo.id}
                                className="relative group bg-white shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
                            >
                                <Image
                                    src={photo.photoUrl}
                                    alt={photo.originalName}
                                    width={1200}
                                    height={800}
                                    className="w-full h-60 object-cover"
                                />
                                {photo.description && (
                                    <p className="absolute bottom-2 left-2 text-xs text-white mt-1 line-clamp-2">
                                        {photo.description}
                                    </p>
                                )}
                                <DeleteModal
                                    title="写真の削除"
                                    trigger={
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="delete" size="sm">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    }
                                    handleDelete={() => deletePhoto(photo.id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border-2 border-dashed rounded-lg p-8 text-center text-gray-500">
                        <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p>まだ写真がアップロードされていません</p>
                        <p className="text-sm mt-1">
                            写真をドラッグ&ドロップするか、クリックしてアップロード
                        </p>
                    </div>
                )}
            </div>
        </TabsContent>
    );
};

export default Album;
