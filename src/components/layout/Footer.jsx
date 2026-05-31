import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-navy-dark text-white border-t-4 border-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.jpeg" alt="Reisetür 237" className="h-14 object-contain" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed font-body mb-5">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3">
              {/* TikTok */}
              <a href="https://www.tiktok.com/@reisetr237" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-red transition-colors duration-150">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                </svg>
              </a>
              {/* Facebook placeholder */}
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-red transition-colors duration-150">
                <span className="text-xs font-bold">f</span>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/237620107489" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-red transition-colors duration-150">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body font-semibold text-white mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              {[
                { to: '/',               label: t('nav.home') },
                { to: '/services',       label: t('nav.services') },
                { to: '/certifications', label: t('nav.certifications') },
                { to: '/partnerships',   label: t('nav.partnerships') },
                { to: '/blog',           label: t('nav.blog') },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-white/60 hover:text-gold text-sm font-body transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-body font-semibold text-white mb-4 text-sm uppercase tracking-wider">Destinations</h4>
            <ul className="space-y-2">
              {[
                { flag: '🇩🇪', name: t('destinations.germany.name') },
                { flag: '🇲🇹', name: t('destinations.malta.name') },
                { flag: '🇵🇱', name: t('destinations.poland.name') },
              ].map(({ flag, name }) => (
                <li key={name} className="flex items-center gap-2 text-white/60 text-sm font-body">
                  <span>{flag}</span><span>{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/60 text-sm font-body">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                <span>Yaoundé, Cameroun — Essos</span>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm font-body">
                <Mail size={14} className="shrink-0 text-gold" />
                <a href="mailto:reisetur237@gmail.com" className="hover:text-gold transition-colors">
                  reisetur237@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm font-body">
                <Phone size={14} className="shrink-0 text-gold" />
                <a href="tel:+237620107489" className="hover:text-gold transition-colors">
                  +237 620 107 489
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs font-body">
            © {new Date().getFullYear()} Reisetür 237 — {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            <a href="/legal/mentions" className="text-white/40 hover:text-gold text-xs font-body transition-colors">{t('footer.legal')}</a>
            <a href="/legal/confidentialite" className="text-white/40 hover:text-gold text-xs font-body transition-colors">{t('footer.privacy')}</a>
            <a href="/legal/cgv" className="text-white/40 hover:text-gold text-xs font-body transition-colors">CGV</a>
            <button onClick={scrollTop} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gold transition-colors ml-2">
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
