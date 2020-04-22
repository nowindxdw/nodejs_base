# Recruitments
# by dawei
1. CHANGE config.yaml to /config

2.INSTALL
```
$ . ./bin/setenv.sh          # 有两个点，不要省略第一个点
$ npm install 
$ npm start
```
3.url in browers:
```
http://0.0.0.0:3456/v1/api/index
```

环境配置检查
```
$ node bin/envcheck.js
```
再次在已经启动过的Terminal中启动时
```
$ npm start 
```

重建并查看API文档
```
$ npm run mkdocs
```

查看API文档
```
$ npm run viewdocs
```

执行单元测试
```
$ npm test
```

db init  to test login dashbord
```
$ npm run initdb
```

- dir structer

>
>bin    -- project shell scripts
>
>config  -- config file use .yaml
>
>interfaces --   api for other service like Baidu api
>
>models  --    model in MVC
>
>schemas -- db define and use db-singleton to create db
>
>swagger -- swagger controllers
>
>test    --  unit test case
>
>app.js   --  where to start our app
>
>package.json  -- npm package info

- diction

所有的数据均定义在数据字典文件dictionary.js


##### develop flow



- 1.确定功能需求 设计数据库与swagger接口文档(可以使用在线编辑或download本地swagger-editor)
- 2.数据库schema替换schema下的数据库定义文件
- 3.swagger源文件和codegen生成的nodejs代码替换swagger下对应模块
- 4.编写逻辑代码以及工具函数，工具函数应先写测试用例在test/下（TDD)
- 5.完成单元测试后进行mock集成测试
- 6.考虑压力测试或codereview代码重构
