import { useTranslation } from 'react-i18next'

const LANGS = [
  { code: 'fr', label: 'FR', flag: '🇨🇲' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
]

export default function LanguageSwitcher({ compact = false }) {
  const { i18n } = useTranslation()
  const current = i18n.language?.slice(0, 2) || 'fr'

  return (
    <div className="flex items-center gap-1 bg-slate-light rounded-lg p-1">
      {LANGS.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          className={`
            flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-semibold
            transition-all duration-150 font-body
            ${current === code
              ? 'bg-navy text-white shadow-sm'
              : 'text-slate hover:text-navy hover:bg-white'
            }
          `}
          aria-label={`Switch to ${label}`}
        >
          {!compact && <span className="text-xs">{flag}</span>}
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}
