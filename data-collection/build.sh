
# execSync('rm -rf ./assets/* ')
# execSync(`npm run build`)
# execSync(`git add .`)
# execSync(`git commit -m "update`)
# execSync('git push origin')
# execSync('git push origin_gitee')

rm -rf ./assets/*

cd website
npm run build

git add .
git commit -m "update"
git push origin
git push origin_gitee



