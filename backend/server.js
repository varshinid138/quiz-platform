const http = require('http');
const fs = require('fs');
const port = 3001;

// Function to handle CORS
const corsHandler = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

// Create a simple server
const server = http.createServer((req, res) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    corsHandler(res);
    res.writeHead(204);
    res.end();
    return;
  }

  // Add CORS headers for all responses
  corsHandler(res);

  // POST route to save a quiz
  if (req.method === 'POST' && req.url === '/save-quiz') {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        const quizData = JSON.parse(data);

        fs.readFile('quizzes.json', 'utf8', (err, fileData) => {
          if (err && err.code !== 'ENOENT') {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error reading quizzes data' }));
            return;
          }

          let quizzes = [];
          if (fileData) {
            quizzes = JSON.parse(fileData);
          }

          quizzes.push(quizData);

          fs.writeFile('quizzes.json', JSON.stringify(quizzes, null, 2), 'utf8', (err) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Error saving quiz' }));
              return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Quiz saved successfully!' }));
          });
        });
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid quiz data format' }));
      }
    });

    return;
  }

  // GET route to fetch quizzes
  if (req.method === 'GET' && req.url === '/get-quizzes') {
    fs.readFile('quizzes.json', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error reading quizzes' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });

    return;
  }

  // Default route for undefined endpoints
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
