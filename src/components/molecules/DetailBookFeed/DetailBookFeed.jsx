import { string, shape } from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { loginUserData } from '../../../utils/controlUserData';
import { getAllFeedsRec } from '../../../utils/controlFeedData';
import { motion } from 'framer-motion';
import FeedCard from '../../organisms/FeedCard/FeedCard';
import { useState, useEffect } from 'react';
import NoneCardState from '../NoneCardState/NoneCardState';
import RegistrationIcon from '../../atoms/RegistrationIcon/RegistrationIcon';
import { Link } from 'react-router-dom';

function DetailBookFeed({ data: bookData }) {
  const { data: feedsOfTheBook } = useQuery({
    queryKey: ['feeds', loginUserData],
    queryFn: () => getAllFeedsRec(),
    select: (feedsRecs) =>
      feedsRecs?.filter((feedsRec) => feedsRec.book_title === bookData.title),
  });

  const listVar = {
    start: { opacity: 0 },
    end: {
      opacity: 1,
      transition: {
        type: 'spring',
        mass: 0.8,
        staggerChildren: 0.03,
      },
    },
  };

  const [listCount, setListCount] = useState(0);

  useEffect(() => {
    setListCount(feedsOfTheBook?.length || 0);
  }, [feedsOfTheBook]);

  return (
    <section
      className="before:border-b before:content-[''] before:block before:pt-[111px] mt-[-111px] border-b"
      id="feed"
    >
      <div className="pb-8 bg-grayscale-white ">
        <div className="flex items-center justify-between pt-8 mx-4">
          <div className="flex gap-2">
            <h4 className="contents-lg-bold text-grayscale-900">피드</h4>
            <span className="font-bold align-middle text-primary-500 contents-lg-bold">
              {listCount}
            </span>
          </div>
          <Link to="/feed" className="text-grayscale-500 contents-sm-bold">
            전체보기
          </Link>
        </div>
        <div className="flex flex-col items-end px-4 pb-[56px] ">
          <div className="flex items-center justify-end w-full mt-6 mb-4">
            <RegistrationIcon page={'feed'} />
          </div>
          <motion.ul
            variants={listVar}
            initial="start"
            animate="end"
            className="flex flex-col w-full gap-4"
          >
            {feedsOfTheBook?.length !== 0 ? (
              feedsOfTheBook?.map((feedsRec) => (
                <FeedCard
                  key={feedsRec.id}
                  bookTitle={feedsRec.book_title}
                  title={feedsRec.feed_title}
                  content={feedsRec.content}
                  date={feedsRec.created}
                  nickname={feedsRec.expand?.user_id.nickname}
                  book_height={feedsRec.expand?.user_id.book_height}
                />
              ))
            ) : (
              <NoneCardState data="피드" />
            )}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

DetailBookFeed.propTypes = {
  data: shape({
    id: string.isRequired,
  }).isRequired,
};

export default DetailBookFeed;
