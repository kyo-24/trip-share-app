import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const Pulldown = ({
    items,
    selectedId,
    handleValueChange,
}: {
    items: { id: number; content: string }[];
    selectedId?: number;
    handleValueChange: (value: string) => void;
}) => {
    return (
        <Select
            value={selectedId?.toString() || undefined}
            onValueChange={handleValueChange}
        >
            <SelectTrigger className="w-80">
                <SelectValue placeholder="旅行プランを選択してください" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-gray-100"
                >
                    すべて
                </SelectItem>
                {items.map((item) => (
                    <SelectItem
                        key={item.id}
                        value={item.id.toString()}
                        className="cursor-pointer hover:bg-gray-100"
                    >
                        {item.content}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default Pulldown;
