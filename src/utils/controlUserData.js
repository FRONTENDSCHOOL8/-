import pb from '/src/api/pocketbase';

/* -------------------------------------------- */
/*                로그인 및 로그아웃시 사용                */
/* -------------------------------------------- */

/**
 * Login 함수
 * * validation에 통과한 email과 비밀번호로 로그인하는 함수
 * * 로그인 완료될 때를 판별할 때는 컴포넌트에서 tanstack query isLoading과 함께사용 권장
 * @param email validation을 통과한 email
 * @param password validation을 통과한 password
 */
export async function loginWithEmail(email, password) {
  try {
    await pb.collection('users').authWithPassword(email, password);
    return loginUserData();
  } catch (error) {
    return false;
  }
}

/**
 * Logout 함수
 * * 현재 저장되어있는 Login User의 정보를 삭제하여 Logout 상태로 바꿔주는 함수
 * TODO 추후 logout에 문제가 없다면 '현재 로그인된 정보가 없습니다.' 제거
 * @param void
 */
export function clearLoginUserData() {
  if (loginUserData) {
    pb.authStore.clear();
  } else {
    return '현재 로그인된 정보가 없습니다.';
  }
}

/* -------------------------------------------- */
/*                 회원가입 및 탈퇴시 사용                */
/* -------------------------------------------- */

/**
 * 회원가입 함수
 * Database에 유저정보를 저장하는 함수
 * ! 회원가입 Form 내부의 Validation이 모두 완료되었을 때 실행
 * * 성공시 회원가입된 정보 리턴
 * * 에러가 발생하면 false 리턴
 * @param {string} nickname 유저가 사용할 닉네임
 * @param {string} email 유저가 로그인할 때 사용할 email
 * @param {string} password 유저가 로그인할 때 사용할 password
 */
export async function signUpUser(nickname, email, password) {
  const data = {
    email: email,
    emailVisibility: false,
    password: password,
    passwordConfirm: password,
    nickname: nickname,
    book_height: 0,
  };

  try {
    const record = await pb.collection('users').create(data);
    return record;
  } catch (error) {
    return false;
  }
}

/**
 * 회원탈퇴 함수
 * * 로그인된 회원의 id를 가져와 회원탈퇴를 하는 함수
 * TODO 회원가입에 문제가 없을 시 '로그인 정보가 없습니다.' 제거
 */
export async function withdrawUser() {
  if (loginUserData) {
    return await pb.collection('users').delete(loginUserData.id);
  } else {
    return '로그인 정보가 없습니다.';
  }
}

/**
 * 닉네임 중복체크 함수
 * * Validation을 통과한 닉네임이 Database에 존재하는지 확인하는 함수
 * @param {string} nickname
 * TODO 닉네임의 Validation에 대해 생각해봐야 함
 */
export async function searchUserNickname(nickname) {
  const userList = await pb.collection('users').getFullList({
    filter: `nickname = "${nickname}"`,
  });

  if (userList.length === 0) return '사용가능한 닉네임 입니다.';
  else return '이미 존재하는 닉네임 입니다.';
}

/**
 * 이메일 중복체크 함수
 * * Validation을 통과한 이메일이 Database에 존재하는지 확인하는 함수
 * @param {string} email
 */
export async function searchUserEmail(email) {
  const userList = await pb.collection('users').getFullList({
    filter: `email = "${email}"`,
  });

  if (userList.length === 0) return '사용가능한 이메일 입니다.';
  else return '이미 존재하는 이메일 입니다.';
}

/* -------------------------------------------- */
/*                      ETC                     */
/* -------------------------------------------- */

// 현재 로그인된 유저의 정보를 가져오는 변수
export const loginUserData = pb.authStore.model;
