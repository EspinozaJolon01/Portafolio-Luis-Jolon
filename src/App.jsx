import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import SpaceBackground from './components/SpaceBackground.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import { useLang } from './hooks/useLang.js'

export default function App() {
	const { lang, setLang, t } = useLang()

	return (
		<>
			<SpaceBackground />
			<CustomCursor />
			<Navbar t={t} lang={lang} setLang={setLang} />
			<main>
				<Hero t={t} />
				<hr className="divider" />
				<About t={t} />
				<hr className="divider" />
				<Skills t={t} />
				<hr className="divider" />
				<Projects t={t} lang={lang} />
				<hr className="divider" />
				<Contact t={t} />
			</main>
			<footer className="section-wrapper" style={{ paddingTop: '2rem', paddingBottom: '2rem', textAlign: 'center' }}>
				<p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '.72rem', letterSpacing: '.08em' }}>
					{t('footer_by')} YOUR NAME · {t('footer_uni')}
				</p>
			</footer>
		</>
	)
}
