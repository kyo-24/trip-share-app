import React from "react";
import {
  SelectContent,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Pulldown = () => {
  return (
    <Select>
      <SelectTrigger id="destination" className="mt-1.5 w-full cursor-pointer">
        <SelectValue placeholder="旅行先を選択してください" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tokyo" className="cursor-pointer">
          東京
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Pulldown;
