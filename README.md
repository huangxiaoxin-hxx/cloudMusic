# 启动

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# 规范说明

## store 设定

为了便于退出后清除状态, store 定义的 state 都设置默认值为 null, 通过 getters 来获取值

```js
{
    state: {
        foo: null, // 初始变量都
        bar: null
    },
    getters: {
        foo(state) {
            return state.foo || {}; // 通过getters来计算默认值
        },
        bar(state) {
            return state.bar || {}; // 通过getters来计算默认值, 通过mapGetters来获取值
        }
    }
}
```

## Image 组件

```
<image mode="widthFix" src="" /> 不要</image>结尾 (vscode eslint识别不了)
```
