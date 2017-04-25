/**
 * Created by Greg on 2016/12/2.
 */
(function ($) {
    var mgConfirm, mgconfirm;

    $.mgConfirm = function (options) {
        return mgconfirm(options);
    };

    mgconfirm = function (options) {
        this.defaults = {
            type: 'confirm', // confirm, alert
            action: '', // success, fail, warning
            title: '',
            content: '',
            nextCallBack: null,
            alertCallBack: null,
            openDelay: 500,
            closeDelay: 2000
        };

        var options = $.extend({}, this.defaults, options);

        var instance = new mgConfirm(options);
        return instance;
    };

    mgConfirm =  function(options){
        $.extend(this, options);
        this._init();
    };

    mgConfirm.prototype = {
        _init: function () {
          var self = this;
          this._id = Math.round(Math.random() * 99999);
          setTimeout(function () {
              self._create();
          }, 0);
        },
        _create: function () {
            if($(window.parent.document).find('body').find('.mg-1st-user--mask').length > 0){
                return;
            }
            this._buildHTML();
        },
        _buildHTML: function () {
            switch (this.type) {
                case 'confirm':
                    this._buildConfirm();
                    break;
                case 'alert':
                    this._buildAlert();
                    break;
                default:
                    break;
            }
        },
        _buildConfirm: function () {
            var self = this,
                title = this.title ? this.title : '提示',
                content = this.content ? this.content : '确定要执行操作吗？';
            var confirmHTML = '<div class="mg-1st-user--mask" style="opacity: 0;">' +
                '<div class="mg-1st-user-confirm--wrapper" id="mg_confirm_'+ this._id +'">' +
                '<div class="mg-1st-user-confirm--title">' +
                '<span>'+ title +'</span>' +
                '<a href="javascript: void (0);" class="mg-1st-user-confirm--close"></a>' +
                '</div>' +
                '<div class="mg-1st-user-confirm--content">' +
                '<img src="../../userCenter/images/main/icon_03.png"/>' +
                '<span>'+ content +'</span>' +
                '</div>' +
                '<div class="mg-1st-user-confirm--footer">' +
                '<button type="button" class="btn btn-primary">确认</button>' +
                '<button type="button" class="btn btn-default">关闭</button>' +
                '</div>' +
                '</div>' +
                '</div>';
            this.confirmContext = $(confirmHTML).appendTo($(window.parent.document).find('body').eq(0)).animate({
                opacity: 1
            }, self.openDelay, function () {
                self._buildEvent();
            });
        },
        _buildAlert: function () {
            var self = this,
                action = this.action ? this.action : 'success',
                imgName = action === 'success' ? 'icon_02.png' : action === 'fail' ? 'icon_01.png' : action === 'warning' ? 'icon_04.png' : 'success',
                content = this.content ? this.content : '操作成功 ！';
            var alertHTML = '<div class="mg-1st-user--mask" style="opacity:0;">' +
                    '<div class="mg-1st-user-alert--wrapper mg-1st-user-alert--'+ action +'-wrapper">' +
                        '<div style="float:left;width:35%;text-align:right;padding-right:10px;">' +
                            '<img src="../../userCenter/images/main/'+ imgName +'" width="38" height="38">' +
                        '</div>' +
                        '<div style="float:left;width:65%;text-align:left;line-height:1.2;height:100%;position:relative;overflow:hidden;">' +
                            '<span style="padding-right:10px;position:absolute;top:50%;transform:translateY(-50%);">'+ content +'</span>' +
                        '</div>' +
                    '</div>' +
                '</div>';

            this.confirmContext = $(alertHTML).appendTo($(window.parent.document).find('body').eq(0)).animate({
                opacity: 1
            }, self.openDelay, function () {
                setTimeout(function () {
                    if (self.alertCallBack && $.isFunction(self.alertCallBack)) {
                        self.alertCallBack.call(self);
                    }
                    self._destroy();
                }, self.closeDelay);
            });
        },
        _buildEvent: function () {
            var $primaryButton = this.confirmContext.find('button.btn-primary').eq(0),
                $defaultButton = this.confirmContext.find('button.btn-default').eq(0),
                $closeButton = this.confirmContext.find('a.mg-1st-user-confirm--close').eq(0),
                self = this;
            $defaultButton.on('click', function (e) {
                self._destroy();
                e.stopPropagation();
            });

            $primaryButton.on('click', function (e) {
                if (self.nextCallBack && $.isFunction(self.nextCallBack)) {
                    self.nextCallBack.call(self);
                }
                self._destroy();
                e.stopPropagation();
            });

            $closeButton.on('click', function (e) {
                self._destroy();
                e.stopPropagation();
                e.preventDefault();
            });
        },
        _destroy: function () {
            if (this.confirmContext) {
                this.confirmContext.remove();
            }
        }
    };

})(jQuery);