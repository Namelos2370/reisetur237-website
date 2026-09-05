import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../lib/supabase'
import SEOHead from '../../components/seo/SEOHead'
import { Search, Calendar, ChevronRight, BookOpen } from 'lucide-react'

const NAVY = '#1A1A1A', RED = '#C0392B', GOLD = '#C8A84B'

export const ALL_ARTICLES = []

const CATS = { fr: ['Tous','Formation','Visa','Témoignages','Migration'] }

export default function BlogPage() {
  return <div>Blog</div>
}
