
rm -rf ./assets/*

cd ../website
npm run build

git add .
git commit -m "update"
git push origin
git push origin_gitee



