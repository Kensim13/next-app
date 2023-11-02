-- CreateTable
CREATE TABLE `tb_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_name` VARCHAR(45) NOT NULL,
    `item_price` DECIMAL(10, 2) NOT NULL,
    `item_uom` VARCHAR(10) NOT NULL,
    `item_qty_per_uom` INTEGER NOT NULL,
    `item_stock` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
