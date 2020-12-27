# Hey, Suwon

###### 수원시 날씨 및 정보

- [Result](..#result)
- [Develop](..#develop)
- [Setting](..#setting)
- [Issue](..#issue)
- [lookback](https://github.com/hyesungoh/Hey_Suwon/tree/master/frontend)

## Result

#### Navigation, route with animation

![router](https://user-images.githubusercontent.com/26461307/103168936-dc0d4800-487a-11eb-9417-fa68f3afbd0d.gif)

#### Scroll to select element, info card with map

![tour](https://user-images.githubusercontent.com/26461307/103168935-dadc1b00-487a-11eb-91c1-a11964371ef5.gif)

![resta](https://user-images.githubusercontent.com/26461307/103168934-d879c100-487a-11eb-8ad6-791d45ba2163.gif)

## Develop

#### SASS

-   변수 저장 파일을 만들어 사용

```scss
// src/Variables.scc
$base_white_color: rgba(245, 245, 245, 1);
$base_shadow_setting: 0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
$top_bottom_padding: 0px 5%;

// src/components/Navigation/Navigation.scss
@import "../../Variables";

...
text-shadow: $base_shadow_setting;
```

#### dotenv

```terminal
npm i --save dotenv
npm i --save @types/dotenv
```

-   .env에 작성 시

```terminal
REACT_APP_NAME=123123123
```

-   HTML 사용 시

```html
"%REACT_APP_KAKAO_MAP_KEY%"
```

-   JSX, TSX 사용 시

```tsx
console.log(process.env.REACT_APP_KAKAO_MAP_KEY)Î
```

#### Google Map

```terminal
npm install @googlemaps/js-api-loader
npm i -D @types/googlemaps
```

```json
// tsconfig.json
{
    "compilerOptions": {
        "types": ["googlemaps"]
    }
}
```

-   app.tsx에 작성하여 반복 작성을 막음

```tsx
export const useGoogleLoader = () => {
    const loader = new Loader({
        apiKey: config.GOOGLE_MAP_API_KEY,
        mapIds: config.GOOLGE_MAP_STYLE_KEY,
    });

    return loader;
};
```

-   GuideCard.tsx에서 불러와 사용함 <i>app.tsx에서 load하여 한 번만 load하여 사용할 수 있지 않을까?</i>

```tsx
const loader = useGoogleLoader();
const mapArea = useRef<any>(null);

loader.load().then(() => {
    const map = new google.maps.Map(mapArea.current as HTMLElement, {
        center: coordi,
        zoom: 15,
    });
    const marker = new google.maps.Marker({
        position: coordi,
        map: map,
    });
});
```

#### Google Geocode

-   app.tsx에 작성하여 반복 작성을 막음

```tsx
export const useGeocode = (addr: string): any => {
    Geocode.setApiKey(config.GOOGLE_MAP_API_KEY);
    Geocode.setLanguage("kr");
    Geocode.enableDebug();

    const data = Geocode.fromAddress(addr).then(
        (response) => {
            return response;
        },
        (error) => {
            return error;
        }
    );
    return data;
};
```

-   mount시 주소와 이름을 이용하여 좌표값 setState
-   useEffect의 dependency에 state값을 넣어 재호출하여 지도를 그려줌

```tsx
const [coordi, setCoordi] = useState<any>();
const coordinate: any = useGeocode(address + name);

useEffect(() => {
    if (coordi === undefined) {
        coordinate.then((res: any) => {
            const { lat, lng }: any = res.results[0].geometry.location;
            setCoordi({ lat, lng });
        });
    } else {
        // google map
    }
}, [coordi]);
```

## Setting

#### TypeScript

```terminal
npx create-react-app frontend --template typescript
```

- npm install

```terminal
// 둘 다
npm i react-router-dom
npm i @types/react-router-dom
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

#### Kakao Map api

-   직접 Kakao map api를 index.html에 작성하여 사용할 시

```terminal
Error: A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.
```

-   App.tsx에서 head에 script 태그를 추가할 시

```terminal
ypeError: Cannot read property 'maps' of undefined
```

-   지금까지 시도한 것

    -   script 태그를 html에 추가 / useEffect를 이용하여 추가
    -   전역으로 인터페이스 Window에 kakao를 any 타입으로 명시

    ```tsx
    declare global {
        interface Window {
            kakao: any;
        }
    }
    ```

    -   window를 로그를 찍어보면 안에 kakao 오브젝트가 있으나 window.kakao만을 로그로 찍어보면 undefined가 찍힘 ..

#### kakao > google

-   kakao api script 태그를 index.html에 작성하여 사용하면 해당 스크립트가 loaded 확인 > 전역 선언 > 후에도 kakao안에 메소드가 없다는 오류에 봉착

-   구글링하여 나온 react + typescript의 kakao api 사용예를 모두 따라해도 해결되지 않음

-   Google api는 typescript 예제도 잘 작성 돼 있으며 npm package 또한 존재함 <i> kakao map api 또한 package가 존재하지만 공식적으로 만든 것은 없어보임 </i>

-   그래서 Google api를 사용함