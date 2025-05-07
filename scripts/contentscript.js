const currentRate = 2350;

const webTaobao = window.location.href.split('/')[2] === 'item.taobao.com' ? true : false;
const webTmall = window.location.href.match(/tmall.com/g) || window.location.href.match(/tmall.hk/g) ? true : false;
const web1688 = window.location.href.match(/1688.com/g) ? true : false;

let apiUrl = 'https://ext.duckingdelivery.com';
const idrFormat = (price) => {
  price = parseInt(price);
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const tmallLogo = chrome.runtime.getURL("icons/tmall.png");
const taobaoLogo = chrome.runtime.getURL("icons/taobao.png");
const logo1688 = chrome.runtime.getURL("icons/1688.png");
const iconExportExcel = chrome.runtime.getURL("icons/export-excel.png");

function shake() {
  $('#listCart').addClass('shake');
  setTimeout(function () {
    $('#listCart').removeClass('shake');
  }, 500);
}

function alertDucking(element, message, type = 'danger') {
  $(element).html(`<div class="alert alert-${type} p-2 text-center" role="alert">
    ${message}
  </div>`);
  $(element).fadeIn();
  $(element).addClass('shake');
  setTimeout(function () {
    $(element).fadeOut('fast', function () {
      $(element).removeClass('shake');
      $(element).html('');
    });
  }, 1500);
}

function addToCartTmall(itemMain, itemMain2) {
  let url = window.location.href;
  let link = url;
  let keterangan_1 = "";
  let keterangan_2 = "";

  if (itemMain > 0) {
    $('#addToCart').fadeOut('fast', function () {

      $('#addToCartLoading').fadeIn('fast');
      let sellertop = $('.ShopHeader--title--2qsBE1A').attr('title');
      let sellerTop2024 = $('.ShopHeader--shopName--zZ3913d').text();
      let sellerTop20242 = document.querySelector('.shopName--mTDZGIPO').textContent;
      if (!sellertop) {
        sellertop = sellerTop2024 ? sellerTop2024 : sellerTop20242;
      }
      if (!sellertop) {
        sellertop = $('.ShopHeaderNew--shopName--2J0piSC').attr('title');
      }
      if (!sellertop) {
        sellertop = $('.SearchHeader--logo--3MwMa7A').attr('href');
        // in href get seller name https://chaoshi.tmall.com/ chaoshi is seller name
        if (sellertop) {
          // get seller name
          let regex = /https:\/\/([^.]+)\.tmall\.com/;
          let match = sellertop.match(regex);
          if (match) {
            sellertop = match[1];
          }
        }
      }
      // if(!sellertop){
      //   sellertop = $('.ShopHeader--shopName--zZ3913d').text();
      // }
      // seller top replace \n
      sellertop = sellertop.replace(/\n/g, '');
      // seller top replace first space and last space
      sellertop = sellertop.replace(/^\s+|\s+$/g, '');
      let seller = sellertop;
      let productName = $('h1.ItemHeader--mainTitle--3CIjqW5').text();
      // remove first space and last space

      let qty = parseInt($('.countValueForPC').val());
      let price = parseFloat($('.Price--priceText--2nLbVda').text()).toFixed(2);

      if (!price) {
        // loop until get price
        let loop = setInterval(function () {
          price = parseFloat($('.Price--priceText--2nLbVda').text()).toFixed(2);
          if (price) {
            clearInterval(loop);
          }
        }, 100);

      }
      if (!price) {
        // loop until get price
        let loop = setInterval(function () {
          price = parseFloat(document.querySelector('.originPrice--UnZ18wCd>.priceText--gdYzG_l_').textContent).toFixed(2);

          if (price) {
            clearInterval(loop);
          }
        }, 100);

      }
      let total = 0;
      let img_link = $('.PicGallery--mainPic--1eAqOie').attr('src');
      $('.skuItem.current').each(function (index, element) {
        if (index === 0) {
          keterangan_1 = $(this).find('div').eq(0).attr('title');
        } if (index === 1) {
          keterangan_2 = $(this).find('div').eq(0).attr('title');
        } if (index > 1) {
          keterangan_2 += ` ; ${$(this).find('div').eq(0).attr('title')}`;
        }
      }
      );



      qty = parseInt($('.countValueForPC').val());
      let priceDiskon = $('.Price--priceText--2nLbVda.Price--extraPriceText--2dbLkGw').text();

      price = priceDiskon ? priceDiskon : price;
      price = parseFloat(price).toFixed(2);
      if (sellerTop2024) {
        $('.SkuContent--skuItem--3Nb1tMw').each(function (index, element) {
          if (index === 0) {
            keterangan_1 = $(this).find('.SkuContent--isSelected--tfxz6VP').eq(0).text();
          } if (index === 1) {
            keterangan_2 = $(this).find('.SkuContent--isSelected--tfxz6VP').eq(0).text();
          } if (index > 1) {
            keterangan_2 += ` ; ${$(this).find('.SkuContent--isSelected--tfxz6VP').eq(0).text()}`;
          }
        }
        );
        qty = parseInt($('.Operation--countValue--3VF_tPH').val());
        price = parseFloat($('.Price--originPrice--2c8ipVx>.Price--priceText--1oEHppn').text()).toFixed(2);
        productName = $('h1.ItemHeader--mainTitle--1rJcXZz').attr('title');
        img_link = $('.PicGallery--mainPic--34u4Jrw').attr('src');
      }
      if (sellerTop20242) {
        const valueItems = document.querySelectorAll('.valueItem--GzWd2LsV');
        const skuItems = document.querySelectorAll('.skuItem--uxMLmkRx');
        let keteranganArr = [];
        valueItems.forEach((element, index) => {
          if (element.classList.contains('isSelected--YrA6x4Yj')) {
            const selectedText = element.querySelector('.valueItemText--HiKnUqGa')?.textContent || '';
            keteranganArr.push(selectedText);
          }
        });
       
        keterangan_1 = keteranganArr[0];
        if(valueItems.length === 0){
          keterangan_1 = '-';
         }
        // keterangan_2 = keterangan array where index > 0
        if (keteranganArr.length > 1) {
          keterangan_2 = keteranganArr.slice(1).join(' ; ');
        }
        priceSelector = document.querySelector('.originPrice--UnZ18wCd>.priceText--gdYzG_l_');
        !priceSelector ? priceSelector = document.querySelector('.highlightPrice--OOP9oDP8>.text--fZ9NUhyQ') : priceSelector = priceSelector; 
        priceSelector = priceSelector ? priceSelector : document.querySelector('.MiniPrice--Zy6lKVz1 .priceText--YZzF3UMh');
        qty = parseInt(document.querySelector('.countValue--mH0MCFR3').value);
        price = parseFloat(priceSelector.textContent).toFixed(2);
        let priceDiskon = document.querySelector('.extraPrice--Y7SiNGXT>.priceText--gdYzG_l_.extraPriceText--aysuZjG_')?.textContent;

        price = priceDiskon ? priceDiskon : price;
        price = parseFloat(price).toFixed(2);
        productName = $('h1.mainTitle--O1XCl8e2').text();
        // img_link = document.querySelector('.mainPic--zxTtQs0P')?.getAttribute('src');
        const imgValue = document.querySelectorAll('.thumbnail--TxeB1sWz');
        // imgValue[0] inner html img
        img_link = imgValue[0]?.getAttribute('src') || imgValue[0]?.innerHTML;
        // get src from img_link
        if (img_link.includes('src')) {
          img_link = img_link.split('src="')[1].split('"')[0];
        }

        if (keteranganArr.length !== skuItems.length) {
          alertDucking('#duckingAlert', 'Silahkan pilih keterangan produk terlebih dahulu');
          $('#addToCartLoading').fadeOut('fast', function () {
            $('#addToCart').fadeIn();
          });
          return;
        }
      }
      if ($('.skuCate').length > 0) {
        if (keterangan_1 === "") {
          alertDucking('#duckingAlert', 'Silahkan pilih keterangan produk terlebih dahulu');
          $('#addToCartLoading').fadeOut('fast', function () {
            $('#addToCart').fadeIn();
          });
          return;
        }
      }
      if ($('.skuCate').length > 1) {
        if (keterangan_2 === "") {
          alertDucking('#duckingAlert', 'Silahkan pilih keterangan produk terlebih dahulu');
          $('#addToCartLoading').fadeOut('fast', function () {
            $('#addToCart').fadeIn();
          });
          return;
        }
      }

      if (!productName) {
        productName = $('h1.ItemTitle--mainTitle--2OrrwrD').text();
      }
      if (!productName) {
        productName = $('.ItemTitle--D0kVngQM>h1').text();
      }

      productName = productName.replace(/^\s+|\s+$/g, '');
      total = qty * price;
      data = {
        img_link: img_link,
        seller: seller,
        product_name: productName,
        link: link,
        keterangan_1: keterangan_1,
        keterangan_2: keterangan_2,
        qty: qty,
        price: price,
        total: total,
      }

      save = new ItemDucking().save(data);
      if (save) {
        $('#addToCartLoading').fadeOut('fast', function () {
          $('#addToCart').fadeIn();
        });
      }

    });
  }else if (itemMain2 > 0) {
    $('#addToCart').fadeOut('fast', function () {

      $('#addToCartLoading').fadeIn('fast');
      let sellertop = $('.QJEEHAN8H5--shopName--ccf81bdd').attr('title');
      let sellerTop20242 = $('.QJEEHAN8H5--shopName--ccf81bdd').attr('title');
  
        // in href get seller name https://chaoshi.tmall.com/ chaoshi is seller name
        if (sellertop) {
          // get seller name
          let regex = /https:\/\/([^.]+)\.tmall\.com/;
          let match = sellertop.match(regex);
          if (match) {
            sellertop = match[1];
          }
        }
      
      // if(!sellertop){
      //   sellertop = $('.ShopHeader--shopName--zZ3913d').text();
      // }
      // seller top replace \n
      sellertop = sellertop.replace(/\n/g, '');
      // seller top replace first space and last space
      sellertop = sellertop.replace(/^\s+|\s+$/g, '');
      let seller = sellertop;
      let productName = $('h1.ItemHeader--mainTitle--3CIjqW5').text();
      // remove first space and last space

      let qty = parseInt($('.countValueForPC').val());
      let price = parseFloat($('.Price--priceText--2nLbVda').text()).toFixed(2);

      if (!price) {
        // loop until get price
        let loop = setInterval(function () {
          price = parseFloat($('.Price--priceText--2nLbVda').text()).toFixed(2);
          if (price) {
            clearInterval(loop);
          }
        }, 100);

      }
      if (!price) {
        // loop until get price
        let loop = setInterval(function () {
          price = parseFloat(document.querySelector('.originPrice--UnZ18wCd>.priceText--gdYzG_l_').textContent).toFixed(2);

          if (price) {
            clearInterval(loop);
          }
        }, 100);

      }
      let total = 0;
      let img_link = $('.PicGallery--mainPic--1eAqOie').attr('src');
      $('.skuItem.current').each(function (index, element) {
        if (index === 0) {
          keterangan_1 = $(this).find('div').eq(0).attr('title');
        } if (index === 1) {
          keterangan_2 = $(this).find('div').eq(0).attr('title');
        } if (index > 1) {
          keterangan_2 += ` ; ${$(this).find('div').eq(0).attr('title')}`;
        }
      }
      );



      qty = parseInt($('.countValueForPC').val());
      let priceDiskon = $('.Price--priceText--2nLbVda.Price--extraPriceText--2dbLkGw').text();

      price = priceDiskon ? priceDiskon : price;
      price = parseFloat(price).toFixed(2);
      
      if (sellerTop20242) {
        const valueItems = document.querySelectorAll('.QJEEHAN8H5--valueItem--ee898cc0');
        const skuItems = document.querySelectorAll('.skuItem--uxMLmkRx');
        let keteranganArr = [];
        valueItems.forEach((element, index) => {
          if (element.classList.contains('QJEEHAN8H5--isSelected--be9dcb21')) {
           
            const selectedText = element.querySelector('.QJEEHAN8H5--valueItemText--f5b4bd44')?.textContent || '';
            keteranganArr.push(selectedText);
          }
        });
       
        keterangan_1 = keteranganArr[0];
        if(valueItems.length === 0){
          keterangan_1 = '-';
         }
        // keterangan_2 = keterangan array where index > 0
        if (keteranganArr.length > 1) {
          keterangan_2 = keteranganArr.slice(1).join(' ; ');
        }
        console.log(keteranganArr)
        priceSelector = document.querySelector('.QJEEHAN8H5--text--_4c1ce7d');
        
        qty = parseInt(document.querySelector('.QJEEHAN8H5--countValue--_14c0d78').value);
        price = parseFloat(priceSelector.textContent).toFixed(2);
        let priceDiskon = document.querySelector('.extraPrice--Y7SiNGXT>.priceText--gdYzG_l_.extraPriceText--aysuZjG_')?.textContent;

        price = priceDiskon ? priceDiskon : price;
        price = parseFloat(price).toFixed(2);
        productName = $('h1.QJEEHAN8H5--mainTitle--_90838ca').text();
        // img_link = document.querySelector('.mainPic--zxTtQs0P')?.getAttribute('src');
        const imgValue = document.querySelectorAll('.QJEEHAN8H5--thumbnailPic--_2b4183e');
        // imgValue[0] inner html img
        img_link = imgValue[0]?.getAttribute('src') || imgValue[0]?.innerHTML;
        // get src from img_link
        if (img_link.includes('src')) {
          img_link = img_link.split('src="')[1].split('"')[0];
        }

      }
      if ($('.skuCate').length > 0) {
        if (keterangan_1 === "") {
          alertDucking('#duckingAlert', 'Silahkan pilih keterangan produk terlebih dahulu');
          $('#addToCartLoading').fadeOut('fast', function () {
            $('#addToCart').fadeIn();
          });
          return;
        }
      }
      if ($('.skuCate').length > 1) {
        if (keterangan_2 === "") {
          alertDucking('#duckingAlert', 'Silahkan pilih keterangan produk terlebih dahulu');
          $('#addToCartLoading').fadeOut('fast', function () {
            $('#addToCart').fadeIn();
          });
          return;
        }
      }

      if (!productName) {
        productName = $('h1.ItemTitle--mainTitle--2OrrwrD').text();
      }
      if (!productName) {
        productName = $('.ItemTitle--D0kVngQM>h1').text();
      }

      productName = productName.replace(/^\s+|\s+$/g, '');
      total = qty * price;
      data = {
        img_link: img_link,
        seller: seller,
        product_name: productName,
        link: link,
        keterangan_1: keterangan_1,
        keterangan_2: keterangan_2,
        qty: qty,
        price: price,
        total: total,
      }

      save = new ItemDucking().save(data);
      if (save) {
        $('#addToCartLoading').fadeOut('fast', function () {
          $('#addToCart').fadeIn();
        });
      }

    });
  }
  else {
    $('#addToCart').fadeOut('fast', function () {
      $('#addToCartLoading').fadeIn('fast');
      let url = window.location.href;
      let sellertop = $('#shopExtra>.slogo>.slogo-shopname>strong').text();
      // seller top replace \n
      sellertop = sellertop.replace(/\n/g, '');
      // seller top replace first space and last space
      sellertop = sellertop.replace(/^\s+|\s+$/g, '');
      let seller = sellertop ? sellertop : $('#mallLogo>.mlogo>a').attr('title');
      let productName = $('.tb-detail-hd>h1').text();
      // remove first space and last space
      productName = productName.replace(/^\s+|\s+$/g, '');
      let qty = parseInt($('#J_Amount>span>.mui-amount-input').val());
      let price = 0;
      let total = 0;
      let img_link = $('#J_ImgBooth').attr('src');
      $('.tb-sku>dl.tb-prop>dd>ul>li.tb-selected').each(function (index, element) {
        if (index === 0) {
          keterangan_1 = $(this).find('a>span').text();
        } if (index === 1) {
          keterangan_2 = $(this).find('a>span').text();
        } if (index > 1) {
          keterangan_2 += ` ; ${$(this).find('a>span').text()}`;
        }
      });

      qty = parseInt($('#J_Amount>span>.mui-amount-input').val());
      let priceDiskon = $('#J_PromoPrice>dd>.tm-promo-price>span.tm-price').text();
      price = priceDiskon ? priceDiskon : $('#J_StrPriceModBox span.tm-price').text();
      price = parseFloat(price).toFixed(2);
      total = qty * price;
      data = {
        img_link: img_link,
        seller: seller,
        product_name: productName,
        link: link,
        keterangan_1: keterangan_1,
        keterangan_2: keterangan_2,
        qty: qty,
        price: price,
        total: total,
      }
      save = new ItemDucking().save(data);
      if (save) {
        $('#addToCartLoading').fadeOut('fast', function () {
          $('#addToCart').fadeIn();
        });
      }
    });
  }
}

function addToCart() {
  $('#addToCart').fadeOut('fast', function () {
    $('#addToCartLoading').fadeIn('fast');
    let url = window.location.href;
    let sellertop = $('.shop-name>.shop-name-wrap>.shop-name-link').text();
    let sellerTop2024 = $('.ShopHeader--shopName--zZ3913d').text();
    sellertop = sellertop ? sellertop : sellerTop2024;
    sellertop = sellertop.replace(/\n/g, '');
    sellertop = sellertop.replace(/^\s+|\s+$/g, '');
    let seller = sellertop ? sellertop : $('.tb-shop-name a').attr('title');
    let link = url;
    let keterangan_1 = "";
    let keterangan_2 = "";
    let productName = $('.tb-main-title').attr('data-title');
    let qty = parseInt($('#J_IptAmount').val());
    let price = 0;
    let total = 0;
    $('.J_Prop .tb-selected').each(function (index, element) {
      if (index === 0) {
        keterangan_1 = $(this).find('a>span').text();
      } if (index === 1) {
        keterangan_2 = $(this).find('a>span').text();
      } if (index > 1) {
        keterangan_2 += ` ; ${$(this).find('a>span').text()}`;
      }
    });
    let img_link = $('#J_ImgBooth').attr('src');
    qty = parseInt($('#J_IptAmount').val());
    let priceDiskon = $('#J_PromoPriceNum.tb-rmb-num').text();
    price = priceDiskon ? priceDiskon : $('#J_StrPrice>em.tb-rmb-num').text();
    price = parseFloat(price).toFixed(2);
    total = qty * price;
    data = {
      img_link: img_link,
      seller: seller,
      product_name: productName,
      link: link,
      keterangan_1: keterangan_1,
      keterangan_2: keterangan_2,
      qty: qty,
      price: price,
      total: total,
    }
    save = new ItemDucking().save(data);
    if (save) {
      $('#addToCartLoading').fadeOut('fast', function () {
        $('#addToCart').fadeIn();
      });
    }
  });
}

function addToCartNext(n) {
  let keteranganSelected = webTaobao ? $('.J_Prop.tb-prop li.tb-selected') : $('.tb-sku>dl.tb-prop>dd>ul>li.tb-selected');
  if (keteranganSelected.length < n) {
    alertDucking('#duckingAlert', 'Silahkan pilih keterangan produk terlebih dahulu');
    return;
  } else {
    $('#addTocart').hide();
    $('#addTocartLoading').show();
    webTaobao ? addToCart() : addToCartTmall();
    // addToCart();
    $('#hasItem').show();
    shake();
    $('#addTocart').show();
    $('#addTocartLoading').hide();
    return;
  }
}







