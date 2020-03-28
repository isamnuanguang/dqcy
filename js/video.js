const lib = {
    GetRequest: function() {
        let url = location.search; //获取url中"?"符后的字串
        let theRequest = new Object();
        if (url.indexOf("?") != -1) {
            let str = url.substr(1);
            strs = str.split("&");
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
}

$(function() {
    let param = (lib.GetRequest())['vid'];
    let baseUrl = 'http://182.92.155.225:8000/v1/';
    let dataUrl = baseUrl + 'video/' + param + '/';
    let recommandUrl = baseUrl + '/video/video_filter/';
    let page = 0;
    let endCount = 20;
    let loadMore = false;
    let type_id = 1;
    $.ajax({
        url: dataUrl,
        type: 'get',
        success: function (res) {
            let c_html = '', time_str = '', minute_str = '', second_str = '';
            res = res.data;
            type_id = res.type_id;
            let day, hour, minute, second;
            let duration = res.video_data_info.duration;
            day = Math.floor(duration / 86400000);
            hour = Math.floor((duration - day * 86400000) / 3600000);
            minute = Math.floor((duration - day * 86400000 - hour * 3600000) / 60000);
            second = Math.floor((duration - day * 86400000 - hour * 3600000 - minute * 60000) / 1000);
            second_str = second + '秒';
            if (minute !== 0) {
                minute_str = minute + '分';
            }
            time_str = minute_str + second_str;
            $('.v-time').html(time_str)
            $('.v-desc-box').attr({'src': res.video_img_url});
            $('#photo .img').attr({'href': res.video_url})
            $('.btn-buy-play').attr({'href': res.video_url})
            $('.video-desc-title').html(res.video_title);
            $('.user-avatar .avatar').attr({'src': res.user_img_url});
            $('.user-avatar').attr({'href': 'user.html?uid=' + res.user_id})
            $('meta[name="description"]').attr({'content': res.video_title + ' - 沙抖创意'})
            $('meta[name="keywords"]').attr({'content': res.user_nickname + '，最新短视频，最佳创意，创意剧本，视频拍摄制作，视频投放服务，抖音短视频，沙抖创意出品'})
            $('.text a').html(res.user_nickname);
            $('title').html(res.video_title + ' - 沙抖创意');
            $('.vid').html(res.aweme_id);
            $('.v-date').html(res.video_date);
            $('.v-url').html(res.video_url);
            $('.v-url').attr({'href': res.video_url});
            $('.like-count').html(res.video_like);
            $('.comment-count').html(res.video_comment);
            $('.share-count').html(res.share_count);
            let hot_comment = res.hot_comment_list['comment_data'];
            if (hot_comment && hot_comment.length > 0) {
                for (let i = 0; i < hot_comment.length; i++) {
                    c_html += '<li><span ' 
                                + 'class="button button-white button-sm">'
                                + hot_comment[i]['text'] + '</span></li>'
                }
                $('.tags ul').append(c_html);
            }
            recommandList(res.type_id);
        },
        error: function (res) {
            console.log(res)
        }
    });
    function recommandList(type_id) {
        $.ajax({
            url: recommandUrl,
            type: 'get',
            data: {
                start: page * endCount,
                end: (page * endCount) + endCount,
                type_id: type_id,
                aweme_id: param
            },
            success: function (res) {
                res = res.data;
                let html = '';
                for (let i = 0; i < res.length; i++) {
                    html += '<li>' +
                        '<section>' +
                        '<a class="img" href="video.html?vid=' + res[i]['aweme_id'] + '">' +
                        '<i class="icon-play"></i>' +
                        '<img class="video-img" src="' + './img/placeholder.png' + '" data-async-src="' + res[i]['video_img_url'] + '">' +
                        '</a>' +
                        '<div class="caption">' +
                        '<p>' + res[i]['video_title'] + '</p>' +
                        '<footer>' +
                        '<small><i class="icon-like"></i>' + res[i]['video_like'] + '</small ><small><i class="icon-comment"></i>' + res[i]['video_comment'] + '</small><small class="share-box"><i class="icon-vshare"></i>' + res[i]['share_count'] + '</small>' +
                        '</footer>' +
                        '</div>' +
                        '</section>' +
                        '</li>'
                }
                $('#yoo-list ul').append(html);
                $('#yoo-list ul').imagesLoaded(function () {
                    lazyLoadImg()
                    waterFall()
                    loadMore = true;
                });
            },
            error: function (res) {
                console.log(res)
                $('.loading').hide()
                $('.errorPage').show()
            }
        })
    }
    // 节流函数
    function throttle(fn) {
        let waitRun = true;
        return function () {
            if (!waitRun) {
                return;
            }
            waitRun = false;
            setTimeout(function () {
                fn.apply(this, arguments);
                waitRun = true;
            }, 500);
        }
    }

    function lazyLoadImg() {
        $('.row li').each(function (i) {
            if ($(this).find('.video-img').offset()['top'] - 150 < $('html').scrollTop() + $(window).height()) {
                $(this).find('.video-img').attr({
                    'src': $(this).find('.video-img').attr('data-async-src')
                });
            }
        })
    }

    function loadPageData() {
        const clientHeight = document.body.clientHeight && document.documentElement.clientHeight ? Math.min(document.body.clientHeight, document.documentElement.clientHeight) : document.documentElement.clientHeight;
        const scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
        if (clientHeight + scrollTop + 10 > scrollHeight) {
            if (loadMore) {
                loadMore = false;
                page += 1;
                $.ajax({
                    url: recommandUrl,
                    type: 'get',
                    data: {
                        start: page * endCount,
                        end: (page * endCount) + endCount,
                        type_id: type_id,
                        aweme_id: param
                    },
                    beforeSend: function () {
                        $('.loading').show()
                    },
                    success: function (res) {
                        res = res.data;
                        let html = '';

                        for (let i = 0; i < res.length; i++) {
                            html += '<li>' +
                                '<section>' +
                                '<a class="img" href="video.html?vid=' + res[i]['aweme_id'] + '">' +
                                '<i class="icon-play"></i>' +
                                '<img class="video-img" src="' + './img/placeholder.png' + '" data-async-src="' + res[i]['video_img_url'] + '">' +
                                '</a>' +
                                '<div class="caption">' +
                                '<p>' + res[i]['video_title'] + '</p>' +
                                '<footer>' +
                                '<small><i class="icon-like"></i>' + res[i]['video_like'] + '</small ><small><i class="icon-comment"></i>' + res[i]['video_comment'] + '</small><small class="share-box"><i class="icon-vshare"></i>' + res[i]['share_count'] + '</small>' +
                                '</footer>' +
                                '</div>' +
                                '</section>' +
                                '</li>'
                        }
                        $('#yoo-list ul').append(html);
                        $('#yoo-list ul').imagesLoaded(function () {
                            waterFall()
                            loadMore = true;
                            if (res.length < 20) {
                                loadMore = false;
                            }
                        });
                        $('.loading').hide()
                    },
                    error: function (res) {
                        console.log(res);
                        $('.loading').hide()
                        $('.errorPage').show()
                    }
                });
            } else {
                return false;
            }
        }

    }

    function waterFall() {
        var pageWidth = $('.row').width();
        var columns = Math.floor(pageWidth / $(".row li").width());
        var arr = [];
        var rowBoxHeight = 0;
        $(".row li").each(function (i) {
            rowBoxHeight += $('.row li').eq(i).outerHeight();
            var height = $('.row li').eq(i).outerHeight();
            let boxheight = height;
            if (i < columns) {
                // 2- 确定第一行
                $(this).css({
                    top: 0,
                    left: ($(".row li").outerWidth()) * i
                });
                arr.push(boxheight);

            } else {
                // 其他行
                // 3- 找到数组中最小高度  和 它的索引
                var minHeight = arr[0];
                var index = 0;
                for (var j = 0; j < arr.length; j++) {
                    if (minHeight > arr[j]) {
                        minHeight = arr[j];
                        index = j;
                    }
                }
                // 4- 设置下一行的第一个盒子位置
                // top值就是最小列的高度 
                $(this).css({
                    top: arr[index],
                    left: $(".row li").eq(index).css("left")
                });

                // 5- 修改最小列的高度 
                // 最小列的高度 = 当前自己的高度 + 拼接过来的高度
                arr[index] = arr[index] + boxheight;
            }
        });
        $('.row').height(rowBoxHeight / columns + 300)
    }

    window.addEventListener('resize', throttle(waterFall));
    window.addEventListener('scroll', throttle(loadPageData));
    window.addEventListener('scroll', throttle(waterFall));
    window.addEventListener('scroll', throttle(lazyLoadImg))
})