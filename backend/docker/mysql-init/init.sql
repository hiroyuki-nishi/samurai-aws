CREATE DATABASE IF NOT EXISTS application CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- データベースの使用
USE application;

-- テーブルの作成
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 日本語名のデータを追加
INSERT INTO users (name, email) VALUES ('山田太郎', 'taro.yamada@example.com');
INSERT INTO users (name, email) VALUES ('鈴木花子', 'hanako.suzuki@example.com');
INSERT INTO users (name, email) VALUES ('佐藤一郎', 'ichiro.sato@example.com');