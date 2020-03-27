$(function () {
    $.ajax({
        url: 'http://182.92.155.225:8000/v1/guest_ark/area/',
        type: 'get',
        success: function (res) {
            let html = '';
            if (res.result.length && res.result.length > 0) {
                for (let i = 0; i < res.result.length; i++) {
                    html += '<option value="' + res.result[i]['name'] + '">' + res.result[i]['name'] + '</option>'
                }
                $('.advertise-wrapper .select').append(html)
            }
        }
    })
    $('.form-btn').on('click', function () {
        let name = $('input[name="customerName"]').val(),
            phone = $('input[name="customerPhone"]').val(),
            company = $('input[name="companyName"]').val(),
            province = $('.select').val();
        if (name && phone && company && province) {
            if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
                $('input[name="customerPhone"]').addClass('error').siblings('.error').html('手机号格式错误').show()
                return false;
            }
            $('input[name="customerPhone"]').removeClass('error').siblings('.error').hide()
            $.ajax({
                url: 'http://182.92.155.225:8000/v1/guest_ark/customer_book/',
                type: 'post',
                data: {
                    name: name,
                    mobile: phone,
                    company: company,
                    province: province
                },
                success: function (res) {
                    alert("预约成功，稍候营销顾问会跟您取得联系");
                }
            })
        } else {
            alert('为方便顾问联系到您，请填写完整信息后提交');
            return;
        }

    })
})