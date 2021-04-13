docker build -t nilsemil/resto-order-client-ui:v6 .
docker push nilsemil/resto-order-client-ui:v6
ssh ubuntu@13.48.27.146 << EOF
echo 'version: "2"
services:
  client-ui-loputoo:
    container_name: client-ui-loputoo
    restart: always
    image: nilsemil/resto-order-client-ui:v6
    ports:
      - "10000:80"
  client-ui-demo:
    container_name: client-ui-demo
    restart: always
    image: nilsemil/resto-order-client-ui:v6
    ports:
      - "10001:80"    ' > docker-compose.yml

docker-compose up -d
EOF
ssh ubuntu@13.48.27.146
