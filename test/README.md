## Protractor tests

Execute
```
protractor conf.js
```
in command line to run tests.

Protractor installation procedure described here https://angular.github.io/protractor/#/

You may use startup script (MAC version)
```
#!/bin/bash
# File: ~/dre.sh

function new_tab() {
  TAB_NAME=$1
  COMMAND=$2
  osascript \
    -e "tell application \"Terminal\"" \
    -e "tell application \"System Events\" to keystroke \"t\" using {command down}" \
    -e "do script \"printf '\\\e]1;$TAB_NAME\\\a'; $COMMAND\" in front window" \
    -e "end tell" > /dev/null
}

new_tab "dre services" "cd ~/Documents/DRE-services; FHIR_URL=http://dev.ntrlab.ru:8080 node server.js"

new_tab "Mongo" "mongod"

new_tab "Redis" "redis-server"

new_tab "webdriver" "webdriver-manager start --standalone"
```
If you have dre-frontend and DRE-services installed locally.
