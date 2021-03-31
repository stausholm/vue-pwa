import {polls} from './mock-api'

const APIBASE = '//localhost:3000'
const USEMOCKAPI = true
const FAKEDELAY = 1000

const APIService = {
  
  getPollData(pollId, withResults = false) {
    if(USEMOCKAPI) {
      return new Promise((resolve, reject) => {
        const poll = polls.find(x => x.id === pollId)

        setTimeout(() => {
          if(!pollId) {return reject({message: 'pollId is required'})}

          if (!poll) {return reject({message: 'no poll found with matching id'})}

          if (!withResults || !poll.showResults) {
            const pollResponse = poll.response()
            return resolve({
              ...pollResponse,
              answers: pollResponse.answers.map(x => {
                return {
                  answer: x.answer,
                  id: x.id
                }
              }),
              info: {
                question: pollResponse.info.question,
                expires: pollResponse.info.expires,
                hasExpired: pollResponse.info.hasExpired,
              }
            })
          }

          return resolve(poll.response())
        }, FAKEDELAY);
        
      })
    }

    const ApiUrl = APIBASE + '/vote'

    return new Promise((resolve, reject) => {
      if(!pollId) {
        reject({
          message: 'pollId is required'
        })
      }


      fetch(ApiUrl, {
        pollId,
        withResults
      })
      .then(res => res.json())
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject({
          message: err.message,
          err: err
        })
      })
    })
  },

  submitAnswers(pollId, withResults = false, answerIds) {
    if(USEMOCKAPI) {
      return new Promise((resolve, reject) => {
        const poll = polls.find(x => x.id === pollId)

        setTimeout(() => {
          if(!pollId) {return reject({message: 'pollId is required to submit answers'})}

          if (!poll) {return reject({message: 'Can\'t submit. No poll found with matching id'})}

          if (poll.hasExpired()) {return reject({message: 'Poll has ended. Answer wasn\'t submitted'})}

          if (!Array.isArray(answerIds) || ( Array.isArray(answerIds) && answerIds.length === 0)) {return reject({message: 'Malformed request. Answers were not submitted.'})}
          
          // do the actual updating of results as a transaction
          let matchedAnswers = []
          answerIds.forEach(id => {
            const answer = poll.answers.find(x => x.id === id)
            if (answer) {
              matchedAnswers.push(answer)
            }
          })
          if(matchedAnswers.length === answerIds.length) { // found all answers
            matchedAnswers.forEach(answer => {
              answer.incrementVote()
            })
          } else {
            return reject({message: 'Not all answer ids could be found. Answers were not submitted'})
          }

          // all done, now return a succesfull response, with the updated results
          if (!withResults || !poll.showResults) {
            const pollResponse = poll.response()
            return resolve({
              ...pollResponse,
              answers: pollResponse.answers.map(x => {
                return {
                  answer: x.answer,
                  id: x.id
                }
              }),
              info: {
                question: pollResponse.info.question,
                expires: pollResponse.info.expires,
                hasExpired: pollResponse.info.hasExpired,
              }
            })
          }

          return resolve(poll.response())
        }, FAKEDELAY);
        
      })
    }
  }
}

export default APIService