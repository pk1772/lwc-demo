import { LightningElement, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
export default class PubSubSubscriber extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    colorCode = '#fff';
    isRendered = false;
    connectedCallback() {
        // Subscribe to color-picker event
        registerListener('color-picker', this.handleColorChange, this);
    }

    disconnectedCallback() {
        // Unsubscribe from color-picker event
        unregisterAllListeners(this);
    }

    handleColorChange(colorCode) {
        if (/(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(colorCode)) {
            this.colorCode = '#' + colorCode;
        } else {
            this.colorCode = '#000';
        }
        const canvas = this.template.querySelector('[data-id="myCanvas"]');
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        ctx.fillStyle = this.colorCode;
        ctx.fill();
    }
}
