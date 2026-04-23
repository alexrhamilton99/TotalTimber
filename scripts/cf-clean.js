const fs = require('fs');

for (const dir of ['.next', '.open-next']) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`✓ Cleared ${dir}`);
  }
}
