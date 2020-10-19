<h2>基于node的 git submodules自动化实现方案</h2>

<h3>背景：</h3>
通常在团队协作开发中，如果涉及到多个模块，可能会遇到在一个Git仓库 中添加 其他 Git 仓库的场景。比如，在项目中引用第三方库。或者在模块化开发中，某些公共的模块是需要单独维护的，使用单独的仓库比较方便，但是在项目中需要引用，就会出现这样的场景。git submodule 的就是解决这类问题的。

<!-- ## 开发流程 （建议） -->
   公司目前前端saas项目中，基于webpack做的多页面配置打包，多个子模块起初是放在一个Git仓库的，但随着业务线的发展，必然存在以下几个问题：
   * 1. 文件越来越多,业务开发寻址变得越来越困难。
   * 2. 新业务线增加，把文件放入同一仓库管理，导致文件数量增长极快，管理及协同开发难度也在不断加大。
   * 3. 多个业务开发完成线，出现分支合并 master的情况, 增加了工作量
   * 4. 不同业务线间缺少物理隔离，会出现跨业务线文件引用混乱，例如A业务线出现了B业务线名字的组件。

为了要解决这些问题，就需要拆分这些应用，即进行工程优化的常规手段进行“分治”，其实这也是微前端的雏形。关于微前端可以参考：
[基于Vue的 微前端项目实践方案](/modules/solution/micro),  言归正传，对于物理分离层面，我们采用[git submodule](/modules/git/submodule)实现.

<!-- [_sidebar.css](https://cdn.jsdelivr.net/npm/docsify-themeable@0/src/scss/themes/defaults/_sidebar.css ':include') -->



<h3>针对上面的问题，我们要实现的功能主要有：</h3>

 * 1. 按需拉取指定的子模块（当然也可以全部拉取）
 * 2. 子模块的维护者提交了更新后，我们通过执行简单脚本,实现批量拉取更新，替代繁琐的git命令
 * 3. 当调试子模块，git pull时，同时暂存本地代码
 * 4. 子模块不需要时，可以批量移出
 * 5. 限制子模块push（即拉取的子模块只拥有读的权限）


### 实现思路：
将所有依赖的子模块写入配置文件`submodule.config.js`，配置包含仓库地址、项目名称、别名，在`package.json`中加入启动命令，
通过inquirer实现交互式命令行，按需拉取子模块，然后通过node中的 `child_process`模块的`exec()`，执行 git 命令 


#### submodule.config.js
```js
export default [
  { name: '基础模块', value: 'basics', path: 'http://172.16.0.251/linpeiqun/saas-basic' },
  { name: '薪白条', value: 'whiteBar', path: 'http://172.16.0.251/linpeiqun/saas-grantsys' },
  { name: '收入预结', value: 'expectedIncome', path: 'http://172.16.0.251/linpeiqun/saas-basic' },
  { name: '薪发放', value: 'grantSys', path: 'http://172.16.0.251/linpeiqun/saas-basic' },
  { name: '自发薪', value: 'spontaneity', path: 'http://172.16.0.251/linpeiqun/saas-basic' },
  { name: '日日薪', value: 'daySalary', path: 'http://172.16.0.251/linpeiqun/saas-basic' },
]
```

inquirer做交互让用户选择性安装,判断已经安装，

```js
// 统计要拉取的模块
const statisticsModel = (answers) => answers.modules.reduce((total, curr, index, arr) => {
  total.push(gitSubModules.find(item => curr === item.value))
  return total
}, [])

inquirer.prompt([{
  type: 'checkbox',
  name: 'modules',
  message: `请选择要${tips}的子模块`,
  choices: gitSubModules,
},]).then((answers) => {
  let pullModules = statisticsModel(answers)

  pullModules.forEach(({ }) => {

    let exists = fs.existsSync(childModule)

    if (exists) updShell.push({ item, cmd: `cd  ${childModule}  && git stash clear  && git stash save "备份${item}" && git checkout .  && git checkout master && git pull ` })

    // 不存在则拉取
    if (!exists) {
      pullShell(item, gitName))
    }

  })
})

```
当子模块的维护者提交了更新后，本地需要同步更新, `git submodule update --init --recursive` 虽然可以实现，但是当我本地已经拉取了子模块，
或者子模块在本地已有修改，该命令没有生效。只有切换到子模块下，执行git pull 才可以。针对这样的情况。我们需要判断本地子模块和 ..gitmodules 文件是否存在，如果存在执行则更新.

```js
const isExists = fs.existsSync(resolve(`../.gitmodules`))
const absolutePath = resolve(`../submodules`)

if (isExists && fs.existsSync(absolutePath) && !cliParams.del) {
  const spinner = ora(`正在同步子模块...`)
  spinner.start()
  return fs.readdir(absolutePath, (err, files) => {
    files.forEach(item => {
      // 子模块存在，先暂存后再拉取master 分支
      exec(`cd  ${absolutePath}/${item}  && git stash clear  && git stash save "备份${item}"
       && git checkout .  && git checkout master && git pull `, (error, stdout, stderr) => {
        spinner.stop()
        if (err !== null) {
          log(chalk.red(`子模块拉取失败`));
          log(chalk.red(`    ${err}`));
        } else {
          log(chalk.green(`子模块同步更新成功， 请查看目录：/submodules/ `));
          log(chalk.yellow(`    ${stdout}`));  // 同步展示git pull 信息
          log(chalk.yellow(`    ${stderr}`));
        }
      })
    })
    spinner.stop()
  })
}

```

有增加就有删除，我们通过命令行，传入自定义参数做解析，取得要删除的模块:
```js
/*
  cli参数
  --define=a:1,b:2
*/
const argv = require('yargs').argv
const cliConfig = {}

function parse (params) {
  if (!params) {
    return {}
  }
  params = params.split(',')
  let result = {}
  params.forEach(item => {
    let param = item.split(':')
    result[param[0]] = JSON.stringify(param[1])
  })
  return result
}

let params = parse(argv.define)
params = Object.assign(cliConfig, params)
module.exports = params
```

移除子模块通常采用以下方式：
 1. 删除`.gitsubmodule`里相关部分,   
 2. 修改 `.git/config` 文件，通过vi编辑器移除对应子模块
 2. 最后清理缓存：  git rm --cached 子模块名称

这种方式需要编辑config文件，过于繁琐，更简单的方法：
 
 ```js
  exec(`git stash && git pull && git stash pop`)
  exec(`git rm   .git/modules/submodules/${gitName}`)
  exec(`git rm --cached submodules/${gitName}`, (err, a, b) => {
    console.log('cached', err);
  })
  exec(`git commit  -m "fix: 删除关联子模块: submodules/${gitName}"`)
  exec(`git submodule sync`)
  exec(`git push`)
```

对于子模块，严格意义上来讲，只能有使用权限，在父仓库中，是不能直接push 代码的，可以通过git husky配置钩子做强校验，


`package.json`
```
 "husky": {
    "hooks": {
      "pre-commit": "node build/check.js",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  ```






 





