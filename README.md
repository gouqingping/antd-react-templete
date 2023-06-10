# README

文因前端开发框架 - React

-   <img style="width:16px;height:18px" src="https://react.nodejs.cn/public/favicon.ico"> + vite2 + TypeScript4.6.3
-   Jenkins 自动化集成
-   Docker 前端自动化部署
-   Postcss + less + style var 样式配置统一管理
-   根据配置文件生成多环境、页面配置，打包后自动生成配置文件 json

## 初始化

```node
npm install
// or
yarn install
```

## 启动

```node
npm run dev
// or
yarn dev
```

## 打包

```node
npm run build
// or
yarn build
```

## 单元测试

```node
npm run test
// or
yarn test
```

## mac for husky
husky 的 hook 在 mac 上不生效项目目录执行一下命令
```node
chmod 777 .husky/*
```

## 开发规范

根据 `.eslintrc.js` 配置为准


## 环境配置

[ambiences]: https://www.npmjs.com/package/ambiences

环境配置采用 [ambiences][ambiences] 多环境 webpck\vite plugins 配置生成当前环境
配置（解决多余 IP 暴露引起的安全性问题）。

在打包配置文件(`vite.config.js`) 内 `plugins` 添加
`ambiences(build_file_type, build_file_name)`;

### .ambiences 配置示例

```
[[dev]]
[api]
requestURL = ""
[config]
systemName = "ONLYOFFICE"
logo = "/logo.svg"
primaryColor = "#111"
loginBackground = "/loginBackground.jpg"
[theme]
primaryColor = "#111"
borderRadius = 20

[[pro]]
[api]
requestURL = ""
[config]
systemName = "ONLYOFFICE"
logo = "/logo.svg"
loginBackground = "/loginBackground.jpg"
[theme]
primaryColor = "#111"
borderRadius = 20
```

### package.json 示例

```json
{
	"scripts": {
		"dev": "vite --host --mode NODE_ENV=dev",
		"pro": "vite --host --mode NODE_ENV=production",
		"build": "vue-tsc --noEmit && vite build --mode NODE_ENV=production",
		"build:pro": "vite build --mode NODE_ENV=production"
	}
}
```


## 样式配置

`src/styles/config.module.less` 自定义全局 var root 配置文件,  `export` 用作输出到 `(j|t)s(x)` 文件作为配置参数。

```less
@headerHeight: 62;
@headerHeightActual: 88;
@operationHeight: 80;
@tableHeight: 48;
@tableFooter: 56;
@defaultPadding: 16;


@arr : @headerHeight,
@headerHeightActual,
@operationHeight,
@tableHeight,
@tableFooter,
@defaultPadding;

@keys : --header-height,
--header-height-actual,
--operation-height,
--table-height,
--table-footer,
--default-padding;

@len : length(@arr);

:root {
    .root(@index) when (@index <=@len) {
        @name : extract(@keys, @index);
        @value : (extract(@arr, @index) * 1px);
        @{name}: @value;
        .root(@index + 1);
    }

    .root(1);
}

:export {
    headerHeight: @headerHeight;
    headerHeightActual: @headerHeightActual;
    operationHeight: @operationHeight;
    tableHeight: @tableHeight;
    tableFooter: @tableFooter;
    defaultPadding: @defaultPadding;
}
```
[ant-design 全局样式配置文件]:https://ant.design/components/config-provider-cn
`src/ConfigProvider.tsx` [ant-design 全局样式配置文件]


## 文件

```
|--- .husky                pre-commit 检测目录
|--- .vscode               vscode编辑器统一配置目录
|--- config                打包配置目录
|--- dist                  打包目录
|--- nginx                 nginx配置目录
|--- node_modules          依赖扩展目录
|--- public                静态资源目录
|--- src                   工程目录
    |--- components        自定义公共组件目录
    |--- hooks             公共hooks目录
    |--- layout            公共layout布局目录
    |--- mock              自定义模拟数据目录
    |--- pages             页面目录
    |--- routes            路由配置目录
    |--- services          服请求配置目录
    |--- store             状态器配置目录
    |--- styles            样式配置目录
    |--- types             公共类型配置目录
    |--- utils             utils配置目录
    |--- App.tsx           引导配置页面
    |--- main.tsx          打包输出页面
    |--- typings.d.ts      全局类型声明
|--- .ambiences            环境、页面配置文件
|--- Dockerfile            docker配置文件
|--- Jenkinsfile.groovy    Jenkins配置文件
|--- tsconfig.json         ts配置文件
|--- vite.config.js        打包配置文件
|--- ……                    
|--- index.html
```

## components

`src/components` 自定义公共组件。每一个组件命名采用大驼峰命名，并且一个组件一个
单独文件夹，每个文件夹都必须包含出口文件和样式文件。以`Message`为例如：

```
|--- Message 组件名称命名
    |--- index.less     组件样式文件
    |--- type.d.ts      组件类型文件
    |--- hooks.ts       处理输出文件
    |--- index.tsx      输出文件
```

## Router

`src/routes` 系统路由配置

```tsx
import PageLoading from '@/components/PageLoading';
import { Route } from '@ant-design/pro-layout/es/typing';
import React, { Suspense } from 'react';
import { ApartmentOutlined } from '@ant-design/icons';
const Index = React.lazy(() => import('@/pages/Index'));
export const authorizeRouters: Route[] = [
  {
    path: '/home',
    name: '首页',
    icon: <ApartmentOutlined />,
    element: (
      <Suspense fallback={<PageLoading />}>
        <Index />
      </Suspense>
    ),
  },
];

```

## Store


[recoiljs]:https://recoiljs.org/docs/introduction/installation

`src/store` 系统状态存储机配置, 详情配置 [recoiljs]

```tsx
import { useUserAction } from '@/services/user.action';
import { atom, DefaultValue, selector } from 'recoil';
import { AUTH_STORAGE_KEY } from '@/utils/enum';

const localStorageEffect =
  (key: string) =>
    ({ setSelf, onSet }: {setSelf:(value:string)=>void,onSet:(value:string)=>void}) => {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        try {
          setSelf(JSON.parse(savedValue));
        } catch {
          setSelf(savedValue);
        }
      }

      onSet((newValue: any) => {
        if (newValue instanceof DefaultValue) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
      });
    };

export const authToken = atom<string | DefaultValue>({
  key: 'token',
  default: '',
  effects_UNSTABLE: [localStorageEffect('token')],
});

```
