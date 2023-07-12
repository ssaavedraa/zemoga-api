import { PrismaClient } from '@prisma/client'
import { TimeElapsed, Votes, VotesPercentage } from '../types/PeopleTypes'

class PeopleService {
  private static readonly prismaClient: PrismaClient = new PrismaClient()

  static async getPeople (): Promise<any[]> {
    const peopleData = await this.prismaClient.person.findMany({
      include: {
        votes: {
          select: {
            negative: true,
            positive: true
          },

        }
      },
      orderBy: {
        id: 'asc'
      }
    })

    return peopleData.map((person) => {
      const timeElapsed = this.calculateTimeElapsed(person.lastUpdated)
      const timeElapsedMessage = this.buildLastUpdateMessage(timeElapsed)

      const votesWithPercentage = this.calculateVotesPercentage(person.votes)

      return {
        ...person,
        lastUpdated: timeElapsedMessage,
        votes: votesWithPercentage
      }
    })
  }

  static calculateTimeElapsed (lastUpdateDate: Date): TimeElapsed {
    const lastUpdate = new Date(lastUpdateDate)
    const now = new Date()

    const timeElapsed: TimeElapsed = {
      years: now.getFullYear() - lastUpdate.getFullYear(),
      months: now.getMonth() - lastUpdate.getMonth(),
      days: now.getDate() - lastUpdate.getDate(),
      minutes: Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60))
    }

    if (timeElapsed.months < 0) {
      timeElapsed.years--
      timeElapsed.months += 12
    }

    if (timeElapsed.days < 0) {
      const previousMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate()

      timeElapsed.months--
      timeElapsed.days += previousMonthLastDay
    }

    return timeElapsed
  }

  static buildLastUpdateMessage (timeElapsed: TimeElapsed): string {
    let highestUnit: keyof typeof timeElapsed = 'minutes'

    for (const unit in timeElapsed) {
      if (timeElapsed[unit] > 0) {
        highestUnit = unit as keyof typeof timeElapsed
        break
      }
    }

    let message = ''
    switch (highestUnit) {
      case 'years':
        message = `${timeElapsed.years} year${timeElapsed.years === 1 ? '' : 's'}`
        break
      case 'months':
        message = `${timeElapsed.months} months${timeElapsed.months === 1 ? '' : 's'}`
        break
      case 'days':
        message = `${timeElapsed.days} days${timeElapsed.days === 1 ? '' : 's'}`
        break
      case 'minutes':
        message = `${timeElapsed.minutes < 5 ? 'Few' : timeElapsed.minutes} minutes`
        break
    }

    return `${message} ago`
  }

  static calculateVotesPercentage ({positive, negative}: Votes): VotesPercentage {
    const totalVotes = positive + negative

    const positivePercentage = (positive * 100) / totalVotes
    const negativePercentage = (negative * 100) / totalVotes

    return {
      positive: `${positivePercentage.toFixed(2)}%`,
      negative: `${negativePercentage.toFixed(2)}%`
    }
  }
}

export default PeopleService
