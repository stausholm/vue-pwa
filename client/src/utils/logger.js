import SiteSettings from '@/constants/SiteSettings';

// this service checks if the config has console statements enabled or not. 
// This is to prevent rogue console logs in prod
class LoggerService {
  oldConsoleLog = null;

  constructor() {
    this.init()
  }

  enableLogger() {
    if (this.oldConsoleLog === null) return;
    
    window['console']['log'] = this.oldConsoleLog;
  }
  
  disableLogger() {
    this.oldConsoleLog = console.log;
    window['console']['log'] = function() {};
  }

  init() {
    if (SiteSettings['CONSOLE_ENABLED']) {
      this.enableLogger()
      console.warn('%c [WARNING] console logs are enabled', 'color:Orange;font-weight:bold;font-size:1.1em')
    } else {
      this.disableLogger()
    }
  }
}

export default new LoggerService();