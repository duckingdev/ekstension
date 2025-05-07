function addonGroupChangeHandler(price, qty, keterangan_2, total, img_link, keterangan_1, link, productName, seller, dataTmp, psku = 4) {
  $('.sku-item-wrapper .next-input.next-medium.next-input-group-auto-width>input').change(function () {
    let parentSku = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent();
    if (psku > 4) {
      parentSku = $(this).parent().parent().parent().parent().parent();
    }
    setTimeout(function () {
      ({ price, qty, keterangan_2, total } = pushTmp(price, parentSku, qty, keterangan_2, total, img_link, keterangan_1, link, productName, seller, dataTmp));

    }, 100);
  });
}
function addonGroupClickHandler(price, qty, keterangan_2, total, img_link, keterangan_1, link, productName, seller, dataTmp) {
  $('.sku-item-wrapper .next-input-group-addon.next-after, .sku-item-wrapper .next-input-group-addon.next-before').click(function () {
    let parentSku = $(this).parent().parent().parent().parent();
    setTimeout(function () {
      ({ price, qty, keterangan_2, total } = pushTmp(price, parentSku, qty, keterangan_2, total, img_link, keterangan_1, link, productName, seller, dataTmp));
    }, 100);
  });
}
function pushTmp(price, parentSku, qty, keterangan_2, total, img_link, keterangan_1, link, productName, seller, dataTmp) {
  price = parentSku.find('.discountPrice-price').text();
  // remove 元
  price = parseFloat(price.replace("元", "")).toFixed(2);
  qty = parseInt(parentSku.find('input').val());
  keterangan_2 = parentSku.find('.sku-item-name').text();
  total = qty * price;
  return pushData(img_link, seller, productName, link, keterangan_1, keterangan_2, qty, price, total, dataTmp);
}
function pushTmp2(keterangan_1, nextTableNow, keterangan_2, price, qty, total, img_link, seller, productName, link, dataTmp) {
  keterangan_1 = nextTableNow.find('td.next-table-cell.first>.next-table-cell-wrapper>.specification-cell>span.normal-text').attr('title');
  let keterangan2 = nextTableNow.find('td.next-table-cell>.next-table-cell-wrapper>span.normal-text');
  if (keterangan2.length > 1) {
    keterangan2.each(function () {

      if ($(this).attr('title') != "") {
        keterangan_2 += $(this).attr('title') + '; ';
      }
    });
  } else {

    keterangan_2 = keterangan2.attr('title');
    if (keterangan_2 == undefined) {
      keterangan_2 = nextTableNow.find('td.next-table-cell').eq(2).text();
    }
  }
  price = nextTableNow.find('td.next-table-cell>.next-table-cell-wrapper>div.price').text();
  qty = nextTableNow.find('td.next-table-cell>.next-table-cell-wrapper input').val();
  total = qty * price;
  return pushData(img_link, seller, productName, link, keterangan_1, keterangan_2, qty, price, total, dataTmp, 2);
}

function pushData(img_link, seller, productName, link, keterangan_1, keterangan_2, qty, price, total, dataTmp, type = 1) {
  let myData = {
    img_link: img_link,
    seller: seller,
    product_name: productName,
    link: link,
    keterangan_1: keterangan_1,
    keterangan_2: keterangan_2,
    qty: qty,
    price: price,
    total: total,
  };
  // check if dataTmp has data
  if (dataTmp.length > 0) {
    // check if dataTmp has data
    let index = dataTmp.findIndex(x => x.keterangan_2 === keterangan_2 && x.keterangan_1 === keterangan_1 && x.img_link === img_link && x.seller === seller && x.product_name === productName && x.link === link);
    if (index > -1) {
      // if qty  < 1 remove data
      if (qty < 1) {
        dataTmp.splice(index, 1);
      }
      else {
        // if dataTmp has data then update data
        dataTmp[index] = myData;
      }
    }
    else {
      if (qty > 0) {
        dataTmp.push(myData);
      }
    }
  }
  else {
    if (qty > 0) {
      dataTmp.push(myData);
    }
  }
  if (type == 1) {
    return { price, qty, keterangan_2, total };
  } else {
    return { keterangan_1, keterangan_2, price, qty, total };
  }


}

