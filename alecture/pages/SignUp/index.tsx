import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher'; //데이터를 가져오는 함수
import React, { useCallback, useState, VFC } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './styles';
/*
useSWR: 서버로부터 데이터를 가져오고, 이를 캐시하고, 자동으로 revalidation하는 기능을 제공하는 hook
data: 요청이 성공하면 서버에서 반환된 데이터가 여기에 저장됩니다.
error: 요청이 실패하면 발생한 오류가 여기에 저장됩니다.
revalidate: 데이터를 수동으로 다시 가져올 수 있는 함수입니다. 예를 들어, 데이터가 변경된 후 이를 수동으로 갱신하고 싶을 때 사용할 수 있습니다.
*/
import { Link, Redirect } from 'react-router-dom';

const SignUp = () => {
  const { data, error, revalidate } = useSWR('/api/users', fetcher);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [mismatchError, setMismatchError] = useState(false); //비번일치:false  비번불일치:true
  const [signUpError, setSignUpError] = useState(''); //서버에서 보낸 에러메세지 뜨게하기
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  //패스워드 입력하면
  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck); //비번불일치
    },
    [passwordCheck], 
  );

  //패스워드 체크 입력하면
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      /*
      !는 negation operator로, 
      mismatchError의 값이 true라면 false로, mismatchError의 값이 false라면 true로 반전    
      
      &&: 둘다 true일 때 실행
      */
      if (!mismatchError && nickname) {
        console.log('서버로 회원가입하기');

        // 초기화: 요청 전에 상태를 초기화하여 사용자에게 이전 요청의 결과가 남아 있지 않도록 함
        setSignUpError('');
        setSignUpSuccess(false);
        axios //서버로 보내기: .post( '주소' , {보낼데이터} )
          .post('/api/users',{
            email,
            nickname,
            password,
          })
          //성공하면 실행: 서버가 성공적으로 요청을 처리하면 response 객체가 반환된다. (data, status 등의 속성)
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          })
          //실패하면 실행
          .catch((error) => {
            console.log(error.response); 
            setSignUpError(error.response.data); //'정확한' 에러내용확인 : "이미 사용중인 아이디입니다" = error.response.data
          })
          //성공실패상관없이 무조건 실행
          .finally(() => {});
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if (data) {
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>} 
{/*           mismatchError가 true일 때만 <Error>컴포넌트를 렌더링 */}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
