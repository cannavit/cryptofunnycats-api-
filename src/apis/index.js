import express, { Router } from 'express';
import { readdirSync, statSync } from 'fs';
import path from 'path';
import { urlBase } from '../config';

const router = new Router();

/**
 * Generate API routes based on folders
 *  (exclude folder starting with '_')
 */
let swaggerRoutes = []

readdirSync(__dirname)
  .filter(f => !f.startsWith('_'))
  .map(f => ({
    name: f,
    module: path.join(__dirname, f)
  }))
  .filter(a => statSync(a.module).isDirectory())
  .forEach(a => {
    router.use(urlBase+ `/${a.name}`, require(a.module).default);
    swaggerRoutes.push(__dirname+'/'+a.name+"/*.js")
  });

// Url for scann documentations
module.exports.swaggerRoutes = swaggerRoutes;

export default router;





// './src/apis/smktest/*.js'