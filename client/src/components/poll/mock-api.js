const isDateInThePast = dateString => {
  return dateString ? new Date() > new Date(dateString) : false
}

let answerIdIncrementer = 0

class Poll {
  constructor(id, question, answers, expires = null, showResults = false) {
    this.id = id
    this.question = question
    this.answers = answers
    this.expires = expires
    this.showResults = showResults // Serverside check to know if results should be sent along
  }

  hasExpired() {
    return isDateInThePast(this.expires)
  }

  votesTotal() {
    return this.answers.reduce((acc,curr) => {
      return acc + curr.votes
    }, 0)
  }

  votersTotal() {
    return null // TODO
  }

  response() {
    return {
      id: this.id,
      answers: this.answers,
      info: {
        question: this.question,
        expires: this.expires,
        hasExpired: this.hasExpired(),
        votesTotal: this.votesTotal(),
        votersTotal: this.votersTotal(),
      }
    }
  }

}

class Answer {
  constructor(answer) {
    this.answer = answer
    this.id = answerIdIncrementer++
    this.votes = 1
  }

  incrementVote() {
    this.votes += 1
  }
}

const answer1 = new Answer('Yes, thank you i would like so.')
const answer2 = new Answer('No, why would you ever suggest that.')
const answer3 = new Answer('Idunno, maybe. But does it really matter?')

const poll1 = new Poll('c7cbb406-69ce-494d-ba46-176ccb73af5d', 'Is this the question you were looking for?',[answer1, answer2, answer3], '2021-04-31T09:58:19.036Z', true) 
const poll2 = new Poll('eaa5c688-dd78-49bb-8d2c-a0e10776258d', 'Another question with the same answers',[answer1, answer2, answer3], '2021-03-31T09:58:19.036Z', false) 
const poll3 = new Poll('c3a0d9df-2a43-4ace-9662-a3b803e9e41c', 'A third and final question',[answer1, answer2, answer3]) 

export const polls = [
  poll1,
  poll2,
  poll3
]
