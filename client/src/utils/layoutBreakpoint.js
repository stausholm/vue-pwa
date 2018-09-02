const mediaQueryList = window.matchMedia("(max-width: 1024px)");
let storedScope;

function handleLayoutBreakpoint(scope) {
  if (!storedScope) {
    storedScope = scope;
  }
  if (mediaQueryList.matches) {
    // viewport is 1024 wide or less
    storedScope.$store.dispatch('changeDeviceLayout', true);
  } else {
    storedScope.$store.dispatch('changeDeviceLayout', false);
  }
};

mediaQueryList.addListener(handleLayoutBreakpoint);

export default handleLayoutBreakpoint;

// https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries