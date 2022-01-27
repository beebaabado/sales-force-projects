public with sharing class FetchOpportunities {
    //public FetchOpportunities() {  //Get error with this declaration
        @AuraEnabled(Cacheable=true)
        public static List<Account> query(){
            try {
                List<Account> opportunityList=[Select (Select Id, Name FROM Opportunities) FROM Account];
                return opportunityList;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
    //}
}
