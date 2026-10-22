from pathlib import Path
import pandas as pd

# Locate the project root and sample dataset
PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = PROJECT_ROOT / "data" / "test" / "sample_device_store_visits.csv"


def main():
    if not DATA_FILE.exists():
        raise FileNotFoundError(f"Sample dataset not found: {DATA_FILE}")

    df = pd.read_csv(DATA_FILE)

    required_columns = {"DEVICE_ID", "STORE_ID"}
    missing = required_columns - set(df.columns)

    if missing:
        raise ValueError(f"Missing required columns: {sorted(missing)}")

    if df.empty:
        raise ValueError("The sample dataset is empty.")

    if df[list(required_columns)].isnull().any().any():
        raise ValueError("Device IDs and store IDs must not be empty.")

    # Count distinct stores visited by each device
    stores_per_device = df.groupby("DEVICE_ID")["STORE_ID"].nunique()

    total_devices = len(stores_per_device)
    multi_store_devices = int((stores_per_device > 1).sum())
    percentage = multi_store_devices / total_devices * 100

    print("CANNIBALIZATION VALIDATION")
    print("--------------------------")
    print(f"Total unique devices: {total_devices}")
    print(f"Multi-store devices: {multi_store_devices}")
    print(f"Multi-store visitor percentage: {percentage:.2f}%")

    # Expected results for the supplied sample dataset
    expected = (4, 2, 50.00)
    actual = (total_devices, multi_store_devices, round(percentage, 2))

    if actual != expected:
        raise AssertionError(
            f"Validation failed: expected {expected}, received {actual}"
        )

    print("Validation: PASS")


if __name__ == "__main__":
    main()