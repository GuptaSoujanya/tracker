import { Request, Response } from 'express';
import { getSupabaseClient } from '../config/database';
import { CreateActivityLogDto, UpdateActivityLogDto } from '../types/activity';

export const getActivityLogs = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const { month, year, activity_id } = req.query;

    let query = supabase
      .from('activity_logs')
      .select('*');

    if (month !== undefined && year) {
      // JavaScript months are 0-indexed (0-11), SQL expects 1-12
      const monthNum = parseInt(String(month), 10);
      const sqlMonth = monthNum + 1;
      const startDate = `${year}-${String(sqlMonth).padStart(2, '0')}-01`;
      // Get last day of month
      const lastDay = new Date(parseInt(String(year), 10), sqlMonth, 0).getDate();
      const endDate = `${year}-${String(sqlMonth).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
      query = query.gte('date', startDate).lte('date', endDate);
    }

    if (activity_id) {
      query = query.eq('activity_id', activity_id);
    }

    const { data, error } = await query.order('date', { ascending: false });

    if (error) {
      if (error.message.includes('Could not find the table') || error.message.includes('relation') || error.message.includes('does not exist')) {
        return res.status(500).json({ 
          error: error.message,
          hint: 'Tables not found. Please run the SQL schema in Supabase. See server/QUICK_SETUP.md for instructions.'
        });
      }
      return res.status(500).json({ error: error.message });
    }

    res.json(data || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrUpdateActivityLog = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const logData: CreateActivityLogDto = req.body;

    const { data: existing } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('activity_id', logData.activity_id)
      .eq('date', logData.date)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('activity_logs')
        .update({ completed: logData.completed, notes: logData.notes })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.json(data);
    } else {
      const { data, error } = await supabase
        .from('activity_logs')
        .insert([logData])
        .select()
        .single();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json(data);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleActivityLog = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const { activity_id, date } = req.body;

    const { data: existing } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('activity_id', activity_id)
      .eq('date', date)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('activity_logs')
        .update({ completed: !existing.completed })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.json(data);
    } else {
      const { data, error } = await supabase
        .from('activity_logs')
        .insert([{ activity_id, date, completed: true }])
        .select()
        .single();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json(data);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteActivityLog = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const { id } = req.params;

    const { error } = await supabase
      .from('activity_logs')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: 'Activity log deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

