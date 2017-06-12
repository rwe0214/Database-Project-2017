//$.ajax({
//    success: function(it){
        loadAccountList(5);
        
        $('#ins-submit').click(addAccount_ui);
        $('#sel-submit').click(getUiSel);
        $('#send').click(addAccount_sql);
        $('#uiBtn').click(showUiBtn);
        $('#sqlBtn').click(showSql);
        
        $('#insert').click(showUiInsert);
        $('#select').click(showUiSelect);
        $('#update').click(showUpId);     
        $('#id-submit').click(showUpForm2);
        $('#up-submit').click(updateUsr);
        
        $('#byTime').click(sortByTime);
        $('#byAmount').click(sortByAmount);
        $('#byCate').click(sortByCate);
        $('#byDep').click(sortByDep);
        $('#byProj').click(sortByProj);
//    }
//});

function updateUsr(){
    var data;
    data = {
        id: $('#up-id').val(),
        uname: $('#up-name').val(),
        mail: $('#up-mail').val(),
        dep: $('#up-dep').val(),
        proj1: $('#up-proj1').val(),
        proj2: $('#up-proj2').val()
    }
    if(data.uname==='' || data.mail==='' || data.dep==='' || data.proj1==='' || data.proj2==='' || data.id==='')
        alert('請輸入更新資料');
    else
        return $.ajax({
            url: 'php/update-user.php',
            type: 'POST',
            data: data,
            success: function(it){
                d3.select('#getUsr').selectAll('tr').remove();
                getUsr();
            }
        });

}

function getUsr(){   
    var data;
    data = {
        id: $('#up-id').val()
    }
    if(data.id==='')
        return alert('請輸入員工編號');
    else
        return $.ajax({
            url: 'php/get-user.php',
            type: 'POST',
            data: data,
            success: function(it){
                $('#usrTab').show();
                d3.select('#getUsr').selectAll('tr').remove();
                return d3.select('#getUsr').selectAll('tr').data(JSON.parse(it)).enter().append('tr').selectAll('td').data(function(it){
                var data;
                return data = [it.u_id, it.u_name, it.u_mail,it.proj1, it.proj2, it.department];
            }).enter().append('td').html(function(it){
                return it;
            });
            }
        });

}

function addAccount_sql(){
    var data;
    data = {
        sql: $('#sql').val()
    }
    if(data.sql==='')
        return showErrorMsg('資料未輸入');
    else{
        return $.ajax({
                url: 'php/usr-mysql.php',
                type: 'POST',
                data: data,
                success: function(it){
                    hideErrorMsg();
                    alert('MySqol 語法已送進資料庫！');
                }
            });
    }
        
}

function addAccount_ui(){
    var data;
    data = {
        date: $('#date').val(),
        category: $('#category').val(),
        amount: $('#amount').val(),
        user: $('#user').val(),
        commit: $('#commit').val()
    }
    if(data.date === '' || data.amount==='' || data.user==='' || data.category==='0' || data.amount <= '0' || data.user <= '0'){
        return showErrorMsg1('資料未完全輸入');
    }
    else
        return $.ajax({
                url: 'php/add-account.php',
                type: 'POST',
                data: data,
                success: function(it){
                    hideErrorMsg1();
                    alert('success');
                    location.reload();
                }
            });
}

function showUpId(){
    $('#usrTab').hide();
    $('#sqlForm').hide();
    $('#uiInsertForm').hide();
    $('#uiSelectForm').hide();
    $('#uiSelTab').hide();
    $('#uiInsertForm').hide();
    $('#uiSelectForm').hide();
    $('#updateForm2').hide();
    return $('#updateForm1').toggle();
}

function showUpForm2(){
    
    $('#updateForm1').hide();
    
    getUsr();
    return $('#updateForm2').show();
}

function showSql(){
    $('#updateForm1').hide();
    $('#updateForm2').hide();
    $('#usrTab').hide();
    $('#ui').hide();
    $('#uiInsertForm').hide();
    $('#uiSelectForm').hide();
    $('#uiSelTab').hide();
    return $('#sqlForm').toggle();
}

function showUiBtn(){
    $('#updateForm1').hide();
    $('#updateForm2').hide();
    $('#usrTab').hide();
    $('#sqlForm').hide();
    $('#uiInsertForm').hide();
    $('#uiSelectForm').hide();
    $('#uiSelTab').hide();
    return $('#ui').toggle();
}

function showUiInsert(){
    $('#updateForm1').hide();
    $('#updateForm2').hide();
    $('#usrTab').hide();
    $('#sqlForm').hide();
    $('#uiSelectForm').hide();
    $('#uiSelTab').hide();
    return $('#uiInsertForm').toggle();
}

function showUiSelect(){
    $('#updateForm1').hide();
    $('#updateForm2').hide();
    $('#usrTab').hide();
    $('#sqlForm').hide();
    $('#uiInsertForm').hide();
    $('#uiSelTab').hide();
    return $('#uiSelectForm').toggle();
}

function delAccount(it){
    var data;
    data = {
        target: it
    }
    return $.ajax({
            url: 'php/del-account.php',
            type: 'POST',
            data: data,
            success: function(it){
                alert('delete success');
                location.reload();
            }
        });
}

function loadAccountList(it){
    var data;
    data = {
        by: it
    }
    return $.ajax({
        url: 'php/get-account.php',
        type: 'POST',
        data: data,
        success: function(it){
             d3.select('#getAmount').selectAll('tr').data(JSON.parse(it)).enter().append('tr').selectAll('td').data(function(it){
                var data;                
                return data = [it.date, it.c_name, it.u_name, it.d_name, it.p_name, it.commit, it.amount,"<button onclick=delAccount("+it.num+") class='btn btn-danger'>delete</button>"];
            }).enter().append('td').html(function(it){
                return it;
            });
            getSum();
        }
    });
}

function getSum(){
    return $.ajax({
        url: 'php/get-sum.php',
        type: 'POST',
        success: function(it){
            var data = JSON.parse(it);           
            $('#getSum').text(data[0]["total"]+" 元");
        }
    })
}

function getUiSel(){
    var data;
    var type;
    var i=1;
    d3.select('#getSel').selectAll('tr').remove();
    $('#uiSelTab').show();
    if($('#user1').val()!=='' && $('#proj1').val()==='' && $('#dep1').val()==='')
        type=1;
    else if($('#user1').val()==='' && $('#proj1').val()!=='' && $('#dep1').val()==='')
        type=2;
    else if($('#user1').val()==='' && $('#proj1').val()==='' && $('#dep1').val()!=='')
        type=3;
    else
        return showErrorMsg2('以上請擇一填入查詢');
    data = {
        type: type,
        u_id: $('#user1').val(),
        p_id: $('#proj1').val(),
        d_id: $('#dep1').val()
    }
    return $.ajax({
        url: 'php/get-ui-select.php',
        type: 'POST',
        data: data,
        success: function(it){
            return d3.select('#getSel').selectAll('tr').data(JSON.parse(it)).enter().append('tr').selectAll('td').data(function(it){
                var data;
                return data = [i++, it.u_id, it.u_name, it.proj1, it.proj2, it.department];
            }).enter().append('td').html(function(it){
                return it;
            });
        }
    });
}

function sortByTime(){
    d3.select('#getAmount').selectAll('tr').remove();
    return loadAccountList(0);
}

function sortByAmount(){
    d3.select('#getAmount').selectAll('tr').remove();
    return loadAccountList(1);
}

function sortByCate(){
    d3.select('#getAmount').selectAll('tr').remove();
    return loadAccountList(2);
}

function sortByDep(){
    d3.select('#getAmount').selectAll('tr').remove();
    return loadAccountList(3);
}

function sortByProj(){
    d3.select('#getAmount').selectAll('tr').remove();
    return loadAccountList(4);
}


function showErrorMsg(it){
    return $('#msg').text(it);
    //return $('#errorMsg').addClass();
}
function hideErrorMsg(){
    return $('#msg').text('');
    //return $('#errorMsg').addClass();
}
function showErrorMsg1(it){
    return $('#msg1').text(it);
    //return $('#errorMsg').addClass();
}
function hideErrorMsg1(){
    return $('#msg1').text('');
    //return $('#errorMsg').addClass();
}
function showErrorMsg2(it){
    return $('#msg2').text(it);
    //return $('#errorMsg').addClass();
}
function hideErrorMsg2(){
    return $('#msg2').text('');
    //return $('#errorMsg').addClass();
}
