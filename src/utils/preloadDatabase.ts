import { PrismaClient } from '@prisma/client'
import peopleData from '../mockData.json'

export const preloadDatabase = async () => {
  const prismaClient = new PrismaClient()

  const peopleToCreate = []
  const votesToCreate = []

  for (const person of peopleData) {
    const { name, description, category, picture, lastUpdated, votes} = person

    const existingPerson = await prismaClient.person.findUnique({
      where: { name }
    })

    if (!existingPerson) {
      const personData = {
        name,
        description,
        category,
        picture,
        lastUpdated
      }

      const createdPerson = await prismaClient.person.create({
        data: personData
      })

      const votesData = {
        positive: votes.positive,
        negative: votes.negative,
        personId: createdPerson.id
      }

      const createdVotes = await prismaClient.votes.create({
        data: votesData
      })
    }
  }

  console.log('Database populated!')
}