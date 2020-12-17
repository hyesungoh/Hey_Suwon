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
