# GeoLife PLT File Format – Day 3

## Day 3: Understand PLT Format

The GeoLife trajectory dataset stores GPS trajectory information in .plt files.

### Important fields

1. Latitude
   Example: 39.984702

2. Longitude
   Example: 116.318417

3. Reserved field
   Example: 0

4. Altitude
   Altitude is stored in feet.
   Example: 492

5. Numeric date/time value
   Example: 39744.1201851852

6. Date
   Example: 2008-10-23

7. Time
   Example: 02:53:04

### Example record

39.984702,116.318417,0,492,39744.1201851852,2008-10-23,02:53:04

### Day 3 conclusion

The PLT file contains latitude, longitude, altitude, date and time information required for processing GeoLife mobility trajectories.