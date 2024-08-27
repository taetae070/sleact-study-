import { Dispatch, SetStateAction, useCallback, useState, ChangeEvent } from 'react';

/*
SetStateAction: 상태를 변경할 때 사용할 수 있는 "값"이나 "계산 방식" 
Dispatch: 그 값을 받아서 상태를 실제로 변경하는 함수
ChangeEvent: 값을 입력할 때 발생하는 이벤트를 나타내는 객체
*/

/*
type: 주로 기본타입(원시값, 유니언, 튜플)을 정의할 때 사용  *튜플: "고정된 길이"를 가지며 각 요소의 타입이 다를 수 있는 배열
interface: 주로 객체구조를 정의할 때 사용

T(제네릭): 훅이 어떤 타입의 데이터를 처리할지 결정하는데 사용된다.
제네릭의 타입은 훅을 호출할 때 initialData의 타입에 의해 결정된다.
*/


type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];
/* 매개변수 e는 ChangeEvent<HTMLInputElement> 타입을 가진다.
Dispatch<SetStateAction<T> : useState<T>와 동일한 역할
void: 함수가 아무것도 반환하지 않을 때 사용

void를 사용하는 이유: 
이벤트 핸들러 함수는 특정 작업을 수행하지만, 작업 결과를 호출한 쪽에 "반환"하지 않는다. 
이 함수는 "반환값"을 제공하는 게 목적이 아니라, 단순히 어떤 일을 "수행"하는 게 목적이기때문이다.

unknown을 사용하는 이유:
e.target.value는 기본적으로 string 타입. 
하지만 이 값을 제네릭 T로 변환하기 위해, 먼저 unknown으로 캐스팅한 후 T로 다시 캐스팅합니다. 
이는 TypeScript에서 안전하게 타입을 변환하는 방법 중 하나입니다.
*/
const useInput = <T ,>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue((e.target.value as unknown) as T);
  }, []);
  return [value, handler, setValue];
};

export default useInput;

/* 
         [T,      (e: ChangeEvent<HTMLInputElement>) => void,  Dispatch<SetStateAction<T>>]
= return [value,  handler,                                     setValue]
*/
