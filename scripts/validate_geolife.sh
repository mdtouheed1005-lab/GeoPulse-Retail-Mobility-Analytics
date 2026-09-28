#!/bin/bash

FILE="data/processed/geolife_sample.csv"

echo "=== GeoLife Data Validation ==="

echo
echo "1. Row count:"
wc -l "$FILE"

echo
echo "2. Invalid column count:"
awk -F',' 'NR > 1 && NF != 8 {print "Invalid row:", NR, "Columns:", NF}' "$FILE"

echo
echo "3. Duplicate rows:"
sort "$FILE" | uniq -d

echo
echo "4. Invalid latitude/longitude:"
awk -F',' 'NR > 1 {
    if ($2 < -90 || $2 > 90) print "Invalid latitude:", NR, $2
    if ($3 < -180 || $3 > 180) print "Invalid longitude:", NR, $3
}' "$FILE"

echo
echo "5. Missing date/time:"
awk -F',' 'NR > 1 && ($7 == "" || $8 == "") {
    print "Missing date/time:", NR
}' "$FILE"

echo
echo "=== Validation Complete ==="
