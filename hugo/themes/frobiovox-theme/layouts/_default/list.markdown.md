{{- /* Section/list markdown companion */ -}}
# {{ .Title }}

{{ with .Description }}{{ . }}{{ end }}

{{ with .RawContent }}{{ . }}{{ end }}

## Pages

{{ range .Pages }}
- [{{ .Title }}]({{ .Permalink }}){{ with .Date }} — {{ .Format "2006-01-02" }}{{ end }}{{ with .Description }}: {{ . }}{{ end }}
{{- end }}
