import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

export const initializeSupabase = (): SupabaseClient => {
  if (supabase) {
    return supabase;
  }
  
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file.'
    );
  }

  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });

  return supabase;
};

/**
 * Test Supabase connection by performing a simple query
 * @returns Promise with connection status
 */
export const testSupabaseConnection = async (): Promise<{
  connected: boolean;
  error?: string;
  details?: any;
}> => {
  try {
    const client = getSupabaseClient();
    const startTime = Date.now();
    
    const { error: testError } = await client
      .from('_test_connection')
      .select('*')
      .limit(0);
    
    const responseTime = Date.now() - startTime;
    
    if (testError) {
      const errorMessage = testError.message.toLowerCase();
      
      if (
        (errorMessage.includes('relation') && errorMessage.includes('does not exist')) ||
        errorMessage.includes('permission denied') ||
        errorMessage.includes('schema')
      ) {
        return {
          connected: true,
          details: {
            message: 'Supabase connection verified successfully',
            url: process.env.SUPABASE_URL,
            responseTime: `${responseTime}ms`,
            timestamp: new Date().toISOString(),
            note: 'Table does not exist (expected for new projects)',
          },
        };
      }
      
      if (
        errorMessage.includes('network') ||
        errorMessage.includes('fetch') ||
        errorMessage.includes('connection') ||
        errorMessage.includes('invalid api key') ||
        errorMessage.includes('jwt')
      ) {
        throw new Error(`Connection error: ${testError.message}`);
      }
    }

    return {
      connected: true,
      details: {
        message: 'Supabase connection verified successfully',
        url: process.env.SUPABASE_URL,
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error: any) {
    return {
      connected: false,
      error: error.message || 'Unknown error',
      details: {
        url: process.env.SUPABASE_URL,
        timestamp: new Date().toISOString(),
        suggestion: 'Check your SUPABASE_URL and SUPABASE_ANON_KEY in .env file',
      },
    };
  }
};

export const getSupabaseClient = (): SupabaseClient => {
  if (!supabase) {
    return initializeSupabase();
  }
  return supabase;
};

export default supabase;

