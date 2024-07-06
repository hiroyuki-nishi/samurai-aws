import mysql.connector
import sys

# コマンドライン引数を取得
command = sys.argv[1] if len(sys.argv) > 1 else ""


# MySQLデータベースに接続する
connection = mysql.connector.connect(
    host='localhost',       # データベースホスト名またはIPアドレス
    port=3306,              # ポート番号
    user='root',   # ユーザー名
    password='admin123',  # パスワード
    database='favoreat'   # データベース名
)

# カーソルを作成
cursor = connection.cursor()

# if文で分岐する処理を書く
if command == "INSERT":
    # INSERTクエリを実行
    query = """
    INSERT INTO favoreat (shop_name, category_id, lunch_price, dinner_price, access, thumbnail_path) VALUES
    ('nishi', 1, 3000, 4600, 'JR大阪駅 徒歩5分', 'xxx.jpg');
    """
    cursor.execute(query)
    connection.commit()
    print("INSERT")
elif command == "UPDATE":
    query = """
    UPDATE favoreat SET lunch_price = 4000, dinner_price = 5000 WHERE shop_name = 'nishi';
    """
    cursor.execute(query)
    connection.commit()
    print("UPDATE")
elif command == "DELETE":
    query = """
    DELETE FROM favoreat WHERE shop_name = 'nishi';
    """
    cursor.execute(query)
    connection.commit()
    print("DELETE")
elif command == "SELECT":
    print("SELECT")
    # SQLクエリを実行してデータを取得
    query = "SELECT * FROM favoreat"
    cursor.execute(query)
    # 取得したデータをフェッチ
    results = cursor.fetchall()

    # フェッチしたデータを表示
    for row in results:
        print(row)
else:
    print("OTHER")


# カーソルと接続を閉じる
cursor.close()
connection.close()
