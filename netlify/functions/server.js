// Netlify function handler for Socket.IO
export const handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Handle Socket.IO requests
  if (event.path.includes('/socket.io/')) {
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'text/html'
      },
      body: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Socket.IO Server</title>
        </head>
        <body>
          <h1>Socket.IO Server Running</h1>
          <p>This is a Netlify Function handling Socket.IO connections.</p>
          <script>
            // Redirect to main app
            window.location.href = '/';
          </script>
        </body>
        </html>
      `
    };
  }

  // Default response
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ 
      message: 'Socket.IO server is running',
      path: event.path,
      method: event.httpMethod
    })
  };
};
