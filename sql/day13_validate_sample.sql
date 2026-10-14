-- Day 13: Validate store cannibalization sample
-- Expected result: 4 devices, 2 multi-store devices, 50%

WITH device_store_counts AS (
    SELECT
        DEVICE_ID,
        COUNT(DISTINCT STORE_ID) AS stores_visited
    FROM (
        SELECT 'D001' AS DEVICE_ID, 'S101' AS STORE_ID
        UNION ALL SELECT 'D001', 'S102'
        UNION ALL SELECT 'D002', 'S101'
        UNION ALL SELECT 'D003', 'S102'
        UNION ALL SELECT 'D003', 'S103'
        UNION ALL SELECT 'D003', 'S104'
        UNION ALL SELECT 'D004', 'S101'
    ) AS sample_visits
    GROUP BY DEVICE_ID
),
device_summary AS (
    SELECT
        COUNT(*) AS total_devices,
        COUNT_IF(stores_visited > 1) AS multi_store_devices
    FROM device_store_counts
)
SELECT
    total_devices,
    multi_store_devices,
    ROUND(
        100.0 * multi_store_devices / NULLIF(total_devices, 0),
        2
    ) AS multi_store_device_percentage
FROM device_summary;