import openpyxl
import json
from datetime import timedelta
from get_workbook_path import get_workbook_path


if __name__ == "__main__":
    path_to_workbook = get_workbook_path()
    workbook = openpyxl.load_workbook(path_to_workbook)
    worksheet = workbook.active

    start_date = worksheet["N5"].value.date()
    end_date = start_date + timedelta(days=13)

    pay_period_value = {
        "start_date": start_date.strftime("%Y-%m-%d"),
        "end_date": end_date.strftime("%Y-%m-%d"),
    }

    print(json.dumps(pay_period_value))
