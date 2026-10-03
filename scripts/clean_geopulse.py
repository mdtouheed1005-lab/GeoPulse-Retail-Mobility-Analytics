import pandas as pd
from pathlib import Path

INPUT_FILE = Path("data/raw/geopulse_mobile_pings.csv")
OUTPUT_FILE = Path("data/processed/geopulse_cleaned.csv")

OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

first_chunk = True
total_rows = 0
cleaned_rows = 0
removed_rows = 0

for df in pd.read_csv(INPUT_FILE, chunksize=100000):

    total_rows += len(df)

    # Convert coordinates to numeric
    df["Latitude"] = pd.to_numeric(df["Latitude"], errors="coerce")
    df["Longitude"] = pd.to_numeric(df["Longitude"], errors="coerce")


    # Check proper datetime timestamp
    df["Timestamp"] = pd.to_datetime(
        df["Timestamp"],
	errors="coerce"
    )

    valid_timestamp = df["Timestamp"].notna()


    # Keep only valid records
    valid = (
        df["DeviceID"].notna()
        & df["Latitude"].notna()
        & df["Longitude"].notna()
        & valid_timestamp
        & df["Latitude"].between(-90, 90)
        & df["Longitude"].between(-180, 180)
    )

    cleaned = df[valid]

    cleaned_rows += len(cleaned)
    removed_rows += len(df) - len(cleaned)

    cleaned.to_csv(
        OUTPUT_FILE,
        mode="w" if first_chunk else "a",
        header=first_chunk,
        index=False
    )

    first_chunk = False

print("Day 7 data cleaning completed.")
print(f"Original rows: {total_rows}")
print(f"Cleaned rows: {cleaned_rows}")
print(f"Removed rows: {removed_rows}")
print(f"Cleaned file: {OUTPUT_FILE}")
