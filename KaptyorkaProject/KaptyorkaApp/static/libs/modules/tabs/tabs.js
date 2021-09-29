$(function () {
    $('.btn-scrollable').on('click', function () {
        btnId = $(this).attr('id');
        $('.btn-scrollable.active-tab-label').removeClass('active-tab-label').addClass('hidden-tab-label');
        $(this).addClass('active-tab-label').removeClass('hidden-tab-label').blur();
        var menuId = btnId.substring(4, btnId.length);
        $('[href="#' + menuId + '"]').tab('show');
        $('.tab-pane').removeClass('in').removeClass('active').removeClass('show');
        $('#' + menuId).addClass('in').addClass('active').addClass('show');
        $.fn.switchControlTabsButtons();
    });

    $('.next-step, .prev-step').on('click', function (e) {
        var $activeTab = $('.tab-pane.active');
        if ($(e.target).hasClass('next-step')) {
            var nextTabId = $activeTab.next('.tab-pane').attr('id');
            if (nextTabId != undefined) {
                var activeTabId = $activeTab.attr('id');

                var btn = $('#btn-' + activeTabId);
                $('#btn-' + activeTabId).removeClass('active-tab-label').addClass('hidden-tab-label');
                var btn2 = $('#btn-' + nextTabId);
                $('#btn-' + nextTabId).removeClass('hidden-tab-label').addClass('active-tab-label');
                $('#' + activeTabId).removeClass('in').removeClass('active').removeClass('show');
                $('#' + nextTabId).addClass('in').addClass('active').addClass('show');
            }
        }
        else {
            var prevTabId = $activeTab.prev('.tab-pane').attr('id');
            if (prevTabId != undefined) {
                var activeTabId = $activeTab.attr('id');
                var btn = $('#btn-' + activeTabId);
                $('#btn-' + activeTabId).removeClass('active-tab-label').addClass('hidden-tab-label');
                var btn2 = $('#btn-' + prevTabId);
                $('#btn-' + prevTabId).removeClass('hidden-tab-label').addClass('active-tab-label');
                // $('[href="#' + prevTabId + '"]').tab('show');
                $('#' + activeTabId).removeClass('in').removeClass('active').removeClass('show');
                $('#' + prevTabId).addClass('in').addClass('active').addClass('show');
            }
        }
        $.fn.switchControlTabsButtons();
    });

    $.fn.switchControlTabsButtons = function () {
        var $activeTab = $('.tab-pane.active');
        var nextTabId = $activeTab.next('.tab-pane').attr('id');
        if (nextTabId == undefined) {
            $('.next-step').hide();
            $('.last-step').show();
        }
        else {
            $('.next-step').show();
            $('.last-step').hide();
        }
        var prevTabId = $activeTab.prev('.tab-pane').attr('id');
        if (prevTabId == undefined) {
            $('.prev-step').prop('disabled', true);
        }
        else {
            $('.prev-step').prop('disabled', false);
        }
    }

});


