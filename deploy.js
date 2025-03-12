#!/usr/bin/env node


import { execSync } from 'child_process';
import * as fs from 'fs';


const remoteIP = process.env.REMOTE_IP;
const remoteUser = process.env.SSH_USER || 'user';
const remotePath = process.env.REMOTE_PATH || '~/';
const localPath = process.env.LOCAL_PATH || './dist';

if (!remoteIP) {
  console.error('Error: REMOTE_IP is not set. Please ensure it is defined in your .env file.');
  process.exit(1);
}

const buildFolder = localPath;
const zipFile = 'dist.zip';

if (!fs.existsSync(buildFolder)) {
  console.error(`Error: Build folder not found at: ${buildFolder}`);
  console.error('Make sure you run "npm run build" (or "yarn build") before deploying.');
  process.exit(1);
}

try {

  console.log('Zipping build folder...');
  // -r = recursive, -q = quiet (optional), .next or out as needed
  execSync(`zip -r "${zipFile}" "${buildFolder}"`, { stdio: 'inherit' });

  console.log(`Uploading zip to ${remoteIP}...`);
  execSync(`scp "${zipFile}" "${remoteUser}@${remoteIP}:${remotePath}"`, { stdio: 'inherit' });

  console.log('Deployment successful!');
} catch (error) {
  console.error('Deployment failed!', error);
  process.exit(1);
} finally {
  if (fs.existsSync(zipFile)) {
    fs.unlinkSync(zipFile);
  }
}
