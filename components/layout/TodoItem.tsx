import {
    deleteTodo,
    toggleTodoComplete,
    updateTodo,
} from "@/lib/actions/todos";
import { Check, Edit3, Trash2, X } from "lucide-react";
import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Task {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

interface TodoItemProps {
    task: Task;
}

const TodoItem: React.FC<TodoItemProps> = ({ task }) => {
    const [isPending, startTransition] = useTransition();
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleToggleComplete = () => {
        startTransition(() => {
            toggleTodoComplete(parseInt(task.id));
        });
    };

    const handleSaveEdit = () => {
        if (editText.trim()) {
            startTransition(() => {
                updateTodo(parseInt(task.id), { title: editText.trim() });
            });
        }
        setIsEditing(false);
    };

    const handleDeleteTask = () => {
        startTransition(() => {
            deleteTodo(parseInt(task.id));
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSaveEdit();
        } else if (e.key === "Escape") {
            handleCancelEdit();
        }
    };

    const handleCancelEdit = () => {
        setEditText(task.text);
        setIsEditing(false);
    };

    return (
        <div
            className={`
      group bg-white rounded-lg border border-gray-200 p-4 mb-3 
      transition-all duration-200 hover:shadow-md hover:border-blue-200
      ${task.completed ? "opacity-60 bg-gray-50" : ""}
    `}
        >
            <div className="flex items-center gap-3">
                {/* チェックボックス */}
                <button
                    onClick={handleToggleComplete}
                    disabled={isPending}
                    className={`
            flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200
            ${
                task.completed
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "border-gray-300 hover:border-blue-400"
            }
          `}
                >
                    {task.completed && <Check size={14} />}
                </button>

                {/* タスクテキスト */}
                <div className="flex-1">
                    {isEditing ? (
                        <Input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleKeyPress}
                            onBlur={handleSaveEdit}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            autoFocus
                        />
                    ) : (
                        <span
                            className={`
              text-gray-800 transition-all duration-200
              ${task.completed ? "line-through text-gray-500" : ""}
            `}
                        >
                            {task.text}
                        </span>
                    )}
                </div>

                {/* アクションボタン */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {isEditing ? (
                        <div className="flex gap-1">
                            <Button
                                onClick={handleSaveEdit}
                                disabled={isPending}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors duration-200"
                                title="保存"
                            >
                                <Check size={16} />
                            </Button>
                            <Button
                                onClick={handleCancelEdit}
                                disabled={isPending}
                                className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors duration-200"
                                title="キャンセル"
                            >
                                <X size={16} />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Button
                                onClick={() => setIsEditing(true)}
                                disabled={isPending}
                                title="編集"
                                variant="outline"
                                size="sm"
                                className="text-blue-600 hover:bg-blue-50"
                            >
                                <Edit3 size={16} />
                            </Button>
                            <Button
                                onClick={handleDeleteTask}
                                disabled={isPending}
                                title="削除"
                                variant="delete"
                                size="sm"
                                className="text-white"
                            >
                                <Trash2 size={16} />
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* 作成日時 */}
            <div className="mt-2 text-xs text-gray-400">
                作成日: {task.createdAt.toLocaleDateString("ja-JP")}
            </div>
        </div>
    );
};

export default TodoItem;
