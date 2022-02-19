public with sharing class MergeOpportunities {
    @AuraEnabled(Cacheable=true)
    public static String opmerge(List<String> opportunityIdsList){
        try {
            //String joinedString = String.join('', opportunityIdsList);
            system.debug(opportunityIdsList);
            return 'Opportunities: ' + 'TESTING....'; //opportunityIds.join(', ');
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
//NOTE to you for morning...testing of passing opportunities ids to method that will do mergeing.