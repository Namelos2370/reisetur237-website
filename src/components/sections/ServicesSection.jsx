import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Plane, BookOpen, Heart, Languages, ChevronRight } from 'lucide-react'

const SERVICES = [
  { key: 'visa',        Icon: Plane,     color: 'bg-blue-50 text-blue-600',   border: 'hover:border-blue-200' },
  { key: 'orientation', Icon: BookOpen,  color: 'bg-amber-50 text-amber-600', border: 'hover:border-amber-200' },
  { key: 'ausbildung',  Icon: Heart,     color: 'bg-rose-50 text-rose-600',   border: 'hover:border-rose-200' },
  { key: 'language',    Icon: Languages, color: 'bg-emerald-50 text-emerald-600', border: 'hover:border-emerald-200' },
]

export default function ServicesSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold font-body font-semibold text-sm uppercase tracking-widest mb-3">Services</p>
          <h2 className="section-title">{t('services.title')}</h2>
          <div className="gold-line mx-auto" />
          <p className="section-subtitle max-w-xl mx-auto">{t('services.subtitle')}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ key, Icon, color, border }, i) => (
            <div
              key={key}
              className={`card p-6 border-2 border-transparent ${border} transition-all duration-200 group`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon size={22} />
              </div>
              <h3 className="font-display font-bold text-navy text-lg mb-2 leading-snug">
                {t(`services.${key}.title`)}
              </h3>
              <p className="text-slate text-sm font-body leading-relaxed">
                {t(`services.${key}.desc`)}
              </p>
              <Link
                to="/services"
                className="mt-4 inline-flex items-center gap-1 text-navy font-semibold text-sm font-body
                  group-hover:text-gold transition-colors"
              >
                {t('common.learn_more')} <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
