cd view
npm i
npm run build
cd ../
npm i
npx tsc
pm2 start dist/index.js