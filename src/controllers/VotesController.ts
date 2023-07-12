import { Request, Response } from 'express';
import VotesService from '../services/VotesService';

class VotesController {
  static postVote (req: Request, res: Response) {
    try {
      const data = req.body

      const response = VotesService.postVote(data)

      return res.status(201).json(response)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        status: 500,
        message: 'There was an error sending vote'
      })
    }
  }
}

export default VotesController