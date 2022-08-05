module.exports = {
    apps : [{
      name   : "siccob-https-agent",
      script : "./dist/main.js",
      env: {
        "NODE_ENV": "production"
      }
    }]
  }
  