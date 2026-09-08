import { Helmet } from 'react-helmet-async'
import Hero from "./Hero"
import Features from "./Features"
import Footer from '../../components/footer/Footer'

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Flowly - Traccia le tue finanze</title>
                <meta name="description" content="Flowly ti aiuta a tracciare le tue spese, organizzarle in categorie e visualizzare con grafici puliti dove vanno i tuoi soldi ogni mese." />
                <meta property="og:title" content="Flowly - Traccia le tue finanze" />
                <meta property="og:description" content="Flowly ti aiuta a tracciare le tue spese, organizzarle in categorie e visualizzare con grafici puliti dove vanno i tuoi soldi ogni mese." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://flowlyfinance.app/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Flowly - Traccia le tue finanze" />
                <meta name="twitter:description" content="Flowly ti aiuta a tracciare le tue spese, organizzarle in categorie e visualizzare con grafici puliti dove vanno i tuoi soldi ogni mese." />
                <meta property="og:image" content="https://flowlyfinance.app/og-flowly.png" />
                <meta name="twitter:image" content="https://flowlyfinance.app/og-flowly.png" />
            </Helmet>
            <Hero />
            <Features />
            <Footer />
        </div>
    )
}

export default Home