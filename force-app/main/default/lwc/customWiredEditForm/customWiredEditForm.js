import { LightningElement, wire } from 'lwc';
import { getRecord, notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';
import updateAccountApex from '@salesforce/apex/AccountsController.updateAccount';
import { subscribe, MessageContext } from 'lightning/messageService';
import SHARE_ACCOUNT_ID from '@salesforce/messageChannel/LMSTemplate__c';
const FIELDS = [
    'Account.Name',
    'Account.Type',
    'Account.Phone',
    'Account.Website',
    'Account.Industry'
];
export default class CustomWiredEditForm extends LightningElement {
    accountId;
    name = '';
    phone;
    website;
    type;
    industry;
    error;

    //@wire(getRecord, { recordId: '$accountId', fields: FIELDS })
    //account;

    @wire(MessageContext)
    messageContext;

    subscription = null;

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

    handleChange = (event) => {
        let targetName = event.target.name;
        switch (targetName) {
            case 'name':
                this.name = event.target.value;
                break;
            /*case 'phone':
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
                break;*/
        }
    };

    updateAccount() {
        let account = {};
        account.Id = this.accountId;
        account.Name = this.name;
        //account.Type = this.type;
        //account.Phone = this.phone;
        //account.Website = this.website;
        //account.Industry = this.industry;
        updateAccountApex({ accJSON: JSON.stringify(account) })
            .then((results) => {})
            .catch((error) => {
                this.error = error;
            });
    }
}
