{{- /* Per-page markdown companion */ -}}
# {{ .Title }}

| key | value |
| --- | --- |
| url | {{ .Permalink }} |
{{- with .Date }}
| date | {{ .Format "2006-01-02" }} |
{{- end }}
{{- with .Params.category }}
| category | {{ . }} |
{{- end }}
{{- with .Params.tags }}
| tags | {{ delimit . ", " }} |
{{- end }}
{{- with .Description }}
| description | {{ . }} |
{{- end }}
{{- with .Params.canonical }}
| canonical | {{ . }} |
{{- end }}

{{ .RawContent }}
