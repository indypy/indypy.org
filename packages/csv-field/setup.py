from setuptools import setup

setup(
    name='lektor-csv-field',
    version='0.1',
    author='Paul McLanahan',
    author_email='paul@mclanahan.net',
    license='MIT',
    py_modules=['lektor_csv_field'],
    entry_points={
        'lektor.plugins': [
            'csv-field = lektor_csv_field:CsvFieldPlugin',
        ]
    }
)
