const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function testDatabaseConnection() {
  try {
    const { data, error } = await supabase.from('leagues').select('*').limit(1);
    
    if (error) throw error;
    
    console.log('Successfully connected to the database');
    process.exit(0);
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  }
}

testDatabaseConnection();