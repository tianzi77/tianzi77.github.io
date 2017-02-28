/**
 * Created by q.chen on 2017/2/10.
 * index controller js
 */
define([
    'cPageView',
    'cAjax',
    'UIImageSlider',
    'UIScroll',
    'MiceUIScrollLayer',
    'text!SuccessCaseLayerTpl',
    'text!ConsultantTeamLayerTpl'
    ], function(
    cPageView,
    cAjax,
    UIImageSlider,
    UIScroll,
    MiceUIScrollLayer,
    SuccessCaseLayerTpl,
    ConsultantTeamLayerTpl
){
    var DEFAULT_COUNT = 30;
    var indexView = cPageView.extend({

        eventTypeID: 2,
        bannerSlider: null,
        consultTeamScroller: null,
        purposeOpened: false,
        successCaseLayerTplFunc: _.template(SuccessCaseLayerTpl),
        consultantTeamLayerTplFunc: _.template(ConsultantTeamLayerTpl),

        events: {
            'click .js_purpose_btn': 'showPurposeModal',
            'click .js_btn_close': 'hidePurposeModal',
            'click .js_success_case': 'showSuccessCase',
            'click .js_consultant_btn': 'showConsultant',
            'click #imgCode': 'getVerifyCode',
            'click .mice-purpose-mobile-captcha-btn': 'sendSMSCaptcha',
            'click .mice-purpose-submit-btn': 'submitPurpose',
            'click .mice-purpose-type > p': 'changeEventTypeID',
        },

        onCreate: function() {

        },

        onShow: function() {
            this.setHeader();
			this.demo01();
            //this._initBanner();
            //this._initConsultTeamScroll();
            //this._initSolutionSlider();
        },
		demo01: function () {
		  if (this.imgSlider01) return;
		  var data = [
			  { id: 1, src: 'http://images.cnitblog.com/blog/294743/201412/051803252488182.jpg', href: './res/img/1.jpg' },
			  { id: 2, src: 'http://images.cnitblog.com/blog/294743/201412/051803075458022.jpg', href: './res/img/2.jpg' },
			  { id: 3, src: 'http://images.cnitblog.com/blog/294743/201412/051803148429260.jpg', href: './res/img/3.jpg' },
			  { id: 4, src: 'http://images.cnitblog.com/blog/294743/201412/051803198737858.jpg', href: './res/img/4.jpg' }
		  ];
		  this.imgSlider01 = new UIImageSlider({
			datamodel: {
			  data: data,
			  itemFn: function (item) {
				return '<img data-src="' + item.src + '" src="' + item.src + '">';
			  }
			},
			displayNum: 1,
			wrapper: this.$('.demo01')
		  });
		  this.imgSlider01.show();
		},

        onHide: function () {

        },

        onAppear: function () {

        },

        setHeader: function () {
            this.header.set({
                back: true,
                center:{
                    tagname:'title',
                    value:['携程会奖']
                }
            });
            if(!(window.navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1)) {
                this.header.show();
            } else {
                this.header.hide();
            }
        },

        _initBanner: function () {

            if(this.bannerSlider) return;

            var data = [
                {
                    id: 1,
                    src: '//webresource.c-ctrip.com/ResMiceOnline/R2/PurposeH5/images/pressed/banner10.jpg',
                    href: '//webresource.c-ctrip.com/ResMiceOnline/R2/PurposeH5/images/pressed/banner10.jpg'
                },
                {
                    id: 2,
                    src: '//webresource.c-ctrip.com/ResMiceOnline/R2/PurposeH5/images/pressed/banner11.jpg',
                    href: '//webresource.c-ctrip.com/ResMiceOnline/R2/PurposeH5/images/pressed/banner11.jpg'
                },
                {
                    id: 3,
                    src: '//webresource.c-ctrip.com/ResMiceOnline/R2/PurposeH5/images/pressed/banner7.jpg',
                    href: '//webresource.c-ctrip.com/ResMiceOnline/R2/PurposeH5/images/pressed/banner7.jpg'
                }
            ];

            this.bannerSlider = new UIImageSlider({
                datamodel: {
                    data: data,
                    itemFn: function (item) {
                        return '<img data-src="' + item.src + '" src="' + item.src + '">';
                    }
                },
                displayNum: 1,
                wrapper: this.$('.banner-image')
            });

            this.bannerSlider.show();
        },

        _initConsultTeamScroll: function () {
            var consultTeamWidth = this.$('.consult-team-content').width() * this.$('.consult-team-content').length;
            this.$('.consult-team-container ul').width(consultTeamWidth + 112/3);
            if(!this.consultTeamScroller){
                this.consultTeamScroller = new UIScroll({
                    wrapper: this.$('.consult-team-container'),
                    scroller: this.$('.consult-team-container ul'),
                    scrollType: 'x',
                    hideScrollbar: true
                });

                // 隐藏滚动条
                this.$('.consult-team-container > div').css('display', 'none');
            }
        },

        _initSolutionSlider: function(){
            if(this.solutionSlider) return;

            var data = [
                {
                    id: 1,
                    src: '//webresource.c-ctrip.com/ResMiceOnline/R2/PurposeH5/images/pressed/events1.jpg',
                    href: '//webresource.c-ctrip.com/ResMiceOnline/R2/PurposeH5/images/pressed/events1.jpg'
                },
                {
                    id: 2,
                    src: '//webresource.c-ctrip.com/ResMiceOnline/R2/PurposeH5/images/pressed/hotel1.jpg',
                    href: '//webresource.c-ctrip.com/ResMiceOnline/R2/PurposeH5/images/pressed/hotel1.jpg'
                },
                {
                    id: 3,
                    src: '//webresource.c-ctrip.com/ResMiceOnline/R2/PurposeH5/images/pressed/mbooking1.jpg',
                    href: '//webresource.c-ctrip.com/ResMiceOnline/R2/PurposeH5/images/pressed/mbooking1.jpg'
                }
            ];

            this.solutionSlider = new UIImageSlider({
                datamodel: {
                    data: data,
                    itemFn: function (item) {
                        return '<img data-src="' + item.src + '" src="' + item.src + '">';
                    }
                },
                displayNum: 1,
                wrapper: this.$('.solution-content')
            });

            this.solutionSlider.show();
        },

        showConsultant: function(e){
            var self = this;
            var $target = $(e.currentTarget);
            var data = {};
            data.consultantTeamID = $target.attr('data-consultantTeamID');
            data.staffPicUrl = $target.attr('data-staffPicUrl');
            data.staffNameEn = $target.attr('data-staffNameEn');
            data.staffBrief = $target.attr('data-staffBrief');
            data.tag = $target.attr('data-tag');

            if (!self['consultantTeamLayer' + data.consultantTeamID]) {
                self['consultantTeamLayer' + data.consultantTeamID] = new MiceUIScrollLayer({
                    needAnimat: false,
                    scrollOpts: {
                        scrollbars: true,
                        bounce: true
                    },
                    datamodel: {
                        title: '&nbsp;',
                        ttype: 'mask',
                        headerHeight: 'auto',
                        body: self.consultantTeamLayerTplFunc(data),
                        footer:
                            '<div class="mice-purpose-submit">' +
                            '<p>' +
                            '<a class="mice-purpose-submit-btn">开始定制</a>' +
                            '</p>' +
                            '</div>'
                    },
                    events: {
                        'click .mice-purpose-submit-btn': 'showPurpose'
                    },
                    showPurpose: function (e) {
                        this.hide();
                        self.showPurposeModal(e);
                    }
                });
            }
            // 此处为了重置一下滚动条问题
            self['consultantTeamLayer' + data.consultantTeamID].show();
            $(window).trigger('resize');
        },

        showSuccessCase: function(e) {
            var self = this;
            var $target = $(e.currentTarget);
            var data = {};
            data.caseID = $target.attr('data-caseID');
            data.caseDesc = $target.attr('data-caseDesc');
            data.caseH5Img1 = $target.attr('data-caseH5Img1');
            data.personNumber = $target.attr('data-personNumber');
            data.caseTitle = $target.attr('data-caseTitle');
            data.eventDate = $target.attr('data-eventDate');
            data.departurePlace = $target.attr('data-departurePlace');
            data.destination = $target.attr('data-destination');

            if (!self['successCaseLayer' + data.caseID]) {
                self['successCaseLayer' + data.caseID] = new MiceUIScrollLayer({
                    needAnimat: false,
                    scrollOpts: {
                        scrollbars: true,
                        bounce: true
                    },
                    datamodel: {
                        title: '&nbsp;',
                        ttype: 'mask',
                        headerHeight: 'auto',
                        body: self.successCaseLayerTplFunc(data),
                        footer:
                            '<div class="mice-purpose-submit">' +
                            '<p>' +
                            '<a class="mice-purpose-submit-btn">开始定制</a>' +
                            '</p>' +
                            '</div>'
                    },
                    events: {
                        'click .mice-purpose-submit-btn': 'showPurpose'
                    },
                    showPurpose: function (e) {
                        this.hide();
                        self.showPurposeModal(e);
                    }
                });
            }
            self['successCaseLayer' + data.caseID].show();
        },

        hidePurposeModal: function (e) {
            this.purposeOpened = false;
            this.header.updateHeader({
                back: {
                    tagname: 'back',
                    callback: function () {
                        Lizard.goBack();
                    }
                }
            });
            if(!(window.navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1)) {
                this.header.show();
            } else {
                this.header.hide();
            }
            $('body').removeClass('oh');
            this.$('.container').show();
            this.$('.mice-purpose-container').removeClass('pop-purpose').addClass('push-purpose');

            this.restoreScrollPos();
        },


        sendCodeInterval: null,
        count: DEFAULT_COUNT,

        showPurposeModal: function (e) {
            var self = this;
            this.purposeOpened = true;
            self.saveScrollPos();
            this.header.updateHeader({
                back: {
                    tagname: 'back',
                    callback: function () {
                        self.hidePurposeModal(e);
                    }
                },
            });
            if(!(window.navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1)) {
                this.header.show();
            } else {
                this.header.hide();
            }
            $('body').addClass('oh');
            this.$('.container').hide();
            this.$('.mice-purpose-container').removeClass('push-purpose').addClass('pop-purpose');
        },

        changeEventTypeID: function (e) {
            var $index = this.$('.mice-purpose-type p').index(e.currentTarget);
            var $target = $(e.currentTarget);
            $target.addClass('cur').siblings().removeClass('cur');
            if($index > -1) {
                this.eventTypeID = 2 - $index; // 会议2 旅行1
            }
        },

        getVerifyCode: function () {
            this.$("#imgCode").attr("src", Lizard.appBaseUrl +"getVerifyCode" + "?r=" + new Date().getTime());
        },

        sendSMSCaptcha: function () {
            var self = this;
            if (this.count < DEFAULT_COUNT) return;
            this.validateCaptcha();
            this.validateCustomerMobile();
            if (!this.captcha || !this.customerMobile) {
                return;
            }

            var captchaFormData = {
                captcha: this.$('#txtCaptcha').val(),
                mobilePhone: this.$('#txtCustomerMobile').val()
            };

            this.interval.apply(this);
            this.sendCodeInterval = window.setInterval(this.interval.bind(this), 1000);

            Lizard.showLoading();
            cAjax.post(Lizard.appBaseUrl + 'sendSMSCaptcha', captchaFormData, function (data) {
                Lizard.hideLoading();
                console.log(data);
                if(data.execReturn) {
                } else {
                    Lizard.showMessage(data.msgInfo);
                    
                    window.clearInterval(self.sendCodeInterval);
                    self.$('.mice-purpose-mobile-captcha-btn')
                        .removeClass('mice-purpose-mobile-captcha-btn-disabled').text('发送验证码');
                    self.count = DEFAULT_COUNT;
                    self.$("#imgCode").trigger('click');
                    self.$('#txtCaptcha').val('');
                }
            }, function () {
                Lizard.hideLoading();
                Lizard.showMessage('手机验证码发送失败');

                window.clearInterval(self.sendCodeInterval);
                self.$('.mice-purpose-mobile-captcha-btn')
                    .removeClass('mice-purpose-mobile-captcha-btn-disabled').text('发送验证码');
                self.count = DEFAULT_COUNT;
                self.$("#imgCode").trigger('click');
                self.$('#txtCaptcha').val('');
            });
        },
        interval: function () {
            var $target = this.$('.mice-purpose-mobile-captcha-btn');
            if (this.count <= 0) {
                $target.removeClass('mice-purpose-mobile-captcha-btn-disabled').text('发送验证码');
                this.count = DEFAULT_COUNT;
                window.clearInterval(this.sendCodeInterval);
                return;
            }
            $target.addClass('mice-purpose-mobile-captcha-btn-disabled').text('重新发送' + this.count-- + '秒');
        },

        submitPurpose: function (e) {
            var self = this;
            if(!this.validateAll()) {
                return false;
            }
            var formData = {
                customerName: this.$('#txtCustomerName').val(),
                customerMobile: this.$('#txtCustomerMobile').val(),
                companyName: this.$('#txtCompanyName').val(),
                // personNumber: $('#txtPersonNumber').val(),
                customerEmail: this.$('#txtCustomerEmail').val(),
                mobileVerifyCode: this.$('#txtMobileCaptcha').val(),
                eventTypeID: this.eventTypeID,
                sourceFrom: Lizard.isInCtripApp ? 'CtripApp': 'MiceH5Online'
            };
            console.log(formData);

            Lizard.showLoading();
            cAjax.post(Lizard.appBaseUrl + 'purposeHandler', formData, function (data) {
                Lizard.hideLoading();
                console.log(data);

                if(data.execReturn) {
                    if (data.msgInfo == 'holiday') {
                        Lizard.showMessage('<p>需求单提交成功! </p>' +
                            '<p>工作时间：周一至周五9:00-17:00。</p>' +
                            '<p>现在是非工作时间，</p>' +
                            '<p>我们的工作人员</p><p>将会在下一个工作日第一时间联系您。</p>');
                    } else {
                        Lizard.showMessage('<p>需求单提交成功!</p>' +
                            '<p>携程会奖工作人员稍后将与您联系。</p>');
                    }
                    self.resetForm.apply(self);
                    self.hidePurposeModal.apply(self);
                } else {
                    Lizard.showMessage(data.msgInfo);
                    self.$("#imgCode").trigger('click');
                    self.$('#txtCaptcha').val('');
                    self.$('#txtMobileCaptcha').val('');
                }

                window.clearInterval(self.sendCodeInterval);
                self.$('.mice-purpose-mobile-captcha-btn')
                    .removeClass('mice-purpose-mobile-captcha-btn-disabled').text('发送验证码');
                self.count = DEFAULT_COUNT;

            }, function () {
                Lizard.hideLoading();
                Lizard.showMessage('需求单提交失败!');
                self.$("#imgCode").trigger('click');
                self.$('#txtCaptcha').val('');
                self.$('#txtMobileCaptcha').val('');
            });
        },

        customerName: true,
        customerMobile: true,
        companyName: true,
        customerEmail: true,
        captcha: true,
        mobileCaptcha: true,

        validateAll: function () {
            this.validateCaptcha();
            this.validateCompanyName();
            this.validateCustomerMobile();
            this.validateCustomerName();
            // validate.validatePersonNumber();
            this.validateCustomerEmail();
            this.validateMobileCaptcha();

            return this.validateHint();
        },
        validateHint: function () {
            var flag = this.companyName && this.customerName && this.customerEmail &&
                this.customerMobile && this.captcha && this.mobileCaptcha;

            return !!flag;
        },

        validateCustomerName: function () {
            var $target = this.$('#txtCustomerName');
            var val = $target.val().trim();
            if(!val) {
                $target.parents('li').addClass('error');
                this.customerName = false;
            } else {
                $target.parents('li').removeClass('error');
                this.customerName = true;
            }
        },
        validateCustomerMobile: function () {
            var $target = this.$('#txtCustomerMobile');
            var val = $target.val().trim();
            var reg = /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/;
            if (!reg.test(val)) {
                $target.parents('li').addClass('error');
                this.customerMobile = false;
            } else {
                $target.parents('li').removeClass('error');
                this.customerMobile = true;
            }
        },
        validateCompanyName: function () {
            var $target = $('#txtCompanyName');
            var val = $target.val().trim();
            if (!val) {
                $target.parents('li').addClass('error');
                this.companyName = false;
            } else {
                $target.parents('li').removeClass('error');
                this.companyName = true;
            }
        },
        validateCustomerEmail: function () {
            var $target = $('#txtCustomerEmail');
            var val = $target.val().trim();
            var reg = /^[A-Za-z0-9\u4e00-\u9fa5\._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!reg.test(val)) {
                $target.parents('li').addClass('error');
                this.customerEmail = false;
            } else {
                $target.parents('li').removeClass('error');
                this.customerEmail = true;
            }
        },
        validateCaptcha: function () {
            var $target = $('#txtCaptcha');
            var val = $target.val().trim();
            if (!val) {
                $target.parents('li').addClass('error');
                this.captcha = false;
            } else {
                $target.parents('li').removeClass('error');
                this.captcha = true;
            }
        },
        validateMobileCaptcha: function () {
            var $target = $('#txtMobileCaptcha');
            var val = $target.val().trim();
            if (!val) {
                $target.parents('li').addClass('error');
                this.mobileCaptcha = false;
            } else {
                $target.parents('li').removeClass('error');
                this.mobileCaptcha = true;
            }
        },

        resetForm: function () {
            this.$('.mice-purpose-type-meeting').trigger('click');

            this.$('#txtCustomerName').val('');
            this.$('#txtCustomerMobile').val('');
            this.$('#txtCompanyName').val('');
            this.$('#txtCustomerEmail').val('');
            this.$('#txtCaptcha').val('');
            this.$('#txtMobileCaptcha').val('');

            this.$("#imgCode").trigger('click');
            this.$('.mice-purpose-mobile-captcha-btn')
                .removeClass('mice-purpose-mobile-captcha-btn-disabled').text('发送验证码');
            this.count = DEFAULT_COUNT;
            window.clearInterval(this.sendCodeInterval);

            this.$('.mice-purpose-form li').removeClass('error');
        },

    });
    return indexView;
});