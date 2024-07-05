"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/custom/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange: (date: DateRange | undefined) => void;
  label: string; // Adicionado
}

export function DatePickerWithRange({
  className,
  onDateChange,
  label, // Adicionado
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>()

  const handleDateChange = (date: DateRange | undefined) => {
    setDate(date)
    onDateChange(date)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            style={{ width: "auto", minWidth: "fit-content" }} // Ajuste de largura
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{label}</span> {/* Mostrar apenas o label */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
