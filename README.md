# Hey, Suwon

###### 수원시 날씨 및 정보

## Setting

#### TypeScript

```terminal
npx create-react-app frontend --template typescript
```

#### SASS

-   config/webpack.config.js 수정을 위해

```terminal
yarn eject
```

-   수정 후 실행 시 오류 방지를 위해 node_modules를 삭제 후 재설치

```terminal
rm -rf node_modules
yarn
```

```terminal
yarn add node-sass sass-loader
```

-   webpack.config.js 수정

```js
// line 60
const cssRegex = /\.(css|scss)$/;
const cssModuleRegex = /\.module\.(css|scss)$/;
s;
```

```js
// line 140
{
    loader: require.resolve("sass-loader"),
    options: {
        sourceMap: true
    }
},
```

## Issue

#### npm install
```terminal
// 둘 다
npm i react-router-dom
npm i --save @types/react-router-dom
```