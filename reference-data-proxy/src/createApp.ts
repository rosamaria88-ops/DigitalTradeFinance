import express from 'express';
import compression from 'compression';
import { apiRoutes, swaggerRoutes, healthcheck } from './v1/routes';

export const app: any = express();
app.use(express.json());
app.use(compression());

// API documentation route
app.use('/api-docs', swaggerRoutes);
// healthcheck route
app.use(healthcheck);
// all other API routes
app.use(apiRoutes);
