{{/*
Expand the name of the chart.
*/}}
{{- define "eric-oss-dmm.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "eric-oss-dmm.selectorLabels" -}}
app.kubernetes.io/name: {{ include "eric-oss-dmm.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "eric-oss-dmm.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}


{{/*
Common labels
*/}}
{{- define "eric-oss-dmm.labels" -}}
helm.sh/chart: {{ include "eric-oss-dmm.chart" . }}
{{ include "eric-oss-dmm.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}


{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "eric-oss-dmm.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "eric-oss-dmm.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "eric-oss-dmm.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Get the options file to be used for execution
*/}}
{{- define "get-the-options-file" -}}
{{- if and (eq .Values.env.STAGING_TYPE "APPLICATION") .Values.env.SEF_ENABLED_TESTS -}}
/resources/config/sef.options.json
{{- else if and (eq .Values.env.STAGING_TYPE "APPLICATION") (not .Values.env.SEF_ENABLED_TESTS) -}}
/resources/config/default.options.json
{{- else if and (eq .Values.env.STAGING_TYPE "PRODUCT") .Values.env.SEF_ENABLED_TESTS -}}
/resources/config/pe.sef.options.json
{{- else if and (eq .Values.env.STAGING_TYPE "PRODUCT") (not .Values.env.SEF_ENABLED_TESTS) -}}
/resources/config/PE_external.options.json
{{- end }}
{{- end }}
{{/*
Used to retrieve TLS value from configmap
*/}}
{{- define "tls-enabled" -}}
  {{- $configMapObj := (lookup "v1" "ConfigMap" .Release.Namespace "testware-global-config").data }}
  {{- $TlsConfiguration := (get $configMapObj "tls-enabled")  }}
  {{- $TlsConfiguration  }}
{{- end }}
{{/*
Used to create kafka server url based on TLS enabled or disabled
*/}}
{{- define "get-TLS-environment" -}}
  {{- if eq (include "tls-enabled" .) "True" }}
  eric-oss-dmm-kf-op-sz-kafka-bootstrap:9093
  {{- else -}}
  eric-oss-dmm-kf-op-sz-kafka-bootstrap:9092
  {{- end }}
{{- end }}

{{/*
Used to create dmm testware inside service mesh
*/}}
{{- define "eric-oss-dmm.service-mesh-inject" }}
{{- if eq (include "tls-enabled" .) "True" }}
sidecar.istio.io/inject: "true"
{{- else -}}
sidecar.istio.io/inject: "false"
{{- end -}}
{{- end -}}

{{/*
This helper defines which out-mesh services will be reached by dmm testware.
*/}}
{{- define "eric-oss-dmm.service-mesh-ism2osm-labels" }}
{{- if eq (include "tls-enabled" .) "True" }}
eric-oss-dmm-kf-op-sz-kafka-ism-access: "true"
eric-pm-server-ism-access: "true"
{{- end -}}
{{- end -}}

{{/*
This helper defines the annotation for defining service mesh volume. Here, the DMM testware certificates are mounted inside istio proxy container 
*/}}
{{- define "eric-oss-dmm.service-mesh-volume" }}
{{- if eq (include "tls-enabled" .) "True" }}
sidecar.istio.io/userVolume: '{"eric-oss-dmm-app-test-kafka-certs-tls":{"secret":{"secretName":"eric-oss-dmm-app-test-secret","optional":true}},"eric-oss-dmm-app-test-pm-server-certs-tls":{"secret":{"secretName":"eric-oss-dmm-app-test-pm-server-secret","optional":true}},"eric-oss-dmm-app-test-certs-ca-tls":{"secret":{"secretName":"eric-sec-sip-tls-trusted-root-cert"}}}'
sidecar.istio.io/userVolumeMount: '{"eric-oss-dmm-app-test-kafka-certs-tls":{"mountPath":"/etc/istio/tls/eric-oss-dmm-kf-op-sz-kafka-bootstrap/","readOnly":true},"eric-oss-dmm-app-test-pm-server-certs-tls":{"mountPath":"/etc/istio/tls/eric-pm-server/","readOnly":true},"eric-oss-dmm-app-test-certs-ca-tls":{"mountPath":"/etc/istio/tls-ca","readOnly":true}}'
{{ end }}
{{- end -}}

{{- define "get-application-version" -}}
  {{- $configMapObj := (lookup "v1" "ConfigMap" .Release.Namespace "eric-installed-applications").data }}
  {{- $configData := (get $configMapObj "Installed") | fromYaml }}
  {{- range $configData.csar }}
    {{- if eq .name "eric-oss-dmm" }}
        {{ .version }}
    {{ end}}
  {{- end}}
{{- end}}

{{- define "get-product-version" -}}
  {{- $configMapObj := (lookup "v1" "ConfigMap" .Release.Namespace "eric-installed-applications").data }}
  {{- $configData := (get $configMapObj "Installed") | fromYaml }}
  {{- $configHelm := $configData.helmfile }}
  {{ $configHelm.release }}
{{- end}}

{{- define "get-pull-secret" -}}
  {{- $configMapObj := (lookup "v1" "ConfigMap" .Release.Namespace "testware-global-config").data }}
  {{ get $configMapObj "docker-pull-secret" }}
{{- end}}

{{- define "get-pm-server-url" -}}
  {{- $configMapObj := (lookup "v1" "ConfigMap" .Release.Namespace "testware-global-config").data }}
  {{- $TlsConfiguration := (get $configMapObj "tls-enabled") }}
  {{- if eq $TlsConfiguration "True"}}
  http://eric-pm-server:9089/metrics/viewer/api/v1/query
  {{- else -}}
  http://eric-pm-server:9090/metrics/viewer/api/v1/query
  {{- end }}
{{- end}}