"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { getActivityColor } from "../helper";
import { Activity } from "../types";

interface AddActivityModalProps {
  activityCount: number;
  activities: Activity[];
  onAdd: (name: string, description: string, color: string) => Promise<void>;
}

export function AddActivityModal({ activityCount, activities, onAdd }: AddActivityModalProps) {
  const [open, setOpen] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [activityDesc, setActivityDesc] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
    // Check for duplicates (case-insensitive)
    const isDuplicate = activities.some(
      (activity) => activity.name.toLowerCase().trim() === activityName.toLowerCase().trim()
    );

    if (isDuplicate) {
      setError("This activity already exists!");
        setIsLoading(false);
      return;
    }

    if (activityName.trim()) {
      const color = getActivityColor(activityCount);
        await onAdd(activityName.trim(), activityDesc.trim(), color);
      setActivityName("");
      setActivityDesc("");
      setError("");
      setOpen(false);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create activity. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setActivityName("");
      setActivityDesc("");
      setError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary-600 hover:bg-primary-700 text-primary-500 shadow-md hover:shadow-lg">
          <Plus className="h-4 w-4" />
          Add Activity
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-white/40 shadow-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-neutral-900">
            Add New Activity
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Activity Name */}
          <div className="space-y-2">
            <Label htmlFor="activity-name" className="text-sm font-semibold text-neutral-700">
              Activity Name *
            </Label>
            <Input
              id="activity-name"
              type="text"
              placeholder="e.g., Morning Run"
              value={activityName}
              onChange={(e) => {
                setActivityName(e.target.value);
                setError("");
              }}
              className="glass-light border-neutral-300 focus:border-primary-500 text-neutral-900"
              maxLength={30}
              required
            />
            {error && (
              <p className="text-xs text-danger-600 font-medium">{error}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="activity-desc" className="text-sm font-semibold text-neutral-700">
              Description
            </Label>
            <Textarea
              id="activity-desc"
              placeholder="Optional description..."
              value={activityDesc}
              onChange={(e) => setActivityDesc(e.target.value)}
              className="glass-light border-neutral-300 focus:border-primary-500 text-neutral-900"
              rows={2}
              maxLength={100}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-success-600 to-success-500 hover:from-success-700 hover:to-success-600 text-primary-500 shadow-md"
            >
              <Plus className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="px-6"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
