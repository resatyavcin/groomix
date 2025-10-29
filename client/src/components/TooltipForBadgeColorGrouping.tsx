import { Tooltip } from '@hope-ui/solid';
import { CircleQuestionMark } from 'lucide-solid';

const TooltipForBadgeColorGrouping = () => {
  const informationMessage =
    'Standart sapması yüksek olan oy veren kişinin rengi diğerlerine göre çok başka tonlarda olur. Bu farklı düşüncelerin kaybolmasını önler.';
  return (
    <Tooltip label={informationMessage} placement="top">
      <CircleQuestionMark size={16} />
    </Tooltip>
  );
};

export default TooltipForBadgeColorGrouping;
