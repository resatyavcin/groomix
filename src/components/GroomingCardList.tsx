import { GroomingCardContentList } from '../../constants/GroomingCardContentList';
import GroomingCard from './GroomingCard';

const GroomingCardList = () => {
  return (
    <div class="flex items-center justify-center flex-wrap  gap-4 w-2/6">
      {GroomingCardContentList.map((content, _) => (
        <GroomingCard scoreId={content.scoreId} score={content.score} scoreComponent={content.scoreComponent} />
      ))}
    </div>
  );
};

export default GroomingCardList;
