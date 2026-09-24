from pathlib import Path
import csv

DATASET_PATH = Path.home() / "Downloads" / "Geolife Trajectories 1.3" / "Data"
OUTPUT_FILE = Path("data/processed/geolife_sample.csv")

MAX_FILES = 10

OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

trajectory_files = list(DATASET_PATH.rglob("*.plt"))

print(f"Found {len(trajectory_files)} trajectory files.")
print(f"Processing first {MAX_FILES} files...")

rows = []

for file_path in trajectory_files[:MAX_FILES]:
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            lines = file.readlines()[6:]

        for line in lines:
            parts = line.strip().split(",")

            if len(parts) >= 7:
                rows.append([
                    file_path.parent.parent.name,
                    parts[0],
                    parts[1],
                    parts[2],
                    parts[3],
                    parts[4],
                    parts[5],
                    parts[6]
                ])

    except Exception as e:
        print(f"Error reading {file_path}: {e}")

with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)

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

    writer.writerows(rows)

print(f"Processed {len(rows)} trajectory points.")
print(f"Saved output to: {OUTPUT_FILE}")