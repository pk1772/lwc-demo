public with sharing class ProductListController {
    @AuraEnabled(cacheable=true)
    public static List<OrderDetails> getAvailableProducts() {
        List<OrderDetails> orderDetails = new List<OrderDetails>();
        try {
            List<Product2> availableProducts = ProductService.getInstance().getAvailableProducts();
            Map<Id, Decimal> productAndPrice = ProductService.getInstance()
                .getProductStandardPrice(new Map<Id, Product2>(availableProducts).keySet());

            for (Product2 prodt : availableProducts) {
                orderDetails.add(
                    new OrderDetailsBuilder()
                        .setProduct(prodt)
                        .setPrice(
                            productAndPrice.containsKey(prodt.Id)
                                ? productAndPrice.get(prodt.Id)
                                : 0.00
                        )
                        .setOrderQty(0)
                        .setOrderDate(DateTime.now())
                        .setCustomerDetails(null)
                        .build()
                );
            }
            return orderDetails;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static String createSalesOrder(List<OrderDetails> oDetailsList) {
        //TO DO
        return null;
    }
    @AuraEnabled
    public static String addToCart(String oDetails) {
        try {
            //TO DO: Use Custom Label
            OrderDetails od = (OrderDetails) JSON.deserialize(oDetails, OrderDetails.class);
            Decimal orderAmt = (od.price * od.orderQty).setScale(2);
            return (od.product.Name +
            ' of ' +
            od.orderQty +
            ' qty  and $' +
            String.valueOf(orderAmt) +
            ' is added to the cart successfully!');
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    public with sharing class OrderDetails {
        @AuraEnabled
        public Product2 product;
        @AuraEnabled
        public Decimal price;
        @AuraEnabled
        public Integer orderQty;
        @AuraEnabled
        public Datetime orderDate;
        //TO DO
        @AuraEnabled
        public Account customerDetails;
    }
}
