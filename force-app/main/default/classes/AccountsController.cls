public with sharing class AccountsController {
    @AuraEnabled
    public static List<Account> getAccounts() {
        return [
            SELECT Id, name, industry, Type, NumberOfEmployees, TickerSymbol, Phone
            FROM Account
            WITH SECURITY_ENFORCED
            ORDER BY createdDate ASC
            LIMIT 100
        ];
    }

    @AuraEnabled
    public static Account updateAccount(String accJSON) {
        Account accToUpdate;
        if (!String.isEmpty(accJSON)) {
            try {
                accToUpdate = (Account) JSON.deserialize(accJSON, Account.class);
                Database.update(accToUpdate, false);
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
        return accToUpdate;
    }
}
