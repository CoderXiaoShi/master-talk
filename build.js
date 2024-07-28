const { execSync } = require('child_process')


execSync('git pull')

// 每隔半个小时拉一次代码
setTimeout(() => {
  execSync('git pull')
}, 1000 * 60 * 30)
