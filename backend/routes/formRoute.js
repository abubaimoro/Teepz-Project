import express from 'express';
import { Router } from 'express';
import { handleFormSubmission } from '../controllers/formControllers.js';

const formRouter = express.Router();

formRouter.post('/submit', handleFormSubmission);

export default formRouter;
