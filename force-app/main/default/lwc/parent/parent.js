import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {
    parentVariable = 'From parent';
    currentDate;
    childInput;
    constructor() {
        super();
        console.log('#Parent Constructor!');
    }
    connectedCallback() {
        console.log('#Parent connectedCallback!');
    }
    renderedCallback() {
        console.log('#Parent renderedCallback!');
    }
    disconnectedCallback() {
        console.log('#Parent disconnectedCallback!');
    }
    handleClick(){
        this.currentDate = this.template.querySelector('c-first-child').getCurrentDate();
    }
    handleChildInput(event){
        this.childInput = event.detail;
    }
}
