curl -X 'POST' 'http://localhost:8083/rest/checkout/crypto/10' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w '\n%{http_code}\n' \
  | sed '$d'
