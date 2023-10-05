import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/**
 * Fires a ui toast event.
 * @param {string} title (required) - Title of the toast.
 * @param {string} message (required) - Message to be displayed.
 * @param {string[] or object} messageData - url and label values that replace the {index} placeholders in the message string.
 * @param {string} variant -  Valid values are: info (default), success, warning, and error.
 * @param {string} mode -  Valid values are: dismissible (default), pester and sticky
 */

const showToast = (title, message, messageData, variant, mode) => {
    let params = { title: title, message: message };
    if (messageData) {
        params.messageData = messageData;
    }
    if (variant) {
        params.variant = variant;
    }
    if (mode) {
        params.mode = mode;
    }
    const event = new ShowToastEvent(params);
    dispatchEvent(event);
};
export { showToast };
