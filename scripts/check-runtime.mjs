const major = Number(process.versions.node.split('.')[0]);

if (major !== 24) {
  throw new Error(`SILO site verification requires Node.js 24; running ${process.version}.`);
}

console.log(`Runtime verified: Node.js ${process.version}`);
