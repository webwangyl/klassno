### Git常用指令及用于解决的问题总结

**生成本地store文件存储密码**

```
git config --global credential.helper store
```

用于每次执行pull等操作时都需要输入账号密码。



**远程master仓库覆盖本地仓库**

```
git fetch --all
git reset --hard origin/master
git pull
```

用于pull报错并且以远程代码为主时（本地修改的代码将被覆盖，**三思！！！**）



**显示目前关联的远程仓库，并移除不需要的仓库**

```
git remote show origin
git remote prune
```



**删除本地不需要的分支**

```
git branch -a
git branch -D dev
```



