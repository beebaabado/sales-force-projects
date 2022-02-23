import { LightningElement, api, wire, track} from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';  //one record at a time no UI layout
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
//import FIELD_NAME from '@salesforce/schema/object.field';  WHAT IS FIELD NAME FOR checked_opportunities?
import getOpportunities from '@salesforce/apex/FetchOpportunities.query';   // my class,  sql statement to retrieve account/opportunities info 
import mergeOpportunities from '@salesforce/apex/MergeOpportunities.opmerge';
const fields = [NAME_FIELD] 
export default class OpportunityRecordsView extends LightningElement {
    @api recordId = Id;
    error;
    account;
    opportunities;
    options;
    checked_opportunities = [];  // Note:  track not needed for primitive types like numbers, booleans, strings I think for reactive fields (shallow fashion)
                                // But for {} and [] use @track, deeply tracks mutations made to field.  
    checked_opportunities_ids = [];
    merged_opportunity = [];

    @wire(getOpportunities, {recordId: '$recordId'})
    AccountOpportunities ({error, data}) {
        if (data) {
            this.account = data[0];
            console.log("WIRED::data: ", data[0]);
            console.log("WIRED::OPPORTUNITIES:", this.account);
            this.options = [];
            this.opportunities = this.account.Opportunities;
            this.opportunities.forEach(opportunity => {
                //console.log("WIRED::OPPORTUNITY: ", opportunity);
                this.options.push({label: opportunity.Name, value: opportunity.Id})  
            });
            //this.checked_opportunities= [this.options[0].value];
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
    //     console.log("GET OPTIONS...")
    //     const options = this?.options_list;
    //     console.log("get options::OPTIONS: ", this?.options_list, " :: ", options);
    //     return options;
    // }
    
    get selectedValues() {
        console.log("SELECTED GET selected values: ", this.checked_opportunities);
        //const checkedItemsAsString = this.checked_opportunities.join(',');
        //console.log("SELECTED items as string: ", checkedItemsAsString);
        return this.checked_opportunities.join(',');
    }

    // click event for merge button
    handleMergeClick(event) {
        console.log ("click merge button handler...");

        mergeOpportunities({ recordId: this.account.Id, opportunityIdsList: this.checked_opportunities}) //NEXT TEST PASSING IN RECORD ID? 
        .then(result => { 
            console.log("mergeOpportunies: ", result)
            this.merged_opportunity = result;
            })
            .catch(error => {
                console.log("mergOpportunites...error: ", error);
                //this.checked_opportunities = undefined;
                this.error = error;
            });
        console.log("handleMergeClick::Selected opportunities: ", this.checked_opportunities);
    }

    // change event for group checkbox
    handleCheckboxChange(event) {
        console.log("CheckboxChangeEVENT!");
        console.log("Value: ", event.detail.value);
       // const selOptions = [...event.detail.value];
        this.checked_opportunities = event.detail.value; //selOptions;
        //alert(`handleChange:  ${this.checked_opportunities.join(', ')}`);
        console.log("checkboxchange: Checked opportunities: ", this.checked_opportunities.join(', '));
    }

}