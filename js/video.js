const lib = {
    GetRequest: () => {
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
    // let baseUrl = 'http://101.200.123.24:5555/';
    let baseUrl = 'http://123.56.69.222:5555/';
    let dataUrl = baseUrl + param;
    $.ajax({
        url: dataUrl,
        type: 'get',
        success: function (res) {
            let c_html = '', time_str = '', minute_str = '', second_str = '';
            res = res.data;
            console.log(res.video_data_info)
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
            $('.share-count').html(res.share_conut);
            let hot_comment = res.hot_comment_list['comment_data'];
            for (let i = 0; i < hot_comment.length; i++) {
                c_html += '<li><span ' 
                            + 'class="button button-white button-sm">'
                            + hot_comment[i]['text'] + '</span></li>'
            }
            $('.tags ul').append(c_html)
        },
        error: function (res) {
            console.log(res)
        }
    })
})