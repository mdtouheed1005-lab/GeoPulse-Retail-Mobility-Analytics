-- Day 13: Store Cannibalization Analysis
-- GeoPulse - Retail Mobility Analytics
-- Purpose: Measure device overlap across retail stores.
-- Note: Store visits must be validated against actual store locations.

-- 1. Count distinct stores visited by each device.
WITH device_store_counts AS (
    SELECT
        DEVICE_ID,
        COUNT(DISTINCT STORE_ID) AS stores_visited
    FROM DEVICE_STORE_VISITS
    GROUP BY DEVICE_ID
),

-- 2. Calculate total devices and devices visiting multiple stores.
device_summary AS (
    SELECT
        COUNT(*) AS total_devices,
        COUNT_IF(stores_visited > 1) AS multi_store_devices
    FROM device_store_counts
)

-- 3. Calculate the percentage of devices visiting multiple stores.
SELECT
    total_devices,
    multi_store_devices,
    ROUND(
        100.0 * multi_store_devices / NULLIF(total_devices, 0),
        2
    ) AS multi_store_device_percentage
FROM device_summary;