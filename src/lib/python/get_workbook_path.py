import os


def get_workbook_path():
    path_to_workbook = os.path.join(os.path.dirname(__file__), "RLG Timesheet.xlsx")

    if not os.path.exists(path_to_workbook):
        raise FileNotFoundError(f"The file {path_to_workbook} does not exist")

    return path_to_workbook
