import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { ImageIcon, Plus } from "lucide-react";

const Album = () => {
    return (
        <TabsContent value="album" className="mt-6">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">アルバム</h2>
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
                    {/* 画像アップロード機能は実装時削除 */}
                    <p className="text-destructive">
                        ※画像アップロード機能は今後実装予定
                    </p>
                </div>
            </div>
        </TabsContent>
    );
};

export default Album;
