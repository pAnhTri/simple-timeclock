import openpyxl
import datetime

from get_workbook_path import get_workbook_path
from date_ranges import get_cell_ranges


def is_today_in_pay_period(start_date: datetime.date, end_date: datetime.date):
    return datetime.date.today() >= start_date and datetime.date.today() <= end_date


def update_pay_period(
    worksheet: openpyxl.worksheet.worksheet.Worksheet,
    start_date: datetime.date,
    end_date: datetime.date,
):
    # Slide window by 2 weeks forward until today is in the pay period
    while not is_today_in_pay_period(start_date, end_date):
        start_date += datetime.timedelta(days=14)
        end_date += datetime.timedelta(days=14)

    worksheet["N5"].value = start_date


def reset_cell_in_range(
    worksheet: openpyxl.worksheet.worksheet.Worksheet, cell_range: str
):
    date_range = worksheet[cell_range]

    for row_of_cells in date_range:
        for cell in row_of_cells:
            cell.value = None


if __name__ == "__main__":
    workbook_path = get_workbook_path()
    workbook = openpyxl.load_workbook(workbook_path)
    worksheet = workbook.active

    start_date = worksheet["N5"].value.date()
    end_date = start_date + datetime.timedelta(days=13)

    if not is_today_in_pay_period(start_date, end_date):
        update_pay_period(worksheet, start_date, end_date)
        for cell_range in get_cell_ranges():
            reset_cell_in_range(worksheet, cell_range)

        workbook.save(workbook_path)
