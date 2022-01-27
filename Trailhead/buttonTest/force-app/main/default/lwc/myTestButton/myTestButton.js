import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import Id from '@salesforce/user/Id';

import NAME_FIELD from '@salesforce/schema/User.Name';
const fields = [NAME_FIELD];

// const fields = [
//     'Contact.Name',
//     'Contact.Description',
//     'Contact.ShippingCity'
// ]

export default class MyTestButton extends LightningElement {
    recordId = Id;
    clickedButtonLabel = 'button not clicked';

    handleClick(event) {
        this.clickedButtonLabel = event.target.label;
        console.log("BUTTON CLICKED");
    }

    // @wire(getRecord, { recordId: '$recordId', fields: fields }) contact;
    // 
    get name() {
        console.log("GET NAME");
        return getFieldValue(this.contact.data, NAME_FIELD);
    }


    // NEXT STEP get account data and then opportunities
    //
    // Clone an opportunity
    // compare fields and take cloned value, sum of fields if products, or higher value if prices/numeric
    
    // get description() {
    //     return this.contact.data.fields.Description.value;
    // }

    // get shipCity() {
    //     return this.contact.data.fields.ShippingCity.value;
    // }

    // get id() {
    //     return '$recordId'
    // }

    // Get account list 
}
