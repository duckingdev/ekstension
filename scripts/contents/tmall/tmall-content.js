
if (webTmall) {

  // on page load
  $(document).ready(function () {
    //    loop check $('.Operation--root--Us_d-is').length if 1 then stop loop
    setTimeout(() => {

      let loop = setInterval(function () {
        if ($('.Item2024--ZmwahJzV').length >  0 || $('.QJEEHAN8H5--purchasePanel--_37b78f2').length > 0) {
          let item20242 = $('.Item2024--ZmwahJzV').length;
          let item2025 = $('.QJEEHAN8H5--purchasePanel--_37b78f2').length;
          if (item20242 === 1) {
            // check if item is out of stock
            if ($('.tm-out-of-stock').length === 1) {
              // set idr price to 0
              $('#idrPrice').html('Rp 0');
              return;
            }
          }
          let priceNum2 = document.querySelector('.originPrice--UnZ18wCd>.priceText--gdYzG_l_');
          !priceNum2 ? priceNum2 = document.querySelector('.highlightPrice--OOP9oDP8>.text--fZ9NUhyQ') : priceNum2 = priceNum2;
          priceNum2 = priceNum2 ? priceNum2 : document.querySelector('.MiniPrice--Zy6lKVz1 .priceText--YZzF3UMh');
          priceNum2 = document.querySelector('.text--fZ9NUhyQ');
          priceNum2 = priceNum2 ? priceNum2 : document.querySelector('.text--Mdqy24Ex');
          priceNum2 = priceNum2 ? priceNum2 : document.querySelector('.QJEEHAN8H5--text--_4c1ce7d')
          checkToken();

          let tbProp = $('.tb-key>.tb-skin>.tb-sku>dl.tb-prop>dd>ul.tm-clear.J_TSaleProp')
          let firstPrice__ = '';
          duckingCard(tbProp, priceNum2, item20242, item2025);

          setIdrPrice = (price) => {
            $('#idrPrice').html(price);
          }
          setStartPrice(priceNum2, item20242, item2025);
          firstPrice__ = setStartPrice(priceNum2, item20242, item2025);
          if (item20242 > 0) {
            document.querySelectorAll('.valueItem--GzWd2LsV').forEach(function (element) {
              element.addEventListener('click', function () {
                setTimeout(function () {
                  let idrPrice = document.querySelector('.originPrice--UnZ18wCd>.priceText--gdYzG_l_');
                  !idrPrice ? idrPrice = document.querySelector('.highlightPrice--OOP9oDP8>.text--fZ9NUhyQ') : idrPrice = idrPrice;
                  idrPrice = idrPrice ? idrPrice : document.querySelector('.MiniPrice--Zy6lKVz1 .priceText--YZzF3UMh');
                  idrPrice = idrPrice.textContent;
                  idrPrice = idrFormat(idrPrice * currentRate);
                  idrPrice = 'Rp ' + idrPrice;
                  setIdrPrice(idrPrice);
                }, 200);
              });
            });
          }else if (item2025 > 0) {
            document.querySelectorAll('.QJEEHAN8H5--valueItem--ee898cc0').forEach(function (element) {
                element.addEventListener('click', function () {
                    setTimeout(function () {
                        let idrPrice = document.querySelector('.QJEEHAN8H5--text--_4c1ce7d').textContent;
                        idrPrice = idrFormat(idrPrice * currentRate);
                        idrPrice = 'Rp ' + idrPrice;
                        setIdrPrice(idrPrice);
                    }, 100);
                });
            });
        }  else {
            if (tbProp.length === 1) {
              $('.tb-sku>dl.tb-prop>dd>ul>li').click(function () {
                // check this class
                // hasn't class tb-out-of-stock
                if (!$(this).hasClass('tb-out-of-stock')) {
                  // timeouts
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
                // check this class
                // hasn't class tb-out-of-stock
                if (!$(this).hasClass('tb-out-of-stock')) {
                  // timeouts
                  setTimeout(function () {
                    let idrPrice = $('#J_PromoPrice .tm-promo-price span.tm-price').text() ? $('#J_PromoPrice .tm-promo-price span.tm-price').text() : $('#J_StrPriceModBox>dd>span.tm-price').text();
                    // if J_StrPriceModBox display none
                    if ($('#J_StrPriceModBox').css('display') === 'none') {
                      idrPrice = $('#J_PromoPrice .tm-promo-price span.tm-price').text();
                    } else {
                      idrPrice = $('#J_StrPriceModBox>dd>span.tm-price').text();
                    }
                    idrPrice = idrFormat(idrPrice * currentRate);
                    idrPrice = 'Rp ' + idrPrice;
                    setIdrPrice(idrPrice);
                  }, 100);
                }
                setTimeout(function () {
                  if ($('.tb-sku>dl.tb-prop>dd>ul>li.tb-selected').length < tbProp.length) {
                    setIdrPrice(firstPrice__);
                  }
                }, 100)
              });
            }
          }
          clearInterval(loop);
          return;
        }
      }, 100);
    }, 3000);
  });
  function setStartPrice(priceNum2, item20242, item2025) {
    let priceNum = '';
    let tbRmbNum = $('.tb-rmb-num').text();
    let promoPriceNum = $('#extraPrice--Y7SiNGXT>.priceText--gdYzG_l_.extraPriceText--aysuZjG_').text();
    let firstPrice = '0';
    let lastPrice = '0';
    let price = '0';
    if (item20242 > 0) {
      
      if (!priceNum2) {

        $('#idrPrice').html('Loading...');
        let loop = setInterval(function () {
         
        priceNum2 = document.querySelector('.text--fZ9NUhyQ');
          if (priceNum2) {
            clearInterval(loop);
            setStartPrice(priceNum2, item20242, item2025);
          }
        }, 100);

      }
      priceNum = priceNum2 ? priceNum2.textContent : 0;
      // promoPriceNum = $('.Price--originPrice--2c8ipVx>.Price--priceText--1oEHppn').text();
    } if (item2025 > 0) {
      priceNum = priceNum2.textContent;
  }

    // check if priceNum is range price
    if (priceNum.indexOf('-') > -1) {
      let priceArray = priceNum.split('-');
      firstPrice = priceArray[0];
      lastPrice = priceArray[1];
    } else {
      price = priceNum;
    }
    // }
    if (tbRmbNum) {
      // check if priceNum is range price
      if (tbRmbNum.indexOf('-') > -1) {
        let priceArray = tbRmbNum.split('-');
        firstPrice = priceArray[0];
        lastPrice = priceArray[1];
      } else {
        price = tbRmbNum;
      }
    }
    if (promoPriceNum) {
      if (promoPriceNum.indexOf('-') > -1) {
        let priceArray = promoPriceNum.split('-');
        firstPrice = priceArray[0];
        lastPrice = priceArray[1];
      } else {
        price = promoPriceNum;
      }
    }
    // if price is range price
    if (firstPrice != '0' && lastPrice != '0') {
      // convert to IDR
      let firstPriceIdr = idrFormat(parseFloat(firstPrice) * currentRate);
      let lastPriceIdr = idrFormat(parseFloat(lastPrice) * currentRate);

      // set price
      $('#idrPrice').html(`Rp ${firstPriceIdr} - Rp ${lastPriceIdr}`);
      return firstPrice__ = `Rp ${firstPriceIdr} - Rp ${lastPriceIdr}`;
    } else {
      // convert to IDR
      let priceIdr = idrFormat(parseFloat(price) * currentRate);
      $('#idrPrice').html(`Rp ${priceIdr}`);
      return firstPrice__ = `Rp ${priceIdr}`;
    }
  }

  function duckingCard(tbProp, priceNum2, item20242, item2025) {

    $.get(chrome.runtime.getURL('/cardDucking.html'), function (data) {
      const itemDucking = new ItemDucking();
      $('head').append('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />');

      if (item20242 > 0) {
        $('.Actions--root--NWE5_Ko').html('');
        $('.footWrap--LePfCZWd').html('');
        $('.purchasePanel--cG3DU6bX.normalPanel--tH79cfP4.normalPanel').append(data);
      }else if (item2025 > 0) {
        $('.QJEEHAN8H5--contentWrap--_3f8d83a').append(data);
        $('.QJEEHAN8H5--Actions--f3e90071').html('');
    } else {

        $('#J_Progressive').before(data);
      }
      $('#loginBox').click(function () {
        $('#loginDuckingBox').show();
      });
      $('#closeLoginBox').click(function () {
        $('#loginDuckingBox').hide();
      });
      loginHandler();
      logoutHandler();
      setStartPrice(priceNum2, item20242, item2025);
      if (hasToken) {
        $('#hoverIsLogin').hover(function () {
          $('#home').show();
          $('#user').show();
          $('#logout-btn').show();
          $('#data-member').removeClass('col-7');
          $('#data-member').addClass('col-5');
          $('#data-logo').addClass('col-3');
          $('#data-logo').removeClass('col-5');
          // if hover out 
          $(this).mouseleave(function () {
            $('#data-member').removeClass('col-5');
            $('#data-member').addClass('col-7');
            $('#data-logo').addClass('col-5');
            $('#data-logo').removeClass('col-3');
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
      $('#addToCart').on('click', function () {
        if (!hasToken) {
          alertDucking('#duckingAlert', 'Silahkan login terlebih dahulu');
          return;
        }
        if (tbProp.length < 1) {
          $('#addToCart').hide();
          $('#addTocartLoading').show();
          addToCartTmall(item20242,item2025);
          $('#hasItem').show();
          shake();
          $('#addTocart').show();
          $('#addTocartLoading').hide();


        }
        if (tbProp.length >= 1) {
          addToCartNext(tbProp.length);
        }
      });
      setCustomer();

      dataList(itemDucking);
      $('#logout-btn').click(function () {
        logout();
      });
    });
  }


}




