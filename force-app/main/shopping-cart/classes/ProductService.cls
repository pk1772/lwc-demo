public with sharing class ProductService {
    public class ProductServiceException extends Exception {
        //TO DO
    }
    private static ProductService instance;

    public static ProductService getInstance() {
        if (instance == null) {
            instance = new ProductService();
        }
        return instance;
    }
    public List<Product2> getAvailableProducts() {
        try {
            return [
                SELECT
                    Id,
                    AvailableInventory__c,
                    DisplayUrl,
                    IsPreOrder__c,
                    ProductCode,
                    Description,
                    Name,
                    StockKeepingUnit,
                    Seller.Name,
                    QuantityUnitOfMeasure
                FROM Product2
                WHERE AvailableInventory__c > 0 AND IsActive = :true
                WITH SECURITY_ENFORCED
            ];
        } catch (Exception e) {
            throw new ProductServiceException(e.getMessage());
        }
    }
    public Map<Id, Decimal> getProductStandardPrice(Set<Id> productIds) {
        Map<Id, Decimal> productAndPrice = new Map<Id, Decimal>();
        for (PricebookEntry pbe : [
            SELECT UnitPrice, Product2Id
            FROM PricebookEntry
            WHERE
                IsActive = :true
                AND Pricebook2.IsStandard = :true
                AND Pricebook2.IsActive = :true
                AND Product2Id IN :productIds
            WITH SECURITY_ENFORCED
        ]) {
            if (!productAndPrice.containsKey(pbe.Product2Id)) {
                productAndPrice.put(pbe.Product2Id, pbe.UnitPrice);
            }
        }
        return productAndPrice;
    }
}
