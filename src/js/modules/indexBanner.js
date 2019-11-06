define(['jquery'], () => {
  class indexBanner{
    constructor(){
      this.init().then(() => {
      })
    }
    init(){
      return new Promise(resolve => {
        // $('.banner').load('/html/modules/indexBanner.html', resolve);
      })
    }

  }
  return new indexBanner();
});