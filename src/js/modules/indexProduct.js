define(['jquery'], () => {
  class indexProduct{
    constructor(){
      this.init().then(() => {

      })
    }
    init(){
      return new Promise(resolve => {
        // $('.productShow').load('/html/modules/indexProduct.html', resolve);
      })
    }
  }
  return new indexProduct();
})