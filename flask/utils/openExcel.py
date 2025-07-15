import os


def openExcelHardcoded():
    # C:\Users\Rad Law Group. APLC\Dropbox\INDIVIDUALS\Anh Tri
    path = os.path.join(
        os.environ["USERPROFILE"],
        "Dropbox",
        "INDIVIDUALS",
        "Anh Tri",
        "RLG Timesheet.xlsx",
    )

    if os.path.exists(path):
        os.startfile(path)
    else:
        print("File does not exist")
