import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mwnyxegipgleviajbwpq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13bnl4ZWdpcGdsZXZpYWpid3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODQxMjIsImV4cCI6MjA3NTE2MDEyMn0.e3ep-dogphgRDI77d263eqXWwvGRSRf7X5I4bTj1jyk';

export const supabase = createClient(supabaseUrl, supabaseKey);
