/*
  Warnings:

  - A unique constraint covering the columns `[idType]` on the table `task` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifiant]` on the table `typetask` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mail]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `idCategRecette` on table `recette` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `date` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identifiant` to the `typetask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recette` MODIFY `idCategRecette` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `date` VARCHAR(191) NOT NULL,
    ADD COLUMN `isOpen` BOOLEAN NULL,
    ADD COLUMN `time` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `typetask` ADD COLUMN `identifiant` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `task_idType_key` ON `task`(`idType`);

-- CreateIndex
CREATE UNIQUE INDEX `typetask_identifiant_key` ON `typetask`(`identifiant`);

-- CreateIndex
CREATE UNIQUE INDEX `users_mail_key` ON `users`(`mail`);

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_idRecette_fkey` FOREIGN KEY (`idRecette`) REFERENCES `recette`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pack` ADD CONSTRAINT `pack_idDistr_fkey` FOREIGN KEY (`idDistr`) REFERENCES `distributeur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publicite` ADD CONSTRAINT `publicite_idCategRecette_fkey` FOREIGN KEY (`idCategRecette`) REFERENCES `categoryrecette`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_idType_fkey` FOREIGN KEY (`idType`) REFERENCES `typetask`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_idEntreprise_fkey` FOREIGN KEY (`idEntreprise`) REFERENCES `entrepise`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recetteingr` ADD CONSTRAINT `recetteingr_idRecette_fkey` FOREIGN KEY (`idRecette`) REFERENCES `recette`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
