-- Day 12: Retail Cannibalization Analysis
-- GeoPulse: Hyper-Local Retail Mobility Analytics

-- 1. Identify locations with overlapping customer activity
WITH device_locations AS (
    SELECT
        DeviceID,
        Latitude,
        Longitude,
        COUNT(*) AS ping_count
    FROM mobility_pings
    GROUP BY
        DeviceID,
        Latitude,
        Longitude
),

-- 2. Calculate activity around each location
location_activity AS (
    SELECT
        Latitude,
        Longitude,
        COUNT(DISTINCT DeviceID) AS unique_devices,
        SUM(ping_count) AS total_pings
    FROM device_locations
    GROUP BY
        Latitude,
        Longitude
)

-- 3. Identify high-activity locations
SELECT
    Latitude,
    Longitude,
    unique_devices,
    total_pings,
    CASE
        WHEN unique_devices >= 10 THEN 'High Overlap'
        WHEN unique_devices >= 5 THEN 'Medium Overlap'
        ELSE 'Low Overlap'
    END AS overlap_category
FROM location_activity
ORDER BY
    unique_devices DESC,
    total_pings DESC;