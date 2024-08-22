import { Dispatch, SetStateAction, useCallback, useState, ChangeEvent } from 'react';

// Dispatch, SetStateAction: React에서 제공하는 기본타입 
//ChangeEvent: React에서 제공하는 기본타입 , "값을 입력할 때 발생하는 이벤트"

//HTMLInputElement: "이벤트가 발생한 HTML 요소"
// <T> : Generics. 제네릭은 함수, hook과 같은 구조에서 "타입을 일반화"
type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

const useInput = <T>(initialData: T): ReturnTypes<T> => {
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
