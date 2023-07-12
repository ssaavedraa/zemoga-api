import { Router } from 'express';
import VotesController from '../controllers/VotesController';

const VotesRouter = Router()

VotesRouter.post('/', VotesController.postVote)

export default VotesRouter