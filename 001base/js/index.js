$(document).ready(function(){
    tab();
    initializaData();
});

function tab(){
    var headerList = $('#body_header a')[0];
    var contentList = $('#body_content .body-detailed-content')[0];

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

function setRowStyle(){
    var tableRows = $('#main_table_body')[0].getElementsByTagName('tr');
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
        var closeBtn = $('#close_button')[0];
        closeBtn.onclick = function(){
            var viewDetailed = $('#view_detailed')[0];
            viewDetailed.style.display = 'none';
        }
    };

    function setViewAction(){
        var tableContent = $('#main_table_body  .view-module');
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
        var viewDetailed = $('#view_detailed')[0];
        viewDetailed.style.display = 'block';

        $.getJSON("modulelist.json", function(data){
            $.each(data, function(key, value){
                if(key === index){
                    var profileRevisionElement = $('#profile_Revision_Value')[0];
                    var vendorIDElement = $('#vendor_ID_Value')[0];
                    var vendorNameElement = $('#vendor_Name_Value')[0];
                    var catalogNameElement = $('#catalog_Name_Value')[0];
                    var moduledescriptionElement = $('#module_Description_Value')[0];
                    var productCodeElement = $('#product_Code_Value')[0];
                    var productTypeElement = $('#product_Type_Value')[0];
                    var maxBaudRateElement = $('#max_BaudRate_Value')[0];
                    var moduleRevisionElement = $('#module_Rev_Value')[0];
                    var moduleSeriesElement = $('#module_Series_Value')[0];
                    var minFWVersionElement = $('#min_FWVersion_Value')[0];
                    var inputWordsElement = $('#input_Words_Value')[0];
                    var outputWordsElement = $('#output_Words_Value')[0];
                    profileRevisionElement.value = value.profilerevision;
                    vendorIDElement.value = value.vendorid;
                    vendorNameElement.value = value.vendorname;
                    catalogNameElement.value = value.catalogname;
                    moduledescriptionElement.value = value.description;
                    productCodeElement.value = value.productcode;
                    productTypeElement.value = getProductType(value.producttype);
                    maxBaudRateElement.value = value.maximumbaudrate + ' Mbps';
                    moduleRevisionElement.value = value.modulerevision;
                    moduleSeriesElement.value = value.moduleseries;
                    minFWVersionElement.value = value.minFWVersion;
                    inputWordsElement.value = value.inputword;
                    outputWordsElement.value = value.outpurword;
                    $('#input_Words_Label')[0].innerText = changeInputText(value.producttype);   
                    $('#output_Words_Label')[0].innerText = changeOutputText(value.producttype);
                }
            });
        });
    };

    function changeInputText(productCodeValue){
        if(productCodeValue === 7)
            return 'Input Bits:';
        else if(productCodeValue === 10)
            return 'Input Words:'; 
    };

    function changeOutputText(productCodeValue){
        if(productCodeValue === 7)
            return 'Output Bits:';
        else if(productCodeValue === 10)
            return 'Outputs Words:'; 
    };

    function getProductType(productCodeValue){
        if(productCodeValue === 7)
            return 'Digital';
        else if(productCodeValue === 10)
            return 'Analog'; 
    };

    function setDownloadAction(){
        var tableContent = $('#main_table_body .download-module');
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
        var tableContent = $('#main_table_body .edit-module');
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
