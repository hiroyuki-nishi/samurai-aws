<<<<<<< HEAD
import sys

# コマンドライン引数を取得
command = sys.argv[1] if len(sys.argv) > 1 else ""

# if文で分岐する処理を書く
if command == "ADD":
    print("ADD")
    # TODO
elif command == "UPDATE":
    print("UPDATE")
    # TODO
elif command == "DELETE":
    print("DELETE")
    # TODO
elif command == "SELECT":
    print("SELECT")
    # TODO
else:
    print("OTHER")
=======
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
>>>>>>> c4bb538ef14e8e01656996971be903dbf975ffc7
