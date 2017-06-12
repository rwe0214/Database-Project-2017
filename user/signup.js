$.ajax({
    success: function(it){
        $('#submit').click(function(){
            var data;
            data = {
                name: $('#name').val(),
                mail: $('#mail').val(),
                user: $('#user').val(),
                pass: $('#pass').val(),
                veri: $('#veri').val()
            }        
            if(data.name==='' || data.mail==='' || data.user==='' || data.pass==='' || data.veri===''){
                return showErrorMsg('上列資料請確實填寫');
            }
            else if(data.pass !== data.veri){
                return showErrorMsg('密碼確認錯誤');
            }
            else{
                $.ajax({
                    url: 'php/add-user.php',
                    type: 'POST',
                    data: data,
                    success: function(it){                        
                        switch(parseInt(it)){
                            case 0:
                                return showErrorMsg('此帳號或信箱已被使用');
                                break;
                            case 1:
                                alert('註冊成功！');
                                return location.href = 'index.html';
                                break;
                        }
                    }
                });
            }
        });
    function showErrorMsg(it){
        return $('#msg').text(it);
        //return $('#errorMsg').addClass();
    }
    function hideErrorMsg(){
        return $('#msg').text();
        //return $('#errorMsg').addClass();
    }
        return hideErrorMsg;
    }
});
