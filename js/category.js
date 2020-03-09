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
            name: '摄影',
            code: 17,
        },
        'zhengwu': {
            name: '政务',
            code: 18,
        },
        'bangongruanjian': {
            name: '办公',
            code: 19,
        },
        'wenxueyishu': {
            name: '艺术',
            code: 20,
        }
    }

    const colorList = ['type-color-1', 'type-color-2', 'type-color-3', 'type-color-4', 'type-color-5', 'type-color-6', 'type-color-7']
    let type_html = '';
    for (let key in urlList) {
        let index = Math.floor(Math.random()*colorList.length);
        type_html += '<h2>'
                + '<a href="' + 'category.html?type=' + key + '" '
                + 'class="' + colorList[index] + '">' + urlList[key]['name'] + '</a>'
                + '</h2>'
    }
    $('#yoo-top .container').append(type_html);

    let param = (lib.GetRequest())['type'];
    let baseUrl = 'http://123.56.69.222:5555/';
    // let baseUrl = 'http://101.200.123.24:5555/';
    let categoryUrl = baseUrl + urlList[param]['code'];
    $('#category-title').html(urlList[param]['name']);
    let page = 0;
    let endCount = 20;
    let loadMore = false;
    let dataUrl = categoryUrl + '/' + (page * endCount) + '/' + ((page * endCount) + endCount)
    $.ajax({
        url: dataUrl,
        type: 'get',
        success: function (res) {
            res = res.data;
            let html = '';
            for (let i = 0; i < res.length; i++) {
                html += '<li>' +
                    '<section>' +
                    '<a class="img" href="video.html?vid=' + res[i]['aweme_id'] + '">' +
                    '<i class="icon-play"></i>' +
                    '<img class="video-img" src="' + res[i]['video_img_url'] + '">' +
                    '</a>' +
                    '<div class="caption">' +
                    '<p>' + res[i]['video_title'] + '</p>' +
                    '<footer>' +
                    '<small><i class="icon-like"></i>' + res[i]['video_like'] + '</small ><small><i class="icon-comment"></i>' + res[i]['video_comment'] + '</small><small class="share-box"><i class="icon-vshare"></i>' + res[i]['share_count'] + '</small>' +
                    '</footer>' +
                    '</div>' +
                    '</section>' +
                    '</li>'
                // html += `
                //     <li>
                //         <section > 
                //             <a class="img" href="${res[i]['video_url']}" target="_blank">
                //                 <i class="icon-play"></i>
                //                 <img class="video-img" src="${res[i]['video_img_url']}"> 
                //             </a> 
                //             <div class="caption">
                //                 <p>${res[i]['video_title']}</p>
                //                 <footer>
                //                     <small><i class="icon-like"></i>${res[i]['video_like']}</small ><small><i class="icon-comment"></i>${res[i]['video_comment']}</small> 
                //                 </footer> 
                //             </div> 
                //         </section> 
                //     </li>
                // `
            }
            $('#yoo-list ul').append(html);
            $('#yoo-list ul').imagesLoaded(function () {
                waterFall()
            });
            loadMore = true;
        },
        error: function (res) {
            console.log(res)
        }
    })
    function debounce(fn) {
        let timeout = null;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                fn.apply(this, arguments);
            }, 500);
        }
    }

    function loadPageData() {
        const clientHeight = document.body.clientHeight && document.documentElement.clientHeight ? Math.min(document.body.clientHeight, document.documentElement.clientHeight) : document.documentElement.clientHeight;
        const scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
        if (clientHeight + scrollTop + 10 > scrollHeight) {
            if (loadMore) {
                page += 1;
                dataUrl = baseUrl + '0/' + (page * endCount) + '/' + ((page * endCount) + endCount)
                $.ajax({
                    url: dataUrl,
                    type: 'get',
                    beforeSend: function () {
                        $('.loading').show()
                    },
                    success: function (res) {
                        res = res.data;
                        let html = '';
                        if (res.length < 20) {
                            loadMore = false;
                        }
                        for (let i = 0; i < res.length; i++) {
                            html += '<li>' +
                                '<section>' +
                                '<a class="img" href="video.html?vid=' + res[i]['aweme_id'] + '">' +
                                '<i class="icon-play"></i>' +
                                '<img class="video-img" src="' + res[i]['video_img_url'] + '">' +
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
                        });
                        loadMore = true;
                        $('.loading').hide()
                    },
                    error: function (res) {
                        console.log(res)
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

    // 页面尺寸改变时实时触发
    // window.onresize = function () {
    //     waterFall();
    // };
    window.addEventListener('resize', debounce(waterFall));
    window.addEventListener('scroll', debounce(loadPageData));
    // window.onscroll = function () {
    //     const clientHeight = document.documentElement.scrollTop === 0 ? document.body.clientHeight : document.documentElement.clientHeight;
    //     const scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
    //     const scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
    //     if (clientHeight + scrollTop + 10 > scrollHeight) {
    //         page += 1;
    //         if (loadMore) {
    //             dataUrl = categoryUrl + '/' + (page * endCount) + '/' + ((page * endCount) + endCount)
    //             $.ajax({
    //                 url: dataUrl,
    //                 type: 'get',
    //                 success: function (res) {
    //                     res = res.data;
    //                     let html = '';
    //                     if (res.length < 20) {
    //                         loadMore = false;
    //                     }
    //                     for (let i = 0; i < res.length; i++) {
    //                         html += '<li>' +
    //                             '<section>' +
    //                             '<a class="img" href="' + res[i]['video_url'] + '" target="_blank">' +
    //                             '<i class="icon-play"></i>' +
    //                             '<img class="video-img" src="' + res[i]['video_img_url'] + '">' +
    //                             '</a>' +
    //                             '<div class="caption">' +
    //                             '<p>' + res[i]['video_title'] + '</p>' +
    //                             '<footer>' +
    //                             '<small><i class="icon-like"></i>' + res[i]['video_like'] + '</small ><small><i class="icon-comment"></i>' + res[i]['video_comment'] + '</small>' +
    //                             '</footer>' +
    //                             '</div>' +
    //                             '</section>' +
    //                             '</li>'
    //                         // html += `
    //                         //     <li>
    //                         //         <section > 
    //                         //             <a class="img" href="${res[i]['video_url']}" target="_blank">
    //                         //                 <i class="icon-play"></i>
    //                         //                 <img class="video-img" src="${res[i]['video_img_url']}"> 
    //                         //             </a> 
    //                         //             <div class="caption">
    //                         //                 <p>${res[i]['video_title']}</p>
    //                         //                 <footer>
    //                         //                     <small><i class="icon-like"></i>${res[i]['video_like']}</small ><small><i class="icon-comment"></i>${res[i]['video_comment']}</small> 
    //                         //                 </footer> 
    //                         //             </div> 
    //                         //         </section> 
    //                         //     </li>
    //                         // `
    //                     }
    //                     $('#yoo-list ul').append(html);
    //                     $('#yoo-list ul').imagesLoaded(function () {
    //                         waterFall()
    //                     });
    //                 },
    //                 error: function (res) {
    //                     console.log(res)
    //                 }
    //             })
    //         }
    //     }
    // }
})