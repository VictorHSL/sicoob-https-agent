module.exports = {
    apps : [{
      name   : "https-agent",
      script : "./dist/main.js",
      env: {
        "NODE_ENV": "production"
      }
    }]
  }
  