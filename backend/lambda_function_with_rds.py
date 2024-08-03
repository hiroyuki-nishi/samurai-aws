import sys
import logging
import pymysql
import json
import os

# rds settings
user_name = os.environ['USER_NAME']
password = os.environ['PASSWORD']
rds_host = os.environ['RDS_HOST']  # 環境変数をRDSホストに変更
db_name = os.environ['DB_NAME']

logger = logging.getLogger()
logger.setLevel(logging.INFO)


try:
    conn = pymysql.connect(host=rds_host, user=user_name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit(1)

logger.info("SUCCESS: Connection to RDS for MySQL instance succeeded")

def create_select_sql(params):
    base_query = "SELECT * FROM my_table"

    if params:
        conditions = []
        price_conditions = []

        for param in params:
            for key, value in param.items():
                if value is not None:
                    if key == "shop_name":
                        price_conditions.append(f"{key} =LIKE '%{value}%'")
                    elif key == "lunch_price_lower":
                        price_conditions.append(f"lunch_price >= {value}")
                    elif key == "lunch_price_higher":
                        price_conditions.append(f"lunch_price <= {value}")

        if price_conditions:
            conditions.extend(price_conditions)

        if conditions:
            base_query += " WHERE " + " AND ".join(conditions)

    return base_query


def lambda_handler(event, context):
    item_count = 0
    names = []
    # sql_string = f"insert into Customer (CustID, Name) values(%s, %s)"
    # クエリパラメータの例
    params = [
        # {"shop_name": "XXX"},
        {"lunch_price_lower": 1000},
        {"lunch_price_higher": 2000}
    ]
    
    # SQLクエリを作成
    sql_query = create_select_sql(params)
    print(sql_query)

    with conn.cursor() as cur:
        cur.execute("select * from users")
        logger.info("The following items have been added to the database:")
        for row in cur:
            item_count += 1
            logger.info(row)
            logger.info(row[1])
            names.append(row[1])
    conn.commit()
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": ','.join(names)
    }
