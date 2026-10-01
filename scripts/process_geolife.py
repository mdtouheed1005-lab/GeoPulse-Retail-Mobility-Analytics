from pathlib import Path
import csv


# GeoLife dataset location
DATASET_PATH = (
    Path.home()
    / "Downloads"
    / "Geolife Trajectories 1.3"
    / "Data"
)

# Output CSV file
OUTPUT_FILE = Path("data/processed/geolife_sample.csv")

# Process only a few files for Day 4 testing
MAX_FILES = None


# Create output folder if it does not exist
OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)


# Find all .plt files inside the dataset folders
trajectory_files = list(DATASET_PATH.rglob("*.plt"))

print(f"Found {len(trajectory_files)} trajectory files.")
print(f"Processing first {MAX_FILES} files...")


rows = []


# Read trajectory files
for file_path in (trajectory_files if MAX_FILES is None else trajectory_files[:MAX_FILES]):

    try:
        with open(file_path, "r", encoding="utf-8") as file:

            # Skip the first 6 header lines
            lines = file.readlines()[6:]

            for line in lines:

                parts = line.strip().split(",")

                # A valid GeoLife record contains 7 fields
                if len(parts) >= 7:

                    rows.append([
                        file_path.parent.parent.name,  # user_id
                        parts[0],                      # latitude
                        parts[1],                      # longitude
                        parts[2],                      # zero
                        parts[3],                      # altitude
                        parts[4],                      # days
                        parts[5],                      # date
                        parts[6]                       # time
                    ])

    except Exception as e:
        print(f"Error reading {file_path}: {e}")


# Write extracted data to CSV
with open(
    OUTPUT_FILE,
    "w",
    newline="",
    encoding="utf-8"
) as file:

    writer = csv.writer(file)

    # CSV column names
    writer.writerow([
        "user_id",
        "latitude",
        "longitude",
        "zero",
        "altitude",
        "days",
        "date",
        "time"
    ])

    # Write all extracted rows
    writer.writerows(rows)


print(f"Processed {len(rows)} trajectory points.")
print(f"Saved output to: {OUTPUT_FILE}")
