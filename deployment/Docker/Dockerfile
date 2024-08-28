FROM armdocker.rnd.ericsson.se/proj-eric-oss-dev-test/k6-base-image:1.2.0-5
RUN mkdir -p /home/k6/scripts/
COPY src/js/ /home/k6/scripts/
COPY deployment/chart/start-k6.sh /home/k6/scripts/
WORKDIR /home/k6/scripts/
ENTRYPOINT ["/bin/sh","/home/k6/scripts/start-k6.sh"]