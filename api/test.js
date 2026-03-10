module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  return res.status(200).json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    envCheck: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'ENV_VAR_SET' : 'ENV_VAR_MISSING'
  });
};
