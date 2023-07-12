import { Router } from 'express';
import PeopleRouter from './PeopleRoutes';
import VotesRouter from './VotesRoutes';

const router = Router()

router.use('/people', PeopleRouter)
router.use('/vote', VotesRouter)

export default router