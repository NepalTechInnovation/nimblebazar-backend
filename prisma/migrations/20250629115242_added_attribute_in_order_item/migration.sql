-- CreateTable
CREATE TABLE "OrderItemAttribute" (
    "id" TEXT NOT NULL,
    "orderItemId" TEXT NOT NULL,
    "productAttributeValueId" TEXT NOT NULL,

    CONSTRAINT "OrderItemAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderItemAttribute_orderItemId_productAttributeValueId_key" ON "OrderItemAttribute"("orderItemId", "productAttributeValueId");

-- AddForeignKey
ALTER TABLE "OrderItemAttribute" ADD CONSTRAINT "OrderItemAttribute_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItemAttribute" ADD CONSTRAINT "OrderItemAttribute_productAttributeValueId_fkey" FOREIGN KEY ("productAttributeValueId") REFERENCES "product_attribute_values"("id") ON DELETE CASCADE ON UPDATE CASCADE;
