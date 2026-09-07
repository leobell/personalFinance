import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Logo from '../../components/logo/Logo'
import ThemeToggle from '../../components/themeToggle/ThemeToggle'

const Privacy = () => {
    return (
        <div className="relative min-h-screen bg-[#f9f9f7] px-6 py-12 dark:bg-[#0d0d0d]">
            <Helmet>
                <title>Privacy Policy - Flowly</title>
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

                <div className="space-y-6 text-slate-700 dark:text-slate-300 mt-5">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Ultimo aggiornamento: settembre 2026</p>
                    </div>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">1. Introduzione</h2>
                        <p>Questa pagina descrive quali dati raccoglie Flowly, come li usiamo e come li proteggiamo.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">2. Dati che raccogliamo</h2>
                        <p>Quando crei un account raccogliamo: nome, email, e la password (se ti registri con email — la password non viene mai salvata in chiaro, ma trasformata con un algoritmo di hashing irreversibile). Se accedi con Google, riceviamo nome ed email dal tuo profilo Google, senza mai vedere la tua password Google.</p>
                        <p>Una volta creato l'account, raccogliamo anche i dati finanziari che inserisci volontariamente: transazioni (importo, descrizione, data, categoria) e categorie che crei, oltre alla valuta che scegli di usare.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">3. Come usiamo i tuoi dati</h2>
                        <p>Usiamo i tuoi dati esclusivamente per far funzionare il servizio: autenticarti, mostrarti le tue transazioni e i grafici della Dashboard, e permetterti di gestire categorie e impostazioni. Non vendiamo né condividiamo i tuoi dati con terze parti a scopo pubblicitario.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">4. Come proteggiamo i tuoi dati</h2>
                        <p>Le password sono protette con hashing (bcrypt) e non sono mai leggibili, nemmeno da noi. L'accesso all'app avviene tramite un token di sessione salvato nel tuo browser, non tramite cookie.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">5. Servizi di terze parti</h2>
                        <p>Se scegli di accedere con Google, Google elabora i dati necessari a quel processo secondo la propria privacy policy. Non usiamo altri servizi di terze parti per elaborare i tuoi dati.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">6. Conservazione ed eliminazione</h2>
                        <p>Conserviamo i tuoi dati finché il tuo account resta attivo. Puoi eliminare definitivamente il tuo account in qualsiasi momento dalla pagina Impostazioni: l'eliminazione cancella immediatamente e permanentemente il tuo profilo, tutte le categorie e tutte le transazioni.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">7. I tuoi diritti</h2>
                        <p>Puoi visualizzare e modificare il tuo nome e la tua valuta, cambiare la password (se hai un account locale) ed eliminare il tuo account in qualsiasi momento, tutto direttamente dalla pagina Impostazioni, senza doverci contattare.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">8. Cookie</h2>
                        <p>Flowly non utilizza cookie. L'autenticazione avviene tramite un token salvato nel local storage del tuo browser.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">9. Modifiche a questa policy</h2>
                        <p>Potremmo aggiornare questa pagina in futuro. Eventuali modifiche significative verranno comunicate tramite l'app.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">10. Contatti</h2>
                        <p>Per qualsiasi domanda su questa policy, scrivici a bellleonardo04@gmail.com.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Privacy