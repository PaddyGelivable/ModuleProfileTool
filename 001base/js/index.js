//self executed function
(function(){
    tab();
})();

function tab(){
    var headerList = $('body_header').getElementsByTagName('a');
    var contentList = $('body_content').getElementsByClassName('body-detailed-content');
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

function $(id){
    return typeof id === "string" ? document.getElementById(id) : null;
}
