-- AlterTable
ALTER TABLE `recette` ADD COLUMN `idEntreprise` INTEGER NOT NULL DEFAULT 1;

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
