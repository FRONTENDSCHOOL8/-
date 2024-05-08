import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { getRandomNumber } from '../../../utils/getRandomNumber';
import SearchCardImage from '../../atoms/SearchCardImage/SearchCardImage';
import BookCardInfo from '../BookCardInfo/BookCardInfo';
function SearchCard({ data }) {
  const { pathname } = useLocation();

  return (
    <motion.li
      variants={CardVar}
      whileHover={{ scale: 1.02 }}
      className={' list-shadow bg-grayscale-white overflow-hidden rounded-lg'}
    >
      <a
        href={
          pathname === '/library/search'
            ? `/library/book-registration?title=${data.title}&author=${data.author}&publisher=${data.publisher}&page=${getRandomNumber(80, 1200)}&isbn=${data.isbn}&cover=${data.cover}`
            : '/'
        }
        className="flex w-full"
      >
        <SearchCardImage data={data} />
        <BookCardInfo data={data} />
      </a>
    </motion.li>
  );
}

const CardVar = {
  start: { y: 20 },
  end: { y: 0 },
};

SearchCard.propTypes = {
  data: PropTypes.object,
};

export default SearchCard;