# 🗓️ บุคคิว (BookQ) - ระบบจองคิวออนไลน์ครบวงจร (Booking Solution)

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?style=for-the-badge&logo=vercel)](https://bookq-booking-solution.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/dancepla0501/bookq-booking-solution)

---

## 1. ชื่อโครงการ (Project Title)
* **ชื่อระบบ:** บุคคิว (BookQ - Booking Solution)
* **คำอธิบายสั้นๆ:** เว็บแอปพลิเคชันระบบจองคิวและนัดหมายบริการออนไลน์ ยกระดับการนัดหมายธุรกิจของคุณ สะดวก รวดเร็ว และเป็นมืออาชีพ รองรับการใช้งานบนสมาร์ตโฟน แท็บเล็ต และคอมพิวเตอร์อย่างสมบูรณ์แบบ พร้อมระบบผู้ดูแลระบบ (Admin Dashboard)

---

## 2. Live Website
* **URL เว็บไซต์ออนไลน์ที่ Deploy แล้ว:** [https://bookq-booking-solution.vercel.app](https://bookq-booking-solution.vercel.app)

---

## 3. GitHub Repository & Commit History
* **URL คลังโค้ด GitHub:** [https://github.com/dancepla0501/bookq-booking-solution](https://github.com/dancepla0501/bookq-booking-solution)

### 📜 Commit History (แสดงพัฒนาการของงานอย่างเป็นขั้นตอน):
1. `f311450` - `docs: update GitHub repository link for dancepla0501`
2. `fa3d69f` - `docs: update README.md with GitHub repository & commit history section`
3. `fbe6a14` - `docs & deploy: add README.md documentation and vercel deployment config`
4. `0e1e3d1` - `feat: add MySQL database schema & PHP API with SQL LIKE search`
5. `7c3d0d4` - `feat: implement high-contrast dark mode system`
6. `4ebb1c0` - `feat: add mobile responsive layout & card view transformation`
7. `935128d` - `feat: initial UI layout from Figma design`

---

## 4. Figma Design
* **URL ของงานออกแบบใน Figma:** [https://www.figma.com/design/EFWPNFE6xskAVGhbfNegsy/Queue-booking-system](https://www.figma.com/design/EFWPNFE6xskAVGhbfNegsy/Queue-booking-system)

---

## 5. Project Objectives (วัตถุประสงค์และกลุ่มเป้าหมาย)

### วัตถุประสงค์ของโครงการ
1. เพื่อพัฒนาระบบจองคิวนัดหมายออนไลน์ที่ใช้งานง่าย สะดวก รวดเร็ว ลดขั้นตอนการนัดหมายและการติดต่อดีลงาน
2. เพื่อช่วยให้ธุรกิจบริการหรือองค์กรสามารถบริหารจัดการคิวนัดหมายประจำวัน และดูสถิติรายรับ/คิวผ่านแดชบอร์ดได้อย่างมีประสิทธิภาพ
3. เพื่อพัฒนาระบบที่รองรับการแสดงผลบนอุปกรณ์ทุกขนาด (Responsive Web Design) และปรับโหมดถนอมสายตา (Dark Mode)

### กลุ่มเป้าหมาย
* **ผู้รับบริการ / ลูกค้าทั่วไป:** ผู้ที่ต้องการจองเวลานัดหมายบริการ ปรึกษาธุรกิจ เจรจาการค้า หรือนัดพบผู้เชี่ยวชาญ 24 ชั่วโมง
* **ผู้ดูแลระบบ / แอดมินองค์กร:** ทีมงานและผู้บริหารที่ต้องการตรวจสอบ ตารางคิว อนุมัติคิว และบริหารเวลานัดหมายของทีม

---

## 6. Technology Stack

* **Design:** Figma (Queue booking system)
* **Frontend:** HTML5, JavaScript (ES6+ SPA Router & State Management)
* **Framework / CSS / UI:** Vanilla CSS3 (Custom CSS Design System, Responsive Media Queries, CSS Variables, Glassmorphism)
* **Icons & Fonts:** FontAwesome 6.4.0, Google Fonts (Sarabun & Inter)
* **Version Control:** Git & GitHub ([https://github.com/dancepla0501/bookq-booking-solution](https://github.com/dancepla0501/bookq-booking-solution))
* **Hosting:** Vercel (Global Edge Network CDN)
* **Database & Backend Options:** LocalStorage (Client-Side Storage) + MySQL Schema (`database.sql`) & PHP PDO API (`api.php`)
* **AI Tools:** Antigravity AI Assistant (Pair Programming, UI/UX Responsive Optimization, Code Generation & Dark Mode Architecture)

---

## 7. Features (ฟังก์ชันหลักของเว็บไซต์)

1. **ระบบจองคิวนัดหมายออนไลน์ (Online Queue Booking):**
   * ปฏิทินเลือกวัน และตัวเลือกช่วงเวลาจองคิวแบบเรียลไทม์ (09:00 - 19:20 น.)
   * แบบฟอร์มกรอกข้อมูลผู้ติดต่อ พร้อมระบบตรวจสอบและสรุปข้อมูลการจองผ่าน Pop-up Success Modal
2. **ระบบสลับโหมดมืด/สว่าง (Dark / Light Theme Toggle):**
   * รองรับการปรับธีมหน้าเว็บเป็นโหมดสีดำ (Dark Mode) ถนอมสายตา ปรับสีด้วย High-Contrast Legibility และบันทึกสถานะลง `LocalStorage`
3. **ระบบค้นหาคิวอัจฉริยะ (Real-Time & SQL LIKE Search):**
   * ค้นหาข้อมูลคิวนัดหมายด้วย ชื่อลูกค้า เบอร์โทรศัพท์ ประเภทบริการ หรือชื่อบริษัท ในรูปแบบ SQL `LIKE` Pattern Matching
4. **แดชบอร์ดหลังบ้านสำหรับแอดมิน (Admin Dashboard):**
   * สรุปสถิติประจำวัน (คิววันนี้, คิวยืนยันแล้ว, คิวยกเลิก, รายได้รวม)
   * ปฏิทินและไทม์ไลน์แสดงคิวรายวัน พร้อมตัวกรองตามประเภทบริการและแอดมินผู้ดูแล
   * ระบบเปลี่ยนสถานะคิว (อนุมัติ / รอดำเนินการ / ยกเลิก)
5. **ระบบยืนยันตัวตนแอดมิน (Admin Authentication):**
   * หน้าเข้าสู่ระบบแอดมินแบบ SPA สลับการใช้งานสิทธิ์แอดมิน (Username: `admin` / Password: `admin123`)

---

## 8. Design Implementation

การนำโครงสร้าง Layout, โทนสี, Typography และ Components จาก **Figma (Queue booking system)** มาปรับใช้ในโค้ด:

* **Layout Structure:** ถอดแบบโครงสร้างจาก Figma โดยแบ่งเป็น Header Bar, Hero Banner Section, Feature Ticker, Process Step Cards (3 ขั้นตอน), Two-Column Why-Us & Widget, Service Offerings Grid, Team Profiles และ Admin Table
* **Color Palette:**
  * Primary: Deep Navy `#0f2b48` / `#07192b`
  * Secondary: Vivid Blue `#00b8e6` / Cyan `#38bdf8`
  * Background: Clean Light Slate `#f8fafc` (Light) / Dark Slate `#0f172a` & `#1e293b` (Dark)
  * Accents: Emerald Success `#10b981`, Amber Warning `#f59e0b`, Crimson Danger `#ef4444`
* **Typography:** ใช้ฟอนต์ **Sarabun** สำหรับข้อความภาษาไทยเพื่อความอ่านง่ายอย่างเป็นทางการ และฟอนต์ **Inter** สำหรับตัวเลขและข้อความภาษาอังกฤษ
* **Components:** สร้าง Card Component, Interactive Calendar Grid, Time Slot Buttons, Status Badges และ Action Control Buttons แบบ Reusable CSS

---

## 9. Responsive Design

การกำหนด Breakpoints และการปรับเปลี่ยน Layout สำหรับรองรับอุปกรณ์ทุกขนาดหน้าจอ:

* **Desktop & Large Screens (>= 992px):**
  * แสดงผล Two-Column Layout (Info Column + Mini Calendar Widget, Calendar Timeline + Table Grid)
  * แถบค้นหาแบบขยายเต็มบน Header Bar
* **Tablet Screens (<= 991px & <= 768px):**
  * ปรับ Two-Column และ Grid 3 คอลัมน์ให้กลายเป็น Single Column (1 คอลัมน์) เพื่อความสบายตา
  * แถบ Ticker Banner ปรับเป็นแนวตั้งกึ่งกลาง
* **Mobile Screens (<= 768px & <= 576px):**
  * **Dashboard Queue Table Transformation:** แปลงตารางคิว 6 คอลัมน์ให้กลายเป็น **Card View** แยกเป็นกล่องการ์ดแต่ละรายการ พร้อมแสดง `data-label` ป้องกันข้อความโดนบีบอัด
  * **Mobile Drawer Navigation:** ซ่อน Nav Links บน Header และใช้ปุ่ม Hamburger Toggle เปิดเมนูด้านข้างแบบ Slide Down
  * **Touch-Friendly Controls:** กำหนดขนาดปุ่มและช่วงเวลาให้มี Touch Target ขั้นต่ำ 40px-44px และตั้งค่า Font Size 16px บน Form Inputs เพื่อป้องกัน iOS Safari Auto-Zoom

---

## 10. AI Usage (การใช้ AI ในการพัฒนา)

* **เครื่องมือ AI ที่ใช้:** Antigravity AI Assistant
* **ขั้นตอนและวัตถุประสงค์:**
  1. ใช้ AI ช่วยวิเคราะห์ Layout และสร้าง CSS Design System + Mobile Breakpoints
  2. ใช้ AI ช่วยเขียน Responsive Card View สำหรับเปลี่ยนตาราง HTML บนมือถือ
  3. ใช้ AI ออกแบบสถาปัตยกรรม Dark Mode ด้วย CSS Variables และ JavaScript State Persist
  4. ใช้ AI สร้างไฟล์โครงสร้างฐานข้อมูล MySQL `database.sql` และไฟล์ `api.php` สำหรับคำสั่ง SQL `LIKE`
* **ตัวอย่าง Prompt ที่ใช้:**
  * *"ช่วยทําหน้าเว็บให้ใช้ในโทรสัพท์ได้ด้วย"* ➔ AI ดำเนินการสร้าง Responsive CSS Media Queries และแปลงตารางเป็น Card View
  * *"ช่วยเพิ่มปุ่มปรับให้เป็นสีดํา"* ➔ AI ดำเนินการเพิ่มปุ่มสลับธีม และสร้างชุดสี Dark Mode High Contrast
  * *"ถ้าอยากให้ฐานข้อมูลใช้ sql like ได้ไหม"* ➔ AI ดำเนินการสร้างไฟล์ `database.sql` และ `api.php` PDO backend
* **ผลลัพธ์และการแก้ไข:** AI ได้ปรับแต่ง CSS Specificity ป้องกันปัญหาการแสดงผลสีพื้นหลังใน Dark Mode และทดสอบผ่านระบบ Browser Subagent ก่อน Deploy ขึ้น Vercel

---

## 11. Deployment (ขั้นตอนการ Deploy)

* **Hosting Provider:** Vercel (Global Edge Network)
* **Build Command:** Static HTML/CSS/JS (No Build Step Required)
* **Deployment Steps:**
  1. สร้างไฟล์ตั้งค่า `vercel.json` กำหนดสิทธิ์ static clean URLs
  2. สั่งรันคำสั่ง Deployment ผ่าน Vercel CLI:
     ```bash
     npx vercel --prod
     ```
  3. ระบบทำการอัปโหลดไฟล์และ Aliased Domain ไปที่ [https://bookq-booking-solution.vercel.app](https://bookq-booking-solution.vercel.app)

---

## 12. Challenges (ปัญหาที่พบ แนวทางแก้ และสิ่งที่เรียนรู้)

1. **ปัญหาตารางคิวบนมือถือโดนบีบอัด (Table Squeezing on Mobile):**
   * *ปัญหา:* ตารางข้อมูลคิว 6 คอลัมน์บนหน้าจอมือถือขนาดเล็กถูกบีบจนตัวอักษรซ้อนกันเป็นแนวตั้ง อ่านยาก
   * *แนวทางแก้ไข:* ใช้เทคนิค CSS Table-to-Card Transformation โดยกำหนด `display: block` ใน `@media (max-width: 768px)` และใช้ `attr(data-label)` แสดงหัวข้อในแต่ละบรรทัดของการ์ด
2. **ปัญหาความคมชัดของสีในโหมดมืด (Dark Mode Contrast Issue):**
   * *ปัญหา:* การเปลี่ยนตัวแปรสีในโหมดมืดทำให้บางส่วน เช่น Footer และปฏิทินมีสีพื้นหลังซ้ำกับตัวอักษรจนมองเห็นยาก
   * *แนวทางแก้ไข:* ปรับโครงสร้าง CSS ให้ `:root.dark-theme` และ `html.dark-theme` บังคับใช้สีสว่าง `#ffffff` / `#f8fafc` บนข้อความทั้งหมด และปรับ Footer เป็นโทน `#091322`
3. **สิ่งที่ได้เรียนรู้:** ได้เรียนรู้เทคนิคการทำ Responsive Web Design ที่มีประสิทธิภาพ การจัดการ State ใน Single Page Application ด้วย Vanilla JS และการนำเว็บขึ้นใช้งานบน Cloud CDN ทันที

---

## 13. Author (ข้อมูลผู้จัดทำ)

* **ชื่อ-นามสกุล:** นายจักรกริช มะโนธรรม
* **รหัสนักศึกษา:** 6632880038
* **สถาบันการศึกษา:** วิทยาลัยเทคนิคสระบุรี
* **สาขาวิชา:** เทคโนโลยีธุรกิจดิจิทัล
* **อีเมลติดต่อ:** dancepla.0501@gmail.com
