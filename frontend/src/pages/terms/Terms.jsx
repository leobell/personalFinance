import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import Logo from "../../components/logo/Logo"
import ThemeToggle from "../../components/themeToggle/ThemeToggle"

const Terms = () => {
    return (
        <div className="relative min-h-screen bg-[#f9f9f7] px-6 py-12 dark:bg-[#0d0d0d]">
            <Helmet>
                <title>Termini di Servizio - Flowly</title>
            </Helmet>

            <ThemeToggle className="absolute right-6 top-6" />

            

            <div className="mx-auto max-w-2xl space-y-8">
                <Link
                    to="/"
                    className="flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M19 12H5" />
                        <path d="M12 19l-7-7 7-7" />
                    </svg>
                    Home
                </Link>

                <Link to="/">
                    <Logo iconSize={32} />
                </Link>

                <div className="mt-5 space-y-6 text-slate-700 dark:text-slate-300">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Termini di Servizio</h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Ultimo aggiornamento: settembre 2026</p>
                    </div>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">1. Accettazione dei termini</h2>
                        <p>Utilizzando Flowly accetti questi Termini di Servizio. Se non li accetti, ti chiediamo di non utilizzare l'app.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">2. Descrizione del servizio</h2>
                        <p>Flowly è uno strumento per tracciare le proprie spese ed entrate personali, organizzarle in categorie e visualizzarne l'andamento tramite grafici. Non è un servizio di consulenza finanziaria, bancario o di investimento.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">3. Account utente</h2>
                        <p>Per usare Flowly devi creare un account, fornendo informazioni accurate (nome, email). Sei responsabile di mantenere riservate le tue credenziali di accesso e di ogni attività svolta con il tuo account.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">4. Uso consentito</h2>
                        <p>Ti impegni a non utilizzare Flowly per scopi illeciti, a non tentare di accedere senza autorizzazione ad account o dati di altri utenti, e a non compromettere la sicurezza o il funzionamento del servizio.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">5. I tuoi dati</h2>
                        <p>I dati finanziari che inserisci (transazioni, categorie) restano di tua proprietà. Li usiamo esclusivamente per fornirti il servizio, come descritto nella nostra <Link to="/privacy" className="text-[#1c5cab] dark:text-[#3987e5]">Privacy Policy</Link>.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">6. Disponibilità del servizio</h2>
                        <p>Flowly viene fornito "così com'è". Non garantiamo che il servizio sia sempre disponibile, privo di errori o ininterrotto, e ci riserviamo il diritto di modificarlo, sospenderlo o interromperlo in qualsiasi momento.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">7. Limitazione di responsabilità</h2>
                        <p>Flowly è uno strumento di tracciamento, non un consulente finanziario: le decisioni che prendi sulla base dei dati mostrati nell'app restano di tua esclusiva responsabilità. Nei limiti consentiti dalla legge, non siamo responsabili per perdite o danni derivanti dall'uso del servizio.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">8. Cancellazione dell'account</h2>
                        <p>Puoi eliminare il tuo account in qualsiasi momento dalla pagina Impostazioni, con cancellazione immediata e permanente dei tuoi dati. Ci riserviamo il diritto di sospendere o terminare account che violano questi termini.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">9. Modifiche ai termini</h2>
                        <p>Potremmo aggiornare questi termini in futuro. Continuando a usare Flowly dopo una modifica, accetti i nuovi termini.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">10. Legge applicabile</h2>
                        <p>Questi termini sono regolati dalla legge italiana.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">11. Contatti</h2>
                        <p>Per domande su questi termini, scrivici a bellleonardo04@gmail.com.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Terms