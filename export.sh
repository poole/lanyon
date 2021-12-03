#!/bin/bash

# export.sh

# create backup of the original _config.yml
cp ${PWD}/_config.yml ${PWD}/_config.yml.bak

# generate a custom unique URL for post compatible with our hosting server, overwrite _config.yml
GHP_UUID="https://iclr.iro.umontreal.ca/$(uuidgen)_$(date +%s)" yq e -i '.url = strenv(GHP_UUID)' ${PWD}/_config.yml
GHP_UUID_URL="$(yq e '.url' ${PWD}/_config.yml)"
GHP_UUID="$(echo ${GHP_UUID_URL##*/})"

echo "SUBMISSION URL":
echo $GHP_UUID_URL

echo "SUBMISSION UUID:"
echo $GHP_UUID

# render site
jekyll clean
jekyll build

# store metadata
printf "%s\n" "url: $GHP_UUID_URL" "uuid: $GHP_UUID" > vars.yml
cp vars.yml $GHP_UUID/

# create zip
rm -rf site.zip
cp -r _site $GHP_UUID
zip -r site.zip $GHP_UUID

# clean up
rm -r ${PWD}/${GHP_UUID}
rm ${PWD}/_config.yml
cp ${PWD}/_config.yml.bak ${PWD}/_config.yml