import express from 'express';
import compression from 'compression';
import { apiRoutes, swaggerRoutes, healthcheck } from './v1/routes';

import { seo } from './middleware/headers/seo';
import { security } from './middleware/headers/security';

export const app: any = express();

app.use(seo);
app.use(security);
app.use(express.json());
app.use(compression());

// API documentation route
app.use('/api-docs', swaggerRoutes);
// healthcheck route
app.use(healthcheck);
// all other API routes
app.use(apiRoutes);
