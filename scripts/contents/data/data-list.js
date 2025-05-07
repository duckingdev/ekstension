let dataList = function (itemDucking)
{
  if (localStorage.getItem('tokenDucking') !== null)
  {

    if (window.location.href.split('/')[2] === 'detail.1688.com')
    {
      $.get(chrome.runtime.getURL('/1688/data-list_.html'), function (data)
      {
        $('body').append(data);
        $('#listCart').click(function ()
        {
          console.log('clicked');
          $('#export-excel').html('<img src="' + iconExportExcel + '" width="47" height="47" class="d-inline-block align-top" alt="">');
          // change all <link rel="stlesheet" to <links rel="stlesheet" 
          $('head').html().replace(/<link rel="stylesheet"/g, '<links rel="stylesheet"');
          $('#cardList').html('');
          $('#loading').fadeIn('fast', function () { });
          const modalListPembelian = new bootstrap.Modal(document.getElementById('modalListPembelian'), { keyboard: false });
          if (hasToken)
          {
            modalListPembelian.show();
            // remove all item
            itemDucking.get().then((data) =>
            {
              $('#loading').fadeOut('fast', function ()
              {
                let prodDetail = data.productDetails;
                let dataWeb = data.web;
                let html = "";
                let qtyS = 0;
                let totalS = 0;
                let emptyImage = "https://via.placeholder.com/150/?text=No+Image";
                // foreach data
                $.each(dataWeb, function (key, value)
                {
                  if (value.sellers.length > 0)
                  {
                    let styleBg = "";
                    let logoImg = "";

                    if (value.name == 'Taobao')
                    {
                      logoImg = taobaoLogo;
                    }
                    if (value.name == 'Tmall')
                    {
                      logoImg = tmallLogo;
                    }
                    if (value.name == '1688')
                    {
                      logoImg = logo1688;
                    }
                    html += '<div class="web" style="padding: 8px;background: #fff; margin-bottom:16px"> <div class="border-0" style="background: rgba(0, 0, 0, 0.03);padding: 8px 16px; border-radius: 4px;margin-bottom:16px"><img src="' + logoImg + '"  height="25"></div>'
                    $.each(value.sellers, function (_keySeller, valueSeller)
                    {
                      let sellerName = valueSeller.name;
                      html += '<div class="seller" style="padding:16px 32px;" data-id="' + valueSeller.id + '">';
                      html += '<div class="seller-name-ducking fw-bold" style=" margin-bottom: 16px;"><input type="checkbox" data-id="' + valueSeller.id + '" data-checked="seller" class="form-check-input shadow-none " style="margin-right: 4px;"> <span>' + sellerName + '</span> </div>'
                      html += ''
                      $.each(valueSeller.products, function (_keyProduct, valueProduct)
                      {
                        html += '<div class="produk" style=" margin-bottom: 16px;">';
                        html += `<div class="left-prod" style="float:left;width:8%"><input type="checkbox" data-seller-id="${valueSeller.id}" data-id="${valueProduct.id}" data-checked="item" class="form-check-input shadow-none " style="margin-right: 4px;"> <img src="${valueProduct.img_link ? valueProduct.img_link : emptyImage}" alt="" width="60" height="60" style="border-radius: 5px;"></div>`;
                        html += '<div class="right-prod" style="float:left;width: 92%;">'
                        html += ` <div class="nama-produk" style="float:left;width:97%">
                          <a href="${valueProduct.link}" class="product-name-ducking" terget="_BLANK">${valueProduct.name}</a>
                          </div>`
                        html += `<div style="float:right"> </div>`;
                        html += `<div class="clearfix"></div>`;
                        html += '<ul class="list-unstyled" style="margin-top:8px">'
                        $.each(valueProduct.product_details, (_keyVariant, valueVariant) =>
                        {
                          let keterangan1 = valueVariant.keterangan_1 != null ? valueVariant.keterangan_1 : '-';
                          let keterangan2 = valueVariant.keterangan_2 != null ? valueVariant.keterangan_2 : '-';
                          let qty = valueVariant.qty;
                          qtyS += qty;
                          let price = valueVariant.price;
                          let total = valueVariant.total;
                          totalS += parseFloat(total);
                          html += `<li  style="padding-bottom:4px">
                                      <div style="float:left;width:27%;background:#f8f8f8" >
                                        <input type="checkbox" data-seller-id="${valueSeller.id}" data-id="${valueVariant.id}" data-item-id="${valueProduct.id}"  data-total="${total}" data-qty="${qty}" data-checked="detailitem" 
                                          data-details-img-link="${valueProduct.img_link ? valueProduct.img_link : emptyImage}" data-details-keterangan-1="${keterangan1}" data-details-keterangan-2="${keterangan2}" data-details-price="${price}" data-details-product-name="${valueProduct.name}" data-details-seller="${valueSeller.name}" data-details-qyt="${qty}" data-details-total="${total}" data-details-link="${valueProduct.link}" 
                                          style="margin-right: 4px;" class="form-check-input shadow-none product-detail">
                                        <span>${keterangan1}</span>
                                      </div>
                                      <div style="float:left;width:27%;background:#f8f8f8">
                                        <span>${keterangan2}</span>
                                      </div>
                                      
                                      <div style="float:left;width:16%;padding-right: 12px;padding-left: 12px;" class="text-center qty-ducking">
                                        <span style="background:#f8f8f8" class="d-block">${qty} Pcs</span>
                                      </div>
                                      <div style="float:left;width:5%" class="text-center">
                                        <span> <button class="btn btn-sm  deleteproduct p-0" style="font-size:16px;"  data-id="${valueVariant.id}" data-w="productDetail" style="font-size:10px"><i class="far fa-trash-alt"></i></button></span>
                                      </div>
                                      <div style="float:right;width:5%" class="text-end">
                                        <span style="visibility:hidden">. </span>
                                      </div>
                                      <div style="float:right;width:10%;color: #d74200;font-size: 12px;font-weight: 700;" class="text-end total-ducking">
                                        <span>${total}</span>
                                      </div>
                                      <div style="float:right;width:10%" class="text-end">
                                        <span>${price}</span>
                                      </div>
                                      <div class="clearfix"></div>
                                    </li>`
                        })
                        html += '</ul>'
                        html += '</div>'
                        html += '<div class="clearfix"></div>'
                        html += '</div>'

                      });
                      html += '</div>';
                    });
                    html += '</div>';
                  }
                  $('.qty').html(qtyS);
                  $('.total-harga').html(parseFloat(totalS).toFixed(2));
                });
                if (prodDetail.length > 0)
                {
                  $('#checkAll').attr('disabled', false);
                  let productDetailId = [];
                  $("#cardList").html(html);
                  $('#export-excel').show();
                  // if checked click
                  checkboxHandler(productDetailId);
                  $('#deleteSelected').click(function ()
                  {

                    // modal delete
                    modalSelectedDeleted();
                    $('#yesDeletedSelected').click(function ()
                    {
                      $('.contentDeleted').html(` <div class="modal-body text-center" style="padding:25px 5px; font-size:16px">
                      <i class="fas fa-spinner fa-spin"></i>
                    </div>`);
                      let id = $('#customDelete').attr('data-id');
                      // check if not disabled
                      if (!$(this).hasClass('disabled'))
                      {
                        // disable button
                        $(this).addClass('disabled');
                        // show loading
                        $(this).html('<i class="fas fa-spinner fa-spin"></i>');
                        let inputDetail = $('input[data-checked="detailitem"]');
                        let inputDetailChecked = $('input[data-checked="detailitem"]:checked');
                        let inputSeller = $('input[data-checked="seller"]');
                        let w = $(this).attr('data-w');
                        if (inputDetail.length == inputDetailChecked.length)
                        {
                          id = [];
                          inputSeller.each(function ()
                          {
                            id.push($(this).data('id'));
                          });
                          id = JSON.stringify(id);
                          w = 'seller';
                        } else
                        {
                          // id to array
                          id = [];
                          inputDetailChecked.each(function ()
                          {
                            id.push($(this).data('id'));
                          });
                          id = JSON.stringify(id);
                        }
                        itemDucking.delete(id, w, '1688').then(function (response)
                        {
                          document.getElementById('modalDelete').remove();
                          $('#deleteSelected').removeClass('disabled');
                          productDetailId = [];
                          $('#customDelete').removeAttr('data-id');
                          // uncheck all checkbox
                          $('.form-check-input').prop('checked', false).prop('indeterminate', false);
                          // hide delete button
                          $('#deleteSelected').html(' <i class="fas fa-trash"></i>');
                          $('#customDelete').hide();
                          if ($('#cardList>.web').length > 0)
                          {
                            $('#cardList>.web').each(function ()
                            {
                              if ($(this).find('.seller').length == 0)
                              {
                                $(this).remove();
                              }
                            });
                          }
                          if ($('#cardList>.web').length == 0)
                          {
                            $('#cardList').html('<div class="text-center bg-white" style="border-radius: 5px;padding: 8px;">Tidak ada data</div>');
                            $('#checkAll').attr('disabled', true);
                            $('#export-excel').hide();
                          }
                          alertDucking('#alertDuckingModal', 'Selected items has been deleted.', 'info',);
                          qtyTotals(qtyS, totalS);

                          return
                        });
                        return;
                      }
                      return;
                    })

                    return;

                    function modalSelectedDeleted()
                    {
                      $('body').append(`
                      <div class="modal fade show" id="modalDelete" tabindex="-1" role="dialog"  data-bs-dismiss="modal" aria-label="Close" aria-labelledby="exampleModalLabel" aria-modal="true" style="display: block;background: #32323299;padding-right: 17px;z-index: 999999999;">
                        <div class="modal-dialog shadow-sm" role="document" style="border-radius:2px;margin: 100px auto;">
                          <div class="modal-content contentDeleted" style="padding:15px;border-radius: 10px;">
                            <div class="modal-body text-center" style="padding:25px 5px; font-size:16px">
                              <p>Anda yakin ingin menghapus produk ini?</p>
                            </div>
                            <div class="modal-footer border-0" style="padding:15px 0px;">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="document.getElementById('modalDelete').remove()" data-bs-dismiss="modal" aria-label="Close" style="padding:5px;border-radius:2px;margin: 0 10px;font-size:16px;">Batal</button>
                              <button type="button" class="btn m-0 btn-danger"  style="padding:5px;border-radius:2px;font-size:16px" id="yesDeletedSelected" button>Hapus</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    `);
                      return
                    }
                    // itemDucking.delete(id, 'productDetail')
                  });
                } else
                {
                  $('#cardList').html('<div class="text-center bg-white" style="border-radius: 5px;padding: 8px;">Tidak ada data</div>');
                  $('#export-excel').hide();
                }
                $('.deleteproduct').on('click', function ()
                {
                  let confirmDelete = confirm('Anda yakin ingin menghapus produk ini?'
                  );
                  if (confirmDelete)
                  {
                    $(this).addClass('disabled');
                    let dataId = $(this).data('id');
                    let w = $(this).data('w');
                    itemDucking.delete(dataId, w, '1688').then((res) =>
                    {
                      if ($('#cardList>.web').length > 0)
                      {
                        $('#cardList>.web').each(function ()
                        {
                          if ($(this).find('.seller').length == 0)
                          {
                            $(this).remove();
                          }
                        })
                      }
                      if ($('#cardList>.web').length == 0)
                      {
                        $('#cardList').html('<div class="text-center bg-white" style="border-radius: 5px;padding: 8px;">Tidak ada data</div>');
                        $('#export-excel').hide();
                      }
                      qtyTotals(qtyS, totalS);
                      return;
                    });
                    return;
                  }
                });
              });
            });
            return;
          } else
          {
            alertDucking('#duckingAlert', 'Silahkan login terlebih dahulu');
            return;
          }
        });
        exportToExcel(itemDucking);
      })
    } else
    {
      $.get(chrome.runtime.getURL('/taobao/data-list_.html'), function (data)
      {
        $('body').append(data);
        $('#listCart').click(function ()
        {
          $('#export-excel').html('<img src="' + iconExportExcel + '" width="47" height="47" class="d-inline-block align-top" alt="">');
          $('#cardList').html('');
          $('#loading').fadeIn('fast', function () { });
          const modalListPembelian = new bootstrap.Modal(document.getElementById('modalListPembelian'), { keyboard: false });

          if (hasToken)
          {
            modalListPembelian.show();
            // remove all item
            itemDucking.get().then((data) =>
            {
              $('#loading').fadeOut('fast', function ()
              {
                let qtyS = 0;
                let totalS = 0.00;
                let prodDetail = data.productDetails;
                let dataWeb = data.web;
                let html = "";
                let emptyImage = "https://via.placeholder.com/150/?text=No+Image";
                // foreach data
                $.each(dataWeb, function (_key, value)
                {
                  if (value.sellers.length > 0)
                  {
                    let styleBg = "";
                    let logoImg = "";
                    if (value.name == 'Taobao')
                    {
                      logoImg = taobaoLogo;
                    }
                    if (value.name == 'Tmall')
                    {
                      logoImg = tmallLogo;
                    }
                    if (value.name == '1688')
                    {
                      logoImg = logo1688;
                    }
                    html += '<div class="card mb-4 border-0 p-2"style="' + styleBg + '"><div class="card-header border-0"><img src="' + logoImg + '" height="25"></div><div class="card-body">';
                    $.each(value.sellers, function (_keySeller, valueSeller)
                    {
                      let sellerName = valueSeller.name;
                      html += '<div class="card mb-2 border-0"> <div class="card-body card-seller" data-id="' + valueSeller.id + '">';
                      html += '<div class="seller-name-ducking pb-3 fw-bold"> <input type="checkbox" data-id="' + valueSeller.id + '" data-checked="seller" class="form-check-input me-1 item"> <span>' + sellerName + '</span> </div>';
                      html += '<div>';
                      $.each(valueSeller.products, function (_keyProduct, valueProduct)
                      {
                        let img_link = valueProduct.img_link ? valueProduct.img_link : emptyImage;
                        html += '<div class="row mb-2">';
                        let productName = valueProduct.name;
                        html += '<div class="col-2 col-xl-1 img-seller-ducking pe-0">';
                        html += '<input type="checkbox" data-id="' + valueProduct.id + '"  data-seller-id="' + valueSeller.id + '" data-checked="item" class="form-check-input me-1 item"> <img src="' + img_link + '" alt="" width="60" height="60" class="rounded">';
                        html += '</div>';
                        html += '<div class="col-10 col-xl-11"><div class="row">';
                        html += '<div class="col-11">';
                        let productUrl = valueProduct.link;
                        html += '<a href="' + productUrl + '" class="product-name-ducking" target="_BLANK">' + productName + '</a>';
                        html += '</div>';
                        html += '<div class="col-1 text-end"></div>';
                        html += '</div>';
                        html += '<div class="mt-2">';
                        html += '<ul class="list-unstyled">';
                        $.each(valueProduct.product_details, (_keyVariant, valueVariant) =>
                        {
                          let keterangan1 = valueVariant.keterangan_1 != null ? valueVariant.keterangan_1 : '-';
                          let keterangan2 = valueVariant.keterangan_2 != null ? valueVariant.keterangan_2 : '-';
                          let qty = valueVariant.qty;
                          qtyS += qty;
                          let price = valueVariant.price;
                          let total = valueVariant.total;
                          totalS += parseFloat(total)
                          html += '<li class="pb-1">';
                          html += '<div class="row">';
                          html += '<div class="col align-self-center keterangan-1-ducking" style="background:#f8f8f8">';
                          // checkbox
                          html += '<input type="checkbox" data-id="' + valueVariant.id + '" data-item-id="' + valueProduct.id + '" data-checked="detailitem" data-seller-id="' + valueSeller.id + '" data-total="' + total + '" data-qty="' + qty + '" class="form-check-input me-1">';

                          html += '<span>' + keterangan1 + '</span>';
                          html += '</div>';
                          html += '<div class="col align-self-center keterangan-2-ducking"style="background:#f8f8f8">';
                          html += '<span>' + keterangan2 + '</span>';
                          html += '</div>';
                          html += '<div class="col-2 align-self-center qty-ducking text-center">';
                          html += '<span class="d-block" style="background:#f8f8f8">' + qty + ' Pcs</span>';
                          html += '</div>';
                          // trash
                          html += '<div class="col-1 text-center"><button class="btn btn-sm deleteproduct p-0" data-id="' + valueVariant.id + '" data-w="productDetail" style="font-size:16px"><i class="far fa-trash-alt"></i></button></div>';
                          html += '<div class="col-1 align-self-center price-ducking p-0 price-ducking ">';
                          html += '<div class="text-end">';
                          html += '<span>' + price + '</span>';
                          html += '</div>';
                          html += '</div>';
                          html += '<div class="col-1 align-self-center price-ducking p-0 text-end total-ducking" style="color: #d74200;font-size: 12px;font-weight: 700;">';
                          html += '<div class="text-end">';
                          html += '<span>' + total + '</span>';
                          html += '</div>';
                          html += '</div>';
                          html += '<div class="col-1"></div>';

                          html += '</div>';
                          html += '</li>';
                        })
                        html += '</ul>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                      });
                      html += '</div>';
                      html += '</div>';
                      html += '</div>';
                    });
                    html += '</div>';
                    html += '</div>';
                  }
                })
                if (prodDetail.length > 0)
                {
                  let productDetailId = [];
                  $("#cardList").html(html);
                  $('#export-excel').show();
                  // if checked click
                  checkboxHandler(productDetailId);
                  $('#deleteSelected').click(function ()
                  {
                    Swal.fire({
                      title: 'Anda yakin ingin menghapus data ini?',
                      text: "",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: 'rgb(255,193,7)',
                      cancelButtonColor: 'rgb(155 155 155)',
                      confirmButtonText: 'Hapus!',
                      cancelButtonText: 'Batal'
                    }).then((result) =>
                    {
                      if (result.isConfirmed)
                      {
                        let id = $('#customDelete').attr('data-id');
                        // check if not disabled
                        if (!$(this).hasClass('disabled'))
                        {
                          let inputDetail = $('input[data-checked="detailitem"]');
                          let inputDetailChecked = $('input[data-checked="detailitem"]:checked');
                          let inputSeller = $('input[data-checked="seller"]');
                          let w = $(this).attr('data-w');
                          if (inputDetail.length == inputDetailChecked.length)
                          {
                            id = [];
                            inputSeller.each(function ()
                            {
                              id.push($(this).data('id'));
                            });
                            id = JSON.stringify(id);
                            w = 'seller';
                          } else
                          {
                            // id to array
                            id = [];
                            inputDetailChecked.each(function ()
                            {
                              id.push($(this).data('id'));
                            });
                            id = JSON.stringify(id);
                          }
                          qtyS = 0;
                          totalS = 0;
                          $(this).addClass('disabled');
                          $(this).html('<i class="fas fa-spinner fa-spin"></i>');
                          swal.fire({
                            title: 'Menghapus data...',
                            html: '<div style="height:30px"><i class="fas fa-spinner fa-spin"></i></div>',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            showConfirmButton: false,

                          });
                          itemDucking.delete(id, w).then(function ()
                          {
                            $('#deleteSelected').removeClass('disabled');
                            productDetailId = [];
                            $('#customDelete').removeAttr('data-id');
                            // uncheck all checkbox
                            $('.form-check-input').prop('checked', false).prop('indeterminate', false);
                            // hide delete button
                            $('#deleteSelected').html('<i class="fas fa-trash"></i>');
                            $('#customDelete').hide();
                            $('#checkAll').prop('checked', false);
                            $('#checkAll').prop('indeterminate', false);
                            $('.qty').html(qtyS);
                            $('.total-harga').html(totalS);
                            if ($('#cardList>.card').length > 0)
                            {
                              $('#cardList>.card').each(function ()
                              {
                                if ($(this).find('.card-body>.card').length == 0)
                                {
                                  $(this).remove();
                                }
                              });
                              $('#checkAll').prop('checked', false).prop('indeterminate', false);
                            }
                            if ($('#cardList>.card').length == 0)
                            {
                              $('#cardList').html('<div class="text-center p-2 bg-white rounded shadow-sm">Tidak ada data</div>');
                              $('#export-excel').hide();
                              $('#checkAll').attr('disabled', true);
                            }
                            qtyTotals(qtyS, totalS);
                            Swal.fire({
                              icon: 'success',
                              title: 'Berhasil menghapus data',
                              showConfirmButton: false,
                              timer: 1500
                            });
                            // uncheck all checkbox
                            $('.form-check-input').prop('checked', false).prop('indeterminate', false);
                            return;
                          });
                          return;
                        }
                      }
                    })
                    return;
                  })
                  $('#checkAll').attr('disabled', false);
                } else
                {
                  $('#cardList').html('<div class="text-center p-2 bg-white rounded shadow-sm">Tidak ada data</div>');
                  $('#export-excel').hide();
                  $('#checkAll').attr('disabled', true);
                }
                $('.qty').html(qtyS);
                $('.total-harga').html(parseFloat(totalS).toFixed(2));
                $('.deleteproduct').on('click', function ()
                {
                  Swal.fire({
                    title: 'Anda yakin ingin menghapus data ini?',
                    text: "",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'rgb(255,193,7)',
                    cancelButtonColor: 'rgb(155 155 155)',
                    confirmButtonText: 'Hapus!',
                    cancelButtonText: 'Batal'
                  }).then((result) =>
                  {
                    if (result.isConfirmed)
                    {
                      // add class disabled
                      $(this).addClass('disabled');
                      let dataId = $(this).data('id');
                      let w = $(this).data('w');
                      swal.fire({
                        title: 'Menghapus data...',
                        html: '<div style="height:30px"><i class="fas fa-spinner fa-spin"></i></div>',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,
                        showConfirmButton: false,
                      });
                      itemDucking.delete(dataId, w).then((res) =>
                      {
                        if ($('#cardList>.card').length > 0)
                        {
                          $('#cardList>.card').each(function ()
                          {

                            if ($(this).find('.card-body>.card').length == 0)
                            {
                              $(this).remove();
                            } else
                            {
                              $(this).find('.card-body>.card').each(function ()
                              {
                                $(this).find('ul.list-unstyled').length == 0 ? $(this).remove() : '';
                              })
                            }
                          })
                          $('#checkAll').prop('checked', false).prop('indeterminate', false);
                        }
                        if ($('#cardList>.card').length == 0)
                        {
                          $('#cardList').html('<div class="text-center p-2 bg-white rounded shadow-sm">Tidak ada data</div>');
                          $('#export-excel').hide();
                          $('#checkAll').attr('disabled', true);
                        }
                        qtyTotals(qtyS, totalS);
                        Swal.fire({
                          icon: 'success',
                          title: 'Berhasil menghapus data',
                          showConfirmButton: false,
                          timer: 1500
                        })
                        return;
                      });
                      return;
                    }
                  });
                });
              });
            });
            return;
          } else
          {
            alertDucking('#duckingAlert', 'Silahkan login terlebih dahulu');
            return;
          }
        });
        exportToExcel(itemDucking);

      })
    }
  }
}

function qtyTotalChecked(detailItemChecked)
{
  let qtyChecked = 0;
  let totalChecked = 0;

  if (detailItemChecked.length == 0)
  {
    detailItemChecked = $('input[data-checked="detailitem"]');
  }

  detailItemChecked.each(function ()
  {
    qtyChecked += parseInt($(this).attr('data-qty'));
    totalChecked += parseFloat($(this).attr('data-total'));
  });

  $('.qty').text(qtyChecked);
  $('.total-harga').text(totalChecked.toFixed(2));
  return { qtyChecked, totalChecked };
}

function qtyTotals(qtyS, totalS)
{
  qtyS = 0;
  totalS = 0;
  $('.qty-ducking span, .total-ducking span').each(function ()
  {
    if ($(this).parent().hasClass('qty-ducking')) {
      qtyS += parseInt($(this).text());
    } else {
      totalS += parseFloat($(this).text());
    }
  });
  $('.qty').text(qtyS);
  $('.total-harga').text(totalS.toFixed(2));
}

function checkAllHandler(productDetailId)
{
  if (productDetailId)
  {
    if (productDetailId.length > 0)
    {
      if ($('.form-check-input[data-checked="detailitem"]:checked').length == $('.form-check-input[data-checked="detailitem"]').length)
      {
        $('#checkAll').prop('checked', true).prop('indeterminate', false);
      } else
      {
        $('#checkAll').prop('checked', true).prop('indeterminate', true);
      }
    } else
    {
      $('#checkAll').prop('checked', false).prop('indeterminate', false);
    }
  } else
  {
    $('#checkAll').prop('checked', false).prop('indeterminate', false);
  }
}

function checkDetailItem(sellerId, itemId, productDetailId) {
  const detailItem = $(`.form-check-input[data-checked="detailitem"][data-seller-id="${sellerId}"][data-item-id="${itemId}"]`);
  const detailItemChecked = detailItem.filter(':checked');
  const allDetailItem = $(`.form-check-input[data-checked="detailitem"][data-seller-id="${sellerId}"]`);
  const allDetailItemChecked = allDetailItem.filter(':checked');
  const item = $(`.form-check-input[data-checked="item"][data-id="${itemId}"]`);
  const seller = $(`.form-check-input[data-checked="seller"][data-id="${sellerId}"]`);

  if (productDetailId && productDetailId.length > 0) {
    if (detailItemChecked.length == detailItem.length) {
      item.prop('checked', true).prop('indeterminate', false);
      seller.prop('checked', true).prop('indeterminate', true);
    } else if (detailItemChecked.length < detailItem.length && detailItemChecked.length > 0) {
      item.prop('checked', true).prop('indeterminate', true);
      seller.prop('checked', true).prop('indeterminate', true);
    } else {
      item.prop('checked', false).prop('indeterminate', false);
      seller.prop('checked', false).prop('indeterminate', false);
    }
  } else {
    item.prop('checked', false).prop('indeterminate', false);
    seller.prop('checked', false).prop('indeterminate', false);
  }

  if (allDetailItemChecked.length == allDetailItem.length) {
    seller.prop('checked', true).prop('indeterminate', false);
  } else if (allDetailItemChecked.length > 0) {
    seller.prop('indeterminate', true);
  } else {
    seller.prop('checked', false).prop('indeterminate', false);
  }
}

function checkItem(sellerId, productDetailId) {
  const itemChecked = $(`.form-check-input[data-checked="item"][data-seller-id="${sellerId}"]:checked`);
  const item = $(`.form-check-input[data-checked="item"][data-seller-id="${sellerId}"]`);
  const sellerChecked = $(`.form-check-input[data-checked="seller"][data-id="${sellerId}"]`);
  const detailItemChecked = $(`.form-check-input[data-checked="detailitem"][data-seller-id="${sellerId}"]`);

  const checkedItemCount = itemChecked.length;
  const totalItemCount = item.length;

  let isChecked = false;
  let isIndeterminate = false;

  if (checkedItemCount === totalItemCount) {
    isChecked = true;
    isIndeterminate = false;
  } else if (checkedItemCount > 0 && checkedItemCount < totalItemCount) {
    isChecked = true;
    isIndeterminate = true;
  } else {
    isChecked = false;
    isIndeterminate = false;
  }

  if (productDetailId && productDetailId.length > 0) {
    sellerChecked.prop('checked', isChecked).prop('indeterminate', isIndeterminate);
  } else {
    sellerChecked.prop('checked', false).prop('indeterminate', false);
  }
}

function checkSeller(sellerId)
{
  let seller = $('.form-check-input[data-checked="seller"][data-id="' + sellerId + '"]');
  let item = $('.form-check-input[data-checked="item"][data-seller-id="' + sellerId + '"]');
  let detailItem = $('.form-check-input[data-checked="detailitem"][data-seller-id="' + sellerId + '"]');
  if (seller.is(':checked'))
  {
    item.prop('checked', true);
    detailItem.prop('checked', true);
  } else
  {
    item.prop('checked', false).prop('indeterminate', false);
    detailItem.prop('checked', false);
  }
}

function productDetailIdHandler()
{
  let productDetailId = [];
  setTimeout(function ()
  {

    $('.form-check-input[data-checked="detailitem"]:checked').each(function ()
    {
      productDetailId.push($(this).attr('data-id'));
    });
  }, 100)
  return productDetailId;
}


