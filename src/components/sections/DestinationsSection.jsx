import { useTranslation } from 'react-i18next'
import { MapPin, ExternalLink } from 'lucide-react'

const DEST = [
  {
    key: 'germany', flag: '🇩🇪', color: 'from-[#1A1A1A] to-[#C0392B]',
    tags: ['Ausbildung Pflege', 'Visa qualifié', 'Université'],
    img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80'
  },
  {
    key: 'malta', flag: '🇲🇹', color: 'from-[#C0392B] to-[#C8A84B]',
    tags: ['Programmes EN', 'Études supérieures', 'Tourisme & Hôtellerie'],
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
  },
  {
    key: 'poland', flag: '🇵🇱', color: 'from-[#1A1A1A] to-[#8B1A1A]',
    tags: ['Académique', 'Coût accessible', 'UE'],
    img: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800&q=80'
  },
]

export default function DestinationsSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-slate-light" id="destinations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold font-body font-semibold text-sm uppercase tracking-widest mb-3">Destinations</p>
          <h2 className="section-title">{t('destinations.title')}</h2>
          <div className="gold-line mx-auto" />
          <p className="section-subtitle max-w-xl mx-auto">{t('destinations.subtitle')}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEST.map(({ key, flag, color, tags, img }) => (
            <div key={key} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={img}
                  alt={t(`destinations.${key}.name`)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-60`} />
                <div className="absolute top-4 left-4 text-3xl">{flag}</div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={14} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-gold" />
                  <h3 className="font-display font-bold text-navy text-lg">
                    {t(`destinations.${key}.name`)}
                  </h3>
                </div>
                <p className="text-slate text-sm font-body mb-4 leading-relaxed">
                  {t(`destinations.${key}.desc`)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="bg-slate-light text-navy text-xs font-semibold font-body px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
