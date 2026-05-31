import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, ChevronRight } from 'lucide-react'
import LanguageSwitcher from '../ui/LanguageSwitcher'

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const links = [
    { to: '/',               label: t('nav.home') },
    { to: '/services',       label: t('nav.services') },
    { to: '/certifications', label: t('nav.certifications') },
    { to: '/partnerships',   label: t('nav.partnerships') },
    { to: '/blog',           label: t('nav.blog') },
  ]

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled ? 'bg-white shadow-md py-2' : 'bg-navy-dark/80 backdrop-blur-sm py-2'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/logo.jpeg"
              alt="Reisetür 237"
              className={`transition-all duration-300 object-contain
                ${scrolled ? 'h-12' : 'h-14'}
              `}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`
                  px-4 py-2 rounded-lg text-sm font-semibold font-body transition-all duration-150
                  ${location.pathname === to
                    ? 'bg-navy text-white'
                    : scrolled
                      ? 'text-navy hover:bg-slate-light'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/contact" className="btn-gold text-sm py-2">
              {t('nav.contact')}
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 rounded-lg transition-colors
              ${scrolled ? 'text-navy hover:bg-slate-light' : 'text-white hover:bg-white/10'}`}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-3 rounded-lg text-sm font-semibold font-body transition-colors
                  ${location.pathname === to ? 'bg-navy text-white' : 'text-navy hover:bg-slate-light'}`}
              >
                {label}
              </Link>
            ))}
            <Link to="/contact" className="btn-gold mt-2 justify-center">
              {t('nav.contact')} <ChevronRight size={14} />
            </Link>
            <div className="pt-2 border-t border-slate-100 mt-1">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
