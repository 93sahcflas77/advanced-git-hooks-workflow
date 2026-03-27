const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');

const swaggerSpec = require('../swagger');

const OUTPUT_DIR = path.join(process.cwd(), 'docs');
const JSON_FILE = path.join(OUTPUT_DIR, 'swagger.json');
const YAML_FILE = path.join(OUTPUT_DIR, 'swagger.yaml');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

try {
  fs.writeFileSync(JSON_FILE, JSON.stringify(swaggerSpec, null, 2), 'utf-8');
  // console.log("✅ swagger.json generated");
} catch (err) {
  console.error('❌ Error generating swagger.json:', err.message);
}

try {
  const yamlData = YAML.stringify(swaggerSpec, 10);
  fs.writeFileSync(YAML_FILE, yamlData, 'utf-8');
  // console.log("✅ swagger.yaml generated");
} catch (err) {
  console.error('❌ Error generating swagger.yaml:', err.message);
}
