"use client";

import { cn } from "@/lib/utils";
import { ja } from "date-fns/locale";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

function Calendar({
    className,
    showOutsideDays = true,
    ...props
}: React.ComponentProps<typeof DayPicker>) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            animate
            mode="single"
            locale={ja}
            className={cn("p-3", className)}
            {...props}
        />
    );
}

export { Calendar };
