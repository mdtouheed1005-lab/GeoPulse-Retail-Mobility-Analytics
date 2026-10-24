import getpass
import snowflake.connector


def main():
    connection = None
    cursor = None

    try:
        account = input("Snowflake account identifier: ").strip()
        username = input("Snowflake username: ").strip()
        password = getpass.getpass("Snowflake password: ")

        connection = snowflake.connector.connect(
            account=account,
            user=username,
            password=password,
            database="MOBILITY_GEO_DB",
            schema="RAW",
            warehouse="COMPUTE_WH",
        )

        cursor = connection.cursor()

        # 1. Validate GPS data and coordinates
        cursor.execute("""
            SELECT
                COUNT(*) AS total_pings,
                COUNT(DISTINCT DEVICE_ID) AS unique_devices,
                MIN(EVENT_TIMESTAMP) AS first_timestamp,
                MAX(EVENT_TIMESTAMP) AS last_timestamp,
                COUNT_IF(
                    LATITUDE IS NULL
                    OR LATITUDE NOT BETWEEN -90 AND 90
                ) AS invalid_latitudes,
                COUNT_IF(
                    LONGITUDE IS NULL
                    OR LONGITUDE NOT BETWEEN -180 AND 180
                ) AS invalid_longitudes
            FROM RAW_DEVICE_PINGS
        """)

        result = cursor.fetchone()

        print("\n===== DAY 19 VALIDATION =====")
        print("Total GPS pings:", result[0])
        print("Unique devices:", result[1])
        print("First timestamp:", result[2])
        print("Last timestamp:", result[3])
        print("Invalid latitudes:", result[4])
        print("Invalid longitudes:", result[5])

        if result[0] > 0 and result[1] > 0:
            print("\nData availability: PASS")
        else:
            print("\nData availability: CHECK")

        if result[4] == 0 and result[5] == 0:
            print("Coordinate validation: PASS")
        else:
            print("Coordinate validation: CHECK")

        # 2. Validate morning and evening traffic
        cursor.execute("""
            SELECT
                CASE
                    WHEN EXTRACT(
                        HOUR FROM EVENT_TIMESTAMP
                    ) BETWEEN 6 AND 11
                        THEN 'Morning'
                    WHEN EXTRACT(
                        HOUR FROM EVENT_TIMESTAMP
                    ) BETWEEN 16 AND 20
                        THEN 'Evening'
                    ELSE 'Other'
                END AS traffic_period,
                COUNT(*) AS gps_pings,
                COUNT(DISTINCT DEVICE_ID) AS unique_devices
            FROM RAW_DEVICE_PINGS
            GROUP BY 1
            ORDER BY 1
        """)

        traffic_results = cursor.fetchall()

        print("\n===== MORNING AND EVENING TRAFFIC =====")

        for row in traffic_results:
            print(
                f"Period: {row[0]} | "
                f"GPS pings: {row[1]} | "
                f"Unique devices: {row[2]}"
            )

        periods_found = {row[0] for row in traffic_results}

        if "Morning" in periods_found and "Evening" in periods_found:
            print("\nMorning and evening traffic validation: PASS")
        else:
            print(
                "\nMorning and evening traffic validation: CHECK "
                "(one or both periods have no records)"
            )

    except Exception as error:
        print("\nValidation failed:", error)

    finally:
        if cursor is not None:
            cursor.close()

        if connection is not None:
            connection.close()


if __name__ == "__main__":
    main()