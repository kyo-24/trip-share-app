import React from "react";

interface SubtitleProps {
  title: string;
  required?: boolean;
}

const Subtitle = ({ title, required }: SubtitleProps) => {
  return (
    <h2 className="text-xl font-semibold">
      {title}
      {required && <span className="text-destructive ml-1">*</span>}
    </h2>
  );
};

export default Subtitle;
