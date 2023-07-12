import { Router } from 'express';
import PeopleRouter from './PeopleRoutes';

const router = Router()

router.use('/people', PeopleRouter)

export default router