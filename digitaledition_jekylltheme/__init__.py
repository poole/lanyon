#  This is basically a placeholder to
# allow pip installation with python,
# so versions of digitaledition-jekylltheme can
# be easily managed and installed.

__version_info__ = (0, 7, 0, None)

# Dot-connect all but the last. Last is dash-connected if not None.
__version__ = '.'.join([str(i) for i in __version_info__[:-1]])
if __version_info__[-1] is not None:
    __version__ += ('-%s' % (__version_info__[-1],))

import os

PKG_DIR = os.path.dirname(__file__)

ZIPFILE_PATH = os.path.join(PKG_DIR, 'digitaledition-jekylltheme.zip')
'Path to the packaged zipfile of the jekyll theme'
