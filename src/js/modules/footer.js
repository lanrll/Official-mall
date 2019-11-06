define(['template','url','jquery'], (template,url) => {
  class footer{
    constructor(){
      this.init().then(() => {
        this.getData().then(resp => {
          $('footer').html(template('footer', {...resp}))
        })
      })
    }
    init(){
      return new Promise(resolve => {
        $('footer').load('/html/modules/footer.html', resolve);
      })
    }
    getData(){
      return new Promise(resolve => {
        $.get(`${url.rapBaseUrl}/footer`, resp => {
          resolve(resp);
        })
      })
    }
  }
  return new footer();
})