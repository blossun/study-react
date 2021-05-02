# 타입스크립트 리액트 프로젝트 시작

## 프로젝트 생성

- 타입스크립트를 사용하는 리액트 프로젝트 생성
- `--typescript` 옵션 : 타입스크립트 설정이 적용된 프로젝트가 생성

프로젝트 디렉토리 생성 후, 다음과 같이 template을 typescript로 지정

```
$ npx create-react-app . --template typescript
```

## 리액트 컴포넌트 타입스크립트로 작성

### function 키워드 방식

```tsx
src/Greetings.tsx
import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
};

function Greetings({ name, mark }: GreetingsProps) {
  return (
    <div>
      Hello, {name} {mark}
    </div>
  );
}

Greetings.defaultProps = {
  mark: '!'
};

export default Greetings;
```

### 화살표 방식

```tsx
import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
};

const Greetings = ({ name, mark }: GreetingsProps) => (
  <div>
    Hello, {name} {mark}
  </div>
);

Greetings.defaultProps = {
  mark: '!'
};

export default Greetings;
```

## props 사용

- React.FC를 쓰면서 defaultProps 를 사용

    ```tsx
    import React from 'react';

    type GreetingsProps = {
      name: string;
      mark: string;
    };

    // props를 받아올 때, default값을 설정해야 한다.
    const Greetings: React.FC<GreetingsProps> = ({ name, mark = '!' }) => (
      <div>
        Hello, {name} {mark}
      </div>
    );

    // 결국 무의미해진 defaultProps? //이것만 써서는 적용이 안된다.
    Greetings.defaultProps = {
      mark: '!' 
    };

    export default Greetings;
    ```

- React.FC를 쓰지 않으면 `defaultProps` 를 선언하는 것만으로 default 값을 줄 수 있다.

    ```tsx
    Greetings.defaultProps = {
      mark: '!' 
    };
    ```

- 컴포넌트에 생략 할 수 있는 props 설정하기

    만약에 컴포넌트의 props 중에서 생략해도 되는 값이 있다면 `?` 문자를 사용

- 컴포넌트에서 함수 타입의 props 받아오기

src/Greetings.tsx

```tsx
src/Greetings.tsx
import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
  optional?: string;
  onClick: (name: string) => void; // 아무것도 리턴하지 않는다는 함수를 의미합니다.
};

function Greetings({ name, mark, optional, onClick }: GreetingsProps) {
  const handleClick = () => onClick(name);
  return (
    <div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
      <div>
        <button onClick={handleClick}>Click Me</button>
      </div>
    </div>
  );
}

Greetings.defaultProps = {
  mark: '!'
};

export default Greetings;
```

App 에서 해당 컴포넌트를 사용해야 할 때 다음과 같이 작성해야겠지요.

src/App.js

```tsx
import React from 'react';
import Greetings from './Greetings';

const App: React.FC = () => {
  const onClick = (name: string) => {
    console.log(`${name} says hello`);
  };
	// Greetings 컴포넌트에 props 넘겨주기
	//name과 onClick(함수)은 필수로 넘겨줘야하고, mark는 default값이 지정되어 있고, optional값은 줘도되고 안줘도 되는 욥션값이다.
  return <Greetings name="Hello" onClick={onClick} />;
};

export default App;
```

---

[리액트 컴포넌트 타입스크립트로 작성하기](https://velog.io/@velopert/create-typescript-react-component)