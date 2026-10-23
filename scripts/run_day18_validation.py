import getpass
import snowflake.connector
from pathlib import Path

account = input("Enter Snowflake account identifier: ").strip()
username = input("Enter Snowflake username: ").strip()
password = getpass.getpass("Enter Snowflake password: ")

connection = None

try:
    connection = snowflake.connector.connect(
        account=account,
        user=username,
        password=password,
        database="MOBILITY_GEO_DB",
        schema="RAW",
        role="ACCOUNTADMIN"
    )

    sql_file = Path("sql/day18_traffic_validation.sql")
    query = sql_file.read_text(encoding="utf-8")

    cursor = connection.cursor()
    cursor.execute(query)

    print("\nDAY 18: TRAFFIC VALIDATION RESULTS")
    print("-" * 65)

    for row in cursor.fetchall():
        print(row)

    print("\nValidation query executed successfully.")

except Exception as error:
    print("Validation failed:", error)

finally:
    if connection:
        connection.close()