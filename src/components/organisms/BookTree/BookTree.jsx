import {} from 'prop-types';
import BookBlockList from './../../molecules/BookBlockList/BookBlockList';
import SaveBookImg from './../../atoms/SaveBookImg/SaveBookImg';
import BookInfo from '../../molecules/BookInfo/BookInfo';
import { useQuery } from '@tanstack/react-query';
import { getUserLibraryData } from '/src/utils/controlBookData';

function BookTree() {
  const { data, isLoading } = useQuery({
    queryKey: ['book'],
    queryFn: async () => getUserLibraryData('done'),
  });

  return (
    <main className="h-screen relative justify-end flex flex-col pt-[154px] pb-[50px] px-4 border border-grayscale-200">
      <div className="flex absolute top-4 left-0 justify-between px-4 w-full">
        <BookInfo data={data} isLoading={isLoading} />
        <SaveBookImg />
      </div>
      <BookBlockList data={data} />
    </main>
  );
}

BookTree.propTypes = {};

export default BookTree;
