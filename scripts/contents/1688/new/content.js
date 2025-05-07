// if (web1688) {
//     fetch(chrome.runtime.getURL('/cardDucking_1688.html'))
//         .then(response => response.text())
//         .then(data => {
//             //  add data element to #submitOrder and replace the content with the data
//             let cardDucking = document.createElement('div');
//             cardDucking.innerHTML = data;
//             // append cardDucking to #submitOrder
//             let submitOrder = document.getElementById('submitOrder');
//             // .order-button-wrapper
//             let orderButtonWrapper = document.querySelector('.order-button-wrapper');
//             if (submitOrder) {
//                 appendCardDucking(submitOrder, cardDucking);
//             } else {
//                 appendCardDucking2(orderButtonWrapper, cardDucking);
//             }
//         })
//         .catch(error => console.error('Error fetching file:', error));

//     const appendCardDucking = (submitOrder, cardDucking) => {
//         // append cardDucking to #submitOrder
//         submitOrder.appendChild(cardDucking);
//         // hide .action-button-list
//         document.querySelector('.action-button-list').style.display = 'none';
//         const checkPrice = new GetPrice();
//         checkPrice.checkPrice(1);
//     }

//     const appendCardDucking2 = (orderButtonWrapper, cardDucking) => {
//         // Append cardDucking to #submitOrder
//         orderButtonWrapper.appendChild(cardDucking);

//         // Hide .action-button-list and show .order-button-wrapper
//         document.querySelector('.order-button-children').style.display = 'none';
//         document.querySelector('.order-button-wrapper').style.display = 'block';

//         // Get price list
//         const checkPrice = new GetPrice();
//         const priceList = checkPrice.checkPrice(2);

//         // Select price-related elements
//         const idrPrice = document.querySelector('#idrPrice');
//         const singleUnitDucking = document.querySelector('#singleUnitDucking');
//         const multiPrice = document.querySelector('#multiPrice');
//         const multiUnitDucking = document.querySelector('#multiUnitDucking');

//         if (priceList?.value.length === 3) {
//             // Hide single price elements
//             idrPrice.style.display = 'none';
//             singleUnitDucking.style.display = 'none';

//             // Update multi-price display
//             const [firstPrice, secondPrice, lastPrice] = [
//                 document.querySelector('#firstPrice'),
//                 document.querySelector('#secondPrice'),
//                 document.querySelector('#lastPrice')
//             ];

//             [firstPrice.innerText, secondPrice.innerText, lastPrice.innerText] = priceList?.value?.map(price => `Rp ${price}`);

//         } else if (priceList?.value.length === 2) {
//             // Hide multi-price elements
//             multiPrice.style.display = 'none';
//             multiUnitDucking.style.display = 'none';

//             // Update single price display
//             singleUnitDucking.innerText = `${priceList?.minOrder[0]} Pcs`;
//             idrPrice.innerText = priceList?.value[1] == 0
//                 ? `Rp ${priceList?.value[0]}`
//                 : `Rp ${priceList?.value[0]} - Rp ${priceList?.value[1]}`;
//             console.log(priceList?.value[1]);
//         }
//     };

// }