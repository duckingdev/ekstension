class GetPrice {
    checkPrice(ver) {
        try {
            let price = this.checkVer(ver);
            return price;
        } catch (e) {
            console.error(e);
            return 'Price not found';
        }
    }

    checkVer(ver) {
        const indoExchangeRate = 2200;
        const price = {
            value: [],
            minOrder: []
        }

        const parsePrice = (price, decimal) => {
            return ((parseFloat(price) + parseFloat(decimal)) * indoExchangeRate).toLocaleString('id-ID');
        };

        if (ver === 1) {
            const priceInfo = document.querySelectorAll('.price-info.currency');

            if (priceInfo.length < 2) {
                throw new Error('Not enough .price-info.currency elements found');
            }

            const price1 = priceInfo[0]?.children[1]?.innerText || '0';
            const price2 = priceInfo[1]?.children[1]?.innerText || '0';
            const price1Decimal = priceInfo[0]?.children[2]?.innerText || '0';
            const price2Decimal = priceInfo[1]?.children[2]?.innerText || '0';

            const priceIndo1 = parsePrice(price1, price1Decimal);
            const priceIndo2 = parsePrice(price2, price2Decimal);

            // if priceInfo length is 3, then add the third price
            if (priceInfo.length === 3) {
                const price3 = priceInfo[2]?.children[1]?.innerText || '0';
                const price3Decimal = priceInfo[2]?.children[2]?.innerText || '0';
                const priceIndo3 = parsePrice(price3, price3Decimal);
                price.push(priceIndo1, priceIndo2, priceIndo3);
                return price;
            }


            price.push(priceIndo1, priceIndo2);

            return price;
        }

        if (ver === 2) {
            let priceColumn = document.querySelector('.price-column');

            if (!priceColumn) {

                priceColumn = document.querySelector('.od-pc-offer-price-common');
            }

            const priceBoxes = priceColumn.querySelectorAll('.price-box .price-text strong');
            // <span class="unit-text inline-mode" data-spm-anchor-id="a261y.7663282.1081181309582.i0.1449734aGDZsjc">100把起批</span>

            // get minimum order from .unit-text.inline-mode only get number




            const price1 = priceBoxes[0]?.innerText || '0';
            const price1Decimal = priceBoxes[1]?.innerText || '0';
            const price2 = priceBoxes[2]?.innerText || '0';
            const price2Decimal = priceBoxes[3]?.innerText || '0';

            const priceIndo1 = parsePrice(price1, price1Decimal);
            const priceIndo2 = parsePrice(price2, price2Decimal);

            // if priceInfo length is 3, then add the third price
            if (priceBoxes.length === 6) {
                const price3 = priceBoxes[4]?.innerText || '0';
                const price3Decimal = priceBoxes[5]?.innerText || '0';
                const priceIndo3 = parsePrice(price3, price3Decimal);

                // <div class="step-price-wrapper"><div class="step-price-item"><div class="price-box"><span class="price-unit">¥</span><span class="price-text"><strong>15</strong><strong style="font-size: 14px;">.00</strong></span></div><div class="step-unit-box"><span class="unit-text sale-amount-text">1-49个</span></div></div><div class="step-price-item"><div class="price-box"><span class="price-unit">¥</span><span class="price-text"><strong>13</strong><strong style="font-size: 14px;">.00</strong></span></div><div class="step-unit-box"><span class="unit-text sale-amount-text">50-499个</span></div></div><div class="step-price-item"><div class="price-box"><span class="price-unit">¥</span><span class="price-text"><strong>10</strong><strong style="font-size: 14px;">.00</strong></span></div><div class="step-unit-box"><span class="unit-text sale-amount-text">≥500个</span></div></div></div>
                // get minOrder from unit-text sale-amount-text
                // 1-49个 50-499个 ≥500个
                // push 3 minOrder
                const minOrders = priceColumn.querySelectorAll('.unit-text.sale-amount-text').forEach((minOrder) => {
                    price.minOrder.push(minOrder.innerText.match(/\d+/g)[0]);
                });
                // push to value
                

                
                price.value.push(priceIndo1, priceIndo2, priceIndo3);


            } else {
                const minOrders = priceColumn.querySelector('.unit-text.inline-mode')?.innerText.match(/\d+/g)[0] || 0;
                price.minOrder.push(minOrders);
                // push to value
                price.value.push(priceIndo1, priceIndo2);
            }
            return price;


        }

        return 'Invalid version';
    }
}
