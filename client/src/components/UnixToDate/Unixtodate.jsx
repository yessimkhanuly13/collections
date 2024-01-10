import { formatDistance } from 'date-fns'
import { ru, enGB } from 'date-fns/locale'
import { useTranslation } from 'react-i18next';


function UnixToDate({unix}) {
  const { t } = useTranslation();
  
  const result = formatDistance(
    new Date(unix),
    Date.now(),
    {locale: t('defaultLang') === "ru" ? ru : enGB}
  )

  return <span>{`${result} ${t('date.ago')}`}</span>;
}

export default UnixToDate