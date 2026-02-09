const server = Bun.serve({
  port: 3000,
  routes: {}
});

console.log(`Listening on ${server.url}`);