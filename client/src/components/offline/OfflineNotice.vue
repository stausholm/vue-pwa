<template>
  <div>
    <div v-if="showNotice && !isOnline">You offline</div>
    <div v-else-if="showNotice && isOnline">You online again</div>
  </div>
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
      timeout: null
    }
  },
  methods: {
    checkStatus() {
      console.log('checking status')
      if (!navigator.onLine) {
        // we are DEFINITELY offline
        return new Promise((resolve, reject) => resolve(this.isOnline = false));
      }

      // are we really online or in Lie-Fi?
      return window.fetch('/static/img/icons/favicon-16x16.png')
        .then((response) => {
          // we're online, even if it returns 400 or 500
          this.isOnline = true;
        })
        .catch((err) => {
          // actual network error, we're offline
          console.log('catch')
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
        this.timeout = window.setTimeout(this.retry, 5*1000);
      });

    }
  },
  created() {
    window.addEventListener('load', () => {
      //this.checkStatus();

      this.retry();

      // something changed, we went online
      window.addEventListener('online', () => {
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
    isOnline() {
      this.showNotice = true;
      setTimeout(() => {
        this.showNotice = false;
      }, 1000)
    }
  }
}
</script>
