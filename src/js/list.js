require(['./config'], () => {
  require(['template','url','indexHeader', 'indexProduct','footer'], (template,url) => {
    class cart{
      constructor(){
        this.getProductShowData().then(resp => {
          console.log(resp)
          if(resp.code === 200){
            $('#productShow').html(template('officeProductShow', {...resp}))
          }
        })
      }
      init(){

      }
      getProductShowData(){
        return new Promise(resolve => {
          $.get(`${url.rapBaseUrl}/shopList`, resp => {
            resolve(resp)
          })
        })
      }
    }
    return new cart();
  })
})