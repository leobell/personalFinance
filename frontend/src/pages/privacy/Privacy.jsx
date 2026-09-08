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

                <div className="mt-5 space-y-6 text-slate-700 dark:text-slate-300">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Ultimo aggiornamento: 8 settembre 2026</p>
                    </div>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">1. Titolare del Trattamento</h2>
                        <p>Leonardo Bell — contatto: bellleonardo04@gmail.com</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">2. Dati che raccogliamo</h2>
                        <p>Quando crei un account raccogliamo: nome, email, e la password (se ti registri con email — non viene mai salvata in chiaro, ma trasformata con un algoritmo di hashing irreversibile, bcrypt). Se accedi con Google Sign-In, riceviamo nome ed email dal tuo profilo Google, senza mai vedere la tua password Google.</p>
                        <p>Una volta creato l'account, raccogliamo anche i dati finanziari che inserisci volontariamente: transazioni (importo, descrizione, data, categoria), categorie che crei, e la valuta che scegli di usare.</p>
                        <p>Raccogliamo inoltre automaticamente alcuni dati di utilizzo tecnici (indirizzo IP, tipo di browser, orario delle richieste) tramite i log dei nostri server, necessari al funzionamento e alla sicurezza del servizio.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">3. Servizi di terze parti che trattano i tuoi dati</h2>
                        <p>Ci appoggiamo ai seguenti fornitori per far funzionare Flowly:</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li><strong>Google LLC</strong> (Google Sign-In) — per l'autenticazione, se scegli di accedere con Google</li>
                            <li><strong>Resend</strong> — per l'invio delle email transazionali (reset password, verifica email)</li>
                            <li><strong>Vercel Inc.</strong> — hosting del sito web (frontend)</li>
                            <li><strong>Render</strong> — hosting del server applicativo (backend)</li>
                            <li><strong>Neon</strong> — hosting del database dove sono conservati i tuoi dati</li>
                        </ul>
                        <p>Ognuno di questi tratta i dati strettamente necessari a fornire il proprio servizio, secondo le rispettive privacy policy.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">4. Come usiamo i tuoi dati</h2>
                        <p>Usiamo i tuoi dati esclusivamente per far funzionare il servizio: autenticarti, mostrarti le tue transazioni e i grafici della Dashboard, permetterti di gestire categorie e impostazioni. Non vendiamo né condividiamo i tuoi dati con terze parti a scopo pubblicitario.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">5. Come proteggiamo i tuoi dati</h2>
                        <p>Le password sono protette con hashing (bcrypt) e non sono mai leggibili, nemmeno da noi. L'accesso all'app avviene tramite un token di sessione salvato nel local storage del tuo browser, non tramite cookie.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">6. Base giuridica del trattamento (GDPR)</h2>
                        <p>Trattiamo i tuoi dati principalmente perché necessario all'esecuzione del contratto/servizio che hai richiesto creando un account, e in alcuni casi sulla base del tuo consenso esplicito (es. accesso con Google).</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">7. Conservazione ed eliminazione</h2>
                        <p>Conserviamo i tuoi dati finché il tuo account resta attivo. Puoi eliminare definitivamente il tuo account in qualsiasi momento dalla pagina Impostazioni: l'eliminazione cancella immediatamente e permanentemente il tuo profilo, tutte le categorie e tutte le transazioni.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">8. I tuoi diritti (GDPR)</h2>
                        <p>Hai diritto di: accedere ai tuoi dati, richiederne la rettifica, richiederne la cancellazione, limitarne il trattamento, richiederne la portabilità, opporti al trattamento, e proporre reclamo all'autorità di controllo competente (in Italia, il Garante per la Protezione dei Dati Personali). Puoi esercitare gran parte di questi diritti direttamente dalla pagina Impostazioni (modifica profilo, cancellazione account); per richieste specifiche, scrivici all'indirizzo sopra indicato.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">9. Cookie</h2>
                        <p>Flowly non utilizza cookie. L'autenticazione avviene tramite un token salvato nel local storage del tuo browser.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">10. Modifiche a questa policy</h2>
                        <p>Potremmo aggiornare questa pagina in futuro. Eventuali modifiche significative verranno comunicate tramite l'app.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Privacy