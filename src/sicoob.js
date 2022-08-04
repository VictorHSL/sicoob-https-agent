var axios = require('axios');
const https = require('https');
var qs = require('qs');
const fs = require('fs');

var data = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': '48e5b0db-af27-4948-9195-c3083c28c6fa',
  'scope': 'cob.read cob.write pix.read pix.write' 
});

const httpsAgent = new https.Agent({
    pfx: fs.readFileSync('F:\\Projects\\4UI\\srCertificate.pfx'),
    passphrase: 'SR@2022',
    rejectUnauthorized: false
});

var config = {
    method: 'post',
    url: 'https://auth.sicoob.com.br/auth/realms/cooperado/protocol/openid-connect/token',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data,
    httpsAgent
  };

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});