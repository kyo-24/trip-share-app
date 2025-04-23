import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import React from "react";

const TodoList = () => {
    return (
        <TabsContent value="todo" className="mt-6">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">TODOリスト</h2>
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
    );
};

export default TodoList;
