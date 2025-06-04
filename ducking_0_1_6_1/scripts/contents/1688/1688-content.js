
if (web1688) {
  // on page load
  $(document).ready(function () {

    window.onload = function () {
      checkToken();
      checkToken();

      let tbProp = $('.tb-key>.tb-skin>.tb-sku>dl.tb-prop>dd>ul.tm-clear.J_TSaleProp')

      _1688Card(tbProp);
      if ($('#cart').length > 0) {

        const getPrice = new GetPrice();
        if (getPrice.checkVer(1).values.length == 3) {
          let firstPriceYuan = getPrice.checkVer(1).values[0];
          let secondPriceYuan = getPrice.checkVer(1).values[1];
          let lastPriceYuan = getPrice.checkVer(1).values[2];
          let firstPriceIdr = idrFormat(parseFloat(firstPriceYuan) * currentRate);
          let secondPriceIdr = idrFormat(parseFloat(secondPriceYuan) * currentRate);
          let lastPriceIdr = idrFormat(parseFloat(lastPriceYuan) * currentRate);
          setTimeout(() => {
            $('#firstPrice').html(`Rp${firstPriceIdr}`);
            $('#secondPrice').html(`Rp${secondPriceIdr}`);
            $('#lastPrice').html(`Rp${lastPriceIdr}`);
          }, 500);
          let firstUnitDucking = getPrice.checkVer(1).minOrder[0];
          let secondUnitDucking = getPrice.checkVer(1).minOrder[1];
          let lastUnitDucking = getPrice.checkVer(1).minOrder[2];
          setTimeout(() => {
            $('#firstUnitDucking').html(firstUnitDucking);
            $('#secondUnitDucking').html(secondUnitDucking);
            $('#lastUnitDucking').html(lastUnitDucking);
          }, 500);
          $('#addToCart').click(function () {

            const getProductData = new GetProductData();
            const productData = getProductData.getProduct();

          })

        }

      } else {
        let firstPrice__ = '';
        function setStartPrice() {
          let firstPrice = '0';
          let lastPrice = '0';
          let secondPrice = '0';
          let price = '0';
          let priceColumn = $('.price-column');
          if($('.price-column.on-gray').length > 0){
            priceColumn = $('.price-column.on-gray');
          }
          let priceItem = $('.step-price-wrapper');
          if (priceColumn.length > 0 && priceItem.length < 1) {


            $('#multiPrice').hide()
            $('#multiUnitDucking').hide()
            let unit = $('.unit-text').text()
            if($('.unit-text.inline-mode').length > 0){
              unit = $('.price-column.on-gray .unit-text.inline-mode').text()
            }
            unit = unit.replace(/[^0-9]/ig, "");
            $('#unitDucking').html(unit);
            let priceBox = priceColumn.find('.price-box');
            if (priceBox.length === 1) {
              price = priceBox.find('span.price-text').text();
             
            }
            if (priceBox.length > 1) {
              firstPrice = priceBox.find('span.price-text').first().text();
              lastPrice = priceBox.find('span.price-text').last().text();
            }
            if (firstPrice != '0' && lastPrice != '0') {
              let firstPriceIdr = idrFormat(parseFloat(firstPrice) * currentRate);
              let lastPriceIdr = idrFormat(parseFloat(lastPrice) * currentRate);
              $('#idrPrice').html(`Rp ${firstPriceIdr} - Rp ${lastPriceIdr}`);
              return firstPrice__ = `Rp ${firstPriceIdr} - Rp ${lastPriceIdr}`;
            } else {
              let priceIdr = idrFormat(price * currentRate);
              $('#idrPrice').html(`Rp ${priceIdr}`);
              return firstPrice__ = `Rp ${priceIdr}`;
            }

          }

          if (priceItem.length > 0) {
            let stepPriceItem = priceItem.find('.step-price-item');
            $('#idrPrice').hide();
            $('#singleUnitDucking').hide();
            firstPrice = stepPriceItem.eq(0).find('.price-text').text();
            let firstPriceIdr = idrFormat(parseFloat(firstPrice) * currentRate);
            $('#firstPrice').html(`Rp ${firstPriceIdr}`);
            let firstUnit = stepPriceItem.eq(0).find('.unit-text').text();
            firstUnit = firstUnit.replace(/[^0-9]/ig, "");
            $('#firstUnitDucking').html(firstUnit);
            secondPrice = stepPriceItem.eq(1).find('.price-text').text();
            let secondPriceIdr = idrFormat(parseFloat(secondPrice) * currentRate);
            $('#secondPrice').html(`Rp ${secondPriceIdr}`);
            let secondUnit = stepPriceItem.eq(1).find('.unit-text').text();
            if (secondUnit.indexOf('-') > -1) {
              secondUnit = secondUnit.split('-');
              let firstSecondUnit = secondUnit[0];
              let secondSecondUnit = secondUnit[1];
              firstSecondUnit = firstSecondUnit.replace(/[^0-9]/ig, "");
              secondSecondUnit = secondSecondUnit.replace(/[^0-9]/ig, "");
              $('#secondUnitDucking').html(firstSecondUnit + '-' + secondSecondUnit);
            } else {
              secondUnit = secondUnit.replace(/[^0-9]/ig, "");
              $('#secondUnitDucking').html('≥' + secondUnit);
            }
            lastPrice = stepPriceItem.eq(2).find('.price-text')
            if (lastPrice.length > 0) {
              lastPrice = lastPrice.text();
              let lastPriceIdr = idrFormat(parseFloat(lastPrice) * currentRate);
              $('#lastPrice').html(`Rp ${lastPriceIdr}`);
              let lastUnit = stepPriceItem.eq(2).find('.unit-text').text();
              lastUnit = lastUnit.replace(/[^0-9]/ig, "");
              $('#lastUnitDucking').html('≥' + lastUnit);
            } else {
              $('.last').hide();
            }
          }
        }

        setIdrPrice = (price) => {
          $('#idrPrice').html(price);
        }
        setStartPrice();
        firstPrice__ = setStartPrice();
        if (tbProp.length === 1) {
          $('.tb-sku>dl.tb-prop>dd>ul>li').click(function () {
            if (!$(this).hasClass('tb-out-of-stock')) {
              setTimeout(function () {
                let idrPrice = $('#J_PromoPrice .tm-promo-price span.tm-price').text() ? $('#J_PromoPrice .tm-promo-price span.tm-price').text() : $('#J_StrPriceModBox span.tm-price').text();
                idrPrice = idrFormat(idrPrice * currentRate);
                idrPrice = 'Rp ' + idrPrice;
                setIdrPrice(idrPrice);
              }, 100);
            }
            setTimeout(function () {
              if ($('.tb-sku>dl.tb-prop>dd>ul>li.tb-selected').length < 1) {
                setIdrPrice(firstPrice__);
              }
            }, 100)
          });
        } else if (tbProp.length > 1) {
          $('.tb-sku>dl.tb-prop>dd>ul>li').click(function () {
            if (!$(this).hasClass('tb-out-of-stock')) {
              setTimeout(function () {
                let idrPrice = $('#J_PromoPrice .tm-prom-o-price span.tm-price').text() ? $('#J_PromoPrice .tm-promo-price span.tm-price').text() : $('#J_StrPriceModBox>dd>span.tm-price').text();
                idrPrice = idrFormat(idrPrice * currentRate);
                idrPrice = 'Rp ' + idrPrice;
                setIdrPrice(idrPrice);
              }, 100);
            }
            setTimeout(function () {
              if ($('.tb-sku>dl.tb-prop>dd>ul>li.tb-selected').length < 2) {
                setIdrPrice(firstPrice__);
              }
            }, 100)
          });
        }

      }


      function _1688Card(tbProp) {
        $.get(chrome.runtime.getURL('/cardDucking_1688.html'), function (data) {
          const itemDucking = new ItemDucking();
          $('head').append('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />');
          let offerLine = $('.layout-right>.od-pc-offer-line');
          let cpvContent = $('.layout-right>.od-pc-offer-cpv-contain');
          let btnWrapper = $('.order-button-wrapper');
          if (offerLine.length > 0) {
            offerLine.before(data);
          } else if (cpvContent.length > 0) {
            cpvContent.before(data);
          } else if (btnWrapper.length > 0) {
            btnWrapper.before(data);

          } else {
            $('.layout-right>.no-affix-wrapper').before(data);
          }



          // $('#loginBox').click(function () {
          //   $('#loginDuckingBox').show(); 
          // });
          // $('#closeLoginBox').click(function () {
          //   $('#loginDuckingBox').hide();
          // });
          // change to vanillaJs
          setTimeout(function () {
            document.getElementById('loginBoxDuck').addEventListener('click', function () {
              document.getElementById('loginDuckingBox').style.display = 'block';
            });

            document.getElementById('closeLoginBox').addEventListener('click', function () {
              document.getElementById('loginDuckingBox').style.display = 'none';
            });
            loginHandler();
          }, 3000);
          logoutHandler();

          if (hasToken) {
            $('#hoverIsLogin').hover(function () {
              $('#home').show();
              $('#user').show();
              $('#logout-btn').show();
              $('#data-logo').removeAttr('style');
              $('#data-logo').attr('style', 'float:left;width:25%');
              $('#data-member').removeAttr('style');
              $('#data-member').attr('style', 'float:left;width:37.5%');
              $('#duckingCard').removeAttr('style');
              $('#duckingCard').attr('style', 'border-radius: 3px;width: 50%;');
              $(this).mouseleave(function () {
                $('#data-logo').removeAttr('style');
                $('#data-logo').attr('style', 'float:left;width:50%');
                $('#data-member').removeAttr('style');
                $('#data-member').attr('style', 'float:left;width:50%');
                $('#duckingCard').removeAttr('style');
                $('#duckingCard').attr('style', 'border-radius: 3px;width: 30%;');
                $('#home').hide();
                $('#user').hide();
                $('#logout-btn').hide();
              })
            });
            const hasItem = itemDucking.get().then((res) => {
              if (res.productDetails.length > 0) {
                $('#hasItem').show();
              }
            });
          }
          if ($('#cart').length > 0) {
            
            let submitOrder = $('#submitOrder');
            submitOrder.before(data);
            dataTmp = [];
            // remove submitOrder
            submitOrder.remove();
            const getPrice = new GetPrice();
            
            if (getPrice.checkVer(1).values.length == 2) {
              $('#multiPrice').hide()
              $('#multiUnitDucking').hide()
              let prices = getPrice.checkVer(1).values;
              let firstPrice = prices[0];
              let lastPrice = prices[1];

              let firstPriceIdr = idrFormat(parseFloat(firstPrice) * currentRate);
              let lastPriceIdr = idrFormat(parseFloat(lastPrice) * currentRate);
              $('#idrPrice').html(`Rp ${firstPriceIdr} - Rp ${lastPriceIdr}`);

              let unitPcs = getPrice.checkVer(1).minOrder[0];
              unitPcs = unitPcs.replace(/[^0-9]/ig, "");
              $('#unitDucking').html(unitPcs);
              addToCart([]);

            } else if (getPrice.checkVer(1).values.length == 1) {
              $('#multiPrice').hide()
              $('#multiUnitDucking').hide()
              let prices = getPrice.checkVer(1).values;
              let firstPrice = prices[0];

              let firstPriceIdr = idrFormat(parseFloat(firstPrice) * currentRate);
              $('#idrPrice').html(`Rp ${firstPriceIdr}`);

              let unitPcs = getPrice.checkVer(1).minOrder[0];
              unitPcs = unitPcs.replace(/[^0-9]/ig, "");
              $('#unitDucking').html(unitPcs);
              addToCart([]);

            } else {
              $('#idrPrice').hide();
              $('#singleUnitDucking').hide();
              addToCart([]);


            }
          } else {
            setStartPrice();

            $('#logout-btn').click(function () {
              logout();
            });
            let url = window.location.href;
            let link = url;
            let seller = $('#hd_0_container_0 > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(1) > span').attr('title');
            let productName = $('.title-content>.title-first-column>.title-text').text();
            let keterangan_1 = "";
            let keterangan_2 = "";
            let qty = 0;
            let price = "0";
            let total = 0;
            let img_link = $('.detail-gallery-turn-wrapper').eq(1).find('img.detail-gallery-img').attr('src');
            let propItem = $('.sku-module-wrapper.sku-prop-module>.prop-item-wrapper');
            let dataTmp = [];
            let nextTableRow = $('.selector-table-wrapper>.selector-table>.specific-table>.next-table>.next-table-inner>.next-table-body>table>tbody>tr.next-table-row');
            if (nextTableRow.length > 0) {

              nextTableRow.find('.next-input-group-addon').click(function () {
                keterangan_2 = "";
                let nextTableNow = $(this).parent().parent().parent().parent().parent().parent();
                setTimeout(function () {
                  ({ keterangan_1, keterangan_2, price, qty, total } = pushTmp2(keterangan_1, nextTableNow, keterangan_2, price, qty, total, img_link, seller, productName, link, dataTmp));
                }, 100);
              });
            }
            let singleSkuBox = $('.single-sku-box');
            if (singleSkuBox.length > 0) {
              singleSkuBox.find('.next-btn').click(function () {
                keterangan_2 = "";
                let singleSkuBoxNow = $(this).parent().parent().parent().parent().parent().parent();
                keterangan_1 = "";
                setTimeout(function () {
                  price = singleSkuBoxNow.find('.price-item').eq(0).find('.price-num.summary-num').text();
                  // remove "元"
                  price = price.replace(/[^0-9]/ig, "");
                  qty = singleSkuBoxNow.find('.price-item').last().find('input').val();
                  total = price * qty;
                  pushData(img_link, seller, productName, link, keterangan_1, keterangan_2, qty, price, total, dataTmp, 3)
                }, 100);
              });
            }
            if (propItem.length > 0) {
              keterangan_1 = propItem.find('.prop-item-inner-wrapper.active>.prop-name').attr('title');
              addonGroupClickHandler(price, qty, keterangan_2, total, img_link, keterangan_1, link, productName, seller, dataTmp);
              addonGroupChangeHandler(price, qty, keterangan_2, total, img_link, keterangan_1, link, productName, seller, dataTmp, 5);
              propItem.find('.prop-item').click(function () {
                setTimeout(function () {
                  keterangan_1 = propItem.find('.prop-item-inner-wrapper.active>.prop-name').attr('title');
                  addonGroupClickHandler(price, qty, keterangan_2, total, img_link, keterangan_1, link, productName, seller, dataTmp)
                  $('span.next-input.next-medium.next-input-group-auto-width>input').change(function () {
                    let parentSku = $(this).parent().parent().parent().parent().parent();
                    pushTmp(price, parentSku, qty, keterangan_2, total, img_link, keterangan_1, link, productName, seller, dataTmp)
                  });
                }, 100)
              })
            } else {
              addonGroupClickHandler(price, qty, keterangan_2, total, img_link, keterangan_1, link, productName, seller, dataTmp)
              addonGroupChangeHandler(price, qty, keterangan_2, total, img_link, keterangan_1, link, productName, seller, dataTmp, 5);
              propItem.find('.prop-item').click(function () {
                setTimeout(function () {
                  keterangan_1 = propItem.find('.prop-item-inner-wrapper.active>.prop-name').attr('title');
                  $('.sku-item-wrapper .next-input-group-addon.next-after, .sku-item-wrapper .next-input-group-addon.next-before, .sku-item-wrapper .next-input.next-medium.next-input-group-auto-width>input').click(function () {
                    let parentSku = $(this).parent().parent().parent().parent();
                    setTimeout(function () {
                      ({ price, qty, keterangan_2, total } = pushTmp(price, parentSku, qty, keterangan_2, total, img_link, keterangan_1, link, productName, seller, dataTmp));
                    }, 100)
                  })
                  addonGroupChangeHandler(price, qty, keterangan_2, total, img_link, keterangan_1, link, productName, seller, dataTmp, 4);
                }, 100)
              })
            }
            addToCart(dataTmp);
          }
          setCustomer();
          dataList(itemDucking);
        });
      }
    };
  });


  function alertDucking(element, message, type = 'danger') {
    $(element).html(`<div class="alert alert-${type} p-2 text-center" role="alert" style="padding: 5px !important;margin-bottom: 7px;border-radius: 6px;">
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


  function addToCart(dataTmp) {
    $('#addToCartBtn').on('click', function () {
      if (!hasToken) {
        alertDucking('#duckingAlert', 'Silahkan login terlebih dahulu');
        return;
      }

      $('#addToCart').hide();
      $('#addToCartLoading').show();
      $('#addToCartBtn').attr('disabled', true);

      if ($('#cart').length > 0) {
        const getProductData = new GetProductData();
        const { dataProductArr } = getProductData.getProduct();
        if (dataProductArr.length < 1) {
          alertDucking('#duckingAlert', 'Silahkan pilih item terlebih dahulu');
          $('#addToCart').show();
          $('#addToCartLoading').hide();
          $('#addToCartBtn').attr('disabled', false);
          return;
        }
        let save = new ItemDucking().save(dataProductArr);
        save.then(function (res) {
          $('#hasItem').show();
          shake();
          $('#addToCart').show();
          $('#addToCartLoading').hide();
        }).catch(function (err) {
          alert(err.message)
          $('#addToCart').show();
          $('#addToCartLoading').hide();
        });

      }
       else if ($('.selector-table').length > 0) {

        const getProductData = new GetProductData();
        const { dataProductArr } = getProductData.getProductOld();
        if (dataProductArr.length < 1) {
          alertDucking('#duckingAlert', 'Silahkan pilih item terlebih dahulu');
          $('#addToCart').show();
          $('#addToCartLoading').hide();
          $('#addToCartBtn').attr('disabled', false);
          return;
        }
        let save = new ItemDucking().save(dataProductArr);
        save.then(function (res) {
          $('#hasItem').show();
          shake();
          $('#addToCart').show();
          $('#addToCartLoading').hide();
        }).catch(function (err) {
          alert(err.message)
          $('#addToCart').show();
          $('#addToCartLoading').hide();
        });
      } 
      else {
        if (dataTmp.length < 1) {
          alertDucking('#duckingAlert', 'Silahkan pilih item terlebih dahulu');
          $('#addToCart').show();
          $('#addToCartLoading').hide();
          $('#addToCartBtn').attr('disabled', false);
          return;
        }
        let save = new ItemDucking().save(dataTmp);
        save.then(function (res) {
          $('#hasItem').show();
          shake();
          $('#addToCart').show();
          $('#addToCartLoading').hide();
        }).catch(function (err) {
          alert(err.message)
          $('#addToCart').show();
          $('#addToCartLoading').hide();
        });
      }
    });
  }

}



