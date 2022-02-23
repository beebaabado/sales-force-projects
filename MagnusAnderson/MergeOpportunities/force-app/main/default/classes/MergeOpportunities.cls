// Merge opportunities custom apex class
public with sharing class MergeOpportunities {   
    @AuraEnabled //(Cacheable=true)  
    //this is needed to expose to wire service.  But we are calling this apex method imperitively.  
    //Cannot use DML operation ( Data Manipulation Language)  using wire service. Wire service is read only (immutable) so will get an DML System.LimitException: Too many DML statements errors.
    public static Opportunity opmerge(String recordId, List<String> opportunityIdsList){
        try {
            //String joinedString = String.join('', opportunityIdsList);
            system.debug(opportunityIdsList);
            String op_id = opportunityIdsList.get(0);
            //system.debug(op_id);
            //system.debug(recordId);
            
            //Get List<Opportunity>all fields for opportunity ids in opportunityIdsList Note:  Don't use FIELDS(ALL) as not supported in apex class
            List<Account> AccOppList = [Select (Select Id, Name FROM Opportunities WHERE Id IN :opportunityIdsList) FROM Account WHERE Id = :recordId];
            system.debug(AccOppList);
            //Datetime date_now = Datetime.now();
            //String strDate = date_now.format();   

            // Opportunity new_opportunity = new Opportunity();
            // new_opportunity.AccountId = recordId;
            // new_opportunity.Name = 'Merged Opportunity' + strDate;
            // new_opportunity.StageName = 'Proposal/Price Quote';
            // new_opportunity.Closedate= System.today();
            // insert new_opportunity;

            //Opportunity cloned_opp = new_opportunity.clone(false, True, false, false);
            //insert cloned_opp;

            // Then merge data into new Opportunity.  Below is sample opportunity
            // [{"Id":"0065f000009BkzEAAS","IsDeleted":false,"AccountId":"0015f00000HSjKPAA1","IsPrivate":false, "Name":"Opportunity #1",
            //                     "Description":null,"StageName":"Proposal/Price Quote","Amount":"65000","Probability":"75","ExpectedRevenue":"48750","TotalOpportunityQuantity":"3",
            //                     "CloseDate":"2022-01-31","Type":"New Customer","NextStep":"site visit","LeadSource":"Web","IsClosed":false,"IsWon":false,
            //                     "ForecastCategory":"Pipeline","ForecastCategoryName":"Pipeline","CampaignId":null,"HasOpportunityLineItem":"true",
            //                     "Pricebook2Id":"01s5f00000CUghkAAD","OwnerId":"0055f000007h5vAAAQ","CreatedDate":"2022-01-07T05:32:23.000+0000",
            //                     "CreatedById":"0055f000007h5vAAAQ","LastModifiedDate":"2022-01-07T07:08:52.000+0000","LastModifiedById":"0055f000007h5vAAAQ",
            //                     "SystemModstamp":"2022-01-07T07:08:52.000+0000","LastActivityDate":null,"PushCount":0,"LastStageChangeDate":null,"FiscalQuarter":"1",
            //                     "FiscalYear":"2022","Fiscal":"2022 1","ContactId":null,"LastViewedDate":"2022-01-07T07:20:34.000+0000","LastReferencedDate":"2022-01-07T07:20:34.000+0000",
            //                     "HasOpenActivity":false,"HasOverdueTask":false,"LastAmountChangedHistoryId":"0085f00000qNO70AAG","LastCloseDateChangedHistoryId":null,
            //                     "DeliveryInstallationStatus__c":null,"TrackingNumber__c":null,"OrderNumber__c":null,"CurrentGenerators__c":null,"MainCompetitors__c":null}]
                               
            
            //Select (Select FIELDS(ALL) from opportunities LIMIT 200) from Account where Account.Id = '0015f00000IulddAAB' 
            //Select Id, Name, (Select Id, Name FROM Opportunities WHERE Id = '0065f000009BkzEAAS' ) FROM Account WHERE Account.Id = '0015f00000HSjKPAA1'
            List<Account> merge_opportunity = [Select Id, Name, (Select Id, Name FROM Opportunities WHERE Id = :op_id) FROM Account WHERE Id = :recordId];
            system.debug(merge_opportunity);
            return merge_opportunity.get(0).Opportunities.get(0); //'Opportunities: ' + 'TESTING....'; //opportunityIdsList.join(', ');
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
