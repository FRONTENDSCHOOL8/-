import propTypes from 'prop-types';
import LargeHeader from '../LargeHeader/LargeHeader';
import TabNavigation from '../../TabNavigation/TabNavigation';
import SmallHeader from '../SmallHeader/SmallHeader';

function Header({ title, formId }) {
  const titlesWithLargeHeader = [
    '기록',
    '서재',
    '피드',
    '캐릭터',
    '마이페이지',
  ];
  const titlesWithSmallHeader = [
    '검색하기',
    '직접 입력하기',
    '책 상세',
    '메모',
    '메모 작성',
    '피드 작성',
    '피드 상세',
  ];
  const titlesWithTabNavigation = ['기록', '서재'];

  return (
    <header className="fixed top-0 z-20 left-[50%] translate-x-[-50%] w-full min-w-[320px] max-w-md">
      {titlesWithLargeHeader.includes(title) && (
        <>
          <LargeHeader title={title} />
          {titlesWithTabNavigation.includes(title) && (
            <TabNavigation page={title} />
          )}
        </>
      )}
      {titlesWithSmallHeader.includes(title) && (
        <>
          <SmallHeader
            title={title === '책 상세' ? '' : title}
            formId={formId}
          />
        </>
      )}
    </header>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  formId: propTypes.string,
};

export default Header;
