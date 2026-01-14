"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";
import { TimeRangeFilter, DateRange } from "../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BudgetFiltersProps {
  filter: TimeRangeFilter;
  onFilterChange: (filter: TimeRangeFilter) => void;
  customDateRange?: DateRange;
  onCustomDateRangeChange: (range: DateRange | undefined) => void;
  dateRange: DateRange;
}

export function BudgetFilters({
  filter,
  onFilterChange,
  customDateRange,
  onCustomDateRangeChange,
  dateRange,
}: BudgetFiltersProps) {
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(
    customDateRange ? customDateRange.start.toISOString().split('T')[0] : dateRange.start.toISOString().split('T')[0]
  );
  const [tempEndDate, setTempEndDate] = useState(
    customDateRange ? customDateRange.end.toISOString().split('T')[0] : dateRange.end.toISOString().split('T')[0]
  );

  const filters: { value: TimeRangeFilter; label: string }[] = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
    { value: 'custom', label: 'Custom' },
  ];

  const handleFilterClick = (newFilter: TimeRangeFilter) => {
    onFilterChange(newFilter);
    if (newFilter !== 'custom') {
      onCustomDateRangeChange(undefined);
    }
  };

  const handleCustomDateApply = () => {
    const start = new Date(tempStartDate);
    const end = new Date(tempEndDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    
    if (start <= end) {
      onCustomDateRangeChange({ start, end });
      setShowCustomPicker(false);
    }
  };

  const formatDateRange = (range: DateRange): string => {
    const startStr = range.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const endStr = range.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    if (range.start.getTime() === range.end.getTime()) {
      return startStr;
    }
    return `${startStr} - ${endStr}`;
  };

  return (
    <Card className="glass border-white/40 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterClick(f.value)}
              className={
                filter === f.value
                  ? "bg-primary-600 hover:bg-primary-700 text-primary-500 shadow-md"
                  : "glass-light border-neutral-300 hover:bg-primary-50 text-neutral-700"
              }
            >
              {f.label}
            </Button>
          ))}
          
          {filter === 'custom' && (
            <Dialog open={showCustomPicker} onOpenChange={setShowCustomPicker}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-light border-neutral-300 hover:bg-primary-50 text-neutral-700 gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  {customDateRange ? formatDateRange(customDateRange) : 'Select Range'}
                </Button>
              </DialogTrigger>
              <DialogContent className="glass border-white/40 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-neutral-900">Select Date Range</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 p-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="text-neutral-700 font-semibold">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={tempStartDate}
                      onChange={(e) => setTempStartDate(e.target.value)}
                      className="glass-light border-neutral-300 text-neutral-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date" className="text-neutral-700 font-semibold">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={tempEndDate}
                      onChange={(e) => setTempEndDate(e.target.value)}
                      className="glass-light border-neutral-300 text-neutral-900"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCustomDateApply}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-primary-500 shadow-md"
                    >
                      Apply
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        onCustomDateRangeChange(undefined);
                        setShowCustomPicker(false);
                      }}
                      className="glass-light border-neutral-300"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {filter !== 'custom' && (
            <div className="ml-auto text-sm text-neutral-600 font-medium">
              {formatDateRange(dateRange)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

