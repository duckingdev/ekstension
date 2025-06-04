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
        let price = {
            values: [],
            minOrder: []
        }

        const parsePrice = (price, decimal) => {
            return (parseFloat(price) + parseFloat(decimal));
        };

        if (ver === 1) {
            let priceComponents = document.querySelectorAll('.price-component.range-price').length > 1 ? document.querySelectorAll('.price-component.range-price')[1] : document.querySelectorAll('.price-component.range-price')[0];
            priceComponents= document.querySelector('.price-component.step-price')  || priceComponents;
            
            // const priceInfo = document.querySelectorAll('.price-info.currency');
            const priceInfo = priceComponents?.querySelectorAll('.price-info.currency') || document.querySelectorAll('.price-info.currency');
        

            if (priceInfo.length < 1) {
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
                price.values.push(priceIndo1, priceIndo2, priceIndo3);
                const priceComps = document.querySelectorAll('.price-comp p span');
                priceComps.forEach(span => {
                    const cleanedText = span.innerText
                        .replace(/支起批|支|张|张起批/g, '') // hapus '支起批' dan '支'
                        .trim();
                    price.minOrder.push(cleanedText);
                });
                return price;
            } else if (priceInfo.length === 2) {
                price.values.push(priceIndo1, priceIndo2);

                const minOrderRange = priceComponents?.querySelectorAll('p')[2].innerText;
                const cleanedText = minOrderRange
                    .replace(/件起批|支起批|支/g, '') // hapus '支起批' dan '支'
                    .trim();
                price.minOrder.push(cleanedText);
                return price;
            }
            const minOrderRange = document.querySelector('.price-component.range-price')?.querySelectorAll('p')[1].innerText;
            
            const cleanedText = minOrderRange
                .replace(/件起批|支起批|支/g, '') // hapus '支起批' dan '支'
                .trim();
            price.minOrder.push(cleanedText);
            price.values.push(priceIndo1);
            // price.values.push(priceIndo1, priceIndo2);
            // price.minOrder.push(minOrderRange);

            return price;
        }

        if (ver === 2) {
            let priceColumn = document.querySelector('.price-column');
            if (!priceColumn) {
                priceColumn = document.querySelector('.od-pc-offer-price-common');
            }
            const priceBoxes = priceColumn.querySelectorAll('.price-box .price-text strong');
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

                const minOrders = priceColumn.querySelectorAll('.unit-text.sale-amount-text').forEach((minOrders) => {
                    price.minOrder.push(minOrders.innerText.match(/\d+/g)[0]);
                });
                
                // push to value



                price.values.push(priceIndo1, priceIndo2, priceIndo3);


            } else {
                const minOrders = priceColumn.querySelector('.unit-text.inline-mode')?.innerText.match(/\d+/g)[0] || 0;
                price.minOrder.push(minOrders);
                // push to value
                price.values.push(priceIndo1, priceIndo2);
            }
            return price;


        }

        return 'Invalid version';
    }
}
