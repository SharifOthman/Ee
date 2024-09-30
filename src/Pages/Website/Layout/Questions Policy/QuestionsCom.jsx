import { useTranslation } from 'react-i18next';
import QuestionsEn from './QuestionsEn';
import QuestionsAr from './QuestionsAr';
import QuestionsGer from './QuestionsGer';
import QuestionsTr from './QuestionsTr';



const QuestionsCom = () => {
  const {i18n } = useTranslation();
  console.log(i18n.resolvedLanguage)
  const lan = i18n.resolvedLanguage;
 
  return (
    <>
     {lan === 'en' ? <QuestionsEn/> : lan === 'ar' ?  <QuestionsAr/> :lan === 'de' ? <QuestionsGer/> : <QuestionsTr/>}
    </>
  );
};

export default QuestionsCom;
