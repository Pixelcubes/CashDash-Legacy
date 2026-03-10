const { createClient } = require("@supabase/supabase-js");

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = 'https://bpjmdrzhirsebupwxgbp.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseKey) {
      return res.status(500).json({ 
        message: 'Server configuration error. Please contact administrator.' 
      });
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { Username, Password } = req.body;

    if (!Username || !Password) {
      return res.status(400).json({ 
        message: 'Username and password are required.' 
      });
    }

    // Check if username already exists
    const selectQueryResult = await supabase
      .from('users')
      .select('*')
      .eq("username", Username);

    if (selectQueryResult.error) {
      console.error('Database error:', selectQueryResult.error);
      return res.status(500).json({
        message: "Error. Try Again!",
      });
    }

    if (selectQueryResult.data.length > 0) {
      return res.status(409).json({
        message: "Error. Username already exists.",
      });
    }

    // Insert new user
    const insertQueryResult = await supabase
      .from('users')
      .insert([
        {
          username: Username,
          display_name: Username,
          password: Password,
        }
      ])
      .select();

    if (insertQueryResult.error) {
      console.error('Insert error:', insertQueryResult.error);
      return res.status(500).json({
        message: "Error, try again!",
      });
    }

    return res.status(200).json({
      message: "Account created successfully.",
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      message: "Internal server error. Please try again.",
    });
  }
};
