import { Request, Response } from 'express';
import { getSupabaseClient } from '../config/database';
import { CreateActivityDto } from '../types/activity';

export const getActivities = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false });

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

export const createActivity = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const activityData: CreateActivityDto = req.body;

    const { data, error } = await supabase
      .from('activities')
      .insert([activityData])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const { id } = req.params;

    const { error: logError } = await supabase
      .from('activity_logs')
      .delete()
      .eq('activity_id', id);

    if (logError) {
      return res.status(500).json({ error: logError.message });
    }

    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: 'Activity deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

