$.ajax({
    success: function(it){
        $('#login').click(usrLogin);
    }
});

function usrLogin(){
    var data;
    data = {
        user: $('#user').val(),
        pass: $('#pass').val()
    }
    if(data.user === '' || data.pass === ''){
        return showErrorMsg('請輸入帳號密碼');
    }
    else{
        hideErrorMsg();
        return $.ajax({
            url: 'php/login.php',
            type: 'POST',
            data: data,
            success: function(it){
                switch(parseInt(it)){
                    case 0:
                        return showErrorMsg('帳號或密碼錯誤');
                        break;
                    case 1:
                        alert( data.user +' 登入成功！');
                        return location.href = 'index.html';
                        break;
                }
            }
        });
    }
}
function showErrorMsg(it){
    return $('#msg').text(it);
    //return $('#errorMsg').addClass();
}
function hideErrorMsg(){
    return $('#msg').text();
    //return $('#errorMsg').addClass();
}
    
    
