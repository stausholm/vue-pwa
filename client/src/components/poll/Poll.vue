<template>
  <div class="poll-holder" 
    :class="{'poll--center': centerText, 'poll--multicolumn': multiColumn, 'poll--boxed': boxed}" 
    aria-label="Poll">
    <div class="poll">
      <div class="poll-main">
        <p class="brand">Brand example 1 TODO</p>
        <div class="question-content">
          <slot></slot>
        </div>
        <p class="question" role="heading">{{info.question}}</p>
      </div>
      <div class="poll-answers" role="list">
        <a 
          v-for="answer in answers"
          :key="answer.id"
          href="#"
          role="listitem" 
          tabindex="0" 
          class="answer"
          :class="{'complete': voted, 'selected': answer.selected}" 
          :aria-label="`Poll answer: ${answer.answer} ${getPercentageForLabel(answer)}`" 
          :data-answer="answer.answer"
          :data-percent="getPercentage(answer)"
          @click.prevent="submit(answer)"
        >
          <span class="bar" v-if="!voted"></span>
          <span class="bar" v-else aria-live="polite" :aria-label="`Poll answer: ${answer.answer} ${getPercentageForLabel(answer)}`" :style="{width: getPercentage(answer) + '%'}"></span>
          <span class="answer-text">{{answer.answer}}</span>
        </a>
      </div>
      <div class="poll-subtext">
        <div class="poll-stats">
          <span class="poll-total" v-if="showTotalVotes" :title="`Votes: ${info.votesTotal}`">{{votesTotalFormatted}}</span>
          <span class="poll-remaining" v-if="showTimeLeft" :title="`Ends: ${expireDateTimeFormatted}`">{{timeLeftFormatted}}</span>
        </div>
        <button v-if="showShowResultsButton" @click="getPollData(pollId, true)">Just show me the results</button>
        <span>some smalltext disclaimer</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Poll',
  props: {
    centerText: { // adds poll--center css class. centers all text in the main-, question-, and subtext area
      type: Boolean,
      default: false
    },
    multiColumn: { // adds poll--multicolumn css class. makes the poll questions split into 2 columns and centers their text
      type: Boolean,
      default: false
    },
    boxed: { // adds poll--boxed css class. places the poll inside a padded box
      type: Boolean,
      default: false
    },
    showShowResultsButton: { // shows a button at the bottom of the poll, in case the user just wants to see what others answered
      type: Boolean,
      default: true
    },
    showTotalVotes: { // shows the sum of all votes on this poll
      type: Boolean,
      default: true
    },
    showTimeLeft: { // shows the amount of time left until submissions end
      type: Boolean,
      default: true
    },
    showResultsOnSubmit: { // when submitted, show the total results of all answers.
      type: Boolean,
      default: true // TODO: if this is false, when submitting, the entire bar you clicked should be styled width: 100% to get full orange bg.
    },
    pollId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      answers: [],
      info: {
        question: '',
        expires: '',
        hasExpired: false,
        votesTotal: 0
      },
      voted: false,
      loading: true, // TODO: there's the initial load, but also another load from when the submit is sent, that needs to be handled
      failedToLoad: false // TODO: the initial load can fail, then we should show a big error message. If the initial load of the questions succeded, but the following submit of the users answer failed, we should show a smaller error
    }
  },
  computed: {
    votesTotalFormatted() {
      const labelSingular = 'vote'
      const labelPlural = 'votes'

      if (this.info.votesTotal === 1) {
        return `1 ${labelSingular}`
      }

      return this.info.votesTotal ? `${this.info.votesTotal} ${labelPlural}` : `0 ${labelPlural}`
    },
    timeLeftFormatted() {
      // TODO
      if (!this.info.expires) {
        
      }
      return `22 hours left`
    },
    expireDateTimeFormatted() {
      // TODO
      return `January 18th, 13:30 UTC +1`
    }
  },
  methods: {
    getPollData(pollId, withResults) { // if withResults is true, each answer will also include the number of votes they got
      this.loading = true
      this.failedToLoad = false

      // fake async fetch to apiendpoint that will retrieve the data for the poll 
      return new Promise((resolve, reject) => { 
        setTimeout(() => {
          // TODO: test failedToLoad

          this.loading = false

          const response = {
            answers: [
              {
                answer: 'Good and nice',
                id: 0,
                votes: 1852
              },
              {
                answer: 'Nasty i hate em. Why would you do this to me.',
                id: 1,
                votes: 7782
              },
              {
                answer: 'idunno this is an an answer',
                id: 2,
                votes: 1852
              },
            ],
            info: {
              question: 'How are the fries?',
              expires: '2021-02-21T14:58:19.036Z',
              hasExpired: false, // TODO: do we need this, or should we just calculate it with js based in the expires property?
              votesTotal: 11486
            }
          }

          this.answers = response.answers
          this.info = response.info

          resolve(response)
          // reject('ohno')
        }, 1000)
      })
    },
    submit(answer) {
      console.log(answer)

      // TODO: is it important that we don't send the total votes for each answer, when a user hasn't voted? If it's not important, we can get the data upfront, and then we don't have to wait for this api call to finish, to show results. But maybe we should wait anyways, just so that we're sure the user's answer has been submitted?

      // TODO
      setTimeout(() => {
        this.voted = true

        this.$set(answer, 'selected', true) // make it reactive with $set

        this.$emit('submit', answer) // TODO: we can use this event in a parent component, to replace this component with some "thank you for submitting". Useful with this.showResultsOnSubmit:false for things like e.g. collecting feedback. It could even also be replaced with another component with a form, asking the user to explain their choice, depending on what they chose  
      }, 500);
      
      /**
       * On success:
       * 
       * On all the .bar set:
       * aria-live="polite"
       * aria-label="Poll answer: <answer> <percent>%"
       * style="width: <percent>%"
       * 
       * on all the .answer set:
       * class="answer complete"
       * aria-label="Poll answer: <answer> <percent>%"
       * data-percent="<percent>" (update this incrementally over the course of 1.3s/ the same duration as css width transition)
       * 
       * on the specific .answer you clicked, set .selected
       * 
       * call this.storeAnswerIdLocally()
       */
    },
    getPercentage(answer) {
      if (!answer || !answer.votes || !this.info.votesTotal) {
        return 0
      }

      return Math.floor(answer.votes / this.info.votesTotal * 100)
    },
    getPercentageForLabel(answer) {
      const percentage = this.getPercentage(answer)

      if (!percentage) {
        return ''
      }

      // TODO: a good way of determining if the user has voted or not

      return `${percentage}%`
    },
    storeAnswerIdLocally() {
      const id = 1 // TODO: id of the answer the user selected
      localStorage.setItem(`poll-${this.pollId}`, id)
    },
    retrieveAnswerIdLocally() {
      return parseInt(localStorage.getItem(`poll-${this.pollId}`))
    }
  },
  created() {
    const answerIdStoredLocally = this.retrieveAnswerIdLocally()
    const hasAnswered = typeof answerStoredLocally === 'number' && !isNaN(answerIdStoredLocally) // if the user has already answered, we want to retrieve the poll answers with results
    this.getPollData(this.pollId, hasAnswered).then((a) => {
      // TODO: update this.answers to indicate the user's answer after this.getPollData, if hasAnswered 
      if(hasAnswered) {
        this.voted = true

        this.answers.find(x => x.id === answerIdStoredLocally).selected = true 
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.poll-holder {
  margin: 0 auto;
  padding: 0;
  font-size: 1rem; // adjust this to adjust all font sizes on the component
}

.poll-main {
  font-size: 1.375em;
  line-height: 1.2;

  .brand {
    margin: 0.5em 0;
    display: inline-block;
    border-bottom: .0625em solid;
    padding-bottom: 0.1875em;
  }
  .question-content {
    img {
      max-width: 100%;
      margin: 0 auto;
    } 
  }
  .question {
    margin: .375em 0 .25em;
    padding: 0;
  }
}

.poll-answers {
  display: flex;
  flex-wrap: wrap;

  .answer {
    border: 0.125em solid #cdcdcd;
    //border: 0.0625em dotted #000;
    min-height: 3.125em;
    width: 100%;
    flex-grow: 1;
    margin: 0.3125em 0.25em;
    position: relative;
    text-align: center;
    transition: all 0.3s ease-in-out;
    user-select: none;

    &.selected {
      border-color: #000;
    }
    
    &.complete {
      &::before {
        font-size: 0.75em;
        line-height: 1;
        background-color: #000;
        color: #fff;
        content: attr(data-percent) "%";
        font-weight: 700;
        position: absolute;
        right: 0.438em;
        left: auto;
        padding: 0.125em 0.188em;
        top: calc((100% - 1em) / 2);
        border-radius: 0.188em;
        z-index: 999;
      }
      
      .bar {
        transition: width 1.3s ease,background-color 1.3s ease;
        z-index: 1;
      }
      
      .answer-text {
        padding: .3125em 2.813em .3125em .9375em;
      }
    }
    
    
    .bar {
      background-color: rgba(246,153,55,.8);
      transition: width .3s ease, background-color .3s ease;
      width: 0;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
    }
    
    &:not(.complete):hover {
      cursor: pointer;

      .bar {
        width: 100%;
      }
    }
    
    .answer-text {
      font-size: .938em;
      line-height: 1.125em;
      color: #000;
      display: flex;
      word-break: break-word;
      box-sizing: border-box;
      height: 100%;
      min-height: 3.125em;
      align-items: center;
      position: relative;
      z-index: 5999996;
      transition: all .3s ease-in-out;
      justify-content: left;
      padding: .3125em 2.813em .3125em .9375em;
    }
  }
}

.poll-stats {
  .poll-total + .poll-remaining {
    &::before {
      content: '·';
      padding-left: 4px;
      padding-right: 4px;
    }
  }
}

.poll-subtext {
  font-size: .85em;
  margin-top: .35em;
}


.poll--center {
  .poll-main {
    text-align: center;
  }
  
  .poll-answers {
    .answer {
      &.complete {
        &::before {
          left: 0.438em;
          right: auto;
        }
        
        .answer-text {
          padding: .3125em .9375em .3125em 2.813em;
        }
      }
      
      .answer-text {
        justify-content: center;
        padding: .3125em;
      }
    }
  }
  
  .poll-subtext {
    text-align: center;
  }
}

.poll--multicolumn {
  .poll-answers {
    .answer {
      width: calc(50% - 0.5em); // 0.5em is 2 * horizontal margin on .answer
      flex-grow: 0;
      
      &:nth-child(odd) .bar {
        right: 0;
        left: auto;
      }

      &:nth-child(even) .bar {
        left: 0;
      }

      &.complete {
        &::before {
          left: auto;
          right: 0.438em;
        }
        
        .answer-text {
          padding-left: 0.9375em;
          padding-right: 2.813em;
        }

        &:nth-child(even) {
          &::before {
            left: 0.438em;
            right: auto;
          }
          
          .bar {
            transition-delay: .2s;
          }
          
          .answer-text {
            padding-right: 0.9375em;
            padding-left: 2.813em;
          }
        }
      }

      // make these the same as poll--center
      .answer-text {
        justify-content: center;
        padding: .3125em;
      }
    }
  }
}


.poll--boxed {
  padding: 20px;
  background: #e4e4e4;
  
  .poll-answers {
    margin: .85em 0;
  }
}

</style>