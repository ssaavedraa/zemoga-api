import { PrismaClient } from '@prisma/client'

class VotesService {
  private static readonly prismaClient: PrismaClient = new PrismaClient()

  static async postVote ({id, vote} : {id: number, vote: string}) {
    const previousVotes = (await this.prismaClient.votes.findMany({
      where: {
        personId: id
      },
      select: {
        positive: true,
        negative: true
      }
    }))[0]

    const updatedVotes = {
      ...previousVotes,
      [vote]: ++previousVotes[vote]
    }

    const updatedData = await this.prismaClient.person.update({
      where: {
        id
      },
      include: {
        votes: {
          select: {
            positive: true,
            negative: true
          }
        }
      },
      data: {
        lastUpdated: new Date(),
        votes: {
          update: {
            where: {
              personId: id
            },
            data: updatedVotes
          }
        }
      }
    })

    return updatedData
  }
}

export default VotesService
