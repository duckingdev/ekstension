
if (web1688) {
  // on page load
  window.onload = function () {
    checkToken();

    let tbProp = $('.tb-key>.tb-skin>.tb-sku>dl.tb-prop>dd>ul.tm-clear.J_TSaleProp')
    let firstPrice__ = '';
    _1688Card(tbProp);

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

    function setStartPrice() {
      let firstPrice = '0';
      let lastPrice = '0';
      let secondPrice = '0';
      let price = '0';
      let priceColumn = $('.price-column');
      let priceItem = $('.step-price-wrapper');
      if (priceColumn.length > 0) {
        $('#multiPrice').hide()
        $('#multiUnitDucking').hide()
        let unit = $('.unit-text').text()
        unit = unit.replace(/[^0-9]/ig, "");
        $('#unitDucking').html(unit);
        let priceBox = priceColumn.find('.price-box');

        if (!priceBox) {
          // price = od-fx-price-pc-price-box
          price = $('.od-fx-price-pc-price-box>.price-text').text();

        }

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
      if ($('.od-fx-price-pc-price-column').length > 0) {

      }
    }

    function LoginPopupHandler(){
      
      
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

        let cart = $('#cart');

        document.addEventListener('DOMContentLoaded', function () {
          const loginBox = document.getElementById('loginBox');
          const closeLoginBox = document.getElementById('closeLoginBox');
          const loginDuckingBox = document.getElementById('loginDuckingBox');
          console.log('asas')
        
         
            console.log('asas2')
            loginBox.addEventListener('click', function () {
              console.log('loginBox');
              loginDuckingBox.style.display = 'block';
            });
        
            closeLoginBox.addEventListener('click', function () {
              loginDuckingBox.style.display = 'none';
            });
          
        });
        
        // $('#loginBox').click(function () {
        //   $('#loginDuckingBox').show();
        // });
        // $('#closeLoginBox').click(function () {
        //   $('#loginDuckingBox').hide();
        // });
        loginHandler();
        logoutHandler();
        setStartPrice();
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
        if (cart) {
          let submitOrder = $('#submitOrder');
          submitOrder.before(data);
          let mainPrice = $('#mainPrice');
          $('#multiPrice').hide()
          $('#multiUnitDucking').hide()
          let priecComp = $('.price-comp');
          // if price-comp length > 0
          if (priecComp.length > 0) {
            let prices = [];
            let priceComp = $('.price-comp');
            for (let i = 0; i < priceComp.length; i++) {
              let price = priceComp.eq(i).find('.price-info.currency>span').text();
              prices.push(price);
            }

            let firstPrice = prices[0];
            let lastPrice = prices[1];
            // ¥1.30 ¥12.00
            // remove "¥" and get the number with dot
            firstPrice = firstPrice.replace(/[^0-9.]/ig, "");
            lastPrice = lastPrice.replace(/[^0-9.]/ig, "");
            let firstPriceIdr = idrFormat(parseFloat(firstPrice) * currentRate);
            let lastPriceIdr = idrFormat(parseFloat(lastPrice) * currentRate);
            $('#idrPrice').html(`Rp ${firstPriceIdr} - Rp ${lastPriceIdr}`);
            {/* <div class="range-price"><div class="price-comp"><div class="price-info currency"><span>¥</span><span>1</span><span>.30</span></div><p></p></div><span class="text-wave">~</span><div class="price-comp"><div class="price-info currency"><span>¥</span><span>12</span><span>.00</span></div><p></p></div><p style="color: var(--od-color-text);">2盒起批</p></div> */ }
            // get 2 from <p style="color: var(--od-color-text);">2盒起批</p>
            // singleUnitDucking
            let unitPcs = $('.range-price>p').text();
            unitPcs = unitPcs.replace(/[^0-9]/ig, "");
            $('#unitDucking').html(unitPcs);

            // module-od-sku-selection cart-gap
            let skuSelection = $('.module-od-sku-selection.cart-gap');
            let keterangan1New = "";
            let keterangan2New = "";
            let qtyNew = 0;
            let priceNew = "0";
            let totalNew = 0;
            let img_linkNew = $('.od-gallery-turn-item-wrapper').eq(1).find('img.od-gallery-img').attr('src');
            // check if in skuSelection as .feature-item more than 1
            if (skuSelection) {
              let featureItem = skuSelection.find('.feature-item');
              if (featureItem.length > 1) {
                keterangan1New = featureItem.eq(0).find('.sku-filter-button.v-flex.active .label-name').text();
                let firstUnit = featureItem.eq(0);
                // if firstUnit has sku-filter-button v-flex, when clicked console.log('clicked')
                firstUnit.find('.sku-filter-button.v-flex').click(function () {
                  keterangan1New = $(this).find('.label-name').text();
                })
                // keterangan2New = featureItem.eq(1).find('.sku-filter-button.v-flex.active .label-name').text();

                // expand-view-list
                // expand-view-item v-flex
                // <div class="expand-view-item v-flex" ><div class="v-flex"><span class="item-label" title="连排袋装">连排袋装</span></div><span class="item-price-stock">¥1.5</span><span class="item-price-stock">库存98930盒</span><span class="item-input-number"><div class="ant-input-number-group-wrapper"><div class="ant-input-number-wrapper ant-input-number-group"><div class="ant-input-number-group-addon"><span role="img" aria-label="minus" class="anticon anticon-minus disabled"><svg viewBox="64 64 896 896" focusable="false" data-icon="minus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg></span></div><div class="ant-input-number ant-input-number-sm"><div class="ant-input-number-input-wrap"><input autocomplete="off" role="spinbutton" step="1" placeholder="0" class="ant-input-number-input" value=""></div></div><div class="ant-input-number-group-addon"><span role="img" aria-label="plus" tabindex="-1" class="anticon anticon-plus enable"><svg viewBox="64 64 896 896" focusable="false" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path></svg></span></div></div></div></span></div>

                let expandItem = $('.expand-view-item.v-flex');
                // if expandItem length > 0
                if (expandItem.length > 0) {

                  // for each expandItem
                  for (let i = 0; i < expandItem.length; i++) {

                    // if ant-input-number-group-addon click
                    expandItem.eq(i).find('.ant-input-number-group-addon').click(function () {
                      // get the value of input
                      let qty = $(this).parent().find('.ant-input-number-input').val();
                      // get the price of item
                      let price = $(this).parent().parent().find('.item-price-stock').eq(0).text();
                      // remove "¥"
                      price = price.replace(/[^0-9.]/ig, "");
                      // get the total price
                      let total = price * qty;
                      // push the data to array
                      keterangan2New = $(this).parent().parent().parent().parent().find('.item-label').text();
                      // pushData(img_linkNew, keterangan1New, keterangan2New, qty, price, total, dataTmp, 3)

                    })

                  }
                }
              }
            }
          }
        }
        setCustomer();
        dataList(itemDucking);
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
          nextTableRow.find('.next-btn').click(function () {
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
      });
    }


  };


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
    $('#addToCart').on('click', function () {
      if (!hasToken) {
        alertDucking('#duckingAlert', 'Silahkan login terlebih dahulu');
        return;
      }
      if (dataTmp.length < 1) {
        alertDucking('#duckingAlert', 'Silahkan pilih item terlebih dahulu');
        return;
      }
      $('#addToCart').hide();
      $('#addToCartLoading').show();
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
    });
  }

}



