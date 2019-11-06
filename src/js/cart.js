require(['./config'], () => {
  require(['template', 'indexHeader', 'footer', 'bootstrap'], (template, indexHeader) => {
    class cart {
      constructor() {
        this.init();
        // this.deleteProduct();
        // this.checksChange();
        // this.allCheckChange();
        // this.productNumberChange();
      }
      //初始化
      init() {
        let cart = localStorage.getItem('cart')
        let num = 0;
        // 判断是否存在商品
        if (cart != '[]') {
          $('.noOne').hide();
          this.cart = JSON.parse(cart);
          this.num = 0;
          //获取总商品数量
          var linum = 0;
          this.cart.forEach(shop => {
            linum += shop.check ? +1 : -1;
          })
          this.num = linum;
          num = this.cart.reduce((res, shop) => {
            res += shop.num;
            return res;
          }, 0)
          $('#productNum').html(num);
          // console.log(indexHeader)
          // 头部购物车数量显示
          indexHeader.constructor(num)
          // 初始化判断商品勾选情况
          if (this.num == this.cart.length) {
            if (this.num === 0) {
              $('#allCheck').prop('checked', false)
            } else {
              $('#allCheck').prop('checked', true)
            }
          } else {
            $('#allCheck').prop('checked', false)
          }
          let str = template('productShowOne', {
            cart: this.cart
          })
          $('.singleProductShow').html(str)
          this.checksChange();
          this.allCheckChange();
          this.productPriceTotal();
          this.productNumberChange();
          this.deleteProduct();
          // this.verification();
        } else {
          indexHeader.constructor(num);
          $('#productNum').html(num);
          $('#allCheck').prop('checked', false);
          this.productPriceTotal();
          $('.singleProductShow').html('');
          $('.noOne').show();
        }
      }

      // 单选
      checksChange() {
        const _this = this;
        $('.checks').on('change', function () {
          const id = Number($(this).parents('.productShowOne').attr('data-id'))
          _this.cart = _this.cart.map(shop => {
            if (shop.id === id) shop.check = $(this).prop('checked')
            return shop;
          })
          _this.num += $(this).prop('checked') ? +1 : -1;
          $('#allCheck').prop('checked', _this.num === _this.cart.length)
          localStorage.setItem('cart', JSON.stringify(_this.cart));
          _this.init();
        })
      }

      // 全选
      allCheckChange() {
        const _this = this;
        $('#allCheck').on('change', function () {
          _this.cart.forEach(shop => {
            shop.check = $(this).prop('checked')
          })
          $('.checks').prop('checked', $(this).prop('checked'))
          _this.num = $(this).prop('checked') ? _this.cart.length : 0;
          localStorage.setItem('cart', JSON.stringify(_this.cart));
          _this.productPriceTotal();
        })
      }

      // 删除
      deleteProduct() {
        const _this = this;
        $('.deleteProduct').on('click', function () {
          if (confirm('sure?')) {
            _this.cart = JSON.parse(localStorage.getItem('cart'))
            const id = Number($(this).parents('.productShowOne').attr('data-id'));
            _this.cart = _this.cart.filter(shop => {
              return shop.id != id;
            })
            localStorage.setItem('cart', JSON.stringify(_this.cart))
            _this.init();
          }
        })
      }

      // 商品数量变化
      productNumberChange() {
        const _this = this;
        // -操作
        $('.reduce').on('click', function () {
          let id = Number($(this).parents('.productShowOne').attr('data-id'));
          _this.cart = _this.cart.map(shop => {
            if (shop.id === id) {
              if (shop.num != 1) {
                shop.num--
              } else {
                shop.num = 1;
              }
            }
            return shop;
          })
          localStorage.setItem('cart', JSON.stringify(_this.cart))
          _this.init();
        })
        //+操作
        $('.increase').on('click', function () {
          let id = Number($(this).parents('.productShowOne').attr('data-id'));
          _this.cart = _this.cart.map(shop => {
            if (shop.id === id) shop.num++
            return shop;
          })
          localStorage.setItem('cart', JSON.stringify(_this.cart))
          _this.init();
        })
        // 输入框
        $('.singleProductNum').on('focus', function () {
          let id = Number($(this).parents('.productShowOne').attr('data-id'));
          //回车键改变数量
          $(this).on('keyup', function (e) {
            if (e.keyCode == 13) {
              let id = Number($(this).parents('.productShowOne').attr('data-id'));
              _this.cart = _this.cart.map(shop => {
                if (shop.id === id)
                  if (Number($(this).val()) == 0) {
                    shop.num = 1
                  } else {
                    shop.num = Number($(this).val())
                  }
                return shop;
              })
              localStorage.setItem('cart', JSON.stringify(_this.cart))
              _this.init();
            }
          })
          // console.log(keyup())
          // 输入框失去焦点改变数量
          $(this).on('blur', function () {
            let id = Number($(this).parents('.productShowOne').attr('data-id'));
            _this.cart = _this.cart.map(shop => {
              if (shop.id === id) {
                if (Number($(this).val()) == 0) {
                  shop.num = 1
                } else {
                  shop.num = Number($(this).val())
                }
              }
              return shop;
            })
            localStorage.setItem('cart', JSON.stringify(_this.cart))
            _this.init();
          })
        })
      }

      // 总价
      productPriceTotal() {
        let cart = localStorage.getItem('cart');
        if (cart) {
          this.cart = JSON.parse(cart);
          let allMoney = this.cart.reduce((money, shop) => {
            if (shop.check) money += shop.num * shop.price;
            return money;
          }, 0)
          $('#productPriceTotal').html(allMoney);
        } else {
          $('#productPriceTotal').html(0);
        }
      }

      // 结算
      // verification(){
      //   $('#settlement').on('mousedown', function(){
      //     console.log(indexHeader.islogin())
      //   })
      // }

    }
    return new cart();
  })
})