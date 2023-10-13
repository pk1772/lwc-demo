public with sharing class OrderDetailsBuilder {
    private ProductListController.OrderDetails oDetails;

    public OrderDetailsBuilder() {
        oDetails = new ProductListController.OrderDetails();
    }
    public OrderDetailsBuilder setProduct(Product2 product) {
        oDetails.product = product;
        return this;
    }

    public OrderDetailsBuilder setPrice(Decimal price) {
        oDetails.price = price;
        return this;
    }
    public OrderDetailsBuilder setOrderQty(Integer orderQty) {
        oDetails.orderQty = orderQty;
        return this;
    }
    public OrderDetailsBuilder setOrderDate(DateTime orderDate) {
        oDetails.orderDate = orderDate;
        return this;
    }
    public OrderDetailsBuilder setCustomerDetails(Account customerDetails) {
        oDetails.customerDetails = customerDetails;
        return this;
    }
    public ProductListController.OrderDetails build() {
        return oDetails;
    }
}
