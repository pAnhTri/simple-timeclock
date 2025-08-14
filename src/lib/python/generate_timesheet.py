import os
import shutil
import sys
import json
import datetime
import openpyxl

from get_workbook_path import get_workbook_path


def copy_master_timesheet(workbook_path: str):
    temp_folder_path = os.path.join(os.path.dirname(__file__), "Temporary")

    # Create folder if it doesn't exist
    os.makedirs(temp_folder_path, exist_ok=True)

    temporary_workbook_path = os.path.join(temp_folder_path, "RLG Timesheet.xlsx")

    shutil.copy(workbook_path, temporary_workbook_path)

    return temporary_workbook_path


def fill_cells(
    worksheet: openpyxl.worksheet.worksheet.Worksheet, parsed_excel_rows: dict
):
    for cell_index, cell_value in parsed_excel_rows.items():
        parsed_cell_value = datetime.datetime.strptime(cell_value, "%I:%M %p").time() if cell_value else None
        worksheet[cell_index] = parsed_cell_value


if __name__ == "__main__":
    argc = len(sys.argv)

    if argc != 2:
        print("Usage: python generate_timesheet.py <serialized_excel_rows>")
        sys.exit(1)

    serialized_excel_rows = sys.argv[1]
    parsed_excel_rows = json.loads(serialized_excel_rows)

    workbook_path = get_workbook_path()
    temporary_workbook_path = copy_master_timesheet(workbook_path)

    workbook = openpyxl.load_workbook(temporary_workbook_path)
    worksheet = workbook.active

    for row in parsed_excel_rows:
        fill_cells(worksheet, row)

    workbook.save(temporary_workbook_path)
