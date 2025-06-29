-- CreateTable
CREATE TABLE "cart_item_attributes" (
    "id" TEXT NOT NULL,
    "cart_item_id" TEXT NOT NULL,
    "product_attribute_value_id" TEXT NOT NULL,

    CONSTRAINT "cart_item_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_attributes_cart_item_id_product_attribute_value_i_key" ON "cart_item_attributes"("cart_item_id", "product_attribute_value_id");

-- AddForeignKey
ALTER TABLE "cart_item_attributes" ADD CONSTRAINT "cart_item_attributes_cart_item_id_fkey" FOREIGN KEY ("cart_item_id") REFERENCES "cart_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item_attributes" ADD CONSTRAINT "cart_item_attributes_product_attribute_value_id_fkey" FOREIGN KEY ("product_attribute_value_id") REFERENCES "product_attribute_values"("id") ON DELETE CASCADE ON UPDATE CASCADE;
