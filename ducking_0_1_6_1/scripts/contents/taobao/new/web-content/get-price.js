class GetPriceTaoBao {
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
        let price = [];

        const parsePrice = (price, decimal) => {
            return (parseFloat(price) + parseFloat(decimal));
        };

        if (ver === 1) {
            let priceClass = document.querySelectorAll('yo3LiN8lZu--text--_4c1ce7d');
            if (priceClass.length < 1) {
                throw new Error('Not enough .yo3LiN8lZu--text--_4c1ce7d elements found');
            }

            const price = priceClass[0]?.innerText || '0';
            return price;
        }

       

        return 'Invalid version';
    }
}
