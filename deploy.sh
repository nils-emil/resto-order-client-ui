version=$(sh get-next-docker-version.sh)
npm run build
docker build -t nilsemil/resto-order-client-ui:$version .
docker push nilsemil/resto-order-client-ui:$version
ssh ubuntu@13.48.27.146 << EOF
echo 'version: "2"
services:
  client-ui-loputoo:
    container_name: client-ui-loputoo
    restart: always
    image: nilsemil/resto-order-client-ui:$version
    environment:
      - REACT_APP_BACKEND_URL=https://loputoo.tellimus.com
    ports:
      - "10000:80"
  client-ui-demo:
    container_name: client-ui-demo
    restart: always
    image: nilsemil/resto-order-client-ui:$version
    environment:
      - REACT_APP_BACKEND_URL=https://demo.tellimus.com
    ports:
      - "10001:80"    ' > docker-compose.yml

docker-compose up -d
EOF
ssh ubuntu@13.48.27.146
