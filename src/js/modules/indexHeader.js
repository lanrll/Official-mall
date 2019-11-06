define(['jquery', 'bootstrap', 'cookie'], () => {
  class indexHeader {
    constructor(num) {
      this.menuNum = 0;
      this.searchNum = 0
      this.init().then(() => {
        this.downMenu();
        this.search();
        this.searchCancle();
        this.cartNumberShow(num);
        this.recoedPage();
        this.Breadcrumb();
        this.islogin();
      });
    };
    // 初始化，加载头部
    init() {
      return new Promise(resolve => {
        $('header').load('/html/modules/indexHeader.html', resolve);
      })
    };

    Breadcrumb() {
      let arr = [];
      arr = window.location.pathname.split('/')
      let thatPage = window.location.search.slice(1);
      let dataPage = thatPage.split('=')
      let baseUrl = window.location.origin;
      $('').appendTo('#breadCrumb')
      let str = `<li><a href=${baseUrl}>Home<a></li>`
      if (arr[1]) {
        if (dataPage[0] == 'id') {
          str += `<li><a href=${baseUrl}/${arr[1]/arr[2]}?${dataPage}>Datails</a></li>`
        } else {
          str += `<li><a href=${baseUrl}/${arr[1]/arr[2]}>${thatPage}</a></li>`
        }
      }
      $(str).appendTo('#breadCrumb')

    }
    recoedPage() {
      localStorage.setItem('that', window.location.href)
    }

    // 登录验证
    islogin() {
      // 判断是否存在登录信息
      if ($.cookie('logininfo')) {
        // 替换为登录头部
        $('.oneLogin').hide();
        $('.alreadyLogin').show();
        // let logininfo = JSON.parse($.cookie('logininfo'));
        // console.log(logininfo);
        // 用户退出功能事件绑定
        $('#warning').hide();
        $('#settlement').attr('data-target', '#myModal')
        $('#signOut').on('click', () => {
          if (confirm('suer?')) {
            if ($.removeCookie('logininfo', {
                path: '/'
              })) {
              alert('成功退出');
              $('.oneLogin').show();
              $('.alreadyLogin').hide();
              $('#warning').show();
              $('#settlement').attr('data-target', '')
            }
          }
        })
        return true;
      } else {
        $('.oneLogin').show();
        $('.alreadyLogin').hide();
        $('#warning').show();
        $('#settlement').attr('data-target', '')
        return false;
      }
    }

    // 下拉菜单
    downMenu() {
      $('#downMenu').on('click', () => {
        if (this.menuNum % 2 === 0) {
          $('.allProduct').show()
          $('#downMenu').css({
            background: '#F2F2F2'
          });
        } else {
          $('.allProduct').hide();
          $('#downMenu').css({
            background: '#ffffff'
          });
        }
        this.menuNum++;
      })
    }

    // 搜索框显示，及搜索
    search() {
      // 搜索框显示
      $('#searchout').on('mousedown', () => {
        // 点击隐藏显示判断
        if (this.searchNum % 2 === 0) {
          $('.userLogin,.shopCar,#searchout').hide();
          $('.login form').show()
          this.searchNum++
        }
        // 搜索框搜索
        $('#keyWord').on('keyup', () => {
          // 请求数据
          $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${$('#keyWord').val()}&cb=?`, resp => {
            console.log(resp)
            $('form ul').html('');
            for (let i = 0; i < resp.s.length; i++) {
              $(`<li>${resp.s[i]}</li>`).appendTo($('form ul'));
            };
            $('form ul li').on('mousedown', function () {
              $('#keyWord').val('');
              $('#keyWord').val($(this).html());
            });
            $('#keyWord').on('blur', function () {
              $('form ul li').remove();
            })
          })
        })
      })
    }

    //搜索框关闭
    searchCancle() {
      $('.cancle').on('click', () => {
        $('#keyWord').val('');
        $('.userLogin,.shopCar,#searchout').show();
        $('.login form').hide()
        this.searchNum++
      })
      // $(document).not($('.login form,#searchout')).on('click', () => {
      //   if (this.searchNum%2 === 1) {
      //     $('.cancle').triggerHandler('click');
      //   }else{
      //   }
      //   console.log(this.searchNum)
      // })
    }

    // 头部购物车显示数量
    cartNumberShow(num) {
      let cart = localStorage.getItem('cart')
      // num = 0;
      if (num) {
        // console.log(num)
        $('.shopCar').html(num);
      } else {
        if (cart) {
          cart = JSON.parse(cart)
          // console.log(cart);
          num = cart.reduce((res, shop) => {
            return res += shop.num;
            // return res;
          }, 0)
          // console.log(num)
          $('.shopCar').html(num)
        }
      }
    }
  };
  return new indexHeader();
});