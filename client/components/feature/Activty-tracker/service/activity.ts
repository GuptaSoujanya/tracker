const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
  date: string;
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

class ActivityAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/api`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getActivities(): Promise<Activity[]> {
    return this.request<Activity[]>('/activities');
  }

  async createActivity(data: CreateActivityDto): Promise<Activity> {
    return this.request<Activity>('/activities', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteActivity(id: string): Promise<void> {
    return this.request<void>(`/activities/${id}`, {
      method: 'DELETE',
    });
  }

  async getActivityLogs(params?: {
    month?: number;
    year?: number;
    activity_id?: string;
  }): Promise<ActivityLog[]> {
    const queryParams = new URLSearchParams();
    if (params?.month !== undefined) queryParams.append('month', params.month.toString());
    if (params?.year !== undefined) queryParams.append('year', params.year.toString());
    if (params?.activity_id) queryParams.append('activity_id', params.activity_id);

    const query = queryParams.toString();
    return this.request<ActivityLog[]>(`/activity-logs${query ? `?${query}` : ''}`);
  }

  async createOrUpdateActivityLog(data: CreateActivityLogDto): Promise<ActivityLog> {
    return this.request<ActivityLog>('/activity-logs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async toggleActivityLog(activity_id: string, date: string): Promise<ActivityLog> {
    return this.request<ActivityLog>('/activity-logs/toggle', {
      method: 'POST',
      body: JSON.stringify({ activity_id, date }),
    });
  }

  async deleteActivityLog(id: string): Promise<void> {
    return this.request<void>(`/activity-logs/${id}`, {
      method: 'DELETE',
    });
  }
}

export const activityAPI = new ActivityAPI();

