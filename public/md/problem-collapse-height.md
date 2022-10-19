### el-collapse高度问题

**场景**
容器内左右布局，左侧为折叠面板，并希望折叠面板在展开一个时的高度与右侧对齐
![](/md/problem-collapse-height/sceen.jpg)


**问题描述**
el-collapse在accordion模式下，如果给.el-collapse-item设置了高度，在切换面板时，容器高度会被撑开出现滚动条

<br/>

**问题展示**
为了便于查看示例中将滚动条的颜色设为了红色
<iframe
height=450
width=800
src='/md/problem-collapse-height/problem-show.mp4'
frameborder=0>
</iframe>

<br/>

**尝试**
1、在查看了el-collapse的源码中发现element是自己写了一个transition组件，值得注意的是在enter和beforeLeave中获取了元素的scrollHeight赋值给样式的height
```
Transition.prototype.enter = function enter(el) {
    ...
    el.style.height = el.scrollHeight + 'px';
    ...
}
Transition.prototype.beforeLeave = function beforeLeave(el) {
    ...
    el.style.height = el.scrollHeight + 'px';
    ...
}
```
<br/>
    经过打印发现在这里获取到的scrollHeight与页面上实际collapse-item的高度不符

![](/md/problem-collapse-height/reason-1.jpg)
![](/md/problem-collapse-height/reason-2.jpg)

<br/>

这里怀疑是高度变化与实际页面不符造成的，到这里想到了一个暴力解决方式，当离开时不要过渡效果了直接隐藏

<br/>

```
.v-leave {
    display: none;
}
```

<br/>
这个解决办法我觉得是属于侧面解决了，而且也没有leave时的过渡效果，于是继续想办法！

<br/>

2、突然发现element的过渡效果是加在内层item_wrap里的，而我是给外层的item加了height: calc(100% - 98px)

![](/md/problem-collapse-height/reason-3.jpg)
![](/md/problem-collapse-height/reason-4.jpg)

所以给外层的item加上过渡变化就完美的解决了这个问题
```
.el-collapse-item.is-active {
	height: calc(100% - 98px);
}
.el-collapse-item {
  height: 48px;
  transition: height .3s ease-in-out;
}
```
    
