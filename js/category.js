$(function () {
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
    const urlList = {
        'meishi': {
            name: '美食',
            code: 1,
        },
        'travel': {
            name: '旅行',
            code: 2,
        },
        'chuanda': {
            name: '穿搭',
            code: 3,
        },
        'meizhuang': {
            name: '美妆',
            code: 4,
        },
        'muying': {
            name: '母婴育儿',
            code: 5,
        },
        'chongwu': {
            name: '宠物',
            code: 6,
        },
        'jiaju': {
            name: '家居',
            code: 7,
        },
        'yingshiyule': {
            name: '影视娱乐',
            code: 8,
        },
        'youxi': {
            name: '游戏',
            code: 9,
        },
        'jiankang': {
            name: '健康',
            code: 10,
        },
        'tiyu': {
            name: '体育',
            code: 11,
        },
        'dongman': {
            name: '动漫',
            code: 12,
        },
        'shishang': {
            name: '时尚',
            code: 13,
        },
        'jiaoyu': {
            name: '教育',
            code: 14,
        },
        'qiche': {
            name: '汽车',
            code: 15,
        },
        'keji': {
            name: '科技',
            code: 16,
        },
        'sheyingjiaoxue': {
            name: '摄影教学',
            code: 17,
        },
        'zhengwu': {
            name: '政务',
            code: 18,
        },
        'bangongruanjian': {
            name: '办公软件',
            code: 19,
        },
        'wenxueyishu': {
            name: '文学艺术',
            code: 20,
        }
    }
    let param = (lib.GetRequest())['type'];
    let BaseUrl = 'http://123.56.69.222:5555/';
    console.log(param, urlList['param']);
    let categoryUrl = BaseUrl + urlList[param]['code'];
    $('#category-title').html(urlList[param]['name'])
    $.ajax({
        url: categoryUrl,
        type: 'get',
        success: function (res) {
            res = res.data;
            let html = '';
            for (let i = 0; i < res.length; i++) {
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