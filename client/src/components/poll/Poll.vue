<template>
  <div class="poll-holder" 
    :class="{'poll--center': centerText, 'poll--multicolumn': multiColumn, 'poll--boxed': boxed, 'poll--initializing': loadingInitial}" 
    aria-label="Poll">
    <div class="poll">
      <div class="poll-main">
        <p class="brand">
          <slot name="brand"></slot>
        </p>
        <div class="question-content">
          <slot></slot>
        </div>
        <p class="question" role="heading">{{info.question || '...'}}</p>
      </div>
      <div class="poll-answers" role="list" :aria-hidden="loadingInitial">
        <a 
          v-for="answer in answers"
          :key="answer.id"
          href="#"
          role="listitem" 
          :tabindex="loadingInitial ? '-1' : '0'"
          class="answer"
          :class="{'complete': voted, 'selected': answer.selected}" 
          :aria-label="`Poll answer: ${answer.answer} ${getPercentageForLabel(answer)}`" 
          :data-answer="answer.answer"
          :data-percent="answer.percentIncremental"
          @click.prevent="handleAnswerClick(answer)"
        >
          <span class="bar" v-if="!voted"></span>
          <span class="bar" v-else aria-live="polite" :aria-label="`Poll answer: ${answer.answer} ${getPercentageForLabel(answer)}`" :style="{width: getPercentage(answer) + '%'}"></span>
          <span class="answer-text">{{answer.answer}}<span v-if="voted && showVoteCountPerChoice">&nbsp;({{answer.votes}})</span></span>
        </a>
      </div>
      <a href="#" v-if="isMultipleChoice" class="poll-submit-btn" :aria-hidden="loadingInitial" :tabindex="loadingInitial ? '-1' : '0'">Vote</a>
      <div class="poll-error" v-if="failedToLoad" aria-live="polite">
        <span v-if="failedMessage">{{failedMessage}}</span>
        <span v-else>An error occured :(</span>
      </div>
      <div class="poll-subtext" :aria-hidden="loadingInitial">
        <div class="poll-stats">
          <div class="poll-stats-inner">
            <span class="poll-total" v-if="showTotalVotes" :title="votesTotalLocalized">{{votesTotalFormatted}}</span>
            <span class="poll-remaining" v-if="showTimeLeft" :title="expireDateTimeFormatted">{{timeLeftFormatted}}</span>
            <button class="poll-show-results-btn" v-if="showShowResultsButton" @click="getPollData(true)" :tabindex="loadingInitial ? '-1' : '0'">Jump to results</button>
          </div>
        </div>
        <div class="poll-subtext-content">
          <slot name="subtext"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import convertNumberToSI from '@/utils/convertNumberToSI'
import getTimeRemaining from '@/utils/getTimeRemaining'
import { shuffleArray } from '@/utils/utils'
import APIService from './poll-api'
/**
 * Highlight the answer you selected ✔ (done with .selected)
 * have button at the bottom of poll, to show answers. a good text could be "jump to results/see results/results" When clicked the results text should switch into "vote"
 * Have somewhere to show total amount of poll entries ✔
 * Store users choice in session storage. If user already has submitted, show results immediately.
 * Allow multiple answers, and show a submit button if multiple can be selected. Make sure the button is disabled if nothing has been selected. Remember to use correct aria attributes. Support limiting the amount of options that can be selected
 * Detect if poll is expired, and then only show the results. Support a "expired message" prop
 * Highlight the users selection(s)
 * Allow to undo vote with prop
 * Make the scss pretty and reusable
 * Auto refresh results? make periodic calls to api to retrieve updated results. no sockets
 * TODO: easy translations
 * TODO: don't allow clicks and submits if poll has expired onload or expired while looking at the page. remember to send error message back
 */
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
    formatTotalVotes: { // if true, should turn "1800" into "1.8k" insted of "1.800"
      type: Boolean,
      default: true
    },
    showTimeLeft: { // shows the amount of time left until submissions end
      type: Boolean,
      default: true
    },
    showResultsOnSubmit: { // when submitted, show the total results of all answers.
      type: Boolean,
      default: true // TODO: if this is false, when submitting, the entire bar you clicked should be styled width: 100% to get full orange bg. (a css class so it can be styled differently if so desired)
    },
    showVoteCountPerChoice: { // shows the amount of votes each answer has gotten
      type: Boolean, // TODO: make good design
      default: false
    },
    showVotePercentagePerChoice: { // shows a percentage on each answer
      type: Boolean, // TODO: implement
      default: true
    },
    votePercentageAnimationDurationMS: { // Determines how fast the increment/decrement animation of the percentage number should be
      type: Number,
      default: 1300
    },
    autoRefreshResults: { // periodically call getPollData endpoint. If a number is supplied, it will call endpoint every <number> seconds. Default is every 10th second 
      type: [Boolean, Number], // TODO: implement. Remember to only call after user has voted, or if showShowResultsButton is toggled
      default: false
    },
    isMultipleChoice: { // allow to vote for multiple answers. If multiple are allowed, a fullwidth button below the answers will be shown 
      type: [Boolean, Number], // if it's a number, you should be limited to pick maximum that many answers 
      default: false // TODO: implement
      // TODO: what about a minimum you should select?
      // TODO: what if number === 1? We should also have a validation message "you need to pick X amount"
      // TODO: what about info like "Total votes: 6 (by 3 voters)"
    },
    randomizeAnswerOrder: { // if true, the answers will be shown in a random order, each time the component is initially rendered
      type: Boolean,
      default: true
    },
    pollId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      answers: [{},{}], // we add these empty objects here to use for skeleton loading, when loadingInitial is true
      info: {
        question: '',
        expires: '',
        hasExpired: false,
        votesTotal: 0
      },
      RAFId: null,
      voted: false,
      loading: false, // TODO: there's the initial load, but also another load from when the submit is sent, that needs to be handled
      failedToLoad: false, // TODO: the initial load can fail, then we should show a big error message. If the initial load of the questions succeded, but the following submit of the users answer failed, we should show a smaller error
      failedMessage: '',
      loadingInitial: true // when then initial load on Created() is finished, this will be set to false
    }
  },
  computed: {
    votesTotalLocalized() {
      const votesRaw = this.info.votesTotal

      if (votesRaw === undefined || votesRaw === null) {
        return 'Results hidden'
      }

      return `Total votes: ${votesRaw.toLocaleString()}`
    },
    votesTotalFormatted() {
      const labelSingular = 'vote'
      const labelPlural = 'votes'

      const votesRaw = this.info.votesTotal

      if (votesRaw === 1) {
        return `1 ${labelSingular}`
      }
      if (votesRaw === 0) {
        return `0 ${labelPlural}`
      }

      if (!votesRaw) {
        return 'Results hidden'
      }

      if(this.formatTotalVotes) {
        // e.g. 1.1m or 1.8k
        // Alt way, but doesn't support decimals and isn't supported in safari: votesRaw.toLocaleString(undefined, {notation: "compact",compactDisplay: "short"})
        return `${convertNumberToSI(votesRaw, 1)} ${labelPlural}`
      } else {
        // e.g. 1.124.532 or 1.852
        return `${votesRaw.toLocaleString()} ${labelPlural}`
      }
    },
    timeLeftFormatted() {
      const dayLabel = "day"
      const hourLabel = "hour"
      const minuteLabel = "minute"
      const pluralSuffix = 's'

      const time = getTimeRemaining(this.info.expires)

      if (!this.info.expires) {
        return 'No expiry date'
      }

      if (this.info.hasExpired || time.total <= 0 ) { // TODO: move this to a watcher and call GetRemainingTime every second?
        return 'Poll ended'
      }

      let label = ''
      if(time.days > 0) {
        label = `${time.days} ${dayLabel}${time.days !== 1 ? pluralSuffix : ''}`
      } else if (time.hours > 0) {
        label = `${time.hours} ${hourLabel}${time.hours !== 1 ? pluralSuffix : ''}`
      } else {
        label = `${time.minutes} ${minuteLabel}${time.minutes !== 1 ? pluralSuffix : ''}`
      }

      return label + ' left'
    },
    expireDateTimeFormatted() {
      if(this.info.expires) {
        return 'Voting ends ' + new Date(this.info.expires).toLocaleString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZoneName: 'short'
        }) // output example: "Voting ends March 30, 2021, 11:58 AM GMT+2"
      } else {
        return 'No expiry date'
      }
    }
  },
  methods: {
    getPollData(withResults, isInitialRequest = false) { // if withResults is true, each answer will also include the number of votes they got
      if (this.loading) {
        // prevent fetch if it's already fetching content
        return 
      }
      console.log('getPolldata', withResults)
      this.loading = true
      this.failedToLoad = false
      this.failedMessage = ''

      return APIService.getPollData(this.pollId, withResults)
      .then(response => {
        this.loading = false
        this.failedToLoad = false

        if (this.randomizeAnswerOrder && isInitialRequest) {
          shuffleArray(response.answers) // TODO: why does this work? Shouldn't it go back to old sorting when getPollData is called again?
        }

        this.mapResponseToComponentData(response)
      })
      .catch(err => {
        this.loading = false
        this.failedToLoad = true
        this.failedMessage = err.message
        if (this.loadingInitial) {
          this.answers = [] // remove skeleton loaders
        }
        console.log(err)
      })

    },
    mapResponseToComponentData(response) { // this implementation depends on both getPollData, and submit returns the same kind of data
      const storedIncrementalPercent = this.answers.map(answer => { // we store these here, so when we animate them, they don't reset back to 0, when we have to reanimate them after calling the api again
        return {
          id: answer.id,
          percentIncremental: answer.percentIncremental || 0
        }
      })

      this.info = response.info
      this.answers = response.answers.map(answer => {
        const oldPercentIncrement = storedIncrementalPercent.find(x => x.id === answer.id)
        return {
          ...answer,
          percent: this.getPercentage(answer),
          percentIncremental: oldPercentIncrement ? oldPercentIncrement.percentIncremental : 0
        }
      })
    },
    handleAnswerClick(answer) {
      this.$set(answer, 'selected', !answer.selected) // make it reactive with $set
      
      if (this.isMultipleChoice) {
        // TODO
      } else {
        if (!answer.selected) {
          // clicked the same answer, to deselect it
          // TODO: handle unvoting (like they do it on youtube android app)
          console.log('should unsubmit')
        } else {
          this.submit([answer.id], this.showResultsOnSubmit)
        }
      }
    },
    submit(answerIdsArray, withResults) {
      if (this.loading) {
        // prevent clicking when it's submitting
        return 
      }
      console.log('submit')
      this.loading = true
      this.failedToLoad = false
      this.failedMessage = ''

      return APIService.submitAnswers(this.pollId, withResults, answerIdsArray)
      .then(response => {
        console.log(response)
        this.loading = false
        this.failedToLoad = false

        this.mapResponseToComponentData(response)

        answerIdsArray.forEach(id => { // find the selected answer(s) and mark them
          const answer = this.answers.find(x => x.id === id)
          if (answer) {
            this.$set(answer, 'selected', true) // make it reactive with $set
          }
        })

        this.updatePercentageIncremental()

        this.storeAnswerIdsLocally(answerIdsArray)

        // TODO: we can use this event in a parent component, to replace this component with some "thank you for submitting". Useful with this.showResultsOnSubmit:false for things like e.g. collecting feedback. It could even also be replaced with another component with a form, asking the user to explain their choice, depending on what they chose  
        this.$emit('submit', answerIdsArray) 
      })
      .catch(err => {
        this.loading = false
        this.failedToLoad = true
        this.failedMessage = err.message
        console.log(err)
      })

      
      /**
       * On success:
       * 
       * On all the .bar set:
       * # aria-live="polite"
       * aria-label="Poll answer: <answer> <percent>%"
       * # style="width: <percent>%"
       * 
       * # on all the .answer set:
       * # class="answer complete"
       * aria-label="Poll answer: <answer> <percent>%"
       * # data-percent="<percent>" (update this incrementally over the course of 1.3s/ the same duration as css width transition)
       * 
       * # on the specific .answer you clicked, set .selected
       * 
       * # call this.storeAnswerIdsLocally()
       */
    },
    updatePercentageIncremental() {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        this.answers.forEach(answer => {answer.percentIncremental = answer.percent})
        return
      }

      function animateValue(RAFId, obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          obj.percentIncremental = Math.floor(progress * (end - start) + start);
          if (progress < 1) {
            RAFId = window.requestAnimationFrame(step);
          }
        };
        RAFId = window.requestAnimationFrame(step);
      }

      this.answers.forEach(answer => animateValue(this.RAFId, answer, answer.percentIncremental, answer.percent, this.votePercentageAnimationDurationMS))
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
      // TODO: handle if poll is expired

      return `${percentage}%`
    },
    storeAnswerIdsLocally(idsArray) { //idsArray = list of the answers ids the user selected
      localStorage.setItem(`poll-${this.pollId}`, JSON.stringify(idsArray))
    },
    retrieveAnswerIdsLocally() {
      let answersLocally = null
      try {
        answersLocally = JSON.parse(localStorage.getItem(`poll-${this.pollId}`))
        if(
          !Array.isArray(answersLocally) || 
          (Array.isArray(answersLocally) && answersLocally.length === 0) || 
          !answersLocally.every(x => {return typeof x === 'number'})
        ) {
          throw({
            message: `Stored poll answer ids for ${this.pollId} are not valid ids.`,
            answersLocally
          })
        }
      } catch(e) {
        console.error(e)
        answersLocally = null
      }

      return answersLocally
    }
  },
  created() {
    const answerIdsStoredLocally = this.retrieveAnswerIdsLocally()
    const hasAnswered = Array.isArray(answerIdsStoredLocally) // if the user has already answered, we want to retrieve the poll answers with results
    this.getPollData((hasAnswered && this.showResultsOnSubmit), true).then(() => {
      this.loadingInitial = false

      if(hasAnswered) {
        this.voted = true // TODO: this should NOT set aria-live="polite" on the .bar, in this case where it's set on created
        

        this.updatePercentageIncremental()

        // update this.answers to indicate the user's answer after this.getPollData, if hasAnswered
        answerIdsStoredLocally.forEach(id => {
          const answer = this.answers.find(x => x.id === id)
          if(answer) {
            this.$set(answer, 'selected', true)
          }
        })
      }
    })
  },
  beforeDestroy() {
    window.cancelAnimationFrame(this.RAFId)
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
    margin: 0.3125em 0;
    position: relative;
    text-align: center;
    transition: all 0.3s ease-in-out;
    user-select: none;

    &.selected {
      border-color: #000;
      border-style: solid;
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
        z-index: 2;
      }
      
      .bar {
        transition: width 1.3s ease,background-color 1.3s ease;
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

      @media (hover: hover) and (pointer: fine) { // prevent sticky hover on touchscreens
        .bar {
          width: 100%;
        }
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
      z-index: 3;
      transition: all .3s ease-in-out;
      justify-content: left;
      padding: .3125em 2.813em .3125em .9375em;
    }
  }
}

.poll-stats {
  &-inner {
    display: inline-block;
  }

  .poll-total + .poll-remaining, .poll-remaining + .poll-show-results-btn {
    &::before {
      content: '·';
      padding-left: 4px;
      padding-right: 4px;
      font-weight: bold;
    }
  }
}

.poll-show-results-btn {
  border: 0;
  background-color: transparent;
  cursor: pointer;
  font-weight: bold;
  color: inherit;
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
      margin: 0.3125em 0.25em;
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
  background: #e4e4e4; // TODO: remove this color. This should come from utility classes like .bg-primary
  
  .poll-answers {
    margin: .85em 0;
  }
}


.poll-submit-btn {
  border: 0.125em solid #cdcdcd;
  //border: 0.0625em dotted #000;
  min-height: 3.125em;
  width: 100%;
  flex-grow: 1;
  margin: 0.85em 0;
  position: relative;
  text-align: center;
  transition: all 0.3s ease-in-out;
  user-select: none;
  background-color: #212121;

  font-size: .938em;
  line-height: 1.125em;
  color: #fff;
  height: 100%;
  min-height: 3.125em;
  transition: all .3s ease-in-out;
  padding: .3125em .9375em;

  display: flex;
  align-items: center;
  justify-content: center;
}


.poll-error {
  padding: 10px;
  margin: 0.85em 0.25em;
  color: #fff;
  background-color: hsl(0, 70%, 50%);
}


// loading skeleton screen
.poll--initializing {
  * {
    pointer-events: none !important; // this doesn't prevent clicking with keyboard, but we handle that with tabindex="-1"
  }

  .question {
    width: 70%;
  }

  .answer .answer-text {
    color: transparent;
  }

  .question, .answer, .poll-submit-btn, .poll-stats-inner, .poll-subtext-content > * {
    position: relative;
    background-color: #d4d4d4;
    border-color: transparent;
    overflow: hidden;
    color: transparent;
    animation: fade-in-out 1s ease-in-out infinite alternate;
    
    @media (prefers-reduced-motion) {
      animation: none;
    }

    @keyframes fade-in-out {
      0% {
        opacity: 0.5;
      }
      70% {
        opacity: 1;
      }
    }
  }
}
</style>