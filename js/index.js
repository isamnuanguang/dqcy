$(function(){
    let page = 0;
    let endCount = 20;
    let loadMore = false;
    let baseUrl = 'http://101.200.123.24:5555/';
    // let baseUrl = 'http://123.56.69.222:555/';
    let dataUrl =  baseUrl + '0/' + (page * endCount) + '/' + ((page * endCount) + endCount)
    $.ajax({
        url: dataUrl,
        type: 'get',
        success: function(res) {
            res = res.data;
            let html = '';
            for(let i = 0; i < res.length; i++) {
                html += '<li>'
                        + '<section>'
                        + '<a class="img" href="' + res[i]['video_url'] + '" target="_blank">'
                        + '<i class="icon-play"></i>'
                        + '<img class="video-img" src="' + res[i]['video_img_url'] + '">'
                        + '</a>' 
                        + '<div class="caption">'
                        + '<p>' + res[i]['video_title'] + '</p>'
                        + '<footer>'
                        + '<small><i class="icon-like"></i>' + res[i]['video_like'] + '</small ><small><i class="icon-comment"></i>' + res[i]['video_comment'] + '</small>'
                        + '</footer>'
                        + '</div>'
                        + '</section>'
                        + '</li>'
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
    window.onresize = function () {
        waterFall();
    };
    window.onscroll = function() {
        const clientHeight = document.documentElement.scrollTop === 0 ? document.body.clientHeight : document.documentElement.clientHeight;
        const scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
        if (clientHeight + scrollTop + 10 > scrollHeight) {
            this.console.log(123)
            if (loadMore) {
                page += 1;
                dataUrl = baseUrl + '0/' + (page * endCount) + '/' + ((page * endCount) + endCount)
                $.ajax({
                    url: dataUrl,
                    type: 'get',
                    success: function(res) {
                        res = res.data;
                        let html = '';
                        if (res.length < 20) {
                            loadMore = false;
                        }
                        for(let i = 0; i < res.length; i++) {
                            html += '<li>'
                                    + '<section>'
                                    + '<a class="img" href="' + res[i]['video_url'] + '" target="_blank">'
                                    + '<i class="icon-play"></i>'
                                    + '<img class="video-img" src="' + res[i]['video_img_url'] + '">'
                                    + '</a>' 
                                    + '<div class="caption">'
                                    + '<p>' + res[i]['video_title'] + '</p>'
                                    + '<footer>'
                                    + '<small><i class="icon-like"></i>' + res[i]['video_like'] + '</small ><small><i class="icon-comment"></i>' + res[i]['video_comment'] + '</small>'
                                    + '</footer>'
                                    + '</div>'
                                    + '</section>'
                                    + '</li>'
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
                    },
                    error: function (res) {
                        console.log(res)
                    }
                })
            } else {
                return false;
            }
        }
    }
})