# Frontend

### SASS

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

### dotenv

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

    - window를 로그를 찍어보면 안에 kakao 오브젝트가 있으나 window.kakao만을 로그로 찍어보면 undefined가 찍힘 ..
