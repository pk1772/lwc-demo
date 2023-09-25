import { LightningElement, api } from 'lwc';

export default class FirstChild extends LightningElement {
    @api childVariable;
    constructor() {
        super();
        console.log('#FirstChild Constructor!');
    }
    connectedCallback() {
        console.log('#FirstChild connectedCallback!');
    }
    renderedCallback() {
        console.log('#FirstChild renderedCallback!');
    }
    disconnectedCallback() {
        console.log('#FirstChild disconnectedCallback!');
    }

    @api
    getCurrentDate(){
        return new Date().getDate();
    }
    handleOnblur(event){
        let value = event.target.value;
        //this.dispatchEvent(new CustomEvent('childinput', value))
        const myEvent = new CustomEvent('childinput', {
            detail: value
        });
        this.dispatchEvent(myEvent);
    }
}
