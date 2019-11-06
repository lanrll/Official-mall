require(['./config'], () => {
  require(['jquery', 'cookie', 'bootstrap'], () => {
    class login {
      constructor() {
        this.$titleone = $('#titleone');
        this.$titletwo = $('#titletwo');
        this.$name = $('#name');
        this.$password = $('#password');
        this.$login = $('#login');
        this.$resgister = $('#register');
        this.ressign;
        this.loginsign;
        this.init();
        this.close();
      }

      init() {
        let _this = this
        $.cookie.raw = false;
        $.cookie.json = true;
        // 初始化cookie
        // $.cookie('i', 'asd', {
        //   expires: 7,
        //   path: '/'
        // })
        // 通过Url判断初始为登录页或注册页

        // console.log(localStorage.getItem('that'))
        // console.log(window.location.search.slice(1))
        if (window.location.search.slice(1) == 0) {
          _this.loginShow()
        } else {
          _this.resgisterShow()
        }
        _this.$titleone.on('click', () => {
          _this.loginShow()
        })
        _this.$titletwo.on('click', () => {
          _this.resgisterShow()
        })
      }

      // 登录页显示
      loginShow() {
        this.$titletwo.removeClass('ac');
        this.$titleone.addClass('ac');
        this.$resgister.hide();
        this.$login.show();
        $('.recordId').show();
        if ($.cookie('recordinfo')) {
          let recoedinfo = [];
          recoedinfo = JSON.parse($.cookie('recordinfo'));
          recoedinfo.forEach(item => {
            this.$name.val(item.name)
            this.$password.val(item.password)
          })
        }
        this.login();
      }

      // 注册页显示
      resgisterShow() {
        this.$name.val('')
        this.$password.val('')
        this.$titleone.removeClass('ac');
        this.$titletwo.addClass('ac');
        this.$login.hide();
        this.$resgister.show();
        $('.recordId').hide();
        this.resgister();
      }

      // 登录功能
      login() {
        this.$login.on('mousedown', () => {
          let userinfo = [],
            logininfo = [];
          // 是否有已用户登录
          if (!$.cookie('logininfo')) {
            // 判断用户名及密码输入不为空
            if (this.$name.val() != '' && this.$password.val() != '') {
              // 判断是否存在已注册用户
              if ($.cookie('userinfo')) {
                userinfo = JSON.parse($.cookie('userinfo'))
                console.log(userinfo)
                // 遍历userinfo判断是否存在当前输入的已注册用户,this.ressign标志存在为true
                console.log(this.$name.val(), this.$password.val())
                for(let i = 0; i < userinfo.length; i++){
                  if (this.$name.val() ==  userinfo[i].name) {
                    if(this.$password.val() == userinfo[i].password){
                      this.ressign = true;
                      break;
                    }
                  }
                }
              } else {
                this.ressign = false;
              }
              // console.log( this.ressign)
              // 根据this.ressign判断是否存在当前输入的已注册用户的后续操作
              if (this.ressign) {
                logininfo = [{
                  name: this.$name.val(),
                  password: this.$password.val()
                }]
                //是否记住账号密码
                if ($('#recordPassword').prop('checked')) {
                  $.cookie('recordinfo', JSON.stringify(logininfo), {
                    expires: 7,
                    path: '/'
                  })
                } else {
                  $.removeCookie('recordinfo', {
                    path: '/'
                  })
                }
                // 创建登录信息cookie
                $.cookie('logininfo', JSON.stringify(logininfo), {
                  expires: 7,
                  path: '/'
                })
                if (confirm('欢迎登录Microsoft！返回页面！！！')) {
                  console.log(JSON.parse($.cookie('logininfo')));
                  window.location.href = localStorage.getItem('that')
                } else {
                  this.init()
                }
              } else {
                alert('账号密码输入出错或用户未注册！')
              }
            } else {
              alert('存在未输入！请输入！')
            }
          } else {
            alert('以有用户登录，请去先退出')
          }
        })
      }

      // 注册功能
      resgister() {
        this.$resgister.on('mousedown', () => {
          let userinfo = [];
          let ressign = 0;
          // 判断输入框是否为空
          if (this.$name.val() != '') {
            if (this.$password.val() != '') {
              // 判断是否存在userinfo
              if ($.cookie('userinfo')) {
                userinfo = JSON.parse($.cookie('userinfo'))
                console.log(userinfo)
                // 遍历userinfo判断是否存在当前输入的已注册用户,this.ressign标志存在为true
                // userinfo.forEach((item) => {
                  
                //   if (this.$name.val() == item.name) 
                //     this.ressign = true;
                // })
                for(let i = 0; i < userinfo.length; i++){
                  if (this.$name.val() ==  userinfo[i].name) {
                    this.ressign = true;
                    break;
                  }
                }
              } else {
                this.ressign = false;
              }

              // 根据this.ressign判断是否存在当前输入的已注册用户的后续操作
              if (this.ressign) {
                alert('用户名已注册，请重新输入！');
              } else {
                userinfo = [...userinfo, {
                  name: this.$name.val(),
                  password: this.$password.val()
                }]
                console.log(userinfo)
                $.cookie('userinfo', JSON.stringify(userinfo), {
                  expires: 365,
                  path: '/'
                })
                alert('注册成功了！')
                return;
              }
            } else {
              alert('存在未输入！请输入！')
              console.log(1)
            }
          }
        })
      }

      // 取消关闭功能
      close() {
        $('.close').on('click', function () {
          window.location.href = localStorage.getItem('that')
        })
      }
    }
    new login()
  })
})