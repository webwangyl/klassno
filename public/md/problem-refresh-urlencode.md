### 在一个开心的下午，刚刚完成了nuxt应用套上qiankun框架的任务时，意外发生了。。。

**前提**：qiankun框架 + nuxt框架

**问题**：刷新时url被编码，手动改成/还是会变成%2F

/assets%2FAssetDetails?id=2c91759dc41fff1bf03adc3be901abdf&tabData

**尝试**：

​		1、在主应用注册子应用之前(beforeMount)debugger，发现url已经发生了变化，锁定问题在主应用。

​		2、既然在beforeMount之前就发生了变化，怀疑中间件作祟，在default布局中注释掉中间件，没有用。

​		3、直接访问主应用中的某一路由，刷新，没问题。

​		4、锁定问题与qiankun框架有关。

​		5、注释掉获取子应用注册的json文件，没问题，锁定问题在获取子应用这里。

​		6、函数内调用了一个commit，commit中对apps数据进行处理，经过一点点注释发现问题在这里。

```
const routes = apps.map((item, i) => ({
    path: `${item.activeRule}(.*)`,
    name: `${item.name}-i`,
    component: () =>
        import('@/pages/index.vue').then((m) => m.default || m),
}))
```

​		7、问题就显而易见了，path后加上/改成如下代码

```
const routes = apps.map((item, i) => ({
    path: `${item.activeRule}/(.*)`, // 修改了这里
    name: `${item.name}-i`,
    component: () =>
        import('@/pages/index.vue').then((m) => m.default || m),
}))
```

**分析**：

​		这里实际上是给nuxt加上子应用的动态路由，匹配到子应用的前缀后走index页面，怀疑是因为没有加/时，后面的被当做字符串解析，所以进行了url编码。

**测试**：

​		经过一系列测试，发现这样改，如果有一个子应用的路由就是子应用的前缀，比如/assets，就会404，因为匹配不到后面的/，其他情况都正常，所以最终改成了如下代码

```
const routes = apps.map((item, i) => ({
    path: `${item.activeRule}`, // 删掉(.*)
    name: `${item.name}-i`,
    component: () =>
        import('@/pages/index.vue').then((m) => m.default || m),
    children: [ // 增加子路由
        {
            path: '*',
            component: () =>
                import('@/pages/index.vue').then((m) => m.default || m),
        },
    ],
}))
```

