import { LightningElement, api } from 'lwc';
import clockIcon from '@salesforce/resourceUrl/TimeIcon';
import addToCart from '@salesforce/apex/ProductListController.addToCart';
import toast from 'c/utilToast';

export default class ProductItem extends LightningElement {
    @api
    productDetails;
    orderQty = 0;
    iconImageUrl = clockIcon;

    handleItemInteraction(event) {
        console.log(event.target.localName);
        console.log(event.currentTarget.localName);
        if (
            event.currentTarget.dataset.name === 'add' &&
            this.productDetails.product.AvailableInventory__c >= this.orderQty
        ) {
            this.orderQty += 1;
        } else {
            if (this.orderQty > 0) this.orderQty -= 1;
        }
    }
    handleAddToCart() {
        let prodWrapper = JSON.parse(JSON.stringify(this.productDetails));
        prodWrapper.orderQty = this.orderQty;
        if (this.orderQty > 0) {
            addToCart({ oDetails: JSON.stringify(prodWrapper) })
                .then((returnValue) => {
                    this.showToast('Success', returnValue, 'success');
                })
                .catch((error) => {
                    this.showToast('Error', error.message, 'error');
                });
        } else {
            this.showToast('Error', 'Add at least an item to add to the cart', 'error');
        }
    }
    showToast(title, message, variant) {
        toast.showToast(title, message, null, variant);
    }
}
