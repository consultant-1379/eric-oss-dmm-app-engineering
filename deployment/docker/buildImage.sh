#!/bin/bash
docker build -t armdocker.rnd.ericsson.se/proj-edca-dev/k6-dmm-testsuite:latest -f ./deployment/Dockerfile .
docker push armdocker.rnd.ericsson.se/proj-edca-dev/k6-dmm-testsuite:latest