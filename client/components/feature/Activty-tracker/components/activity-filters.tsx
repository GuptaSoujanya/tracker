"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Filter } from "lucide-react";
import { Activity } from "../types";

interface ActivityFiltersProps {
  activities: Activity[];
  onFilterChange: (filtered: Activity[]) => void;
}

export function ActivityFilters({ activities, onFilterChange }: ActivityFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  React.useEffect(() => {
    const filtered = activities.filter((activity) =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFilterChange(filtered);
  }, [searchTerm, activities, onFilterChange]);

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <Card className="glass border-white/40 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 glass-light border-neutral-300 focus:border-primary-500 text-neutral-900"
            />
            {searchTerm && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-neutral-200 rounded-full p-1 transition-colors"
              >
                <X className="h-4 w-4 text-neutral-600" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="glass-light border-neutral-300 hover:bg-primary-50"
          >
            <Filter className="h-4 w-4 text-primary-600" />
          </Button>
        </div>
        {searchTerm && (
          <div className="mt-2 text-xs text-neutral-600">
            Found {activities.filter(a => 
              a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              a.description?.toLowerCase().includes(searchTerm.toLowerCase())
            ).length} activity(ies)
          </div>
        )}
      </CardContent>
    </Card>
  );
}

