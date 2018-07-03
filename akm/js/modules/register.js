$(function(){
    // fastClick
    FastClick.attach(document.body);



    // 账号请求确认是否已经存在
    $('#idAccount').on('blur', function(){

    });

    $('.login_button').on('click', function() {
        var userName = $('#idTel').val();
        var idPsd = $('#idPsd').val();
        if(!userName){
            alert('手机号码不能为空');
            return ;
        }
        if(!idPsd){
            alert('密码不能为空');
            return ;
        }

        Api.login("POST",function(data){
            if(data){
                // 这里要定义 后端错误码 501 账号不存在，502 密码错误
                if(data.status == 200){
                    //TODO 这里要存储信息到cookie里面
                    location.href = 'admin.html';
                }else
                if(data.status == 501){
                    alert('账号不存在');
                    return;
                }else
                if(data.status == 502){
                    alert('密码错误');
                    return;
                }else{
                    alert("服务器错误");
                }

            }
        },function(data){
            if(data){
                alert("服务器错误");
            }
        });

    });



});


