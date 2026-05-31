import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowDown } from 'lucide-react'

const DESTINATIONS = [
  { flag: '🇩🇪', key: 'germany' },
  { flag: '🇲🇹', key: 'malta' },
  { flag: '🇵🇱', key: 'poland' },
]

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-dark">

      {/* Background geometric pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-navy opacity-60" />
        <div className="absolute top-1/3 -left-48 w-[400px] h-[400px] rounded-full bg-red opacity-10" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-gold opacity-5" />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Gold accent line */}
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-gold to-transparent opacity-40" />
        {/* Red accent line right */}
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-red to-transparent opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-white/80 text-xs font-body font-medium tracking-wide uppercase">
                {t('hero.badge')}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-up">
              {t('hero.title').split(' ').map((word, i) => (
                <span key={i} style={{ animationDelay: `${i * 80}ms` }}>
                  {word === "l'Europe" || word === "Europa" || word === "Europe"
                    ? <span className="text-gold">{word}</span>
                    : word}{' '}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="font-body text-white/70 text-lg leading-relaxed mb-8 max-w-lg animate-fade-up animate-delay-200">
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10 animate-fade-up animate-delay-300">
              <Link to="/contact" className="btn-gold">
                {t('hero.cta_primary')}
                <ChevronRight size={16} />
              </Link>
              <Link to="/services" className="btn-outline border-white/40 text-white hover:bg-white hover:text-navy">
                {t('hero.cta_secondary')}
              </Link>
            </div>

            {/* Destinations */}
            <div className="animate-fade-up animate-delay-400">
              <p className="text-white/40 text-xs uppercase tracking-widest font-body mb-3">
                {t('hero.destinations')}
              </p>
              <div className="flex gap-3">
                {DESTINATIONS.map(({ flag, key }) => (
                  <div key={key} className="flex items-center gap-2 bg-white/10 hover:bg-white/15 rounded-xl px-3 py-2 transition-colors cursor-default">
                    <span className="text-xl">{flag}</span>
                    <span className="text-white text-sm font-body font-medium">
                      {t(`destinations.${key}.name`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Stats card */}
          <div className="hidden lg:block animate-fade-in animate-delay-300">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '500+', label: t('stats.candidates'), color: 'text-gold' },
                  { value: '15+',  label: t('stats.partners'),   color: 'text-gold' },
                  { value: '3',    label: t('stats.countries'),  color: 'text-gold' },
                  { value: '92%',  label: t('stats.success'),    color: 'text-gold' },
                ].map(({ value, label, color }) => (
                  <div key={label} className="text-center p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className={`font-display font-bold text-4xl ${color} mb-1`}>{value}</div>
                    <div className="text-white/60 text-xs font-body leading-tight">{label}</div>
                  </div>
                ))}
              </div>

              {/* Map visual placeholder */}
              <div className="mt-6 bg-navy rounded-2xl p-4 flex items-center justify-center h-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  {/* Simplified Europe dots */}
                  {[
                    { top: '30%', left: '45%', label: 'DE' },
                    { top: '65%', left: '48%', label: 'MT' },
                    { top: '28%', left: '58%', label: 'PL' },
                  ].map(({ top, left, label }) => (
                    <div key={label} className="absolute" style={{ top, left }}>
                      <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-6 z-10">
                  {[{ flag: '🇩🇪', code: 'DE' }, { flag: '🇲🇹', code: 'MT' }, { flag: '🇵🇱', code: 'PL' }].map(({ flag, code }) => (
                    <div key={code} className="text-center">
                      <div className="text-2xl mb-1">{flag}</div>
                      <div className="text-white/60 text-xs font-mono">{code}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/30" />
        <ArrowDown size={14} className="text-white/30" />
      </div>
    </section>
  )
}
