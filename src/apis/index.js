// import express, { Router } from 'express';
// import { readdirSync, statSync } from 'fs';
// import path from 'path';

// const router = new Router();

// /**
//  * Generate API routes based on folders
//  *  (exclude folder starting with '_')
//  */
// readdirSync(__dirname)
//   .filter((f) => !f.startsWith('_'))
//   .map((f) => ({
//     name: f,
//     module: path.join(__dirname, f),
//   }))
//   .filter((a) => statSync(a.module).isDirectory())
//   .forEach((a) => {
//     router.use(`/${a.name}`, require(a.module).default);
//   });

// /**
//  * Static route for apiDoc
//  */
// // router.use('/api', express.static(path.join(__dirname, '../../docs')));

// // export default router;
