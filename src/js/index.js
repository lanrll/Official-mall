require(['./config'], () => {
  require(['template','url', 'swiper','indexHeader','indexBanner','indexProduct','footer'], (template,url,swiper) => {
    class Index{
      constructor(){
        // this.banner();
        this.getProductShowData();
        this.banner();
      }

      getProductShowData(){
        new Promise(resolve => {
          $.get(`${url.rapBaseUrl}/shopList`, resp => {
            resolve(resp)
          }).then(resp => {
            if(resp.code === 200){
              // let str = template('officeProductShowOne', {...resp});
              $('.productShow').html(template('officeProductShow', {...resp}));
              $('.swiper-wrapper').html(template('banner', {...resp}));
              this.banner();
            }
          })
        })
      }

      banner () {
        var mySwiper = new Swiper('.swiper-container', {
          autoplay: 2000,//可选选项，自动滑动
          speed:1000,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          loop: true,
          effect : 'slide'
        })
      }

    }
    return new Index(); 
  })
})