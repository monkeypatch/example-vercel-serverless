
# app folder dir
cd my-app

# Copy files from the root folder to the app folder
cp ../requirements.txt .
cp ../.env.demo .env

mkdir api
cp ../api/index.py api/index.py

cp ../app/page.tsx app/page.tsx

# Update package.json
npm i axios --save
