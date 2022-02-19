public with sharing class FetchOpportunities {
    //public FetchOpportunities() {  //Get error with this declaration
        @AuraEnabled(Cacheable=true)
        public static List<Account> query(String recordId){
            try {
                return [Select Id, Name, (Select Id, Name FROM Opportunities) FROM Account WHERE Account.Id = :recordId];
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
    //}
}
