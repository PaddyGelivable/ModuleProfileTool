$(document).ready(function(){
    tab();
});

function tab(){
    var headerList = getElementFromId('body_header').getElementsByTagName('a');
    var contentList = getElementFromId('body_content').getElementsByClassName('body-detailed-content');

    var lastone = 0;
    
    for(var i = 0; i < headerList.length; i++){
        var li = headerList[i];
        (function (i){
           li.onclick = function(){
            headerList[lastone].className = "";
            contentList[lastone].style.display="none";
            this.className = "current";
            contentList[i].style.display="block";
            lastone = i;
            } 
        })(i);
    }
};

function getElementFromId(id){
    return typeof id === "string" ? document.getElementById(id) : null;
};

function setSelectedRow(){
    var tableRows = getElementFromId('main_table_body').getElementsByTagName('tr');
    var lastrow = 0;
    for(var i=0; i < tableRows.length; i++){
        var currentRow = tableRows[i];
        (function (i){
            currentRow.onclick = function(){
                tableRows[lastrow].style.backgroundColor = "";
                tableRows[i].style.backgroundColor = "#c8c8c8";
                lastrow = i;
            }
        })(i);
    }
};


$(document).ready(function(){
    $.getJSON("modulelist.json", function(data){
        var modulelist = '';
        $.each(data, function(key, value){
            modulelist += '<tr>';
            modulelist += '<td>'+value.vendorname+'</td>';
            modulelist += '<td>'+value.moduleid+'</td>';
            modulelist += '<td>'+value.productcode+'</td>';
            modulelist += '<td>'+value.catalogname+'</td>';
            modulelist += '<td>'+value.modulerevision+'</td>';
            modulelist += '<td>'+value.profilerevision+'</td>';
            modulelist += '<td>'+'<span><a href="">View</a> <a href="">Download</a></span>'+'</td>';
            modulelist += '</tr>';
        });
        $('#main_table_body').append(modulelist);
        setSelectedRow();
    });
});
