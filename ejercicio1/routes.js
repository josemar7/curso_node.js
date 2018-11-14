const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    res.write(`
                  <html>
                      <head>
                          <title>Ejercicio 1</title>
                      </head>
                      <body>
                        <h1>Greetings from Avila</h1>
                        <form action="/create-user" method="POST">
                            <input type="text" name="username">
                            <button type="submit">Send</button>
                        </form>
                      </body>
                  </html>
                  `);
    return res.end();
  } else if (url === "/users") {
    res.write(`
                  <html>
                      <head>
                          <title>Users</title>
                      </head>
                      <body>
                        <ul>
                            <li>User 1</li>
                            <li>User 2</li>
                            <li>User 3</li>
                        </ul>
                      </body>
                  </html>
                  `);
    return res.end();
  } else if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log(username);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
};
module.exports = requestHandler;
