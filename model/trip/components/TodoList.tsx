import { Modal } from "@/components/common/Modal";
import Todos from "@/components/layout/Todos";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createTodo } from "@/lib/actions/todos";
import { Plus } from "lucide-react";
import { useState } from "react";

interface Todo {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: Date;
}

interface TodoListProps {
    todos: Todo[];
    tripId: number;
}

const TodoList = ({ todos, tripId }: TodoListProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const completedTodos = todos.filter((todo) => todo.completed);

    return (
        <TabsContent value="todo" className="mt-6">
            <div className="space-y-6">
                {/* フォーム部分 */}
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl font-semibold">TODOリスト</h2>
                    <Modal
                        trigger={
                            <Button
                                variant={"default"}
                                size={"lg"}
                                className="flex items-center"
                                onClick={() => setIsOpenModal(true)}
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                タスクを追加
                            </Button>
                        }
                        title="新しいタスクを追加"
                        isOpen={isOpenModal}
                        onOpenChange={setIsOpenModal}
                    >
                        <form
                            className="space-y-6"
                            action={async (formData) => {
                                await createTodo(formData, tripId);
                                setIsOpenModal(false);
                            }}
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    タイトル
                                </label>
                                <Input
                                    type="text"
                                    name="title"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="タスクのタイトル"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    詳細
                                </label>
                                <Textarea
                                    name="description"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="タスクの詳細（任意）"
                                    rows={3}
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        onClick={() => setIsOpenModal(false)}
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
                </div>

                {/* TODOリスト表示 */}
                {todos.length > 0 ? (
                    <Todos
                        tasks={todos.map((todo) => ({
                            id: todo.id.toString(),
                            text: todo.title,
                            completed: todo.completed,
                            createdAt: todo.createdAt,
                        }))}
                        completedTasks={completedTodos.map((todo) => ({
                            id: todo.id.toString(),
                            text: todo.title,
                            completed: todo.completed,
                            createdAt: todo.createdAt,
                        }))}
                    />
                ) : (
                    <div className="border rounded-lg p-4 text-center text-gray-500">
                        まだタスクが登録されていません
                    </div>
                )}
            </div>
        </TabsContent>
    );
};

export default TodoList;
