import mysql.connector
from mysql.connector import Error

def connect_to_mysql():
    try:
        # MySQLデータベースに接続
        connection = mysql.connector.connect(
            host='localhost',        # MySQLサーバーのホスト名
            port=3306,               # ポート番号
            user='root',    # ユーザー名
            password='admin123',# パスワード
            database='sampledb' # データベース名
        )

        if connection.is_connected():
            print("Successfully connected to the database")

            cursor = connection.cursor()
            cursor.execute("SELECT * FROM users")  # テーブル名を指定してクエリを実行

            rows = cursor.fetchall()
            print("Total number of rows in table: ", cursor.rowcount)

            for row in rows:
                print(row)

            cursor.close()
            connection.close()
            print("MySQL connection is closed")

    except Error as e:
        print("Error while connecting to MySQL", e)

if __name__ == "__main__":
    connect_to_mysql()
