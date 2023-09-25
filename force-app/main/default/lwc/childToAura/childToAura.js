import { LightningElement, api } from 'lwc';

export default class ChildToAura extends LightningElement {
    @api
    fullName;

    @api
    getCurrentTime() {
        return new Date().toLocaleString();
    }

    connectedCallback() {
        console.log('#childToAura connectedCallback()');
    }
}
