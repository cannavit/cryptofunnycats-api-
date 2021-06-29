import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions, urlBase  } from '../../config';
import {swaggerRoutes } from '../../apis'



async function buildSwaggerDocs(app) {
	
    swaggerOptions.apis = swaggerRoutes
    const swaggerSpecs = swaggerJsdoc(swaggerOptions);

    // Automatic read the apis

	app.use(
      urlBase +'/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpecs)
    );
	
	return app
}


module.exports.buildSwaggerDocs = buildSwaggerDocs;