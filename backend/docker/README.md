Docker Composeを利用して日本語が使えるMySQLを起動する方法を説明します。MySQLの設定で日本語を使用するには、適切な文字セットと照合順序を設定する必要があります。以下の手順で進めます。

1. docker-compose.yml ファイルの作成
まず、プロジェクトディレクトリ内に docker-compose.yml ファイルを作成します。このファイルにMySQLサービスの設定を記述します。

```
version: '3.1'

services:
  db:
    image: mysql:latest
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: my-secret-pw
    ports:
      - 3306:3306
    volumes:
      - ./mysql-init:/docker-entrypoint-initdb.d
    command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    networks:
      - my-network

networks:
  my-network:
  ```

この設定で、MySQLの文字セットと照合順序をUTF-8に設定しています。

2. 初期化スクリプトの作成
次に、MySQLの初期化スクリプトを作成します。docker-entrypoint-initdb.dディレクトリに配置することで、コンテナ起動時に自動的に実行されます。

プロジェクトディレクトリ内に mysql-init ディレクトリを作成し、その中に例えば init.sql という名前のスクリプトファイルを作成します。

```
CREATE DATABASE IF NOT EXISTS mydatabase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE mydatabase.test_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text_column TEXT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

このスクリプトは、UTF-8の文字セットと照合順序を使用してデータベースとテーブルを作成します。

3. Docker ComposeでMySQLを起動
次に、docker-composeを使用してMySQLコンテナを起動します。プロジェクトディレクトリ内で以下のコマンドを実行します。

```
docker-compose up -d
```

4. MySQLに接続して確認
コンテナが正常に起動したら、MySQLに接続して設定が正しく適用されているか確認します。

```
docker exec -it docker-db-1 bash
mysql -h 127.0.0.1 -P 3306 -u root -p
```
パスワードを入力後、以下のコマンドでデータベースとテーブルの文字セットを確認します。

```
SHOW VARIABLES LIKE 'character_set_server';
SHOW VARIABLES LIKE 'collation_server';
```

USE mydatabase;
SHOW TABLE STATUS LIKE 'test_table';
完全なファイル構成
以下に、最終的なファイル構成を示します。

csharp
コードをコピーする
project-directory/
├── docker-compose.yml
└── mysql-init/
    └── init.sql
この構成で、日本語が使用できるMySQLコンテナをDocker Composeで簡単に起動できます。質問があれば教えてください。