
if (webTmall) {

  //    loop check $('.Operation--root--Us_d-is').length if 1 then stop loop
  // setTimeout(() => {

  // let loop = setInterval(function () {
  const observer = new MutationObserver(function (mutationsList, observer) {
    if (document.querySelector('.Item2024--ZmwahJzV') !== null || document.querySelector('.QJEEHAN8H5--purchasePanel--_37b78f2') !== null) {
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
      } else if (item2025 > 0) {
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
      } else {
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
      observer.disconnect();
      return;
    } else if ($('#purchasePanel').length > 0) {
      duckingCard();
      observer.disconnect();
      return;

    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  // }, 100);
  // }, 3000);

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

    (async function () {
      const response = await fetch(chrome.runtime.getURL('/cardDucking.html'));
      const data = await response.text();
      const itemDucking = new ItemDucking();

      const head = document.head || document.getElementsByTagName('head')[0];
      const meta = document.createElement('meta');
      meta.httpEquiv = "Content-Security-Policy";
      meta.content = "upgrade-insecure-requests";
      head.appendChild(meta);

      const purchasePanel = document.getElementById('purchasePanel');

      let priceNum = 'Rp 0';
      
      if (purchasePanel) {
        let priceText = '0';
        const allSpans = document.querySelectorAll('span[class*="--text--"]');
        for (const span of allSpans) {
          if (!/优惠前|原价|参考价/.test(span.parentElement.textContent)) {
            const num = span.textContent.trim().replace(/[^\d.]/g, '');
            if (num) {
              priceText = num;
              break;
            }
          }
        }


        const priceValue = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
        const priceIdr = idrFormat(priceValue * currentRate);
        priceNum = `Rp ${priceIdr}`;

        let attempts = 0;
        const maxAttempts = 50;

        const updatePrice = () => {
          const el = document.getElementById('idrPrice');
          if (el) {
            el.textContent = priceNum;
          } else if (attempts++ < maxAttempts) {
            requestAnimationFrame(updatePrice);
          }
        };
        updatePrice();

        // --footWrap--
        const footWrap = document.querySelector('div[class*="--footWrap--"]');
        footWrap?.remove();

        const frag = document.createRange().createContextualFragment(data);
        purchasePanel.appendChild(frag);
      } else if (item20242 > 0) {
        document.querySelectorAll('.Actions--root--NWE5_Ko, .footWrap--LePfCZWd')
          .forEach(el => el.innerHTML = '');

        const target = document.querySelector('.purchasePanel--cG3DU6bX.normalPanel--tH79cfP4.normalPanel');
        if (target) {
          const frag = document.createRange().createContextualFragment(data);
          target.appendChild(frag);
        }
      } else if (item2025 > 0) {
        const wrap = document.querySelector('.QJEEHAN8H5--contentWrap--_3f8d83a');
        const actions = document.querySelector('.QJEEHAN8H5--Actions--f3e90071');
        if (wrap && actions) {
          wrap.appendChild(document.createRange().createContextualFragment(data));
          actions.innerHTML = '';
        }
      } else {
        const prog = document.getElementById('J_Progressive');
        if (prog) {
          prog.insertAdjacentHTML('beforebegin', data);
        }
      }

      document.getElementById('loginBoxDuck')?.addEventListener('click', () => {
        document.getElementById('loginDuckingBox')?.style.setProperty('display', 'block');
      });

      document.getElementById('closeLoginBox')?.addEventListener('click', () => {
        document.getElementById('loginDuckingBox')?.style.setProperty('display', 'none');
      });

      loginHandler();
      logoutHandler();
      setStartPrice(priceNum2, item20242, item2025);

      if (hasToken) {
        const hoverTarget = document.getElementById('hoverIsLogin');
        if (hoverTarget) {
          hoverTarget.addEventListener('mouseenter', () => {
            ['home', 'user', 'logout-btn'].forEach(id => {
              const el = document.getElementById(id);
              if (el) el.style.display = 'block';
            });
            const member = document.getElementById('data-member');
            const logo = document.getElementById('data-logo');
            if (member && logo) {
              member.classList.replace('col-7', 'col-5');
              logo.classList.replace('col-5', 'col-3');
            }
          });

          hoverTarget.addEventListener('mouseleave', () => {
            ['home', 'user', 'logout-btn'].forEach(id => {
              const el = document.getElementById(id);
              if (el) el.style.display = 'none';
            });
            const member = document.getElementById('data-member');
            const logo = document.getElementById('data-logo');
            if (member && logo) {
              member.classList.replace('col-5', 'col-7');
              logo.classList.replace('col-3', 'col-5');
            }
          });
        }

        itemDucking.get().then((res) => {
          if (res?.productDetails?.length > 0) {
            document.getElementById('hasItem')?.style.setProperty('display', 'block');
          }
        });
      }

      const addBtn = document.getElementById('addToCart');
      addBtn?.addEventListener('click', () => {
        if (!hasToken) {
          alertDucking('#duckingAlert', 'Silahkan login terlebih dahulu');
          return;
        }

        const show = () => {
          document.getElementById('hasItem')?.style.setProperty('display', 'block');
          shake();
          document.getElementById('addTocart')?.style.setProperty('display', 'inline-block');
          document.getElementById('addTocartLoading')?.style.setProperty('display', 'none');
        };

        document.getElementById('addToCart')?.style.setProperty('display', 'none');
        document.getElementById('addTocartLoading')?.style.setProperty('display', 'inline-block');

        if (purchasePanel) {
          addToCartTmall(item20242, item2025);
          show();
        } else if (tbProp.length < 1) {
          addToCartTmall(item20242, item2025);
          show();
        } else {
          addToCartNext(tbProp.length);
        }
      });

      setCustomer();
      dataList(itemDucking);

      document.getElementById('logout-btn')?.addEventListener('click', logoutHandler);
    })();

  }


}




