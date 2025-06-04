

if (webTaobao) {
    $(document).ready(function () {

        // setTimeout(() => {
        //    loop check $('.Operation--root--Us_d-is').length if 1 then stop loop
        const observer = new MutationObserver(function (mutationsList, observer) {
            const item20242El = document.querySelector('.Item2024--ZmwahJzV');
            const item2025El = document.querySelector('.QJEEHAN8H5--purchasePanel--_37b78f2');
            const purchasePanelEl = document.getElementById('purchasePanel');

            if (item20242El || item2025El) {
                console.log('Item 2024 or 2025 found');
                let item20242 = $('.Item2024--ZmwahJzV').length;
                let item2025 = $('.QJEEHAN8H5--purchasePanel--_37b78f2').length;
                const isOutOfStock = $('.tm-out-of-stock').length > 0;

                if (item20242 === 1 && isOutOfStock) {
                    $('#idrPrice').html('Rp 0');
                }

                let priceNum2 = document.querySelector('.originPrice--UnZ18wCd>.priceText--gdYzG_l_');
                priceNum2 = document.querySelector('.text--fZ9NUhyQ') || document.querySelector('.QJEEHAN8H5--text--_4c1ce7d');
                checkToken();

                let tbProp = $('.tb-key>.tb-skin>.tb-sku>dl.tb-prop>dd>ul.tm-clear.J_TSaleProp');
                let firstPrice__ = '';
                duckingCard(tbProp, priceNum2, item20242, item2025);

                setIdrPrice = (price) => {
                    $('#idrPrice').html(price);
                };

                firstPrice__ = setStartPrice(priceNum2, item20242, item2025);

                if (item20242 > 0) {
                    document.querySelectorAll('.valueItem--GzWd2LsV').forEach(function (element) {
                        element.addEventListener('click', function () {
                            setTimeout(function () {
                                let idrPrice = document.querySelector('.text--fZ9NUhyQ').textContent;
                                idrPrice = idrFormat(idrPrice * currentRate);
                                setIdrPrice('Rp ' + idrPrice);
                            }, 100);
                        });
                    });
                } else if (item2025 > 0) {
                    document.querySelectorAll('.QJEEHAN8H5--valueItem--ee898cc0').forEach(function (element) {
                        element.addEventListener('click', function () {
                            setTimeout(function () {
                                let idrPrice = document.querySelector('.QJEEHAN8H5--text--_4c1ce7d').textContent;
                                idrPrice = idrFormat(idrPrice * currentRate);
                                setIdrPrice('Rp ' + idrPrice);
                            }, 100);
                        });
                    });
                } else {
                    if (tbProp.length === 1) {
                        $('.tb-sku>dl.tb-prop>dd>ul>li').click(function () {
                            if (!$(this).hasClass('tb-out-of-stock')) {
                                setTimeout(function () {
                                    let idrPrice = $('#J_PromoPrice .tm-promo-price span.tm-price').text() || $('#J_StrPriceModBox span.tm-price').text();
                                    idrPrice = idrFormat(idrPrice * currentRate);
                                    setIdrPrice('Rp ' + idrPrice);
                                }, 100);
                            }
                            setTimeout(function () {
                                if ($('.tb-sku>dl.tb-prop>dd>ul>li.tb-selected').length < 1) {
                                    setIdrPrice(firstPrice__);
                                }
                            }, 100);
                        });
                    } else if (tbProp.length > 1) {
                        $('.tb-sku>dl.tb-prop>dd>ul>li').click(function () {
                            if (!$(this).hasClass('tb-out-of-stock')) {
                                setTimeout(function () {
                                    let idrPrice;
                                    if ($('#J_StrPriceModBox').css('display') === 'none') {
                                        idrPrice = $('#J_PromoPrice .tm-promo-price span.tm-price').text();
                                    } else {
                                        idrPrice = $('#J_StrPriceModBox>dd>span.tm-price').text();
                                    }
                                    idrPrice = idrFormat(idrPrice * currentRate);
                                    setIdrPrice('Rp ' + idrPrice);
                                }, 100);
                            }
                            setTimeout(function () {
                                if ($('.tb-sku>dl.tb-prop>dd>ul>li.tb-selected').length < tbProp.length) {
                                    setIdrPrice(firstPrice__);
                                }
                            }, 100);
                        });
                    }
                }

                observer.disconnect(); // Stop observing after found
            } else if (purchasePanelEl) {
                console.log('Purchase panel found');
                duckingCard();
                observer.disconnect(); // Stop observing after found
            } else {
                console.log('Purchase panel not found');
                // Check if the element is removed
                if (item20242El) {
                    console.log('Item 2024 removed');
                    observer.disconnect(); // Stop observing after found
                } else if (item2025El) {
                    console.log('Item 2025 removed');
                    observer.disconnect(); // Stop observing after found
                }
            }
        });

        // Start observing the entire document
        observer.observe(document.body, { childList: true, subtree: true });
        // }, 3000);


    });

    function setStartPrice(priceNum2, item20242, item2025) {
        // let priceNum = document.querySelector('.originPrice--UnZ18wCd>.priceText--gdYzG_l_');
        let priceNum = '';
        // priceNum ? priceNum = document.querySelector('.highlightPrice--OOP9oDP8>.text--fZ9NUhyQ') : priceNum = priceNum;
        // priceNum = priceNum ? priceNum : document.querySelector('.MiniPrice--Zy6lKVz1 .priceText--YZzF3UMh');
        // priceNum = priceNum.textContent;
        let tbRmbNum = $('.tb-rmb-num').text();
        let promoPriceNum = $('#extraPrice--Y7SiNGXT>.priceText--gdYzG_l_.extraPriceText--aysuZjG_').text();
        let firstPrice = '0';
        let lastPrice = '0';
        let price = '0';
        if (item20242 > 0) {
            if (!priceNum2.textContent) {
                $('#idrPrice').html('Loading...');
                // loop until priceNum2 has value
                const observer = new MutationObserver(() => {
                    let priceNum2 = document.querySelector('.originPrice--UnZ18wCd>.priceText--gdYzG_l_') ||
                        document.querySelector('.highlightPrice--OOP9oDP8>.text--fZ9NUhyQ') ||
                        document.querySelector('.MiniPrice--Zy6lKVz1 .priceText--YZzF3UMh');

                    if (priceNum2 && priceNum2.textContent) {
                        observer.disconnect(); // stop observing once found
                        setStartPrice(priceNum2, item20242, item2025);
                    }
                });

                observer.observe(document.body, { childList: true, subtree: true });

            }
            priceNum = priceNum2.textContent;
            promoPriceNum = $('.Price--originPrice--2c8ipVx>.Price--priceText--1oEHppn').text();
        }
        if (item2025 > 0) {
            priceNum = priceNum2.textContent;
        }

        // check if priceNum is range price
        if (priceNum.indexOf('-') > -1) {
            let priceArray = priceNum.split('-');
            firstPrice = priceArray[0];
            lastPrice = priceArray[1];
        } else {
            price = priceNum2.textContent;
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
        let meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = 'upgrade-insecure-requests';
        document.head.appendChild(meta);

        fetch(chrome.runtime.getURL('/cardDucking.html'))
            .then(res => res.text())
            .then(data => {
                const itemDucking = new ItemDucking();

                const meta = document.createElement('meta');
                meta.httpEquiv = "Content-Security-Policy";
                meta.content = "upgrade-insecure-requests";
                document.head.appendChild(meta);

                const purchasePanel = document.getElementById('purchasePanel');

                let priceNum = 'Rp 0';

                if (purchasePanel) {
                    let priceText = '0';
                    // Gabungkan semua span dan div yang mengandung class '--text--' atau '--highlightPrice--'
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

                    const footWrap = document.querySelector('div[class*="--footWrap--"]');
                    footWrap?.remove();

                    const frag = document.createRange().createContextualFragment(data);
                    purchasePanel.appendChild(frag);
                } else {
                    if (item20242 > 0) {
                        document.querySelectorAll('.Actions--root--NWE5_Ko, .footWrap--LePfCZWd').forEach(el => el.innerHTML = '');
                        const panel = document.querySelector('.purchasePanel--cG3DU6bX.normalPanel--tH79cfP4.normalPanel');
                        if (panel) panel.insertAdjacentHTML('beforeend', data);
                    } else if (item2025 > 0) {
                        const contentWrap = document.querySelector('.QJEEHAN8H5--contentWrap--_3f8d83a');
                        const actions = document.querySelector('.QJEEHAN8H5--Actions--f3e90071');
                        if (contentWrap) contentWrap.insertAdjacentHTML('beforeend', data);
                        if (actions) actions.innerHTML = '';
                    } else {
                        const prog = document.getElementById('J_Progressive');
                        if (prog) prog.insertAdjacentHTML('beforebegin', data);
                    }

                    setStartPrice(priceNum2, item20242, item2025);
                }

                // Event bindings
                document.getElementById('loginBoxDuck')?.addEventListener('click', () => {
                    document.getElementById('loginDuckingBox')?.style.setProperty('display', 'block');
                });

                document.getElementById('closeLoginBox')?.addEventListener('click', () => {
                    document.getElementById('loginDuckingBox')?.style.setProperty('display', 'none');
                });

                loginHandler?.();
                logoutHandler?.();

                if (hasToken) {
                    const hover = document.getElementById('hoverIsLogin');
                    if (hover) {
                        hover.addEventListener('mouseenter', () => {
                            ['home', 'user', 'logout-btn'].forEach(id => document.getElementById(id)?.style.setProperty('display', 'block'));

                            document.getElementById('data-member')?.classList.replace('col-7', 'col-5');
                            document.getElementById('data-logo')?.classList.replace('col-5', 'col-3');
                        });

                        hover.addEventListener('mouseleave', () => {
                            ['home', 'user', 'logout-btn'].forEach(id => document.getElementById(id)?.style.setProperty('display', 'none'));

                            document.getElementById('data-member')?.classList.replace('col-5', 'col-7');
                            document.getElementById('data-logo')?.classList.replace('col-3', 'col-5');
                        });
                    }

                    itemDucking.get().then(res => {
                        if (res?.productDetails?.length > 0) {
                            document.getElementById('hasItem')?.style.setProperty('display', 'block');
                        }
                    });
                }

                document.getElementById('addToCart')?.addEventListener('click', () => {
                    if (!hasToken) {
                        alertDucking('#duckingAlert', 'Silahkan login terlebih dahulu');
                        return;
                    }

                    const hideLoading = () => {
                        document.getElementById('addTocart')?.style.setProperty('display', 'inline-block');
                        document.getElementById('addTocartLoading')?.style.setProperty('display', 'none');
                    };

                    if (document.getElementById('purchasePanel')) {
                        document.getElementById('addToCart')?.style.setProperty('display', 'none');
                        document.getElementById('addTocartLoading')?.style.setProperty('display', 'inline-block');
                        addToCartTmall(item20242, item2025);
                        document.getElementById('hasItem')?.style.setProperty('display', 'block');
                        shake?.();
                        hideLoading();
                        return;
                    }

                    if (tbProp.length < 1) {
                        document.getElementById('addToCart')?.style.setProperty('display', 'none');
                        document.getElementById('addTocartLoading')?.style.setProperty('display', 'inline-block');
                        addToCartTmall(item20242, item2025);
                        document.getElementById('hasItem')?.style.setProperty('display', 'block');
                        shake?.();
                        hideLoading();
                    } else {
                        addToCartNext(tbProp.length);
                    }
                });

                setCustomer?.();
                dataList(itemDucking);

                document.getElementById('logout-btn')?.addEventListener('click', () => {
                    if (typeof logout === 'function') {
                        logout();
                    } else {
                        console.warn('logout() is not defined');
                    }
                });
            });

    }
}




