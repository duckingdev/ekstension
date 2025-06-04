
function checkboxHandler()
{

  $('input[type="checkbox"]').click(function ()
  {
    let qty = 0;
    let totals = 0;
    let detailItem = $('input[type="checkbox"][data-checked="detailitem"]');
    detailItem.each(function ()
    {
      qty += parseInt($(this).attr('data-qty'));
      totals += parseFloat($(this).attr('data-total'));
    });
    $('.qty').html(qty);
    $('.total-harga').html(parseFloat(totals).toFixed(2));
    let prodId = [];
    if ($(this).attr("id") == "checkAll")
    {
      $('input[type="checkbox"]').prop('checked', this.checked);
      prodId = [];
      if (this.checked)
      {
        $('input[type="checkbox"][data-checked="seller"]').each(function ()
        {
          prodId.push($(this).attr('data-id'));
        });
        $('#customDelete').attr('data-id', prodId);
        $('#deleteSelected').attr('data-w', 'seller');
        $('#customDelete').show();
      } else
      {
        $('input[type="checkbox"]').prop('checked', false).prop('indeterminate', false);
        $('#customDelete').attr('data-id', '');
        $('#deleteSelected').attr('data-w', '');
        $('#customDelete').hide();
      }
    } else
    {
      prodId = [];
      if ($(this).attr('data-checked') == 'detailitem')
      {
        let idItem = $(this).attr('data-item-id');
        let idSeller = $(this).attr('data-seller-id');
        detailItemHandler(idItem, idSeller);
      } else if ($(this).attr('data-checked') == 'item')
      {
        let idItem = $(this).attr('data-id');
        let idSeller = $(this).attr('data-seller-id');
        let detailItem = $('input[type="checkbox"][data-item-id="' + idItem + '"][data-checked="detailitem"]');
        detailItem.prop('checked', this.checked);
        itemHandler(idSeller);
      } else if ($(this).attr('data-checked') == 'seller')
      {
        let idSeller = $(this).attr('data-id');
        let item = $('input[type="checkbox"][data-seller-id="' + idSeller + '"][data-checked="item"]');
        let detailItem = $('input[type="checkbox"][data-seller-id="' + idSeller + '"][data-checked="detailitem"]');
        item.prop('checked', this.checked).prop('indeterminate', false);
        detailItem.prop('checked', this.checked);
        sellerHandler(idSeller);
      }
      customDelete(prodId);
    }
  });

  let detailItemHandler = (idItem, idSeller) =>
  {
    let detailItem = $('input[type="checkbox"][data-item-id="' + idItem + '"][data-checked="detailitem"]');
    let detailItemChecked = $('input[type="checkbox"][data-item-id="' + idItem + '"][data-checked="detailitem"]:checked');
    let item = $('input[type="checkbox"][data-id="' + idItem + '"][data-checked="item"]');
    let seller = $('input[type="checkbox"][data-id="' + idSeller + '"][data-checked="seller"]');
    if (detailItemChecked.length == detailItem.length)
    {
      item.prop('checked', true).prop('indeterminate', false);
      itemHandler(idSeller);
    } else if (detailItemChecked.length > 0 && detailItemChecked.length < detailItem.length)
    {
      item.prop('checked', true).prop('indeterminate', true);
      seller.prop('checked', true).prop('indeterminate', true);
      $('#checkAll').prop('checked', true).prop('indeterminate', true);
    } else
    {
      item.prop('checked', false).prop('indeterminate', false);
      seller.prop('checked', false).prop('indeterminate', false);
      sellerHandler();
    }

  }

  let itemHandler = (idSeller) =>
  {
    let itemChecked = $('input[type="checkbox"][data-seller-id="' + idSeller + '"][data-checked="item"]:checked');
    let itemUnchecked = $('input[type="checkbox"][data-seller-id="' + idSeller + '"][data-checked="item"]');
    let seller = $('input[type="checkbox"][data-id="' + idSeller + '"][data-checked="seller"]');
    if (itemChecked.length == itemUnchecked.length)
    {
      seller.prop('checked', true).prop('indeterminate', false);
    } else if (itemChecked.length > 0 && itemChecked.length < itemUnchecked.length)
    {
      seller.prop('checked', true).prop('indeterminate', true);
    }
    else
    {
      seller.prop('checked', false).prop('indeterminate', false);
    }
    sellerHandler();
  }


  let sellerHandler = () =>
  {
    let sellerAllChecked = $('input[type="checkbox"][data-checked="seller"]:checked');
    let sellerAllUnchecked = $('input[type="checkbox"][data-checked="seller"]');
    if (sellerAllChecked.length == sellerAllUnchecked.length)
    {
      $('#checkAll').prop('checked', true).prop('indeterminate', false);
    } else if (sellerAllChecked.length > 0 && sellerAllChecked.length < sellerAllUnchecked.length) 
    {
      $('#checkAll').prop('checked', true).prop('indeterminate', true);
    } else 
    {
      $('#checkAll').prop('checked', false).prop('indeterminate', false);
    }
  }
  function customDelete(prodId)
  {
    let qty = 0;
    let totals = 0;
    let detailItemChecked = $('input[type="checkbox"][data-checked="detailitem"]:checked');
    $('#dataSelected').attr('data-w', '');

    let detailItem = $('input[type="checkbox"][data-checked="detailitem"]');

    if (detailItemChecked.length > 0)
    {
      $('#customDelete').show();
    }
    else
    {
      $('#customDelete').hide();
    }

    detailItemChecked.each(function ()
    {
      prodId.push($(this).attr('data-id'));
    });

    if (detailItemChecked.length == detailItem.length)
    {
      detailItemChecked.each(function ()
      {
        qty += parseInt($(this).attr('data-qty'));
        totals += parseFloat($(this).attr('data-total'));
      });
      $('.qty').html(qty);
      $('.total-harga').html(parseFloat(totals).toFixed(2));
      $('#checkAll').prop('checked', true).prop('indeterminate', false);
    } else if (detailItemChecked.length > 0 && detailItemChecked.length < detailItem.length)
    {
      detailItemChecked.each(function ()
      {
        qty += parseInt($(this).attr('data-qty'));
        totals += parseFloat($(this).attr('data-total'));
      });
      $('.qty').html(qty);
      $('.total-harga').html(parseFloat(totals).toFixed(2));
      $('#checkAll').prop('checked', true).prop('indeterminate', true);
    } else
    {
      detailItem.each(function ()
      {
        qty += parseInt($(this).attr('data-qty'));
        totals += parseFloat($(this).attr('data-total'));
      });
      $('.qty').html(qty);
      $('.total-harga').html(parseFloat(totals).toFixed(2));
    }
    $('#customDelete').attr('data-id', prodId);

  }
}

