// returns object with browser name and version
export const browserSpecs = () => {
  const ua = navigator.userAgent;
  let tem;
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

  if(/trident/i.test(M[1])){
    tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
    return {name:'IE',version:(tem[1] || '')};
  }
  if(M[1]=== 'Chrome'){
    tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
    if(tem!= null) return {name:tem[1].replace('OPR', 'Opera'),version:tem[2]};
  }
  M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
  return {name:M[0],version:M[1]};
};

// returns OS name
export const OSSpecs = () => {
  let OSName = 'os';
  if (navigator.appVersion.indexOf("Win")!=-1) OSName="windows";
  else if (navigator.appVersion.indexOf("Mac")!=-1) OSName="macos";
  else if (navigator.appVersion.indexOf("X11")!=-1) OSName="unix";
  else if (navigator.appVersion.indexOf("Linux")!=-1) OSName="linux";
  return OSName;
}

// add CSS classes to <body> depending on browser, OS, and touch capability
export const setBrowserCompatibilityClasses = (cssPrefix = '') => {
  const body = document.body;
  const OSName = OSSpecs();
  const touchClass = browserIsTouch() ? 'touch' : 'no-touch';
  const browserVersion = browserSpecs().version;
  
  body.classList.add(cssPrefix+OSName);
  body.classList.add(cssPrefix+touchClass);

  if(browserVersion){ body.classList.add(cssPrefix+'browser-version-'+browserVersion); }

  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) { body.classList.add(cssPrefix+'browser-opera'); }
  else if(navigator.userAgent.indexOf("Chrome") != -1 ) { body.classList.add(cssPrefix+'browser-chrome'); }
  else if(navigator.userAgent.indexOf("Safari") != -1) { body.classList.add(cssPrefix+'browser-safari'); }
  else if(navigator.userAgent.indexOf("Firefox") != -1 ) { body.classList.add(cssPrefix+'browser-firefox'); }
  else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )){ body.classList.add(cssPrefix+'browser-explorer'); }
  else if(navigator.userAgent.indexOf("Edge") != -1 ) { body.classList.add(cssPrefix+'browser-edge'); }

}

// determine if browser supports touch
export const browserIsTouch = () => {
  return 'ontouchstart' in window;
}

// nicely format user agent
export const getUAObject = () => {
  const browser = browserSpecs();
  const OS = OSSpecs();
  const supportsTouch = browserIsTouch();

  return {
    UA : navigator.userAgent,
    browser,
    OS,
    supportsTouch
  }
}