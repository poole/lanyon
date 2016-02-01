#!/usr/bin/env python

from distutils.core import setup
from distutils.command.install import install
import os
import shutil
from zipfile import ZipFile

# minimal python setup script,
# to support a standardized way of including this theme via zipfile
# in python projects


class PrepInstall(install):
    def run(self):
        # before running install, generate a zipfile of the site contents
        exclude_dirs = ['./build', './.git', './_site']
        exclude_files = ['digitaledition-jekylltheme.zip']
        shutil.rmtree('build')
        os.mkdir('build')
        with ZipFile('build/digitaledition-jekylltheme.zip', 'w') as zipdata:
            base_zip_dir = 'digitaledition-jekylltheme'
            for root, dirs, files in os.walk('.'):
                if any(root.startswith(d) for d in exclude_dirs):
                    continue
                for filename in files:
                    if filename in exclude_files:
                        continue
                    zipdata.write(os.path.join(root, filename),
                        os.path.join(base_zip_dir, root, filename))

        install.run(self)


setup(name='digitaledition-jekylltheme',
      version='0.1',
      description='Jekyll theme for annotated digital facsimile editions',
      author='Emory Center for Digital Scholarship and Emory LITS',
      author_email='libsysdev-l@listserv.cc.emory.edu',
      url='https://github.com/emory-libraries-ecds/digitaledition-jekylltheme',
      data_files=[('share/digitaledition-jekylltheme', ['build/digitaledition-jekylltheme.zip'])],
      cmdclass={"install": PrepInstall},
     )


