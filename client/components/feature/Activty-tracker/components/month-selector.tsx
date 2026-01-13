"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePickerModal } from "@/components/shared/date-picker-modal";

interface MonthSelectorProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export function MonthSelector({
  month,
  year,
  onMonthChange,
  onYearChange,
}: MonthSelectorProps) {
  const handlePrevMonth = () => {
    if (month === 0) {
      onMonthChange(11);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      onMonthChange(0);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };

  const handleToday = () => {
    const today = new Date();
    onMonthChange(today.getMonth());
    onYearChange(today.getFullYear());
  };

  const handleDateChange = (newMonth: number, newYear: number) => {
    onMonthChange(newMonth);
    onYearChange(newYear);
  };

  return (
    <div className="flex items-center justify-between p-4 glass-light rounded-xl shadow-md">
      <Button
        onClick={handlePrevMonth}
        variant="outline"
        size="sm"
        className="hover:bg-primary-100 glass-light"
      >
        <ChevronLeft className="h-4 w-4 text-primary-600" />
      </Button>

      <div className="flex items-center gap-3">
        <DatePickerModal
          currentMonth={month}
          currentYear={year}
          onDateChange={handleDateChange}
        />
        <Button
          onClick={handleToday}
          size="sm"
          className="bg-secondary-600 hover:bg-secondary-700 text-primary-500 shadow-md"
        >
          Today
        </Button>
      </div>

      <Button
        onClick={handleNextMonth}
        variant="outline"
        size="sm"
        className="hover:bg-primary-100 glass-light"
      >
        <ChevronRight className="h-4 w-4 text-primary-600" />
      </Button>
    </div>
  );
}

