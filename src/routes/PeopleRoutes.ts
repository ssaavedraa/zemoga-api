import { Router } from 'express';
import PeopleController from '../controllers/PeopleController';

const PeopleRouter = Router()

PeopleRouter.get('/', PeopleController.getPeople)

export default PeopleRouter