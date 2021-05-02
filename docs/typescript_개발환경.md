# 1. 타입스크립트를 global로 설치

```
# 방법 1
$ yarn global add typescript
# 방법 2
$ npm install -g typescript
```

# 2. 다음 명령어를 입력하면 `tsconfig.json` 파일이 자동 생성된다.

```
$ tsc --init
```

tsconfig.json 파일에서는 타입스크립트가 컴파일 될 때 필요한 옵션을 지정

명령어를 통해서 생성한 설정파일에 기본적으로 설정되어있는 속성들의 의미

- **target** : 컴파일된 코드가 어떤 환경에서 실행될 지 정의합니다. 예를 들어, 화살표 함수를 사용하고 `target`을 `es5`로 지정했다면 이를 일반 function키워드를 활용한 함수로 컴파일 해줍니다. 그러나, 이를 `es6`로 설정했다면 화살표 함수 그대로 유지합니다.
- **module** : 컴파일된 코드가 어떤 모듈시스템을 사용할지 정의합니다. 이 값을 만약 `common`으로 하면 `export default Sample` 코드는 `exports.default = Sample`로 변환되지만 값을 `es2015`로 하면 `export default Sample`을 그대로 유지합니다.
- **strict** : 모드 타입 체킹 옵션을 활성화합니다.
- **esModuleInterop :** commonjs 모듈 형태로 이뤄진 파일을 es2015 모듈 형태로 불러올 수 있게 해줍니다.
- **outDir** : 컴파일된 파일이 어디에 저장될지 경로를 정합니다. (속성 추가)
- **include** : 어떤 파일을 컴파일할 것인지 정합니다.
- **exclude** : 어떤 파일을 컴파일에서 제외할지 정합니다.

```
{
  "compilerOptions": {
    "target": "ES5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

# 3. 타입스크립트 파일 만들기

프로젝트에 src 디렉터리를 만들고 그 안에 practice.ts 파일을 작성해보세요.

### src/practice.ts

```
const message: string = 'hello world';
console.log(message);
```

- 타입스크립트는 `*.ts` 확장자를 사용

message 값이 선언된 코드를 보시면 `: string` 이라는 코드를 넣었지요? 이는 해당 상수 값이 문자열 이라는 것을 명시해준다.

만약에 해당 값을 숫자로 설정해버리게 된다면 에디터 상에서 오류가 나타나게 된다.

![https://i.imgur.com/ehAqT3S.png](https://i.imgur.com/ehAqT3S.png)

# 4. 컴파일

## 타입스크립트 CLI를 통해 코드를 컴파일

해당 프로젝트의 디렉터리에 위치한 터미널에서 명령 실행

```json
# 방법 1
tsc
# 방법 2
npx tsc
```

그러면 dist/practice.js 경로에 다음과 같이 파일이 생성된다.

```
"use strict";
var message = 'hello world';
console.log(message);
```

- 우리가 ts 파일에서 명시한 값의 타입은 컴파일이 되는 과정에서 모두 사라지게 된다.

여기서 우리는 글로벌로 설치한 타입스크립트 CLI를 통해 코드를 컴파일 했는데 만약 프로젝트 디렉토리 내에서 설치한 typescript 패키지를 사용하여 컴파일하려면 다음과 같이 할 수 있다.

**(사실 일반적으로는 로컬로 설치한 타입스크립트 패키지를 사용해서 컴파일한다.)**

## 프로젝트 내에 설치한 typescript 패키지를 사용하여 컴파일

### 1. 다음 명령어를 사용하여 typescript를 로컬 패키지로 설치

```
# 방법 1
$ yarn add typescript
# 방법 2
$ npm install --save typescript
```

### 2. 그 다음에는 package.json 파일을 열어서 `build` 스크립트를 생성

```json
{
  "name": "ts-practice",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "ts-node": "^8.4.1",
    "typescript": "^3.6.3"
  },
  "scripts": {
    "build": "tsc"
  }
}
```

### 3. 빌드

```json
# 방법 1
yarn build
# 방법 2
npm run build
```