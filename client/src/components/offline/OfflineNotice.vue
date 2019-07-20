<template>
  <transition name="offline-notice">
    <div class="offline-notice" :class="{'success': isOnline}" v-if="showNotice">
      <div v-if="!isOnline">
        No internet connection
        <div class="button-group">
          <button class="btn btn--small btn--transparent" @click="showNotice = false">
            dismiss
          </button>
          <button class="btn btn--small btn--outline-white" :class="{'btn--disabled': loading}" @click="retry">
            <span v-if="loading">Retrying...</span>
            <span v-else>Retry</span>
          </button>
        </div>
      </div>
      <div v-else>Reconnected 🎉</div>
    </div>
  </transition>
</template>

<script>
// THIS DOES NOT TAKE INTO ACCOUNT IF YOU GO FROM ONLINE TO LIE-FI
// would need a user to request new content, and if that fails, then start running an exponential retry on that request,
// and update isOnline to false in here.
// when that request succedes, we know that we're back online, so update isOnline in here
export default {
  name: 'OfflineNotice',
  data() {
    return {
      isOnline: true,
      attemptsDelay: 1,
      showNotice: false,
      timeout: null,
      loading: false
    }
  },
  methods: {
    checkStatus() {
      console.log('checking status')
      if (!navigator.onLine) {
        // we are DEFINITELY offline
        return new Promise((resolve, reject) => resolve(this.isOnline = false));
      }

      this.loading = true;

      // are we really online or in Lie-Fi?
      return window.fetch('/static/img/icons/favicon-16x16.png?hash=' + new Date().getTime()) // TODO: does this cache buster work?
        .then((response) => {
          // we're online, even if it returns 400 or 500
          this.isOnline = true;
          this.loading = false;
        })
        .catch((err) => {
          // actual network error, we're offline
          console.log('catch')
          this.loading = false;
          return this.isOnline = false;
        });
    },
    retry() {
      this.checkStatus().then(()=> {
        console.log(`we are online: ${this.isOnline}`)

        if (this.isOnline) {
          return;
        }

        this.attemptsDelay *= 2; // offline, double each time
        this.timeout = window.setTimeout(this.retry, this.attemptsDelay*1000); 
      });

    }
  },
  created() {
    window.addEventListener('load', () => {
      //this.checkStatus();

      this.retry();

      // something changed, we went online
      window.addEventListener('online', () => {
        this.attemptsDelay = 1;
        clearTimeout(this.timeout); // clear currently running timeout, set by being offline
        this.retry();
      })

      window.addEventListener('offline', () => {
        //this.isOnline = false;
        this.retry();
      })
    })
  },
  watch: {
    isOnline(newVal, oldVal) {
      this.showNotice = true;

      if (newVal === true) {
        setTimeout(() => {
          this.showNotice = false;
        }, 1000)
      }
    }
  }
}
</script>
