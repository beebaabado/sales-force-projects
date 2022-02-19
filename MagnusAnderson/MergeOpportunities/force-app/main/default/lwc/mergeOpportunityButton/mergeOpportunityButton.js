import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
const fields = [NAME_FIELD];

// const fields = [
//     'Contact.Name',
//     'Contact.Description',
//     'Contact.ShippingCity'
// ]

export default class MergeOpportunityButton extends NavigationMixin(LightningElement) {

    recordId = Id;
    clickedButtonLabel = 'NO NAME';

    handleClick(event) {
        this.clickedButtonLabel = event.target.label;
       // alert(event.target.label);
        alert("This is where the navigate to Merge Opportunities page shouled occur!!!");

    }

    @wire(getRecord, { recordId: '$recordId', fields: fields }) contact; 
    get name() {
        console.log("GET NAME");
        return getFieldValue(this.contact.data, NAME_FIELD);
    }
}