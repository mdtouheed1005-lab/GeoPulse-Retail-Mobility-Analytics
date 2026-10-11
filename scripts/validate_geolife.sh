#!/bin/bash

FILE="data/processed/geopulse_cleaned.csv"

echo "=================================="
echo "GeoPulse Dataset Validation"
echo "=================================="

if [ ! -f "$FILE" ]; then
    echo "ERROR: Dataset not found: $FILE"
    exit 1
fi

echo ""
echo "1. Dataset row count:"
wc -l < "$FILE"

echo ""
echo "2. Checking column count..."
awk -F',' '
NR == 1 {
    if ($1 == "DeviceID" &&
        $2 == "Latitude" &&
        $3 == "Longitude" &&
        $4 == "Timestamp") {
        print "PASS: Correct column headers"
    } else {
        print "ERROR: Unexpected headers:", $0
    }
    next
}
NF != 4 {
    errors++
}
END {
    print "Rows with incorrect column count:", errors+0
}' "$FILE"

echo ""
echo "3. Checking latitude and longitude..."

awk -F',' '
NR == 1 { next }
{
    if ($2 !~ /^-?[0-9]+([.][0-9]+)?$/ ||
        $2 < -90 || $2 > 90)
        latitude_errors++

    if ($3 !~ /^-?[0-9]+([.][0-9]+)?$/ ||
        $3 < -180 || $3 > 180)
        longitude_errors++

    if ($4 == "")
        missing_timestamps++
}
END {
    print "Invalid latitude:", latitude_errors+0
    print "Invalid longitude:", longitude_errors+0
    print "Missing timestamps:", missing_timestamps+0
}' "$FILE"

echo ""
echo "=================================="
echo "Validation finished"
echo "=================================="
