#!/usr/bin/env node

console.log(process.env.SKIP_POSTINSTALL);

if (!process.env.SKIP_POSTINSTALL)
  console.log("if you can see this, why isn't it failing?");

if (!process.env.SKIP_POSTINSTALL || process.env.SKIP_POSTINSTALL === 1)
  process.exit(1);
