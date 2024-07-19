CREATE DATABASE IF NOT EXISTS application CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- データベースの使用
USE application;

-- テーブルの作成
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
