import { LightningElement, wire } from 'lwc';
// Import message service features required for subscribing and the message channel
import { subscribe, MessageContext } from 'lightning/messageService';
import GEO_CO_ORDINATES from '@salesforce/messageChannel/SimpleMessageChannel__c';
export default class LmsSubscriber extends LightningElement {
    subscription = null;
    @wire(MessageContext)
    messageContext;
    latitude;
    longitude;

    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(this.messageContext, GEO_CO_ORDINATES, (message) => {
                this.handleMessage(message);
            });
        }
    }
    // Handler for message received by component
    handleMessage(message) {
        console.log('##message ' + JSON.stringify(message));
        this.latitude = message.Latitude;
        this.longitude = message.Longitude;
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }
}
