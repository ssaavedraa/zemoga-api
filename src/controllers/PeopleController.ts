import { Request, Response } from 'express'
import PeopleService from '../services/PeopleService'

class PeopleController {
  static async getPeople (_req: Request, res: Response) {
    try {
      const people = await PeopleService.getPeople()

      return res.status(200).json(people)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        status: 500,
        message: 'There was an error retrieving people data'
      })
    }
  }
}

export default PeopleController
