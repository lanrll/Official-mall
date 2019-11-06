require.config({
  baseUrl: '/',
  paths: {
    jquery: 'libs/jquery/jquery-3.4.1.min',
    bootstrap: 'libs/bootstrap/js/bootstrap.min',
    template: 'libs/art-template/template-web',
    indexHeader: 'js/modules/indexHeader',
    indexBanner: 'js/modules/indexBanner',
    indexProduct: 'js/modules/indexProduct',
    footer: 'js/modules/footer',
    url: 'js/modules/url',
    zoom: 'libs/jquery-plugins/jquery.elevateZoom',
    swiper: 'libs/swiper/js/swiper.min',
    fly: 'libs/jquery-plugins/jquery.fly.min',
    cookie: 'libs/jquery-plugins/jquery.cookie'
  },
  shim: {
    bootstrap:{
      deps: ['jquery']
    },
    zoom: {
      deps: ['jquery']
    },
    fly: {
      deps: ['jquery']
    },
    cookie: {
      deps: ['jquery']
    }
  }
})