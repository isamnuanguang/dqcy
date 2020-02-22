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
            let c_html = '';
            res = res.data;
            $('.v-desc-box').attr({'src': res.video_img_url});
            $('#photo .img').attr({'href': res.video_url})
            $('.btn-buy-play').attr({'href': res.video_url})
            $('.video-desc-title').html(res.video_title);
            $('.user-avatar .avatar').attr({'src': res.user_img_url});
            $('.text a').html(res.user_nickname);
            $('title').html(res.video_title + '-沙抖创意');
            $('.vid').html(res.aweme_id);
            $('.v-date').html(res.video_date);
            $('.v-url').html(res.video_url);
            $('.v-url').attr({'href': res.video_url});
            $('.like-count').html(res.video_like);
            $('.comment-count').html(res.video_comment);
            let hot_comment = JSON.parse(res.hot_comment.data);
            for (let i = 0; i < hot_comment.length; i++) {
                c_html += '<li><a href="javascript:;"' + hot_comment[i] + '" ' 
                            + 'class="button button-white button-sm">'
                            + hot_comment[i] + '</a></li>'
            }
            $('.tags ul').append(c_html)
        },
        error: function (res) {
            console.log(res)
        }
    })
})