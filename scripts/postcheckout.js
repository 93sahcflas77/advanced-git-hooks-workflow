// DEPENDENCY MANAGENENT
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dependency_management = () => {
  console.log('🔄 Checking dependencies...');

  if (fs.existsSync('package-lock.json')) {
    console.log('📦 Running npm install...');
    execSync('npm install', { stdio: 'inherit' });
  } else {
    console.log('✅ No lockfile — skipping install.');
  }

  console.log('🎯 Done!');
};

// dependency_management();

const folder_envirnment_setup = () => {
  console.log('🔄 Post-checkout setup started...');

  // 1) Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // 2) Create folders
  const folders = ['uploads', 'logs', 'tmp', 'cache', 'public/uploads'];

  folders.forEach((folder) => {
    const folderPath = path.join(process.cwd(), folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`✅ Created: ${folder}`);
    }
  });

  console.log('🎯 Environment ready!');
};

// folder_envirnment_setup()

// react app
const postCheckoutBuild = () => {
  console.log('🔄 Checking if rebuild is needed...');

  if (fs.existsSync('package-lock.json')) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }

  if (!fs.existsSync('dist') && !fs.existsSync('.next') && !fs.existsSync('build')) {
    console.log('No build found — running build...');
    execSync('npm run build', { stdio: 'inherit' });
  } else {
    console.log('✅ Build already exists — skipping.');
  }
};

// postCheckoutBuild()

const checkEnv = () => {
  console.log('🔄 Post-checkout setup started...');

  // 1) Install dependencies
  if (fs.existsSync('package-lock.json')) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }

  // 2) Ensure .env exists
  if (!fs.existsSync('.env')) {
    console.log('⚠️ Creating .env from .env.example...');
    fs.copyFileSync('.env.example', '.env');
  }

  // 3) Validate variables (same logic as before)
  const example = fs
    .readFileSync('.env.example', 'utf8')
    .split('\n')
    .map((line) => line.split('=')[0])
    .filter(Boolean);

  const env = fs.readFileSync('.env', 'utf8');

  let missing = [];

  example.forEach((key) => {
    if (!env.includes(key + '=')) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing environment variables:');
    missing.forEach((v) => console.error(`  - ${v}`));
    process.exit(1);
  }

  console.log('🎯 Environment is ready!');
};

// checkEnv();
