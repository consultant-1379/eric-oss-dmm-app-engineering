FROM armdocker.rnd.ericsson.se/proj-eric-oss-drop/k6-base-image:latest
RUN mkdir -p /home/k6/scripts/
RUN mkdir -p /reports
COPY src/js/ /home/k6/scripts/
COPY src/resources/ /home/k6/scripts/
COPY deployment/chart/start-k6.sh /home/k6/scripts/
WORKDIR /home/k6/scripts/
ENTRYPOINT ["/bin/sh","/home/k6/scripts/start-k6.sh"]
