
const https = require('https');

const LANGFLOW_HOST = "aws-us-east-2.langflow.datastax.com";
const LANGFLOW_PATH = "/lf/6327827d-3c34-4d82-a5e0-09a3adb65f35/api/v1/run/16ce6e36-1a8d-47ac-9832-b5aa4ae13dd7?stream=false";
const TOKEN = "AstraCS:BESZkhKfGWrWpOlAfkyvRqkn:e9c07d0044b17d47d9e3c708b415a765810a8e24a2dce2341f0824dd087b89cf";
const ORG_ID = "e21c6744-801a-4bc0-aca8-7ee50170ce5f";

function testConnection() {
    console.log("Testing Langflow Connection...");
    console.log("Host:", LANGFLOW_HOST);
    console.log("Path:", LANGFLOW_PATH);

    const data = JSON.stringify({
        input_value: "Hello, this is a test.",
        input_type: "chat",
        output_type: "chat",
        tweaks: {}
    });

    const options = {
        hostname: LANGFLOW_HOST,
        path: LANGFLOW_PATH,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`,
            'X-DataStax-Current-Org': ORG_ID,
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        console.log(`Response Status: ${res.statusCode}`);

        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            console.log('Response Body:', body);
            if (res.statusCode >= 200 && res.statusCode < 300) {
                console.log("SUCCESS: Connection established.");
            } else {
                console.log("FAILURE: Server returned an error.");
            }
        });
    });

    req.on('error', (error) => {
        console.error("ERROR: Network request failed.", error);
    });

    req.write(data);
    req.end();
}

testConnection();
