import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function Modal({
    trigger,
    title,
    children,
    isOpen = false,
    onOpenChange,
}: {
    trigger: React.ReactNode;
    title: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-3xl bg-white rounded-xl shadow-lg">
                <DialogTitle className="text-2xl font-bold mb-6">
                    {title}
                </DialogTitle>
                {children}
            </DialogContent>
        </Dialog>
    );
}
