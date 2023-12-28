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