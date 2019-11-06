require(['./config'], () => {
  require(['template','url','indexHeader', 'footer','zoom','fly'], (template, url, indexHeader) => {
    class details{
      constructor(){
        this.addToCart();
        this.goTop();
        this.getDetailsData().then(resp => {
          let str = template('productDetails', {...resp.product})
          $('main').html(str)
          this.details = {...resp.product, id: this.id}
          this.shopCartNum();
          this.pictureSwitching();
          this.zoom();
          this.subnav();
          this.selected();
        })
        this.getDetailsParameter().then(resp => {
          let str2 = template('d2d', {...resp.body})
          $('#d2').html(str2)
          let str4 = template('d4d', {...resp.body})
          $('#d4').html(str4)
          let str6 = template('d6d', {...resp.body})
          $('#d6').html(str6)
          this.EvaluationPageSwitching()
        })
      }
      
      getDetailsData(){
        this.id = Number(window.location.search.slice(4))
        return new Promise(resolve => {
          $.get(`${url.rapBaseUrl}/singleProduct`, {id: this.id}, resp => {
            resolve(resp);
          })
        })
      }

      // 放大镜
      zoom () {
        $(".zoom-img").elevateZoom({
          gallery: 'gal1imagesList', //ul父级盒子的id
          cursor: 'pointer',
          borderSize: '1',
          galleryActiceClass: 'active',
          borderColor: '#f2f2f2'
        })
      }

      // 加入购物车
      addToCart(){
        $('main').on('click', '#addToCart', e => {
          this.fly(e);
          
          let cart = localStorage.getItem('cart')
          if(cart){
            cart = JSON.parse(cart)
            const is = cart.some(shop => {
              return shop.id === this.id
            })
            if(is){
              cart = cart.map(shop => {
                if(shop.id === this.id) shop.num++
                return shop
              })
            }else{
              cart.push({...this.details, num: 1, check: true})
            }
          }else{
            cart = [{...this.details, num: 1, check: true}];
          }
          localStorage.setItem('cart', JSON.stringify(cart))
        })
      }

      fly(e){
        const _this = this
        $(`<div style="width:20px;height:20px;backgroud:red" class="point"></div>`).fly({
          start:{
            left: e.clientX,  //开始位置（必填）#fly元素会被设置成position: fixed
            top: e.clientY,  //开始位置（必填）
          },
          end:{
            left: $('.shopCart').offset().left, //结束位置（必填）
            top: $('.shopCart').offset().top - $(window).scrollTop()  //结束位置（必填）
          },
          autoPlay: true, //是否直接运动,默认true
          speed: .8, //越大越快，默认1.2
          vertex_Rtop: 10, //运动轨迹最高点top值，默认20
          onEnd: function(){
            this.destroy()
            _this.shopCartNum()
          } //结束回调
        });
      }

      // 右侧边购物车数量显示
      shopCartNum(){
        let cart = localStorage.getItem('cart');
        let num = 0;
        if(cart){
          cart = JSON.parse(cart);
          num = cart.reduce((res, shop) => {
            res += shop.num;
            return res;
          }, 0)
          $('#shopCart').html(num);
          indexHeader.cartNumberShow(num)
        }
      }

      // 小照片切换
      pictureSwitching(){
        var sign = true;
        let _this = this;
        $('main').on('click', '#imagesRight', () => {
          if(sign){
            $('#imagesList').animate({
              left: -$('#imagesList li').width()*5 + 'px'
            },function() {
              sign = false;
            })
          }
        })
        $('main').on('click', '#imagesLeft', () => {
          if(!sign){
            $('#imagesList').animate({
              left: '0px'
            },function() {
              sign = true;
            })
          }
        })
        $('main').on('click', '#smallImage', function()  {
          $('#mediumImage').attr('src',$(this).attr('src'))
          _this.zoom();
        })
      }

      // 大小，配置，套餐选择
      selected(){
        $('.productSize .CanBeSelected').on('click', function(){
          $('.productSize .CanBeSelected').css({border: '1px solid #c7c7c7'})
          $(this).css({border: '1px solid #3b7efb'})
        })
        $('.productTo-configure .CanBeSelected').on('click', function(){
          $('.productTo-configure .CanBeSelected').css({border: '1px solid #c7c7c7'})
          $(this).css({border: '1px solid #3b7efb'})
        })
        $('.productSet-meal .CanBeSelected').on('click', function(){
          $('.productSet-meal .CanBeSelected').css({border: '1px solid #c7c7c7'})
          $(this).css({border: '1px solid #3b7efb'})
        })
      }

      //底部导航
      subnav(){
        $(document).on('scroll', function(){
          let $subnav = $('.subnav'),
              $show = $('.subnav ul li a');
              $show.removeClass('ac');
              for(let i=1;i<7;i++){
                if($subnav.offset().top >= $('#d'+i).offset().top -300){
                  $show.removeClass('ac');
                 $(`[href="#d${i}"]`).addClass('ac');
                }
              }
        })
      }

      // 顾客评价页切换
      EvaluationPageSwitching(){
        $('.evaluateList li:even').hide()
        $('#next').on('click', function(){
          $(this).addClass('disabled')
          $('#previous').removeClass('disabled')
          $('.evaluateList li:even').show()
          $('.evaluateList li:odd').hide()
        })
        $('#previous').on('click', function(){
          $(this).addClass('disabled')
          $('#next').removeClass('disabled')
          $('.evaluateList li:odd').show()
          $('.evaluateList li:even').hide()
        })
      }

      // 回到顶部
      goTop(){
        $('.gotop').on('click', function(){
          let start = $(document).scrollTop()
          let timer1 = setInterval(function(){
            start -= 20
            $(document).scrollTop(start)
            if(start <= 0 ) clearInterval(timer1)
          },3)
         })
      }

      // 技术规格参数等数据获取
      getDetailsParameter(){
        return new Promise(resolve => {
          $.get(`${url.rapBaseUrl}/oneProduct`, resp => {
            resolve(resp);
          })
        })
      }
    }
    return new details();
  })
})