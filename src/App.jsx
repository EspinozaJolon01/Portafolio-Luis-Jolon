import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import SpaceBackground from './components/SpaceBackground.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import { useLang } from './hooks/useLang.js'

const Divider = () => <div className="divider" aria-hidden="true" />

export default function App() {
	const { lang, setLang, t } = useLang()

	return (
		<>
			<a href="#main" className="skip-link">{t('skip_link')}</a>
			<SpaceBackground />
			<CustomCursor />
			<Navbar t={t} lang={lang} setLang={setLang} />
			<main id="main">
				<Hero t={t} />
				<About t={t} />
				<Divider />
				<Skills t={t} />
				<Divider />
				<Projects t={t} lang={lang} />
				<Divider />
				<Contact t={t} />
			</main>
			<Footer t={t} />
		</>
	)
}
