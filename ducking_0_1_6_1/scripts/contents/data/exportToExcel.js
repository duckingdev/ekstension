function exportToExcel(itemDucking)
{
  $('.pengiriman').click(function ()
  {
    $('.pengiriman').removeAttr("style");
    $(this).css('border-color', '#ff9f34').css('color', '#ff9f34');
  });
  let dataDetails = [];
  $('#export-excel').click(function ()
  {
    dataDetails = [];
    $('.product-detail').each(function () {
      if($(this).is(':checked')) {

        let data = {
          img_link : $(this).data('detailsImgLink'),
          keterangan_1 : $(this).data('detailsKeterangan-1'),
          keterangan_2 : $(this).data('detailsKeterangan-2'),
          link : $(this).data('detailsLink'),
          price : $(this).data('detailsPrice'),
          product_name : $(this).data('detailsProductName'),
          qty : $(this).data('detailsQyt'),
          seller : $(this).data('detailsSeller'),
          total : $(this).data('detailsTotal'),
        }
        dataDetails.push(data);
      }
     
    });
    if($('.product-detail:checked').length == 0) {
      dataDetails = [];
      
    }

    if (!hasToken)
    {
      alert('Silahkan login terlebih dahulu');
      return;
    }
    $('input[name="kode_voucher"]').val('');
    const modalPilih = new bootstrap.Modal($('#modalPilih')[0], { keyboard: false });
    modalPilih.show();
    $('#overlay').show();
  });
  
  $('#close-modalpilih').click(function (){
    $('#hideCloseModalPilih').trigger("click")
    $('#overlay').hide();
  })

  $('#submit-excel').on('click', function ()
  {
    const modalPilihSuccess = new bootstrap.Modal(document.getElementById('modalPilihSuccess'), { keyboard: false });
    if (!hasToken)
    {
      alert('Silahkan login terlebih dahulu');
      return;
    }
    $('#modalPilih .btn-close').trigger("click");
    let pengiriman = $('input[name="pengiriman"]:checked').val();
    let kode_voucher = $('input[name="kode_voucher"]').val();
    let urlExport = `https://ext.duckingdelivery.com/data?pengiriman=${pengiriman}&voucher=${kode_voucher}`;
    $('#export-excel, #submit-excel').attr('disabled', true);
    $('#export-excel, #submit-excel').html('<i class="fa fa-spinner fa-spin"></i>');
    if(dataDetails.length > 0) {
      exportHandler(JSON.stringify(dataDetails));
    }else {
      
      itemDucking.get().then((dataLocal) =>
      {
        dataLocal = JSON.stringify(dataLocal.productDetails);
        exportHandler(dataLocal);
        return;
      });
    }
    function exportHandler (dataExport)
    {
      $.ajax({
        url: urlExport,
        type: 'POST',
        headers: {
          'Authorization': hasToken
        },
        data: {
          data: dataExport
        },
        success: function (res)
        {
          let urlFile = res.url;
          $.ajax({
            url: urlFile,
            type: 'GET',
            xhrFields: {
              responseType: 'blob'
            },
            success: function (data)
            {
              $('#export-excel, #submit-excel').attr('disabled', false);
              $('#submit-excel').html('Submit');
              $('#export-excel').html('<img src="' + iconExportExcel + '" width="47" height="47" class="d-inline-block align-top" alt="">');
              $('#hideCloseModalPilih').trigger("click");
              $('#overlay').show();
              modalPilihSuccess.show();
              $('#close-modalpilihsuccess').click(function (){
                $('#hideCloseModalPilihSuccess').trigger("click")
                $('#overlay').hide();
              })
              return;
            },
            error: function (error)
            {
              handleError(error);
            }
          });
          return;
        },
        error: function (error)
        {
          handleError(error);
        }
      });
    }
    return;
  })
}


function handleError(error)
{
  $('#export-excel, #submit-excel').attr('disabled', false);
  $('#submit-excel').html('Submit');
  $('#export-excel').html('<img src="' + iconExportExcel + '" width="47" height="47" class="d-inline-block align-top" alt="">');
  alert('Export failed');
  alert(error.message);
}
