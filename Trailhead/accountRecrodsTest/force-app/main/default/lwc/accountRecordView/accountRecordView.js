import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';  //one record at a time no UI layout
//import ACCOUNT_OBJECT from '@salesforce/schema/Account';
//import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import getAccounts from '@salesforce/apex/FetchAccountRecords.query';   // my class,  sql statement to retrieve account info 
const fields = [NAME_FIELD]

export default class AccountRecordView extends LightningElement {
    //objectApiName = ACCOUNT_OBJECT.objectApiName;
    @api recordId = Id;
    //@api objectApiName;
    //FIELDS = [ACCOUNT_NAME_FIELD];
    //accounts = [];
    //opportunities=[];
    error;
   
    // Checkbox properties, no checkboxes selected by default
    value = [];
    checked_opportunites = [];
    //options = [];
    options = [
        { label: 'Ross', value: 'option1' },
        { label: 'Rachel', value: 'option2' },
    ];

    accounts = [];

    @wire(getAccounts)
    AllAccounts ({error, data}) {
        if (data) {
            this.accounts = data;
            console.log("ACCOUNTS:", this.accounts);
            let i = 0;
            this.accounts.forEach(account => { 
                this.options[i] = {label: account.Name, value: account.Id};
                i++;
                console.log("ACCOUNT: ", account);
            });
            console.log("OPTIONS: ", this.options)
            this.error = undefined;
            
        } else {
            this.error = error;
            //this.options = undefined;
            this.accounts = undefined;
        }
    }

    handleClick(event) {
        console.log ("click merge button handler...");
        const checkboxes = document.querySelectorAll("input[name='opportunities']");
        console.log("CHECKBOXES: ", checkboxes);
        for (let i = 0; i < checkboxes.length; i++) {
            
            this.checked_opportunites.push(checkboxes[i].value);
            console.log("CB VALUE: ", checkboxes[i])
        }
        alert(this.checked_opportunites.join(', '));
        console.log("Selected opportunities: ", this.checked_opportunites);
    }

    @wire(getRecord, { recordId: '$recordId', fields: fields }) contact;
    
    // get options() {
    //     return this.options;
    // }

    get name() {
        console.log("GET NAME");
        return getFieldValue(this.contact.data, NAME_FIELD);
    }
    
    get account_id() {
        console.log("GET account id");
        return 
    }
    
    handleChange(event) {
        const changeValue = event.detail.value;
        alert(changeValue);
    }

    //checked_ops_ids = cmp.find("lightning-checkbox-group").filter(checkbox => checkbox.checked).map(input => input.dataset.id);
   
}