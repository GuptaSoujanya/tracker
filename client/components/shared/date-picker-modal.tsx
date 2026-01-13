"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerModalProps {
  currentMonth: number;
  currentYear: number;
  onDateChange: (month: number, year: number) => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function DatePickerModal({ currentMonth, currentYear, onDateChange }: DatePickerModalProps) {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [open, setOpen] = useState(false);

  const handleMonthSelect = (monthIndex: number) => {
    onDateChange(monthIndex, selectedYear);
    setOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    onDateChange(today.getMonth(), today.getFullYear());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 glass-light hover:shadow-md border-neutral-300">
          <Calendar className="h-4 w-4 text-primary-600" />
          <span className="font-semibold text-neutral-900">
            {MONTHS[currentMonth]} {currentYear}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-white/40 shadow-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-neutral-900">Select Month</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-4">
          {/* Year Selector */}
          <div className="flex items-center justify-between glass-light p-4 rounded-xl">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedYear(selectedYear - 1)}
              className="hover:bg-primary-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-2xl font-bold text-neutral-900">{selectedYear}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedYear(selectedYear + 1)}
              className="hover:bg-primary-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-3 gap-3">
            {MONTHS.map((month, index) => {
              const isSelected = index === currentMonth && selectedYear === currentYear;
              const today = new Date();
              const isCurrentMonth = index === today.getMonth() && selectedYear === today.getFullYear();
              
              return (
                <button
                  key={month}
                  onClick={() => handleMonthSelect(index)}
                  className={cn(
                    "p-3 rounded-xl font-semibold text-sm transition-all duration-300",
                    isSelected
                      ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-primary-500 shadow-lg scale-105"
                      : isCurrentMonth
                      ? "glass-light border-2 border-primary-400 text-primary-700 hover:shadow-md"
                      : "glass-light text-neutral-700 hover:bg-primary-50 hover:text-primary-700 hover:shadow-md"
                  )}
                >
                  {month.substring(0, 3)}
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleToday}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-primary-500 shadow-md"
            >
              Go to Today
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

