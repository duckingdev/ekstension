class GetProductData {
    getProduct() {
        const productName = document.querySelector('.title-content>h1')?.textContent?.trim();
        const productLink = window.location.href;  // Link halaman produk
        // let imgLink = .od-gallery-turn-item-wrapper.prepic-active>img.od-gallery-img
        let imgLink = document.querySelector('.od-gallery-turn-item-wrapper.prepic-active>img.od-gallery-img')?.src;
        if ($('.sku-filter-button.v-flex.active').length > 0) {
            imgLink = $('.sku-filter-button.v-flex.active').find('img.ant-image-img').attr('src');  // Gambar produk utama
        }
        // <a class="shop-company-name v-flex" href="https://shop902395k9b9n42.1688.com/page/creditdetail.htm" data-trace="SHOP_CREDIT"><h1 title="汕头市澄海区宜朵玩具商行">汕头市澄海区宜朵玩具商行</h1><span class="arrow-right"></span></a>
        const sellerName = document.querySelector('.shop-company-name.v-flex')?.querySelector('h1')?.textContent?.trim() || document.querySelector('.shop-company-name.v-flex')?.querySelector('span')?.textContent?.trim();
        let keterangan_1, keterangan_2 = '';
        let dataProductArr = [];
        const featureItem = document.querySelectorAll('.feature-item');

        if (featureItem.length > 1) {
            keterangan_1 = featureItem[0].querySelector('.sku-filter-button.v-flex.active .label-name')?.textContent?.trim();

            const inputQty = document.querySelectorAll('input.ant-input-number-input');
            if (inputQty.length > 1) {
                inputQty.forEach((input) => {
                    if (input.value > 0) {
                        dataProductArr = [];
                        let container = input.closest('.expand-view-item');
                        keterangan_2 = container?.querySelector('.item-label')?.textContent?.trim() ?? '-';
                        let price = container?.querySelector('.item-price-stock')?.textContent?.trim() ?? '0';
                        price = price.replace(/¥/g, '').replace(/库存/g, '').replace(/件/g, '').replace(/支起批/g, '').replace(/支/g, '').trim();
                        price = price.split(' ')[0].replace(/,/g, '');
                        price = parseFloat(price);
                        let qty = input.value;
                        qty = parseInt(qty.replace(/,/g, ''));

                        dataProductArr.push({
                            product_name: productName,
                            link: productLink,
                            img_link: imgLink,
                            keterangan_1: keterangan_1,
                            keterangan_2: keterangan_2,
                            price: price,
                            qty: qty,
                            total: price * qty,
                            seller: sellerName
                        });
                    }
                });
            } else {

                dataProductArr = [];
                keterangan_2 = document.querySelector('.expand-view-item.v-flex')?.querySelector('.item-label')?.textContent?.trim();
                let price = document.querySelector('.expand-view-item.v-flex')?.querySelector('.item-price-stock')?.textContent?.trim();
                price = price.replace(/¥/g, '').replace(/库存/g, '').replace(/件/g, '').replace(/支起批/g, '').replace(/支/g, '').trim();
                price = price.split(' ')[0].replace(/,/g, '');
                price = parseFloat(price);
                let qty = document.querySelector('input.ant-input-number-input').value;
                qty = parseInt(qty.replace(/,/g, ''));
                dataProductArr.push({
                    product_name: productName,
                    link: productLink,
                    img_link: imgLink,
                    keterangan_1: keterangan_1,
                    keterangan_2: keterangan_2,
                    price: price,
                    qty: qty,
                    total: price * qty,
                    seller: sellerName
                });
            }
        } else {

            const inputQty = document.querySelectorAll('input.ant-input-number-input');
            if (inputQty.length > 1) {
                dataProductArr = [];
                inputQty.forEach((input) => {
                    if (input.value > 0) {
                        keterangan_2 = '-';
                        let container = input.closest('.expand-view-item');
                        let keterangan_1 = container?.querySelector('.item-label')?.textContent?.trim() ?? '-';
                        let rawPrice = container?.querySelector('.item-price-stock')?.textContent?.trim() ?? '0';

                        let price = rawPrice.replace(/¥/g, '').replace(/库存/g, '').replace(/件/g, '').replace(/支起批/g, '').replace(/支/g, '').trim();
                        price = price.split(' ')[0].replace(/,/g, '');
                        price = parseFloat(price);
                        let qty = input.value;
                        qty = parseInt(qty.replace(/,/g, ''));
                        dataProductArr.push({
                            product_name: productName,
                            link: productLink,
                            img_link: imgLink,
                            keterangan_1: keterangan_1,
                            keterangan_2: keterangan_2,
                            price: price,
                            qty: qty,
                            total: price * qty,
                            seller: sellerName
                        });
                    }
                });
            } else {
                ;
                let qty = document.querySelector('input.ant-input-number-input').value;
                qty = parseInt(qty.replace(/,/g, ''));
                if (qty > 0) {
                    dataProductArr = [];
                    keterangan_2 = '-';
                    keterangan_1 = document.querySelector('.expand-view-item.v-flex')?.querySelector('.item-label')?.textContent?.trim();
                    let price = document.querySelector('.expand-view-item.v-flex')?.querySelector('.item-price-stock')?.textContent?.trim();
                    price = price.replace(/¥/g, '').replace(/库存/g, '').replace(/件/g, '').replace(/支起批/g, '').replace(/支/g, '').trim();
                    price = price.split(' ')[0].replace(/,/g, '');
                    price = parseFloat(price);

                    dataProductArr.push({
                        product_name: productName,
                        link: productLink,
                        img_link: imgLink,
                        keterangan_1: keterangan_1,
                        keterangan_2: keterangan_2,
                        price: price,
                        qty: qty,
                        total: price * qty,
                        seller: sellerName
                    });
                } else {
                    console.log('qty tidak ada')
                }
            }
        }
        return {
            dataProductArr: dataProductArr,
        };
    }

    getProductOld() {
        const tileFirst = $('.title-content>.title-first-column>.title-text').text();
        const tileSecond = $('.title-content>.title-second-column>.title-second-column>.title-text.title-second-text').text();
        const productName = tileFirst + ' ' + tileSecond;
        const productLink = window.location.href;
        let imgLink = $('.detail-gallery-preview>img.preview-img').attr('src');
        if ($('.detail-gallery-img').length > 0) {
            imgLink = $('.detail-gallery-img').attr('src');
        }
        let sellerName = $('#hd_0_container_0 > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(1) > span').attr('title');
        if (sellerName == undefined) {
            sellerName = 'Tidak bisa mengambil nama seller';
        }

        //  class next-table-row has more than 1
        const nextTableRow = document.querySelectorAll('div.selector-table-wrapper > div.selector-table > div > div > div.next-table-inner > div.next-table-body > table  .next-table-row');
        const dataProductArr = [];
        nextTableRow.forEach(row => {
            const input = row.querySelector('input');
            const inputQty = input ? input.value : '0';
            const qty = parseInt(inputQty.replace(/,/g, ''));

            if (qty > 0) {
                const spanKeterangan1 = row.querySelector('td.next-table-cell.first > .next-table-cell-wrapper > .specification-cell > span.normal-text');
                const keterangan_1 = spanKeterangan1 ? spanKeterangan1.getAttribute('title') : '';

                const spanKeterangan2 = row.querySelectorAll('td.next-table-cell > .next-table-cell-wrapper > span.normal-text');
                let keterangan_2 = '';

                if (spanKeterangan2.length > 1) {
                    spanKeterangan2.forEach(span => {
                        const title = span.getAttribute('title');
                        if (title) {
                            keterangan_2 += title + '; ';
                        }
                    });
                } else {
                    keterangan_2 = spanKeterangan2[0]?.getAttribute('title') || '';
                    if (!keterangan_2) {
                        const fallbackText = row.querySelectorAll('td.next-table-cell')[2];
                        keterangan_2 = fallbackText ? fallbackText.textContent.trim() : '';
                    }
                }

                let priceText = row.querySelector('td.next-table-cell > .next-table-cell-wrapper > div.price')?.textContent || '0';
                let price = parseFloat(priceText.replace(/元/g, '').replace(/,/g, '').trim()) || 0;

                const total = qty * price;

                dataProductArr.push({
                    product_name: productName,
                    link: productLink,
                    img_link: imgLink,
                    keterangan_1: keterangan_1,
                    keterangan_2: keterangan_2,
                    price: price,
                    qty: qty,
                    total: total,
                    seller: sellerName
                });
            }
        });

        return {
            dataProductArr: dataProductArr,
        };
    }

    // getProduct() {
    //     const productName = document.querySelector('.title-content>h1')?.textContent?.trim();
    //     const productLink = window.location.href;

    //     let imgLink = document.querySelector('.od-gallery-turn-item-wrapper.prepic-active>img.od-gallery-img')?.src;
    //     if ($('.sku-filter-button.v-flex.active').length > 0) {
    //         imgLink = $('.sku-filter-button.v-flex.active').find('img.ant-image-img').attr('src');
    //     }

    //     const sellerName = document.querySelector('.shop-company-name.v-flex h1')?.textContent?.trim() ||
    //         document.querySelector('.shop-company-name.v-flex span')?.textContent?.trim();

    //     const featureItem = document.querySelectorAll('.feature-item');
    //     const inputQty = document.querySelectorAll('input.ant-input-number-input');
    //     const result = [];

    //     let keterangan_1 = '';
    //     let keterangan_2 = '';

    //     inputQty.forEach((input) => {
    //         let qty = parseInt(input.value.replace(/,/g, ''));
    //         if (!qty || qty <= 0) return;

    //         let priceText = document.querySelector('.expand-view-item.v-flex .item-price-stock')?.textContent?.trim() || '';
    //         let price = priceText.replace(/¥|库存|件|支起批|支/g, '').trim().split(' ')[0].replace(/,/g, '');
    //         price = parseFloat(price);
    //         if (isNaN(price)) price = 0;

    //         if (featureItem.length > 1) {
    //             keterangan_1 = featureItem[0].querySelector('.sku-filter-button.v-flex.active')?.textContent?.trim() || '';
    //             keterangan_2 = document.querySelector('.expand-view-item.v-flex .item-label')?.textContent?.trim() || '';
    //         } else {
    //             keterangan_1 = document.querySelector('.expand-view-item.v-flex .item-label')?.textContent?.trim() || '';
    //             keterangan_2 = '-';
    //         }

    //         result.push({
    //             product_name: productName,
    //             link: productLink,
    //             img_link: imgLink,
    //             keterangan_1,
    //             keterangan_2,
    //             price,
    //             qty,
    //             total: price * qty,
    //             seller: sellerName
    //         });
    //     });


    //     return {
    //         dataProductArr: result
    //     };
    // }


}

