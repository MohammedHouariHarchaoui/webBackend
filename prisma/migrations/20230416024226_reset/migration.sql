-- CreateTable
CREATE TABLE `categorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categorie` VARCHAR(120) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoryrecette` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(120) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commande` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idRecette` INTEGER NOT NULL,
    `idIngredient` INTEGER NULL,
    `quantity` VARCHAR(50) NOT NULL,

    INDEX `idRecette`(`idRecette`),
    INDEX `idIngredient`(`idIngredient`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `distributeur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `identifiant` VARCHAR(250) NOT NULL,
    `capaciteGoblet` INTEGER NULL,
    `capaciteSucre` INTEGER NULL,
    `capaciteSpoon` INTEGER NULL,

    UNIQUE INDEX `distributeur_identifiant_key`(`identifiant`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entrepise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(120) NULL,
    `adresse` VARCHAR(120) NULL,
    `mail` VARCHAR(120) NULL,
    `tel` VARCHAR(120) NULL,
    `link` VARCHAR(120) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idDistr` INTEGER NULL,
    `idComm` INTEGER NULL,
    `idInfoPaiment` INTEGER NULL,

    INDEX `idComm`(`idComm`),
    INDEX `idDistr`(`idDistr`),
    INDEX `idInfoPaiment`(`idInfoPaiment`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `infopaiment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mail` VARCHAR(120) NULL,
    `cartePaiment` VARCHAR(120) NULL,
    `ccv` VARCHAR(120) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pack` (
    `idDistr` INTEGER NOT NULL,
    `idEntre` INTEGER NOT NULL,
    `codeverou` VARCHAR(120) NULL,
    `localisation` VARCHAR(120) NULL,
    `state` VARCHAR(120) NULL,

    UNIQUE INDEX `pack_idDistr_key`(`idDistr`),
    INDEX `idEntre`(`idEntre`),
    PRIMARY KEY (`idDistr`, `idEntre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publicite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(120) NULL,
    `idCategorie` INTEGER NULL,
    `idCategRecette` INTEGER NULL,
    `idAnnonceur` INTEGER NULL,

    INDEX `idAnnonceur`(`idAnnonceur`),
    INDEX `idCategRecette`(`idCategRecette`),
    INDEX `idCategorie`(`idCategorie`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recette` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idCategRecette` INTEGER NULL,
    `name` VARCHAR(120) NULL,
    `description` VARCHAR(500) NULL,
    `price` DECIMAL(65, 30) NOT NULL DEFAULT 0.0,
    `imageLink` VARCHAR(120) NULL,

    UNIQUE INDEX `recette_idCategRecette_key`(`idCategRecette`),
    INDEX `idCategRecette`(`idCategRecette`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reclamation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idFacture` INTEGER NULL,
    `message` VARCHAR(120) NULL,
    `isDone` BOOLEAN NULL,

    INDEX `idFacture`(`idFacture`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idDistr` INTEGER NULL,
    `idUser` INTEGER NULL,
    `idEntre` INTEGER NULL,
    `idType` INTEGER NULL,
    `isDone` BOOLEAN NULL,
    `message` VARCHAR(120) NULL,

    INDEX `idDistr`(`idDistr`),
    INDEX `idEntre`(`idEntre`),
    INDEX `idUser`(`idUser`),
    INDEX `idType`(`idType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(120) NULL,
    `prenom` VARCHAR(120) NULL,
    `mail` VARCHAR(120) NULL,
    `mdp` VARCHAR(120) NULL,
    `tel` VARCHAR(120) NULL,
    `idRole` INTEGER NULL,
    `idCreatedpar` INTEGER NULL,
    `idEntreprise` INTEGER NULL,
    `isActive` INTEGER NULL,

    INDEX `idCreatedpar`(`idCreatedpar`),
    INDEX `idEntreprise`(`idEntreprise`),
    INDEX `idRole`(`idRole`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `annonceur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(120) NULL,
    `prenom` VARCHAR(120) NULL,
    `mail` VARCHAR(120) NULL,
    `tel` VARCHAR(120) NULL,
    `idCreatedpar` INTEGER NULL,

    INDEX `idCreatedpar`(`idCreatedpar`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` INTEGER NULL,
    `description` VARCHAR(120) NULL,
    `prixUnit` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recetteingr` (
    `idRecette` INTEGER NOT NULL,
    `idIngredient` INTEGER NOT NULL,
    `quantity` VARCHAR(50) NULL,

    INDEX `idIngredient`(`idIngredient`),
    PRIMARY KEY (`idRecette`, `idIngredient`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(120) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typetask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(120) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_idRecette_fkey` FOREIGN KEY (`idRecette`) REFERENCES `recette`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pack` ADD CONSTRAINT `pack_idDistr_fkey` FOREIGN KEY (`idDistr`) REFERENCES `distributeur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pack` ADD CONSTRAINT `pack_idEntre_fkey` FOREIGN KEY (`idEntre`) REFERENCES `entrepise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publicite` ADD CONSTRAINT `publicite_idCategRecette_fkey` FOREIGN KEY (`idCategRecette`) REFERENCES `categoryrecette`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recette` ADD CONSTRAINT `recette_idCategRecette_fkey` FOREIGN KEY (`idCategRecette`) REFERENCES `categoryrecette`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_idEntreprise_fkey` FOREIGN KEY (`idEntreprise`) REFERENCES `entrepise`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recetteingr` ADD CONSTRAINT `recetteingr_idRecette_fkey` FOREIGN KEY (`idRecette`) REFERENCES `recette`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
