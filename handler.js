
const https = require('https');
const options = {
    hostname: 'icanhazdadjoke.com',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {Accept: 'application/json'}
};


exports.server = async (event) => {
    let dataString = '';

    const response = await new Promise((resolve, reject) => {
        const req = https.get(options, function(res) {
            console.log('headers:', res.headers);
            res.on('data', chunk => {
                dataString += chunk;
            });
            res.on('end', () => {
                resolve({
                    statusCode: 200,
                    body: dataString

                });
            });
        });

        req.on('error', (e) => {
            reject({
                statusCode: 500,
                body: 'Something went wrong!'
            });
        });
    });

    return response;
};