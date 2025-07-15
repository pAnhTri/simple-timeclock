from .excel import excel_bp
from .connect import connect_bp

all_blueprints_prefixes = [
    {
        "blueprint": excel_bp,
        "prefix": "/excel",
    },
    {
        "blueprint": connect_bp,
        "prefix": "/connect",
    },
]
