ssh -i aws-resto.pem ubuntu@ec2-13-49-78-61.eu-north-1.compute.amazonaws.com << EOF
set -o xtrace
pm2 stop app
cd /home/ubuntu/chatRestoraunt/order-api || exit
git reset --hard
git pull

rm config/db.js
cp config/db-prod.js config/db.js

rm config/credentials.js
cp config/credentials-prod.js config/credentials.js

npm i
pm2 start app.js
EOF
