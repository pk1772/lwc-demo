import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import SHARE_ACCOUNT_ID from '@salesforce/messageChannel/LMSTemplate__c';
export default class LdsEditForm extends LightningElement {
    @wire(MessageContext)
    messageContext;

    subscription = null;
    accountId;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(this.messageContext, SHARE_ACCOUNT_ID, (message) => {
                this.handleMessage(message);
            });
        }
    }
    // Handler for message received by component
    handleMessage(message) {
        this.accountId = message.value;
    }
}
