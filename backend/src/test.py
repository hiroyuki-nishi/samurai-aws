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
