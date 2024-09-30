import { useTranslation } from 'react-i18next';
import ArticlesEn from './ArticlesEn';
import ArticlesAr from './ArticlesAr';
import ArticlesGer from './ArticlesGer';
import ArticlesTr from './ArticlesTr';


const ArticlesCom = () => {
  const {i18n } = useTranslation();
  console.log(i18n.resolvedLanguage)
  const lan = i18n.resolvedLanguage;
 
  return (
    <>
     {lan === 'en' ? <ArticlesEn/> : lan === 'ar' ?  <ArticlesAr/> :lan === 'de' ? <ArticlesGer/> :<ArticlesTr/>}
    </>
  );
};

export default ArticlesCom;
