$(document).ready(function(){
    tab();
    initializaData();
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

function setRowStyle(){
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

function initializaData(){
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
            modulelist += '<td>'+'<span><a class="view-module" title="View module" href="#">View</a> <a class="download-module" href="#" title="Download module">Download</a> <a class="edit-module" href="#" title="Edit module">Edit</a></span>'+'</td>';
            modulelist += '</tr>';
        });
        $('#main_table_body').append(modulelist);
        setRowStyle();
        setViewAction();
        setDownloadAction();
        setEditAction();
        setCloseAction();
    });

    function setCloseAction(){
        var closeBtn = getElementFromId('close_button');
        closeBtn.onclick = function(){
            var viewDetailed = getElementFromId('view_detailed');
            viewDetailed.style.display = 'none';
        }
    };

    function setViewAction(){
        var maintablebody = getElementFromId('main_table_body');
        var tableContent = maintablebody.getElementsByClassName('view-module');
        for(var i = 0; i < tableContent.length; i++){
            var viewbutton = tableContent[i];
            (function(i){
                var currentIndex = i;
                 viewbutton.onclick = function(){
                    viewModuleInfo(currentIndex);
                } 
            })(i);
        }
    };

    function viewModuleInfo(index){
        var viewDetailed = getElementFromId('view_detailed');
        viewDetailed.style.display = 'block';
        console.log(index);

        $.getJSON("modulelist.json", function(data){
            $.each(data, function(key, value){
                if(key === index){
                    var profileRevisionElement = getElementFromId('profile_Revision_Value');
                    profileRevisionElement.value = value.profilerevision;
                    console.log(profileRevisionElement.value);
                    console.log(value);
                }
            });
        });
    };

    function setDownloadAction(){
        var maintablebody = getElementFromId('main_table_body');
        var tableContent = maintablebody.getElementsByClassName('download-module');
        for(var i = 0; i < tableContent.length; i++){
            var downloadbutton = tableContent[i];
            (function(i){
                var currentIndex = i;
                downloadbutton.onclick = function(){
                    alert('Dowload ' + currentIndex);    
                }
            })(i);
        }
    };

    function setEditAction(){
        var maintablebody = getElementFromId('main_table_body');
        var tableContent = maintablebody.getElementsByClassName('edit-module');
        for(var i = 0; i < tableContent.length; i++){
            var editbutton = tableContent[i];
            (function(i){
                var currentIndex = i;
                editbutton.onclick = function(){
                    alert('Edit '+ currentIndex);    
                }
            })(i);
        }
    };
}
