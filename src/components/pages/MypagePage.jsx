import {
  clearLoginUserData,
  withdrawUser,
  loginUserData,
  getOneUsersRec,
} from '../../utils/controlUserData';
import pb from '../../api/pocketbase';
import { Helmet } from 'react-helmet-async';
import { calcLevel } from '../../utils/calcLevel';
import { useNavigate, Link } from 'react-router-dom';
import BookInfo from '../molecules/BookInfo/BookInfo';
import A11yHidden from '../atoms/A11yHidden/A11yHidden';
import CharacterImg from '../atoms/CharacterImg/CharacterImg';
import { useQueryWithErr } from '../../hooks/useQueryWithErr';
import CharacterName from '../atoms/CharacterName/CharacterName';
import CharacterLevel from '../atoms/CharacterLevel/CharacterLevel';
import LargeHeader from '/src/components/organisms/Header/LargeHeader/LargeHeader';

function MypagePage() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    const willLogOut = confirm('로그아웃 하시겠습니까?');

    if (willLogOut) clearLoginUserData();

    if (!pb.authStore.isValid) {
      alert('로그아웃이 되었습니다.');
      // 로그아웃시 로그인페이지로 이동
      navigate('/login');
      location.reload(true);
    }
  };

  /* 회원 탈퇴 기능 handling 로직 */
  const handleWithdraw = () => {
    const willWithdraw = confirm('정말로 탈퇴하시겠습니까?');

    if (!willWithdraw) return;

    withdrawUser().then(
      () => {
        alert('회원 탈퇴가 완료되었습니다.');

        navigate('/login');
      },
      (err) => {
        alert(err.message);

        return;
      }
    );
  };

  const loginUserNickName = loginUserData.nickname;
  const loginUserEmail = loginUserData.email;

  const { data: userRec } = useQueryWithErr({
    queryKey: ['users', loginUserData],
    queryFn: () => getOneUsersRec(loginUserData.id),
  });

  const userBookHeight = userRec?.['book_height'] * 1 || 0;
  const userLevel = calcLevel(userBookHeight) || 1;
  const doneBookNum = userRec?.['done_book'] * 1 || 0;

  return (
    <>
      <Helmet>
        <title>책콩 | 마이페이지</title>
      </Helmet>
      <LargeHeader title={'마이페이지'} />
      <main className="min-w-80 max-w-[448px] h-auto pb-[120px]">
        <section>
          <A11yHidden as="h2">유저 정보</A11yHidden>
          <article className="flex flex-col p-4 bg-white mt-2">
            <A11yHidden as="h3">유저 가입 정보</A11yHidden>
            <span className=" text-2xl text-[#F24822] font-medium">
              {loginUserNickName}
            </span>
            <span className=" text-sm font-normal text-[#848484]">
              {loginUserEmail}
            </span>
          </article>
          <article className="flex flex-col items-center bg-white border-t">
            <A11yHidden as="h3">유저 독서 정보</A11yHidden>
            <CharacterImg level={userLevel} />
            <div className="mb-3 mt-8">
              <CharacterName level={userLevel} pageName="마이페이지" />
            </div>
            <CharacterLevel level={userLevel} pgName="마이페이지" />
            <BookInfo
              bookNum={doneBookNum}
              bookHeight={userBookHeight}
              pgName="mypage"
            />
          </article>
        </section>
        <section>
          <form className="border-y bg-white mt-2">
            <h2 className="p-4 contents-md font-display border-b text-base text-grayscale-900">
              테마 설정
            </h2>
            <div className="flex flex-col">
              <label className="flex gap-2 p-4 text-[#1E1E1E] border-b">
                <input type="radio" name="theme" value="dark" />
                다크모드
              </label>
              <label className="flex gap-2 p-4 text-[#1E1E1E] border-b">
                <input type="radio" name="theme" value="light" />
                라이트모드
              </label>
              <label className="flex gap-2 p-4 text-[#1E1E1E]">
                <input type="radio" name="theme" value="auto" />
                자동 (시스템 초기값)
              </label>
            </div>
          </form>
        </section>
        <section>
          <A11yHidden as="h2">고객 문의</A11yHidden>
          <ul className=" mt-2 bg-white">
            <li className=" p-4 border-b">
              <Link to="#" className=" block">
                자주 묻는 질문
              </Link>
            </li>
            <li className=" p-4 border-b">
              <Link to="#" className=" block">
                의견 보내기
              </Link>
            </li>
            <li className=" p-4 border-b">
              <Link to="#" className=" block">
                문의하기
              </Link>
            </li>
            <li className=" p-4">
              <Link to="#" className=" block">
                서비스 이용약관
              </Link>
            </li>
          </ul>
        </section>
        <section className="flex flex-col bg-white mt-2">
          <A11yHidden as="h2">로그아웃 및 탈퇴</A11yHidden>
          <button
            onClick={handleLogOut}
            className=" text-start p-4 border-b text-[#F24822]"
          >
            로그아웃
          </button>
          <button onClick={handleWithdraw} className=" text-start p-4">
            회원 탈퇴
          </button>
        </section>
      </main>
    </>
  );
}

export default MypagePage;
