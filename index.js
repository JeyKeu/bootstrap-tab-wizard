(function ($) {
    /**
     * @return {function|boolean}
     */
    $.fn.TabWizard = function (options) {
        if (typeof $.fn.tab !== 'function') {
            console.warn('TabWizard depends on Bootstrap 4 Tab plugin');
            return false;
        }
        let self = this;
        let settings = $.extend({
            showTabs: true,
            nextButtonClass: '.btnNext',
            previousButtonClass: '.btnPrevious',
            finishButtonText: 'Finish',
            onNext: function (callback) {
                if (typeof  callback === 'function') {
                    callback();
                }
            },
            onPrevious: function (callback) {
                if (typeof  callback === 'function') {
                    callback();
                }
            },
            onFinish: function (callback) {
                if (typeof  callback === 'function') {
                    callback();
                }
            }
        }, options);
        if (!settings.showTabs) {
            $(self).find('.nav-tabs').hide();
        }
        $(self).find(settings.nextButtonClass).click(function () {
            let btn = this;
            if ($(btn).hasClass('btnFinish')) {
                settings.onFinish();
            } else {
                $(self).find('.tab-content .tab-pane').each(function (pane) {

                    if ($(this).hasClass('active') && $(this).next('.tab-pane').length) {
                        let me = pane + 1;
                        $(self).find(`.nav-tabs`).find(`li:nth-child(${me + 1}) a`).tab('show');
                        return false;
                    }
                });
            }
        });
        $(self).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            let btn = $(self).find(settings.nextButtonClass);
            var tab = $(e.target).attr('href');
            $(self).find('.tab-content').find($(e.target));
            if ($(self).find(tab).is(':last-child')) {
                btn.addClass('btnFinish').text(settings.finishButtonText);
            } else {
                $(btn).removeClass('btnFinish').text('Next');
            }
        });

        $(self).find(settings.previousButtonClass).click(function () {
            let btn = this;
            $(self).find('.tab-content .tab-pane').each(function (pane) {
                if ($(this).hasClass('active') && $(this).prev('.tab-pane').length) {
                    let me = pane + 1;
                    $(self).find(`.nav-tabs`).find(`li:nth-child(${me - 1}) a`).tab('show');
                    return false;
                }
            });
        });
        return this;
    };
}(jQuery));