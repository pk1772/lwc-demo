import { LightningElement } from 'lwc';
import toast from 'c/utilToast';
import getEncodedSpeech from '@salesforce/apex/OpenAICallout.getEncodedSpeech';
// Text to be converted to speech
export default class CommWelcomeMessage extends LightningElement {
    b64toBlob(b64Data, contentType, sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
    handleClick() {
        let text = this.template.querySelector('div').textContent;
        this.convertTextToSpeech(text);
    }

    async convertTextToSpeech(text) {
        getEncodedSpeech({ txt: text })
            .then((base64Data) => {
                const contentType = 'audio/mpeg'; // content type for audio/mp3
                const blob = this.b64toBlob(base64Data, contentType);
                const audioUrl = URL.createObjectURL(blob);
                let audioElement = new Audio(audioUrl);
                audioElement.play();
            })
            .catch((error) => {
                console.error(error);
                toast.showToast('SERVER_ERROR', error.body.message, null, 'error', 'sticky', this);
            });
    }
}
