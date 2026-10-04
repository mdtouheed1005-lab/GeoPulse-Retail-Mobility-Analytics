import pandas as pd

file_path = "data/processed/geopulse_cleaned.csv"

print("Loading cleaned GeoPulse data...")

df = pd.read_csv(file_path)

# Convert Timestamp to datetime
df["Timestamp"] = pd.to_datetime(df["Timestamp"], errors="coerce")

# Sort each device's records chronologically
df = df.sort_values(["DeviceID", "Timestamp"])

# Save the sorted data
df.to_csv(file_path, index=False)

print("Day 9 timestamp sorting completed.")
print("Rows:", len(df))
print("Sorted by: DeviceID, Timestamp")
