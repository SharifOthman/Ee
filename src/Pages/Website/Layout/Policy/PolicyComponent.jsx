import { useTranslation } from 'react-i18next';
import EnglishPolicy from './EnglishPolicy';
import ArabicPolicy from './ArabicPolicy';
import GerPolicy from './GerPolicy';
import TrPolicy from './TrPolicy';

const PolicyComponent = () => {
  const {i18n } = useTranslation();
  console.log(i18n.resolvedLanguage)
  const lan = i18n.resolvedLanguage;
 
  return (
    <>
     {lan === 'en' ? <EnglishPolicy/> : lan === 'ar' ?  <ArabicPolicy/> :lan === 'de' ? <GerPolicy/> :<TrPolicy/>}
    </>
  );
};

export default PolicyComponent;
