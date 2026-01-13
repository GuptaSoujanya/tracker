export interface Activity {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  activity_id: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
  notes?: string;
}

export interface CreateActivityDto {
  name: string;
  description?: string;
  color: string;
  icon?: string;
}

export interface CreateActivityLogDto {
  activity_id: string;
  date: string;
  completed: boolean;
  notes?: string;
}

export interface UpdateActivityLogDto {
  completed: boolean;
  notes?: string;
}

