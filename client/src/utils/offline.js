let isOnline;

function fetchData() {
  if (!navigator.onLine) {
    // we are DEFINITELY offline
    status.textContent = 'Currently offline'
    return cachedData;
  }

  // are we really online or in Lie-Fi?
  window.fetch('https://www.google.com', {'mode': 'no-cors'}) // or just fetch "favicon.ico"
    .then((response) => {
      if (!response.ok) {
        // online, and got 400 or 500
        throw new Error(`previous data ${response.status}`)
      }
      isOnline = true;
    })
    .catch((err) => {
      // actual network error, we're offline
      console.log('bean',err);
      return cachedData;
    });
}

let attemptsDelay = 1;
function retry() {
  fetchData();

  if (isOnline) { return; }

  attempts *= 2; // offline, double each time
  window.setTimeout(retry, attemptsDelay*1000*60);
}

// something changed, we went online
window.addEventListener('online', () => {
  fetchData(); // do fetch again to see if we're in Lie-Fi
})

