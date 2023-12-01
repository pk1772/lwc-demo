import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadStyle } from 'lightning/platformResourceLoader';
import toastOverride from '@salesforce/resourceUrl/toastOverride';

let styleLoaded = false; // Variable to track whether the style has been loaded

/**
 * Fires a UI toast event.
 * @param {string} title (required) - Title of the toast.
 * @param {string} message (required) - Message to be displayed.
 * @param {string[] or object} messageData - URL and label values that replace the {index} placeholders in the message string.
 * @param {string} variant - Valid values are: info (default), success, warning, and error.
 * @param {string} mode - Valid values are: dismissible (default), pester, and sticky.
 * @param {object} thisArg - The value to be passed as the this parameter to the callback function is bound.
 */
const showToast = (title, message, messageData, variant, mode, thisArg) => {
    const applyStyle = () => {
        if (styleLoaded) {
            return Promise.resolve(true); // Resolve immediately if style is already loaded
        } else {
            return loadStyle(thisArg, toastOverride)
                .then(() => {
                    return true;
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                    return false; // Return false in case of an error
                });
        }
    };

    applyStyle().then((result) => {
        if (result === true) {
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
        }
    });
};

export { showToast };
