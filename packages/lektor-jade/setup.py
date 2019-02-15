from setuptools import setup


setup(
    name='lektor-jade',
    description='Add support for jade to jinja2',
    version='0.1.0',
    author=u'Sebastian Vetter',
    install_requires=[
        'pyjade',
    ],
    py_modules=['lektor_jade'],
    entry_points={
        'lektor.plugins': [
            'jade = lektor_jade:JadeTemplatePlugin']})
