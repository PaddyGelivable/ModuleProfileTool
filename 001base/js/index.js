//self executed function
(function(){
    tab();
})();

function tab(){
    var headerList = $('body_header').getElementsByTagName('a');
    var contentList = $('body_content').getElementsByClassName('body-detailed-content');
    var tableRows = $('main_table_body').getElementsByTagName('tr');

    var lastone = 0;
    var lastrow = 0;
    
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

function $(id){
    return typeof id === "string" ? document.getElementById(id) : null;
}
