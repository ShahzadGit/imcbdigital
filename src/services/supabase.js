import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://aknkniifwrqcoygysmke.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrbmtuaWlmd3JxY295Z3lzbWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4NTAyNTMsImV4cCI6MjAzNjQyNjI1M30._RUU3hsRCQbgD2P4Q1sc_4j414emE_ohLMXhBuNG1Dc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
