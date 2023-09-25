import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class PublisherComponent extends LightningElement {
    @wire(CurrentPageReference) pageRef;

    handleOnblur(event) {
        let colorCode = event.target.value;
        /**
         * Fires an event to listeners.
         * @param {object} pageRef - Reference of the page that represents the event scope.
         * @param {string} eventName - Name of the event to fire.
         * @param {*} payload - Payload of the event to fire.
         */
        fireEvent(this.pageRef, 'color-picker', colorCode);
    }
}
