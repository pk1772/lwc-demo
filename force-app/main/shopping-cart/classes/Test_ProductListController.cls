@isTest
private class Test_ProductListController {
    @isTest
    static void testGetAvailableProducts() {
        // Create test data
        Product2 product = new Product2(
            Name = 'Test Product',
            IsActive = true,
            AvailableInventory__c = 176
        );
        insert product;

        PricebookEntry pricebookEntry = new PricebookEntry(
            Pricebook2Id = Test.getStandardPricebookId(),
            Product2Id = product.Id,
            UnitPrice = 10.00,
            IsActive = true
        );
        insert pricebookEntry;

        // Call the method to test
        Test.startTest();
        List<ProductListController.OrderDetails> result = ProductListController.getAvailableProducts();
        Test.stopTest();

        // Perform assertions
        System.assertEquals(1, result.size());
        ProductListController.OrderDetails orderDetails = result[0];
        System.assertEquals(product.Id, orderDetails.product.Id);
        System.assertEquals(0, orderDetails.orderQty);
        System.assertNotEquals(null, orderDetails.orderDate);
        System.assertEquals(null, orderDetails.customerDetails);
    }

    @isTest
    static void testCreateSalesOrder() {
        // Create test data
        List<ProductListController.OrderDetails> orderDetailsList = new List<ProductListController.OrderDetails>();

        // Call the method to test
        Test.startTest();
        String result = ProductListController.createSalesOrder(
            orderDetailsList
        );
        Test.stopTest();

        // Perform assertions
        System.assertEquals(null, result);
    }

    @isTest
    static void testAddToCart() {
        // Create test data
        Product2 product = new Product2(Name = 'Test Product', IsActive = true);
        insert product;

        ProductListController.OrderDetails orderDetails = new ProductListController.OrderDetails(
            product,
            10.00,
            5,
            DateTime.now(),
            null
        );
        String orderDetailsJson = JSON.serialize(orderDetails);

        // Call the method to test
        Test.startTest();
        String result = ProductListController.addToCart(orderDetailsJson);
        Test.stopTest();

        // Perform assertions
        String expectedMessage =
            product.Name +
            ' of ' +
            orderDetails.orderQty +
            ' qty is added to the cart successfully!';
        System.assertEquals(expectedMessage, result);
    }
}