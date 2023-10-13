import { LightningElement, track, wire } from 'lwc';
import getAvailableProducts from '@salesforce/apex/ProductListController.getAvailableProducts';
export default class ProductList extends LightningElement {
    @track productList;
    @track error;
    @wire(getAvailableProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.productList = data;
        } else if (error) {
            this.productList = undefined;
            this.error = error;
        }
    }
}
