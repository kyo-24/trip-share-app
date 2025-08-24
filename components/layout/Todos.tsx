import TodoItem from "./TodoItem";

export default function Todos({
    tasks,
    completedTasks,
}: {
    tasks: { id: string; text: string; completed: boolean; createdAt: Date }[];
    completedTasks: {
        id: string;
        text: string;
        completed: boolean;
        createdAt: Date;
    }[];
}) {
    const pendingTasks = tasks.filter((task) => !task.completed);
    return (
        <div>
            {/* プログレスバー */}
            <div className="mb-10">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>進捗状況</span>
                    <span>
                        {Math.round(
                            (completedTasks.length / tasks.length) * 100
                        )}
                        %
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                        style={{
                            width: `${
                                (completedTasks.length / tasks.length) * 100
                            }%`,
                        }}
                    />
                </div>
            </div>
            {/* タスクリスト */}
            <div className="space-y-4">
                {/* 未完了タスク */}
                {pendingTasks.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                            未完了のタスク
                        </h3>
                        {pendingTasks.map((task) => (
                            <TodoItem key={task.id} task={task} />
                        ))}
                    </div>
                )}

                {/* 完了タスク */}
                {completedTasks.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                            完了したタスク
                        </h3>
                        {completedTasks.map((task) => (
                            <TodoItem key={task.id} task={task} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
