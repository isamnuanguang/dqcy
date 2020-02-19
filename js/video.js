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
            $('.video-img').attr({'src': res.video_img_url});
            $('#photo .img').attr({'href': res.video_url})
            $('.caption p').html(res.video_title);
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