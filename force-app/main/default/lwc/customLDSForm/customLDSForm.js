import { LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { publish, MessageContext } from 'lightning/messageService';
import SHARE_ACCOUNT_ID from '@salesforce/messageChannel/LMSTemplate__c';
import toast from 'c/utilToast';

export default class CustomLDSForm extends LightningElement {
    accountId;
    name = '';
    phone;
    website;
    type;
    industry;

    @wire(MessageContext)
    messageContext;

    get typeOptions() {
        return [
            { label: 'Prospect', value: 'Prospect' },
            { label: 'Customer - Direct', value: 'Customer - Direct' },
            { label: 'Other', value: 'Other' }
        ];
    }

    get industryOptions() {
        return [
            { label: 'Energy', value: 'Energy' },
            { label: 'Finance', value: 'Finance' },
            { label: 'Retail', value: 'Retail' }
        ];
    }

    handleChange = (event) => {
        this.accountId = undefined;
        let targetName = event.target.name;
        switch (targetName) {
            case 'name':
                this.name = event.target.value;
                break;
            case 'phone':
                this.phone = event.target.value;
                break;
            case 'website':
                this.website = event.target.value;
                break;
            case 'type':
                this.type = event.target.value;
                break;
            case 'industry':
                this.industry = event.target.value;
                break;
        }
    };

    _debounce(callback, wait) {
        let timeoutId = null;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                callback(...args);
            }, wait);
        };
    }

    createAccount() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[WEBSITE_FIELD.fieldApiName] = this.website;
        fields[TYPE_FIELD.fieldApiName] = this.type;
        fields[INDUSTRY_FIELD.fieldApiName] = this.industry;
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then((account) => {
                this.accountId = account.id;
                const payload = { value: this.accountId };
                publish(this.messageContext, SHARE_ACCOUNT_ID, payload);
                toast.showToast('Success', 'Account created', null, 'success');
            })
            .catch((error) => {
                toast.showToast('Error creating record', error.body.message, null, 'error');
            });
    }
}
