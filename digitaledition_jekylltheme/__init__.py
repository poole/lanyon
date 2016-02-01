#  This is basically a placeholder to
# allow pip installation with python,
# so versions of digitaledition-jekylltheme can
# be easily managed and installed.

import os


ZIPFILE_PATH = os.path.join(os.environ.get('VIRTUAL_ENV', '/usr/local'),
    'share', 'digitaledition-jekylltheme', 'digitaledition-jekylltheme.zip')
'Path to the packaged zipfile of the jekyll theme'