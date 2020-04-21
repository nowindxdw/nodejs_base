# Recruitments
# by dawei
1. CHANGE config.yaml to /config

2.INSTALL
```
$ . ./bin/setenv.sh                         # 有两个点，不要省略第一个点
$ npm install
$ npm start
```

清空数据库
```
npm run cleardb
```

重建测试数据
```
npm run initdb
```

再次新开Terminal启动时复制
```
$ . ./bin/setenv.sh       # 仅在新开Terminal时设置一次即可
$ npm start
```
环境配置检查
```
$ node bin/envcheck.js
```
再次在已经启动过的Terminal中启动时复制
```
$ npm start 
```

重建并查看API文档复制
```
$ mkdocs.sh
```

查看API文档复制
```
$ viewdocs.sh
```

执行单元测试复制
```
$ npm test
```



- dir structer

|name -- desc |
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
