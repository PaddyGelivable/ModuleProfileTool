$(document).ready(function(){
    initializeLayout();
    initializeData();
    initializeAction();
});

var currentEditIndex;
var moduleInfoList;

function initializeLayout(){
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

function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null
    });
}

function initializeAction(){
    $('#btnUpdate').click(function() {
         ajaxHelper("http://localhost:58522/api/ModuleInfoes"+ "/" + currentEditIndex, 'PUT', GetJsonData()).done(function () {
            currentEditIndex = -1;
            var viewDetailed = $('#edit_module_div')[0];
            viewDetailed.style.display = 'none';
            location.reload(true);
        });
    });

    $('#btnCancel').click(function(){
        currentEditIndex = -1;
        var viewDetailed = $('#edit_module_div')[0];
        viewDetailed.style.display = 'none';
    });
}

function GetJsonData() {
    var currentEditModule = moduleInfoList[currentEditIndex - 1];
    currentEditModule.ProfileRevision = $('#edit_profile_Revision_Value').val();
    currentEditModule.VendorName = $('#edit_vendor_Name_Value').val();
    currentEditModule.VendorID = $('#edit_vendor_ID_Value').val();
    currentEditModule.CatalogName = $('#edit_catalog_Name_Value').val();
    currentEditModule.ProductCode = $('#edit_product_Code_Value').val();
    currentEditModule.ModuleSeries = $('#edit_module_Series_Value').val();
    currentEditModule.MinFWVersion = $('#edit_min_FWVersion_Value').val();
    currentEditModule.InputWord = $('#edit_input_Words_Value').val();
    currentEditModule.OutPutWord = $('#edit_output_Words_Value').val();
    currentEditModule.ProductType = getProductTypeValue();
    currentEditModule.MaximumBaudRate = getMaximumBaudRateValue();
    currentEditModule.ModuleRevision = $('#edit_module_major_rev_Value').val() + "." + $('#edit_module_minor_rev_Value').val();
    currentEditModule.ModuleID = $('#edit_module_ID_Value').val();
    currentEditModule.Description = $('#edit_Module_Description_Value').val();
    currentEditModule.MaximumLength = $('#edit_Maximum_Length_Value').val();
    //currentEditModule.FilePath = $('#edit_product_Code_Value').val();
    return currentEditModule;
}

function getProductTypeValue() {
    var productCodeOptions = $('#selectProductType option');

    if(productCodeOptions[0].selected === true)
        return 10;
    else if(productCodeOptions[1].selected === true)
        return 7;
    else if(productCodeOptions[2].selected === true)
        return 8;
    else
        return 7;
}

function getMaximumBaudRateValue() {
    var baudRateOptions = $('#selectMaxBaudRate option');

    if(baudRateOptions[0].selected === true)
        return 2;
    else if(baudRateOptions[1].selected === true)
        return 4;
    else if(baudRateOptions[2].selected === true)
        return 8;
    else
        return 8; 
}

function initializeData(){
    ajaxHelper("http://localhost:58522/api/ModuleInfoes", 'GET').done(function (data) {
        moduleInfoList = data;
        var modulelist = '';
        $.each(data, function(key, value){
            modulelist += '<tr>';
            modulelist += '<td>'+value.VendorName+'</td>';
            modulelist += '<td>'+value.ModuleID+'</td>';
            modulelist += '<td>'+value.ProductCode+'</td>';
            modulelist += '<td>'+value.CatalogName+'</td>';
            modulelist += '<td>'+value.ModuleRevision+'</td>';
            modulelist += '<td>'+value.ProfileRevision+'</td>';
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
            currentEditIndex = -1;
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

        index = index + 1;
        ajaxHelper("http://localhost:58522/api/ModuleInfoes" + "/" + index, 'GET').done(function(data){
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
            profileRevisionElement.value = data.ProfileRevision;
            vendorIDElement.value = data.VendorID;
            vendorNameElement.value = data.VendorName;
            catalogNameElement.value = data.CatalogName;
            moduledescriptionElement.value = data.Description;
            productCodeElement.value = data.ProductCode;
            productTypeElement.value = getProductType(data.ProductType);
            maxBaudRateElement.value = data.MaximumBaudRate + ' Mbps';
            moduleRevisionElement.value = data.ModuleRevision;
            moduleSeriesElement.value = data.ModuleSeries;
            minFWVersionElement.value = data.MinFWVersion;
            inputWordsElement.value = data.InputWord;
            outputWordsElement.value = data.OutPutWord;
            $('#input_Words_Label')[0].innerText = changeInputText(data.ProductType);
            $('#output_Words_Label')[0].innerText = changeOutputText(data.ProductType);
        });
    };

    function changeInputText(productTypeValue){
        if(productTypeValue === 7)
            return 'Input Bits:';
        else
            return 'Input Words:'; 
    };

    function changeOutputText(productTypeValue){
        if(productTypeValue === 7)
            return 'Output Bits:';
        else
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
    }

    function setProductType(productCodeValue){
        var productCodeOptions = $('#selectProductType option');

        switch(productCodeValue){
            case 10:
                productCodeOptions[0].selected = true;
                break;
            case 7:
                productCodeOptions[1].selected = true;
                break;
            case 8:
                productCodeOptions[2].selected = true;
                break;
        }
    }

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

        index = index + 1;
        currentEditIndex = index;
        ajaxHelper("http://localhost:58522/api/ModuleInfoes" + "/" + index, 'GET').done(function(value){
            var profileRevisionElement = $('#edit_profile_Revision_Value')[0];
            var moduleIDElement = $('#edit_module_ID_Value')[0];
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
            var moduleDescriptionElement = $('#edit_Module_Description_Value')[0];
            var maximumLengthElement = $('#edit_Maximum_Length_Value')[0];
            var imageFileNameElement = $('#edit_module_Image_Value')[0];
            var iconFileNameElement = $('#edit_module_Icon_Value')[0];
            var moduleConfigurationElement = $('#edit_Module_Condfiguration_Value')[0];
            var thirdPartyToolSupportedElement = $('#edit_Module_ThirdParty_Support')[0];
            profileRevisionElement.value = value.ProfileRevision;
            vendorIDElement.value = value.VendorID;
            moduleIDElement.value = value.ModuleID;
            vendorNameElement.value = value.VendorName;
            catalogNameElement.value = value.CatalogName;
            productCodeElement.value = value.ProductCode;
            setProductType(value.ProductType);
            setBaudRate(value.MaximumBaudRate);
            moduleMajorRevisionElement.value = getMajorRevision(value.ModuleRevision);
            moduleMinorRevisionElement.value = getMinorRevision(value.ModuleRevision);
            moduleSeriesElement.value = value.ModuleSeries; 
            minFWVersionElement.value = value.MinFWVersion;
            inputWordsElement.value = value.InputWord;
            outputWordsElement.value = value.OutPutWord;
            $('#edit_input_Words_Label')[0].innerText = changeInputText(value.ProductType);   
            $('#edit_output_Words_Label')[0].innerText = changeOutputText(value.ProductType);
            moduleDescriptionElement.value = value.Description;
            maximumLengthElement.value = value.MaximumLength;
            imageFileNameElement.value =value.ImageName;
            iconFileNameElement.value = value.IconName;
            moduleConfigurationElement.value = value.DefaultConfigurationData;
            
            if(value.IsSupportThirdPartyTool){
                $('#edit_Module_ThirdParty_Support').prop("checked", true);
            }
            else{
                $('#edit_Module_ThirdParty_Support').prop("checked", false);
            }
        });
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
