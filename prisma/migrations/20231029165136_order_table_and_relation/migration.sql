-- CreateTable
CREATE TABLE `tb_order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `order_qty` INTEGER NOT NULL,
    `order_uom` VARCHAR(10) NOT NULL,
    `order_qty_per_uom` VARCHAR(45) NOT NULL,
    `order_price` DECIMAL(10, 2) NOT NULL,
    `order_total_price` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_order` ADD CONSTRAINT `tb_order_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `tb_item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
