https://gist.github.com/dwelch2344/fabec47e0da62e8bc9578b15d7e845c9


curl --location --request POST 'https://kafka-schema.dev/subjects/myschema/versions' \
--header 'Content-Type: application/vnd.schemaregistry.v1+json' \
--data-raw '{
    "schema": "{\"type\":\"record\",\"name\":\"myschema\",\"doc\":\"This is a sample Avro schema to get you started. Please edit\",\"namespace\":\"default\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"type\",\"type\":\"string\"}]}"
}'