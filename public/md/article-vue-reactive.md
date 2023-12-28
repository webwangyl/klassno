### 核心的三个类：Observer、Dep、Watcher

```
class Observer {
	constructor (value: any) {
    this.dep = new Dep()
    def(value, '__ob__', this) // 添加响应式标识，下次observe不会重复
    if (Array.isArray(value)) {
    	// 使用自定义的数组7个函数覆盖数组原型上的函数
    } else {
    	defineReactive(obj, key, val, customSetter, shallow) {
        const dep = new Dep() // 创建新的发布者，也就是说一个obj又有一个发布者，每一个key也拥有一个自己的发布者
        // 最熟悉的环节来了，get中数据劫持，set中发布消息
        Object.defineProperty(obj, key, {
          get: function () {
            const value = getter ? getter.call(obj) : val // 执行原本的get
            if (Dep.target) { // 有没有依赖的组件
              dep.depend() // 收集依赖
            }
            return value
          }
          set: function (newVal) {
            const value = getter ? getter.call(obj) : val // 获取原来的值
            // 判断新值与旧值是否相同，后面的判断是在判断NaN的情况，vue认为前后都是NaN值不变
            if (newVal === value || (newVal !== newVal && value !== value)) {
              return
            }
            setter.call(obj, newVal) // 调用原本的set
            childOb = !shallow && observe(newVal) // 不是浅监听，递归下去，巧妙就完了
            dep.notify() 通知该key的发布者，更新了！
          }
        })
      }
    }
	}
}
```

### Dep

```
class Dep {
	static target: ?Watcher; // watcher与dep互相关联，watcher会通过这个值影响到特定的dep
  id: number; // 标识
  subs: Array<Watcher>; // 收集该发布者的所有订阅
  constructor() {
  	this.id = uid++
    this.subs = [] // 初始化
  }
  addSub (sub: Watcher) { // 添加订阅
    this.subs.push(sub)
  }
  removeSub (sub: Watcher) { // 移除订阅
    remove(this.subs, sub)
  }
  depend () { // 收集依赖
    if (Dep.target) { // 将该发布添加到（上级）收集的全部发布中
      Dep.target.addDep(this)
    }
  }
  notify() { // 通知更新
  	if (!'production' && !config.async) {
  		// 非生产环境下且是配置为同步则先按照watcher的id排序
  	}
  	subs[i].update() // 遍历subs的每一个watcher并执行update
  }
}
```

### Watcher

```
class Watcher {
	vm: Component; // 订阅
  expression: string;
  cb: Function;
  id: number; // 唯一标识
  deep: boolean; // 是否深度订阅
  user: boolean;
  lazy: boolean; // ’懒订阅‘，computed中会使用
  sync: boolean;
  dirty: boolean; // ’懒订阅‘相关，判断数据缓存状态
  active: boolean; // 控制当前订阅的激活状态
  deps: Array<Dep>; // 收集订阅的所有发布者（旧的）
  newDeps: Array<Dep>; // 收集订阅的所有发布者（新的）
  depIds: SimpleSet; // 收集订阅的所有发布者id（旧的）
  newDepIds: SimpleSet; // 收集订阅的所有发布者id（新的）
  before: ?Function; // 数据更新前执行的函数，例如$mount是传进来的callHook(vm, 'beforeUpdate')钩子
  getter: Function;
  value: any;
  constructor(vm, expOrFn, cb, options?, isRenderWatcher?) {
  	this.vm = vm
  	if (isRenderWatcher) { // 渲染watcher
      vm._watcher = this
    }
    vm._watchers.push(this) // 存储组件实例的所有的订阅
    this.deep = !!options.deep
    this.user = !!options.user
    this.lazy = !!options.lazy
    this.sync = !!options.sync // 前四个在没有options时默认为false
    this.before = options.before
    this.cb = cb
    this.id = ++uid
    this.active = true
    this.dirty = this.lazy // ’懒订阅‘dirty才有用
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = '' // 非生产环境为expOrFn.toString()
    this.getter = expOrFn // 如果为表达式会解析，例如'a.b.c'解析为a[b[c]]
    this.value = this.lazy ? undefined : this.get() // 不是lazy，首次就会获取值
  }
  get() {
  	pushTarget(this) // 将订阅者target指向自身，push进全局数组内
  	value = this.getter.call(vm, vm) // 调用getter获取新值
  	if (this.deep) {
      traverse(value) // 如果是深度监听，会遍历递归每一个属性，并将其__ob__.dep.id存入set中
    }
    popTarget() // 从全局数组中pop，并将订阅者target指向数组的上一位
    this.cleanupDeps()
    return value
  }
  addDep(dep) { // 添加发布者到发布列表
  	if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
  cleanupDeps() { // 清除订阅
  	dep.removeSub(this) // 遍历deps，如果newDepIds没有该id，通知该发布者移除自身的订阅
  	// 新的dep赋给老的dep，清除新的dep
  	this.depIds = this.newDepIds
  	this.newDepIds.clear()
  	this.deps = this.newDeps
  	this.newDeps.length = 0
  }
  update() { // 数据更新时要执行的
  	if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this) // 按照id排序，顺序执行并会放在nextTick中执行
    }
  }
  run() { // 检测到变化时通知外部，执行回调函数
  	if (this.active) { // 激活状态才会执行，这里是真实的检测到变化时通知外部的地方
  		const value = this.get() // 获取新值
  		if (value !== this.value || isObject(value) || this.deep) {
  			// 新老值相等且新值是真实的引用类型（不是null）且不是深度监听
  			const oldValue = this.value // 获取旧值
  			this.value = value // 赋予新值
  			this.cb.call(this.vm, value, oldValue) // 调用回调函数，例如watch中的handler
  		}
  	}
  }
  evaluate() { // ’懒订阅‘会调用，重新获取value，并标记dirty，数据不变的话下次可以走缓存
  	this.value = this.get()
    this.dirty = false
  }
  depend() {
  	while (i--) { // 遍历发布列表
      this.deps[i].depend() // 通知发布者的（上级）观察者，将该发布者存入自己的发布列表
    }
  }
  teardown() { // 从关联的所有发布者中移除当前订阅
  	if (this.active) {
  		if (!this.vm._isBeingDestroyed) {
  			// 如果组件正在卸载，就不需要移除当前订阅了
  			remove(this.vm._watchers, this)
  		}
  		while (i--) { // 遍历所有订阅的发布者，并从发布者的订阅列表中移除当前订阅
        this.deps[i].removeSub(this)
      }
      this.active = false
  	}
  }
}
```