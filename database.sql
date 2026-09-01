-- ============================================================
-- BookQ Booking Solution - MySQL Database Schema & SQL LIKE Query
-- ============================================================

-- 1. สร้างฐานข้อมูล
CREATE DATABASE IF NOT EXISTS `bookq` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bookq`;

-- 2. สร้างตารางรายการจองคิว (bookings)
DROP TABLE IF EXISTS `bookings`;
CREATE TABLE `bookings` (
    `id` VARCHAR(20) NOT NULL PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `company` VARCHAR(100) DEFAULT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `service` VARCHAR(100) NOT NULL,
    `date` DATE NOT NULL,
    `time` VARCHAR(10) NOT NULL,
    `admin` VARCHAR(50) NOT NULL,
    `status` ENUM('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. เพิ่มข้อมูลตัวอย่าง (Sample Data)
INSERT INTO `bookings` (`id`, `name`, `company`, `phone`, `service`, `date`, `time`, `admin`, `status`) VALUES
('bq-1001', 'กานดา มีสุข', 'สยามเทค จำกัด', '0812345678', 'ปรึกษาธุรกิจ', '2026-06-18', '09:15', 'แอดมินอัญ', 'confirmed'),
('bq-1002', 'ธวัชชัย แสงคำ', 'เอ็นจิเนียริ่ง ไทยแลนด์', '0898765432', 'เจรจาการค้า', '2026-06-18', '10:30', 'แอดมินแอน', 'pending'),
('bq-1003', 'ณัฐิกา ทองประเสริฐ', 'โฮมเซอร์วิส โซลูชั่น', '0855551234', 'นัดพบพิเศษ', '2026-06-18', '13:10', 'แอดมินเก่ง', 'cancelled'),
('bq-1004', 'พิพัฒน์ เรืองศรี', 'ฟู้ดเดลิเวอรี่ ฮับ', '0877778888', 'ปรึกษาธุรกิจ', '2026-06-18', '14:45', 'แอดมินสมศรี', 'confirmed'),
('bq-1005', 'มาลี ผ่องแผ้ว', 'สถาบันสอนภาษาลีดส์', '0866667777', 'นัดพบพิเศษ', '2026-06-18', '19:20', 'แอดมินบอย', 'confirmed'),
('bq-1006', 'สมศักดิ์ รักดี', 'มีดี เอเจนซี่', '0823334444', 'เจรจาการค้า', '2026-06-19', '13:00', 'แอดมินแอน', 'confirmed'),
('bq-1007', 'รินรดา งามยิ่ง', '', '0841112222', 'ปรึกษาธุรกิจ', '2026-06-17', '10:00', 'แอดมินอัญ', 'confirmed');

-- ============================================================
-- ตัวอย่างคำสั่ง SQL LIKE สำหรับค้นหาข้อมูล (SQL LIKE Queries)
-- ============================================================

-- ค้นหาด้วยชื่อ หรือ เบอร์โทร หรือ บริการ หรือ บริษัท (SQL LIKE)
SELECT * FROM `bookings` 
WHERE `name` LIKE '%กานดา%'
   OR `phone` LIKE '%081%'
   OR `service` LIKE '%ธุรกิจ%'
   OR `company` LIKE '%สยาม%'
ORDER BY `date` DESC, `time` ASC;
