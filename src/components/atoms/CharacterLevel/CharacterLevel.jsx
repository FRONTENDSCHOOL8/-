import { number, string } from 'prop-types';

function CharacterLevel({ level: charLevel, pgName }) {
  switch (pgName) {
    case '캐릭터':
      return (
        <div className="flex justify-end">
          <span className="contents-md text-primary-500 h-[26px]">
            {charLevel}단계
          </span>
        </div>
      );
    case '마이페이지':
      return (
        <div className="flex justify-end">
          <span className="contents-md-bold text-grayscale-900">
            {charLevel}단계
          </span>
        </div>
      );
  }
}

CharacterLevel.propTypes = {
  level: number,
  pgName: string,
};

export default CharacterLevel;
