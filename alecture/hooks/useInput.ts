import { Dispatch, SetStateAction, useCallback, useState, ChangeEvent } from 'react';

//ChangeEvent: React에서 제공하는 기본타입 , 값을 입력할 때 발생하는 이벤트를 나타냄
//HTMLInputElement: 이벤트가 발생한 HTML 요소
// <T> : Generics 기능을 활용한 타입 매개변수. 제네릭은 함수, hook과 같은 구조에서 타입을 일반화할 수 있는 방법을 제공
type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

const useInput = <T>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue((e.target.value as unknown) as T);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
