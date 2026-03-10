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

    // Query user from database
    const selectQueryResult = await supabase
      .from('users')
      .select('*')
      .eq("username", Username)
      .eq("password", Password);

    if (selectQueryResult.error) {
      console.error('Database error:', selectQueryResult.error);
      return res.status(500).json({
        message: "Error. Try Again!",
      });
    }

    if (selectQueryResult.data.length === 0) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    // Login successful
    const user = selectQueryResult.data[0];
    return res.status(200).json({
      message: "Login successful!",
      userId: user.id,
      username: user.username,
      displayName: user.display_name,
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      message: "Internal server error. Please try again.",
    });
  }
};
