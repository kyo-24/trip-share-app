import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { Modal } from "./Modal";

const DeleteModal = ({
    trigger,
    title,
    handleDelete,
}: {
    trigger: ReactNode;
    title: string;
    handleDelete: () => void;
}) => {
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [isPending, startTransition] = React.useTransition();

    const onClickDelete = () => {
        startTransition(() => {
            handleDelete();
        });
    };
    return (
        <Modal
            trigger={trigger}
            title={title}
            isOpen={isOpenModal}
            onOpenChange={setIsOpenModal}
        >
            <div>
                <p className="mb-4">本当に削除しますか？</p>
                <div className="flex justify-end space-x-3">
                    <Button
                        variant={"secondary"}
                        className="bg-gray-100 hover:bg-gray-200"
                        onClick={() => {
                            setIsOpenModal(false);
                        }}
                    >
                        キャンセル
                    </Button>
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                        onClick={() => {
                            onClickDelete();
                            setIsOpenModal(false);
                        }}
                    >
                        削除
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
