## 引入Vue时做了那些事

```
import Vue from 'vue'
```

### 创建Vue构造函数

```
Vue(options) {
  非生产环境下会判断Vue是否通过new调用（this instance Vue）
  _init(options)
}
```



### Vue原型添加_init函数

```
_init(options) {
	if (options && options._isComponent) {
		// 内部组件优化，不进行动态合并，直接赋值options
    initInternalComponent(vm, options)
  } else {
  	// 动态合并传入的options与Vue默认的options（vm.constructor === Vue）
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor), // 递归父类所有options
      options || {},
      vm
    )
  }
  initLifecycle(vm) {
  	// 当前组件不是抽象组件，会递归找到第一个非抽象的parent，并添加自身到其$children中
  	if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent
      }
      parent.$children.push(vm)
    }
  	// 初始化实例数据
  	vm.$parent = parent
  	vm.$root = parent.$root || vm
  	vm.$children = [] \ vm.$refs = {} \ vm._watcher = vm._inactive = null
  	vm._directInactive = vm._isMounted = vm._isDestroyed = vm._isBeingDestroyed = false
  }
  initEvents(vm) {
  	vm._events = Object.create(null) // 创建纯净的对象没有原型
  	vm._hasHookEvent = false
  	// 将parent的listeners通过$on、$off、$once挂载至vm
  	updateComponentListeners(vm, vm.$options._parentListeners)
  }
  initRender(vm) {
  	// 遍历当前实例的children，将所有插槽保存到$slots中，例如{default:[..],footer:[..]}
  	vm.$slots = resolveSlots(vm.$options._renderChildren, vm.$options._parentVnode.context)
  	// 浅响应式添加$attrs、$listeners
  	defineReactive(vm, '$attrs', parentData.attrs || {}, null, true)
    defineReactive(vm, '$listeners', options._parentListeners || {}, null, true)
  }
  callHook(vm, 'beforeCreate') // 调用beforeCreate钩子
  initInjections(vm) {
    // 确保prop及data前能访问到inject，所以inject要在prop\data之前
  	// 遍历当前vm的inject，并递归$parent，找inject对应的provide值，没有则取inject的default
  	const result = resolveInject(vm.$options.inject, vm) {
  		while (source) {
        ...
        source = source.$parent
      }
      if (!source) {
        if ('default' in inject[key]) {
        	...
        }
      }
  	}
  	if (result) {
  		toggleObserving(false) // 不会实例化Observe，其实是在控制单向数据流
  		Object.keys(result).forEach(key => {
  			defineReactive(vm, key, result[key])
  		})
  		toggleObserving(true) // 恢复状态，因为这里是一个全局状态
  	}
  }
  // 初始化prop\methods\data\computed\watch
  initState(vm) {
  	vm._watchers = [] // 收集组件需要的所有watcher
  	// 初始化props
  	initProps(vm, opts.props) {
      if (!isRoot) {
        toggleObserving(false) // 非根实例会控制单向数据流，根实例的prop会双向绑定
      }
  		for (const key in propsOptions) {
  			// 获取prop的值，如果没有传入key，其他类型设置为default，函数则执行
  			const value = validateProp(key, propsOptions, propsData, vm) {
  				let value = propsData[key]
  				// boolean类型会设置为default或false，如果是数组形式，string类型在boolean类型前，传入的value为空字符串，会设为true
  				if (booleanIndex > -1) {
            if (absent && !hasOwn(prop, 'default')) {
              value = false
            } else if (value === '' || value === hyphenate(key)) {
              if (stringIndex < 0 || booleanIndex < stringIndex) {
                value = true
              }
            }
          }
          // 新的value需要observe，由于是新的拷贝所以可以对当前实例双向绑定
          toggleObserving(true)
          observe(value)
          toggleObserving(prevShouldObserve)
          // 非生产环境下会进行prop的required及validator校验
          assertProp(prop, key, value, vm, absent)
  			}
        defineReactive(props, key, value) // 这里的prop为单向数据流
  		}
      toggleObserving(true) // 恢复全局的状态
  	}
    // 初始化methods
    initMethods(vm, opts.methods) {
      if (env !== 'production') { // 非生产环境校验
        if (typeof methods[key] !== 'function') // 是否为函数
        if (props && hasOwn(props, key)) // 是否与props中key重复
        if ((key in vm) && isReserved(key)) // 是否与vm与内置key重复
      }
      vm[key] = bind(methods[key], vm) // 添加methods
    }
    // 初始化data
    initData(vm) {
      // 非生产环境校验与props、methods、vm内置key重复
      observe(vm.$options.data, true)
    }
    // 初始化computed
    initComputed(vm, opts.computed) {
      for (const key in computed) {
        // 非生产环境下校验computed是否有get
        vm._computedWatchers = new Watcher( // computed有缓存存在，都是lazy watcher
          vm,
          getter, // computed中的get函数
          noop, // 空函数
          { lazy: true }
        )
        if (!(key in vm)) {
          defineComputed(vm, key, computed[key]) {
            // 取出get、set，非生产环境下包含set会给出警告
            sharedPropertyDefinition.get = shouldCache ? 
              createComputedGetter(key) {
            		const watcher = this._computedWatchers[key]
                if (watcher.dirty) {
                  watcher.evaluate() // 获取值且dirty = false
                }
                if (Dep.target) { // 如果上一步执行了，这里target就指向了当前watcher
                  watcher.depend() // 通知watcher依赖的depend及订阅了该depend的watcher更新
                }
            		return watcher.value
          		} : 
              createGetterInvoker(userDef.get) {
                // 如果在服务端不使用缓存，每次都会重新执行函数
                return function computedGetter () {
                  return fn.call(this, this)
                }
              }
          }
        	// 非生产环境key已经在vm存在给出警告
        }
      }
    }
    // 初始化Watch
    initWatch(vm, opts.watch) {
      for (const key in watch) {
        // 遍历watch调用$watch，如果handler是数组，遍历handler执行$watch
        vm.$watch(expOrFn, handler, options)
      }
    }
  }
  // 初始化provide，因为provide可能会用到prop\data中的数据，所以在state之后
  initProvide(vm) {
    // provide是函数则执行
    vm._provided = provide || provide.call(vm)
  }
  callHook(vm, 'created') // 调用created钩子函数
  if (vm.$options.el) {
    // 进入挂载dom阶段
    vm.$mount(vm.$options.el)
  }
}
```



### 为Vue.prototype添加全局状态api（stateMixin）

```
stateMixin(Vue) {
	// 给Vue原型添加$data\$props，并设置get时返回this._data/this._props
	Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)
  Vue.prototype.$set = set(target, key, val) {
  	// 非生产环境判断target类型，不是对象或数组给出警告
  	if(Array.isArray(target)) {
  		target.splice(key, 1, val) // 数组就通过劫持的splice方法触发响应式
  		return
  	}
  	// 如果key属性不可枚举，或者在Object原型上，不会响应式
  	if (key in target && !(key in Object.prototype))
  	// 不会重复触发响应式
  	***if (target._isVue || (target.__ob__ && __ob__.vmCount))
  	defineReactive(ob.value, key, val)
  	ob.dep.notify() // 重新收集依赖
  }
  Vue.prototype.$delete = del(target, key) {
  	// 非生产环境判断target类型，不是对象或数组给出警告
  	if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.splice(key, 1)
      return
    }
    delete target[key]
    ob.dep.notify() // 同set
  }
  Vue.prototype.$watch = function (expOrFn, cb, options) {
    // 创建watcher
  	const watcher = new Watcher(vm, expOrFn, cb, options)
  	if (options.immediate) {
      pushTarget() // 将Dep.target指向当前watcher
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info) // 执行cb
      popTarget() // 移除target
    }
    return function unwatchFn () {
      watcher.teardown() // 移除当前watcher的全部订阅
    }
  }
}
```



### 为Vue.prototype添加事件api（eventsMixin）

```
eventsMixin(Vue) {
	Vue.prototype.$on = function (event, fn) {
		if (Array.isArray(event)) {
			// 遍历调用$on
		} else {
			// 收集event的handler
			vm._events[event].push(fn)
			// 如果是hook:开头，设置hook标识
			if (hookRE.test(event)) {
        vm._hasHookEvent = true
      }
		}
	}
	Vue.prototype.$once = function (event, fn) {
		function on () {
			// 自定义on，触发一次后调用$off
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    vm.$on(event, on)
	}
	Vue.prototype.$off = function (event?, fn?) {
		// 没有参数，清除全部订阅
		if (!arguments.length) {
      vm._events = Object.create(null)
      return vm
    }
    // event是数组遍历调用$off
    // 取出存的订阅
    const cbs = vm._events[event]
    // fn不存在清除关于该event的全部函数
    if (!fn) {
      vm._events[event] = null
      return vm
    }
    // 遍历vm._events[event]，清除特定的fn，需要保证两个fn引用相同
    return vm
	}
	Vue.prototype.$emit = function (event) {
		// 非生产环境，校验大小写的event是否重复
		let cbs = vm._events[event]
		// 遍历cbs，执行存储的fn
		for (let i = 0, l = cbs.length; i < l; i++) {
      invokeWithErrorHandling(cbs[i], vm, args, vm, info)
    }
   	return vm
	}
}
```



### 为Vue.prototype添加生命周期相关api（lifecycleMixin）

```
lifecycleMixin(Vue) {
	Vue.prototype._update = function (vnode, hydrating?) {
		if (!prevVnode) {
      // 更新前_vnode不存在，传入removeOnly为false,后面的patch会使用
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false)
    } else {
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    // 重设$el，这里的$el是真实的dom
    vm.$parent.$el = vm.$el
	}
	Vue.prototype.$forceUpdate = function () {
		vm._watcher.update() // 通知观察者更新，这里的watcher是vm实例的watcher，不是数据等的watcher
	}
	Vue.prototype.$destroy = function () {
	 	// 做个标记防止重复触发
		if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy') // 调用beforeDestroy钩子
    vm._isBeingDestroyed = true
    remove(parent.$children, vm) // 从parent.$children中移除当前实例
    vm._watcher.teardown() // 取消对当前实例的观察
    // 遍历vm._watchers，取消当前实例包含的data\watch等的观察
    while (i--) {
      vm._watchers[i].teardown()
    }
    vm._data.__ob__.vmCount--
    vm._isDestroyed = true
    vm.__patch__(vm._vnode, null) // 修改dom
    callHook(vm, 'destroyed') // 调用destroyed钩子
    vm.$off()
	}
}
```



### 为Vue.prototype添加渲染相关api（renderMixin）

```
renderMixin(Vue) {
	installRenderHelpers(Vue.prototype) // 给Vue原型设置工具函数，我们也可以用哦
	Vue.prototype.$nextTick = function (fn) {
		nextTick(fn, this) {
			// 有promise使用promise.then
			// 没有使用MutationObserver，创建一个文本节点，观察该节点，通过改变文本内容触发回调
			// 再没有使用setImmediate
			// 都没有使用setTimeout
		}
	}
	Vue.prototype._render = function () {
		// 解析插槽调用render函数
	}
}
```



### 注册全局api（initGlobalAPI）

```
initGlobalAPI(Vue) {
	Object.defineProperty(Vue, 'config', configDef) // 设置默认的配置
	Vue.util = {
    warn,
    // 后三个函数会单独写
    extend,
    mergeOptions,
    defineReactive
  }
  // 同之前的$set\$delete\$nextTick
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick
  Vue.observable = () => {
  	observe(obj) // 让一个对象变成响应式的	
  	return
  }
  // 设置components\directives\filters为{}
  Vue.options[type + 's'] = Object.create(null)
  // 将keep-alive合并到全局组件
  extend(Vue.options.components, builtInComponents)
  initUse(Vue) {
  	// 调用插件
  	if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
  }
  // 为Vue添加mixin函数
  Vue.mixin = function (mixin) {
    // 动态合并mixin
  	this.options = mergeOptions(this.options, mixin)
  	return this
  }
  // 为Vue添加extend函数
  Vue.extend = function (extendsOption) {
  	// 有缓存使用缓存的组件
  	if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }
    // 使用options创建一个新的vue组件
  	const Sub = function VueComponent (options) {
      this._init(options)
    }
    // 动态合并，原理同mixin
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    // 缓存创建的组件
    cachedCtors[SuperId] = Sub
    return Sub
  }
  initAssetRegisters(Vue) {
  	// 注册全局的components\directives\filters
  	Vue[type] = function (id, definition) {
  		this.options[type + 's'][id] = definition
  	}
   }
}
```



### 添加ssr、函数式组件、版本属性、Vue.config添加配置函数

```
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    return this.$vnode && this.$vnode.ssrContext
  }
})

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})
Vue.version = '__VERSION__'
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement
```



### 注册全局指令及组件

```
// 注册v-model及v-show指令
extend(Vue.options.directives, platformDirectives)
// 注册transition、transition-group组件
extend(Vue.options.components, platformComponents)
```



### 添加挂载阶段api

```
Vue.prototype.__patch__ = inBrowser ? patch : noop
Vue.prototype.$mount = function(el, hydrating) {
	// 通过document.querySelector获取节点，只能获取到第一个，所以只有一个app根会被vue处理
	el = el && inBrowser ? query(el) : undefined
	mountComponent(this, el, hydrating) {
		vm.$el = el // 挂载$el，真实dom节点
		if (!vm.$options.render) { // 没提供render会设置render函数为创建空的VNode，标记该VNode为注释
			vm.$options.render = createEmptyVNode
		}
		callHook(vm, 'beforeMount') // 调用beforeMount
		let updateComponent = () => { // 定义回调函数，在watcher.get时会被调用
      vm._update(vm._render(), hydrating)
    }
    new Watcher(vm, updateComponent, noop, {
    	before() {
    		if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'beforeUpdate')
        }
    	}
    }, true)
    hydrating = false // 标记
    if (vm.$vnode == null) { // $vnode在挂载完成会清空
      vm._isMounted = true
      callHook(vm, 'mounted') // 调用mounted钩子
    }
    return vm
	}
}
```



## 核心函数详解

### mergeOptions

````
mergeOptions(parent, child, vm?) {
	// 非生产环境下校验child的components的name是否与内置组件冲突
	// 通用化处理props\inject\directives
	// 例如：props可以传数组或对象，统一为对象形式
	normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)
  // 如果child有extends、mixins递归调用mergeOptions，注意extends在mixin前，说明mixin会优先与extends
  if (child.extends) {}
  if (child.mixins) {}
  // 先合并parent，后合并child，key相同，child优先
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  return options
}
````



### observe

```
observe(value, asRootData?) {
	// 这里就是递归结束的条件
	if (!isObject(value) || value instanceof VNode) {
    return
  }
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
  	ob = value.__ob__ // 说明已经被观察了
  } else if (
  	shouldObserve && // 就是之前控制单向数据流的toggleObserving(false)函数所改变的状态
  	!isServerRendering() && // 不在服务端渲染
  	(Array.isArray(value) || isPlainObject(value)) && // 数组、对象格式校验
  	Object.isExtensible(value) && // 是否可扩展，冻结对象（Object.freeze）密封对象（Object.seal）都是不可扩展
  	!value._isVue // ？？？？
  ) {
  	ob = new Observer(value)
  }
  ob.vmCount++
  return ob
}
```



### Observer

```
class Observer {
	value: any;
	dep: Dep; // 每一个观察者分配一个发布者
	vmCount: number;
	constructor (value: any) {
		this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this) // 添加响应式标识，下次observe不会重复
    if (Array.isArray(value)) {
    	// 使用自定义的数组7个函数覆盖数组原型上的函数
    	copyAugment(value, arrayMethods, arrayKeys) {
    		Object.defineProperty(arrayMethods, method, function(...args) {
    			switch (method) {
    				// 如果是push或unshift，定义插入的数据inserted
    				inserted = args
    				// 如果是splice，第三个参数为新插入的数据inserted
    				inserted = args.slice(2)
    			}
    			this.__ob__.observeArray(inserted) // 观察新插入的数据
    			this.__ob__.dep.notify() // 通知发布者收集依赖
    		})
    	}
    } else {
    	this.walk(value)
    }
	}
	walk (obj: Object) {
		// 遍历obj，设置响应式
    defineReactive(obj, keys[i])
  }
  observeArray (items: Array<any>) {
  	// 遍历数组，对每一个item进行observe，如果item是对象，巧妙的递归
    observe(items[i])
  }
}
```



### defineReactive

```
defineReactive(obj, key, val, customSetter, shallow) {
	const dep = new Dep() // 创建新的发布者，也就是说一个obj又有一个发布者，每一个key也拥有一个自己的发布者
	// 获取key原本的描述符，主要是get、set、configurable
	const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) { // 不可配置的key不需要响应式
    return
  }
  val = obj[key] // 获取value
  let childOb = !shallow && observe(val) // 利用了js的断言，如果为浅监听shallow=true，则不会执行&&操作符后面的函数，如果不是，调用observe(val)巧妙地递归
  // 最熟悉的环节来了，get中数据劫持，set中发布消息
  Object.defineProperty(obj, key, {
  	get: function () {
  		const value = getter ? getter.call(obj) : val // 执行原本的get
  		if (Dep.target) { // 判断发布者是否有订阅者订阅
        dep.depend() // 收集依赖
        if (childOb) {} // 有childOb则递归让child的订阅者去收集依赖，childOb.dep.depend()
      }
      return value
  	}
  	set: function (newVal) {
  		const value = getter ? getter.call(obj) : val // 获取原来的值
  		// 判断新值与旧值是否相同，后面的判断是在判断NaN的情况，vue认为前后都是NaN值不变
  		if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      if (env !== 'production' && customSetter) // 非生产环境存在customSetter则调用customSetter
      if (getter && !setter) return // 没有setter直接返回
      setter.call(obj, newVal) // 调用原本的set
      childOb = !shallow && observe(newVal) // 不是浅监听，递归下去，巧妙就完了
      dep.notify() 通知该key的发布者，更新了！
  	}
  })
}
```



### sameVnode

```
sameVnode(a, b) {
	a的key与b的key全等 &&
	a的asyncFactory与b的asyncFactory全等 &&
	（a的tag与b的tag全等 && a与b的isComment全等 && a与b的data都不是undefined或null && 如果是input标签判断type类型是否相等 || a的isAsyncPlaceholder为true && b.asyncFactory.error是undefined或null
}
```



### __patch__

```
__patch__ = createPatchFunction({ nodeOps, modules }) { // 工厂函数
	// nodeOps为一些dom的操作
	// modules为一些html标记的属性在不同钩子阶段要执行的函数
	const hooks = ['create', 'activate', 'update', 'remove', 'destroy']
	const cbs = {} // 保存钩子函数要执行的队列
	for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }
  // 定义一堆工具函数
  return function patch(oldVnode, vnode, hydrating, removeOnly) {
  	if (isUndef(vnode)) {
  		// 新的vnode不存在，oldvnode有则调用cbs中所有Destroy函数，有children则递归
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }
    // 到这里说明新的vnode一定存在
    if (isUndef(oldVnode)) {
    	// 老的vnode不存在直接新增
    	createElm(vnode, insertedVnodeQueue)
    } else {
    	if (!isDef(oldVnode.nodeType) && sameVnode(oldVnode, vnode)) {
    		// 老vnode没有类型且新老vnode为相同vnode
    		patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
    	} else {
    		// 到这里说明vnode已经变了
    		if (isRealElement) { // 老vnode有类型
    			if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) { // SSR标记
            oldVnode.removeAttribute(SSR_ATTR)
            hydrating = true
          }
          if (isTrue(hydrating)) { // ???
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true)
              return oldVnode
            }
            oldVnode = emptyNodeAt(oldVnode) // 使用oldVnode的tag创建一个新的空vnode
          }
    		}
    		// 创建新节点
    		createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm))
    		if (isDef(vnode.parent)) {
          let ancestor = vnode.parent
          const patchable = isPatchable(vnode)
          while (ancestor) { // 递归其所有parent
            for (let i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor) // 调用所有destroy从parent
            }
            ancestor.elm = vnode.elm
            if (patchable) {
              for (let i = 0; i < cbs.create.length; ++i) {
                cbs.create[i](emptyNode, ancestor)
              }
              const insert = ancestor.data.hook.insert
              if (insert.merged) {
                for (let i = 1; i < insert.fns.length; i++) {
                  insert.fns[i]()
                }
              }
            } else {
              registerRef(ancestor)
            }
            ancestor = ancestor.parent
          }
        }
        // 销毁oldVNode
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode)
        }
    	}
    }
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }
}
```



### patchVnode

```
patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
	if (oldVnode === vnode) { // 执行patch时已经使用sameVnode比较过所以这里只需要确定引用是否相同即可
    return
  }
  if (isTrue(oldVnode.isAsyncPlaceholder)) { // ???
    if (isDef(vnode.asyncFactory.resolved)) {
      hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
    } else {
      vnode.isAsyncPlaceholder = true
    }
    return
  }
  if (isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
  	// 静态节点判断
    vnode.componentInstance = oldVnode.componentInstance
    return
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
  	if (env !== 'production' && !config.async) {
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
  	if (isRenderWatcher) { // 渲染watcher，每一个实例只有一个渲染watcher，负责template内的更新
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
  cleanupDeps() { // 更新订阅，因为template更新后可能有的数据不需要被监听，比如v-if，所以需要从旧的deps中清除掉
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
  depend() { // ???
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