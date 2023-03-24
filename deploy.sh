#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
# cd public

# git init
git add .
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# git push -f origin  master:master

# cd ..

# tcb hosting:deploy public -e blog-9g8lgnuke4603ff9
