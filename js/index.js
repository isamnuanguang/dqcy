$(function(){
    $.ajax({
        url: 'http://123.56.69.222:5555/0',
        type: 'get',
        success: function(res) {
            res = res.data;
            let html = '';
            for(let i = 0; i < res.length; i++) {
                html += `
                    <li>
                        <section > 
                            <a class="img" href="${res[i]['video_url']}" target="_blank">
                                <i class="icon-play"></i>
                                <img class="video-img" src="${res[i]['video_img_url']}"> 
                            </a> 
                            <div class="caption">
                                <p>${res[i]['video_title']}</p>
                                <footer>
                                    <small><i class="icon-like"></i>${res[i]['video_like']}</small ><small><i class="icon-comment"></i>${res[i]['video_comment']}</small> 
                                </footer> 
                            </div> 
                        </section> 
                    </li>
                `
            }
            $('#yoo-list ul').append(html);
        },
        error: function (res) {
            console.log(res)
        }
    })
})