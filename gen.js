const fs = require('fs');
const path = require('path');
const genopenapi = require('./lib/proxy2openapi.js').genopenapi;
const commander = require('commander');

commander
    .option('-n, --name [string]', 'API name')
    .option('-e, --endpoint [url]', 'Endpoint url')
    .option('-d, --dir [path]', 'Path to API directory')
    .parse(process.argv);


function getProxies(dirname) {
    return new Promise((resolve, reject) => {
        const proxies = [];
        fs.readdir(dirname, function(err, filenames) {
            if (err) {
                reject(err);
            }
            filenames.forEach(filename => {
                if (filename.indexOf('.xml') > -1) {
                    proxies.push(path.resolve(dirname, filename));
                }
            });
            resolve(proxies);
        });
    });
}

function gen(dir, options, proxyPath) {
    return new Promise((resolve, reject) => {
        genopenapi(dir, options, proxyPath, (err, done) => (err) ? reject(err) : resolve());
    });
}

(async function() {
    const proxies = await getProxies(path.resolve(commander.dir, 'apiproxy', 'proxies'));
    await Promise.all(proxies.map(p => gen(commander.dir, {api: commander.name, proxyEndPoint: commander.endpoint}, p)));
})().then();

