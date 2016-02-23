#!/usr/bin/env python

from distutils.core import setup
from distutils.command.install import install
from distutils.command.install_data import install_data
from distutils.command.build_ext import build_ext
from distutils.command.clean import clean
# from distutils.command.egg_info import egg_info
import os
import shutil
from zipfile import ZipFile
import sys

# minimal python setup script,
# to support a standardized way of including this theme via zipfile
# in python projects

ZIPFILE_PATH = os.path.join('digitaledition_jekylltheme',
  'digitaledition-jekylltheme.zip')

def create_zipfile():
    # before installation, generate a fresh zipfile of the site contents
    exclude_dirs = ['./.git', './_site', 'digitaledition_jekylltheme']
    exclude_files = ['digitaledition-jekylltheme.zip']
    with ZipFile(ZIPFILE_PATH, 'w') as zipdata:
        # directory within the zipfile where everything should go
        base_zip_dir = 'digitaledition-jekylltheme'
        for root, dirs, files in os.walk('.'):
            if any(root.startswith(d) for d in exclude_dirs):
                continue
            for filename in files:
                if filename in exclude_files:
                    continue
                zipdata.write(os.path.join(root, filename),
                    os.path.join(base_zip_dir, root, filename))


# note: extending both install and build_ext commands so that
# zip will be created for both pip install -e and regular pip install

class PrepInstall(install):
    def run(self):
        print '** install'
        create_zipfile()
        install.run(self)

class PrepBuildExt(build_ext):
    def run(self):
        print '** build_ext'
        create_zipfile()
        build_ext.run(self)

# extend clean command to also remove the zipfile

class CleanZip(clean):
    def run(self):
      # remove zip file and then do any other normal cleaning
      try:
        os.remove(ZIPFILE_PATH)
      except OSError:
        pass
      clean.run(self)


setup(name='digitaledition_jekylltheme',
      version='0.1',
      description='Jekyll theme for annotated digital facsimile editions',
      author='Emory Center for Digital Scholarship and Emory LITS',
      author_email='libsysdev-l@listserv.cc.emory.edu',
      url='https://github.com/emory-libraries-ecds/digitaledition-jekylltheme',
      packages=['digitaledition_jekylltheme'],
      package_dir={'digitaledition-jekylltheme': 'digitaledition_jekylltheme'},
      package_data={'digitaledition_jekylltheme': ['digitaledition-jekylltheme.zip']},
      cmdclass={'install': PrepInstall, 'build_ext': PrepBuildExt,
                'clean': CleanZip},
     )


