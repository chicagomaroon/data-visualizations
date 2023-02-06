#!/usr/bin/env bash

# "send-to-wordpress": "export PWD=`pwd` && export ID=$npm_config_story && export FILE_NAME=$npm_config_story.min.html && export DIRECTORY=$PWD/$npm_config_year/$npm_config_story && ./export_visual_to_wordpress.sh"

#curl -sk --request POST \
#--url https://chicagomaroon.com/wp-json/wp/v2/media/"$ID" \
#--header 'Cache-Control: no-cache' \
#--header 'Content-Type: text/html; charset=utf-8' \
#--header "content-disposition: attachment; filename=$FILE_NAME" \
#-u "$CHICAGO_MAROON_USER_NAME"':'"$CHICAGO_MAROON_PASSWORD" \
#--data-binary "@$DIRECTORY/$FILE_NAME" --location
#
#curl -sk --request POST --url https://chicagomaroon.com/wp-json/wp/v2/media/"$ID" \
#-u "$CHICAGO_MAROON_USER_NAME"':'"$CHICAGO_MAROON_PASSWORD" \
#--header "content-type: application/json" \
#-d @"$DIRECTORY"/meta_data.json
