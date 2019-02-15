import csv
from io import StringIO

from lektor.pluginsystem import Plugin
from lektor.types import Type


def csv_to_dicts(text):
    text = text.strip()
    if text:
        return csv.DictReader(StringIO(text), skipinitialspace=True)


class CsvType(Type):
    widget = 'multiline-text'

    def value_from_raw(self, raw):
        return csv_to_dicts(raw.value or "")


class CsvFieldPlugin(Plugin):
    name = 'csv-field'
    description = 'Add a CSV field type for models.'

    def on_setup_env(self):
        self.env.add_type(CsvType)
