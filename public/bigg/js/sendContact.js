function btnSend() {
    var name = jQuery("#concact_name").val();//您的称呼
    var email = jQuery("#concact_email").val();//您的邮箱
    var message = jQuery("#concact_msg").val();//您的想法
    var btnTxt =  jQuery(".submit").val();
    if (name.length == 0) {
        alert("称呼不能为空!/name can't be empty");
        return;
    }
    if (email.length == 0) {
        alert("邮箱不能为空!/email can't be empty");
        return;
    }

    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(email)) {
        alert('请输入有效的E_mail!/email is not valid');
        return;
    }

    if (message.length < 10) {
        alert("意见不能不能少于20个字符!/message can't be less 10 characters");
        return;
    }
    jQuery(".submit").attr("disabled",true);
    jQuery(".submit").val("正在发送，请稍等！/message is sending,please wait");

    var postData = JSON.stringify(
        {
            name:name,
            email:email,
            message:message
        }
    );

    // 向后台发送处理数据
    jQuery.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        contentType: "application/json",
        url: '/v1/api/sendmail', //目标地址
        data: postData,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("发送失败，请联系在线客服！/send fail");
            jQuery(".submit").val(btnTxt);
            jQuery(".submit").attr("disabled",false);
        },
        success: function (msg) {
            jQuery(".submit").val(btnTxt);
            alert("发送成功!／success!");
            jQuery("#concact_msg").val("");
            jQuery(".submit").attr("disabled",false);
        }
    });
}