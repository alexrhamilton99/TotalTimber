const fs = require('fs');

fs.cpSync('.open-next/worker.js', '.open-next/assets/_worker.js');
fs.cpSync('.open-next/cloudflare', '.open-next/assets/cloudflare', { recursive: true });
fs.cpSync('.open-next/middleware', '.open-next/assets/middleware', { recursive: true });
fs.cpSync('.open-next/server-functions', '.open-next/assets/server-functions', { recursive: true });
fs.cpSync('.open-next/.build', '.open-next/assets/.build', { recursive: true });

console.log('✓ Cloudflare assets copied successfully');
