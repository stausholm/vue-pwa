const mediaQueryList = window.matchMedia("(orientation: portrait)");
let storedScope;

function handleOrientationChange(scope) {
  if (!storedScope) {
    storedScope = scope;
  }
  if (mediaQueryList.matches) {
    // viewport is portrait orientation
    //console.log('viewport is in portrait');
    storedScope.$store.dispatch('changeOrientation', 'portrait');
  } else {
    // viewport is landscape orientation
    //console.log('viewport is in landscape');
    storedScope.$store.dispatch('changeOrientation', 'landscape');
  }
};

mediaQueryList.addListener(handleOrientationChange);

export default handleOrientationChange;

// https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries