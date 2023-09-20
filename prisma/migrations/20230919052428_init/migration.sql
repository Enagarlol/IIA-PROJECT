-- CreateTable
CREATE TABLE `Students` (
    `id_student` INTEGER NOT NULL AUTO_INCREMENT,
    `student_enrollment` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `age` INTEGER NOT NULL,
    `phone` VARCHAR(100) NOT NULL,
    `birthday` VARCHAR(191) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `session` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Students_id_student_key`(`id_student`),
    UNIQUE INDEX `Students_student_enrollment_key`(`student_enrollment`),
    UNIQUE INDEX `Students_phone_key`(`phone`),
    UNIQUE INDEX `Students_email_key`(`email`),
    PRIMARY KEY (`id_student`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id_roles` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Roles_id_roles_key`(`id_roles`),
    PRIMARY KEY (`id_roles`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employees` (
    `id_employees` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `job_position` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `id_roles` INTEGER NOT NULL,

    UNIQUE INDEX `Employees_id_employees_key`(`id_employees`),
    UNIQUE INDEX `Employees_email_key`(`email`),
    PRIMARY KEY (`id_employees`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employees` ADD CONSTRAINT `Employees_id_roles_fkey` FOREIGN KEY (`id_roles`) REFERENCES `Roles`(`id_roles`) ON DELETE RESTRICT ON UPDATE CASCADE;
