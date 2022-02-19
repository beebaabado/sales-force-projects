import { LightningElement, api, wire, track} from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';  //one record at a time no UI layout
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
//import FIELD_NAME from '@salesforce/schema/object.field';  WHAT IS FIELD NAME FOR OPPORTUNITIES?
import getOpportunities from '@salesforce/apex/FetchOpportunities.query';   // my class,  sql statement to retrieve account/opportunities info 
import mergeOpportunities from '@salesforce/apex/MergeOpportunities.opmerge';
const fields = [NAME_FIELD] 
export default class OpportunityRecordsView extends LightningElement {
    @api recordId = Id;
    error;
    account;
    opportunities;
    options;
    checked_opportunities = [];
    checked_opportunities_ids = [];
    
    @wire(getOpportunities, {recordId: '$recordId'})
    AccountOpportunities ({error, data}) {
        if (data) {
            this.account = data[0];
            console.log("data: ", data[0]);
            console.log("OPPORTUNITIES:", this.account);
            this.options=[];
            this.opportunities = this.account.Opportunities;
            this.opportunities.forEach(opportunity => {
                console.log("OPPORTUNITY: ", opportunity);
                this.options.push({label: opportunity.Name, value: opportunity.Id})  //where is indexOF issue!!!!!!
            });
            console.log("WIRED::OPTIONS: ", this.options)
            this.error = undefined;  
        } else {
            this.error = error;
            console.log("Error: ", this.error);
            this.options = undefined;
            this.account = undefined;
            this.opportunities = undefined;
        }
    }
    get name() {
        console.log("GET NAME...", this.account?.Name);
        return this.account?.Name;
    }

    // get options() {
    //     console.log("GET OPTIONS: entering...")
    //     console.log("get options::OPTIONS: ", this?.options);
    //     return this?.options;
    // }
    
    get selectedValues() {
        console.log("GET selected values: entering");
        console.log("GET selected values: ", this.checked_opportunities);
        return this.checked_opportunities.join(',');
    }

    // click event for merge button
    handleMergeClick(event) {
        console.log ("click merge button handler...");
        //const checkboxes = document.querySelectorAll("input[name='opportunities']");
        const checkboxes = document.querySelectorAll(".opportunity-options");
        console.log("CHECKBOXES: ", checkboxes);
        for (let i = 0; i < checkboxes.length; i++) {
            
            this.checked_opportunities_ids.push({
                sObjectType: 'String', // change to Opportunities object instead
                Id: checkboxes[i].value});
            console.log("CB VALUE: ", checkboxes[i])
        }
        alert(this.checked_opportunites.join(', '));

        mergeOpportunities({ opportunityIdsList: this.checked_opportunties_ids })   //NEXT TEST PASSING IN RECORD ID? 
        .then(result => { 
            console.log("mergeOpportunies as string: ", result)
            })
            .catch(error => {
            this.checked_opportunities_ids = undefined;
            this.error = error;
            });

        console.log("Selected opportunities: ", this.checked_opportunities_id);
    }

    // change event for group checkbox
    handleCheckboxChange(event) {
        console.log("CheckboxChangeEVENT!");
        console.log("Value: ", event.detail.value);
        this.checked_opportunites = event.detail.value;
        alert(`handleChange:  ${this.checked_opportunites.join(', ')}`);
    }

}