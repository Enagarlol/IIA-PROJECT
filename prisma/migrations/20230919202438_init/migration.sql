-- CreateTable
CREATE TABLE `Course` (
    `id_course` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `spaces` INTEGER NOT NULL,
    `occupied_spaces` INTEGER NOT NULL,
    `id_employees` INTEGER NOT NULL,

    UNIQUE INDEX `Course_id_course_key`(`id_course`),
    PRIMARY KEY (`id_course`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course_schedule` (
    `id_schedule` INTEGER NOT NULL AUTO_INCREMENT,
    `time_entry` TIME NOT NULL,
    `time_departure` TIME NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `status` VARCHAR(100) NOT NULL,
    `id_classroom` INTEGER NOT NULL,
    `id_course` INTEGER NOT NULL,

    UNIQUE INDEX `Course_schedule_id_schedule_key`(`id_schedule`),
    PRIMARY KEY (`id_schedule`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classroom` (
    `id_classroom` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `status` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_classroom`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `List_Course` (
    `id_list` INTEGER NOT NULL AUTO_INCREMENT,
    `assistance` BOOLEAN NOT NULL,
    `id_student` INTEGER NOT NULL,
    `id_course` INTEGER NOT NULL,

    PRIMARY KEY (`id_list`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment_method` (
    `id_method` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `card_number` VARCHAR(100) NOT NULL,
    `valid_thru` VARCHAR(100) NOT NULL,
    `name_bank` VARCHAR(100) NOT NULL,
    `type_card` VARCHAR(100) NOT NULL,
    `type_account` VARCHAR(100) NOT NULL,
    `status` VARCHAR(100) NOT NULL,
    `id_student` INTEGER NOT NULL,

    PRIMARY KEY (`id_method`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment_history` (
    `id_history` INTEGER NOT NULL AUTO_INCREMENT,
    `date_time` DATETIME(3) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `concept` VARCHAR(100) NOT NULL,
    `folio` VARCHAR(100) NOT NULL,
    `status` VARCHAR(100) NOT NULL,
    `id_course` INTEGER NOT NULL,
    `id_method` INTEGER NOT NULL,

    PRIMARY KEY (`id_history`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_id_employees_fkey` FOREIGN KEY (`id_employees`) REFERENCES `Employees`(`id_employees`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course_schedule` ADD CONSTRAINT `Course_schedule_id_classroom_fkey` FOREIGN KEY (`id_classroom`) REFERENCES `Classroom`(`id_classroom`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course_schedule` ADD CONSTRAINT `Course_schedule_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `Course`(`id_course`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_Course` ADD CONSTRAINT `List_Course_id_student_fkey` FOREIGN KEY (`id_student`) REFERENCES `Students`(`id_student`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_Course` ADD CONSTRAINT `List_Course_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `Course`(`id_course`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment_method` ADD CONSTRAINT `Payment_method_id_student_fkey` FOREIGN KEY (`id_student`) REFERENCES `Students`(`id_student`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment_history` ADD CONSTRAINT `Payment_history_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `Course`(`id_course`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment_history` ADD CONSTRAINT `Payment_history_id_method_fkey` FOREIGN KEY (`id_method`) REFERENCES `Payment_method`(`id_method`) ON DELETE RESTRICT ON UPDATE CASCADE;
