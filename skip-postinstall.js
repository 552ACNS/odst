#!/usr/bin/env node

console.log(process.env.SKIP_POSTINSTALL);

if (!process.env.SKIP_POSTINSTALL) process.exit(1);
