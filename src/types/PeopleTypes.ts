export interface TimeElapsed {
  years: number
  months: number
  days: number
  minutes: number
}

export interface PeopleData {
  name: string
  description: string
  category: string
  picture: string
  lastUpdated: string
  votes: Votes | VotesPercentage
}

export interface Votes {
  positive: number
  negative: number
}

export interface VotesPercentage {
  positive: string
  negative: string
}
