$(document).ready(function(){
    tab();
    initializaData();
});

function tab(){
    var headerList = $('#body_header a');
    var contentList = $('#body_content .body-detailed-content');

    var editModuleHeaderList = $('#edit_module_body_header a');
    var editModuleContentList = $('#edit_module_body_content .edit-module-body-detailed-content');

    var lastone = 0;
    var lastEditModuleOne = 0;
    
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

    for(var i = 0; i < editModuleHeaderList.length; i++){
        var li = editModuleHeaderList[i];
        (function (i){
           li.onclick = function(){
            console.log(editModuleContentList[lastEditModuleOne]);
            editModuleHeaderList[lastEditModuleOne].className = "";
            editModuleContentList[lastEditModuleOne].style.display="none";
            this.className = "current";
            editModuleContentList[i].style.display="block";
            lastEditModuleOne = i;
            } 
        })(i);
    }
};

function setRowStyle(){
    var tableRows = $('#main_table_body tr');
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
            modulelist += '<td>'+'<span><a class="view-module" title="View module" href="#">View</a> <a class="download-module" title="Download module" download>Download</a> <a class="edit-module" href="#" title="Edit module">Edit</a></span>'+'</td>';
            modulelist += '</tr>';
        });
        $('#main_table_body').append(modulelist);
        setRowStyle();
        setViewAction();
        setDownloadFilePath();
        setEditAction();
        setCloseAction();
    });

    function setCloseAction(){
        var closeBtn = $('#close_button')[0];
        closeBtn.onclick = function(){
            var viewDetailed = $('#view_detailed')[0];
            viewDetailed.style.display = 'none';
        }

        var closeEditViewBtn = $('#close_button_edit_module_button')[0];
        closeEditViewBtn.onclick = function(){
            var editDetailed = $('#edit_module_div')[0];
            editDetailed.style.display = 'none';
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
            })
        })
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
        else if(productCodeValue === 8)
            return 'Specialty';
        else if(productCodeValue === 10)
            return 'Analog';
        else
            return '';  
    };

    function setProductType(productCodeValue){
        var productCodeOptions = $('#selectProductType option');
        if(productCodeValue === 7){
            productCodeOptions[1].selected = true;
        }
        else if(productCodeValue === 8){
            productCodeOptions[2].selected = true;
        }
        else if(productCodeValue === 10){
            productCodeOptions[0].selected = true;
        }
    };

    function setBaudRate(baudRateValue){
        var baudRateOptions = $('#selectMaxBaudRate option');
        var baudRateFormatValue = baudRateValue + ' Mbps';

        switch(baudRateFormatValue.toUpperCase()){
            case '2 MBPS':
                baudRateOptions[0].selected = true;
                break;
            case '4 MBPS':
                baudRateOptions[1].selected = true;
                break;
            case '8 MBPS':
                baudRateOptions[2].selected = true;
                break;
            case '16 MBPS':
                baudRateOptions[3].selected = true;
                break;
        }
    }

    function setDownloadFilePath(){
        var tableContent = $('#main_table_body .download-module');

        $.getJSON("modulelist.json", function(data){
            $.each(data, function(key, value){
                var downloadbutton = tableContent[key];
                downloadbutton.setAttribute('href', value.filepath);
            })
        })
    }; 

    function setEditAction(){
        var tableContent = $('#main_table_body .edit-module');
        for(var i = 0; i < tableContent.length; i++){
            var editbutton = tableContent[i];
            (function(i){
                var currentIndex = i;
                editbutton.onclick = function(){
                    editModuleProfile(currentIndex);    
                }
            })(i);
        }
    };

    function editModuleProfile(index){
        var viewDetailed = $('#edit_module_div')[0];
        viewDetailed.style.display = 'block';

        $.getJSON("modulelist.json", function(data){
            $.each(data, function(key, value){
                if(key === index){
                    var profileRevisionElement = $('#edit_profile_Revision_Value')[0];
                    var vendorIDElement = $('#edit_vendor_ID_Value')[0];
                    var vendorNameElement = $('#edit_vendor_Name_Value')[0];
                    var catalogNameElement = $('#edit_catalog_Name_Value')[0];
                    var productCodeElement = $('#edit_product_Code_Value')[0];
                    var moduleMajorRevisionElement = $('#edit_module_major_rev_Value')[0];
                    var moduleMinorRevisionElement = $('#edit_module_minor_rev_Value')[0];
                    var moduleSeriesElement = $('#edit_module_Series_Value')[0]; 
                    var minFWVersionElement = $('#edit_min_FWVersion_Value')[0];
                    var inputWordsElement = $('#edit_input_Words_Value')[0];
                    var outputWordsElement = $('#edit_output_Words_Value')[0];
                    profileRevisionElement.value = value.profilerevision;
                    vendorIDElement.value = value.vendorid;
                    vendorNameElement.value = value.vendorname;
                    catalogNameElement.value = value.catalogname;
                    productCodeElement.value = value.productcode;
                    setProductType(value.producttype);
                    setBaudRate(value.maximumbaudrate);
                    moduleMajorRevisionElement.value = getMajorRevision(value.modulerevision);
                    moduleMinorRevisionElement.value = getMinorRevision(value.modulerevision);
                    moduleSeriesElement.value = value.moduleseries; 
                    minFWVersionElement.value = value.minFWVersion;
                    inputWordsElement.value = value.inputword;
                    outputWordsElement.value = value.outpurword;
                    $('#input_Words_Label')[0].innerText = changeInputText(value.producttype);   
                    $('#output_Words_Label')[0].innerText = changeOutputText(value.producttype);
                }
            })
        })
    }

    function getMajorRevision(moduleRevision){  
        if(typeof(moduleRevision) === 'string'){
            var arr1 = moduleRevision.split(".");
            if(arr1.length >= 2){  
                return arr1[0];
            }
            else{
                return "";
            }
        }
    }

    function getMinorRevision(moduleRevision){
        if(typeof(moduleRevision) === 'string'){
            var arr1 = moduleRevision.split(".");
            if(arr1.length >= 2){
                return arr1[1];
            } 
            else{
                return "";
            }
        }
    }
}
