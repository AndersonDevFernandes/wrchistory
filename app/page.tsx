import styles from "./page.module.css";
import Carrossel from "../components/Carrossel"; // ajuste o caminho conforme sua estrutura
import TextContent from "../components/TextContent";
import Championship from "../components/Championship";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <nav className={styles.navbar} aria-label="Navegacao principal">
          <div className={styles.navbarInner}>
            <div className={styles.logoBox}>
              <img src="/cars/wrc_logo_transparent.png" alt="WRC Logo" className={styles.logo} />
            </div>

            <div className={styles.navButtons}>
              <button className={styles.btn}>Home</button>
              <button className={styles.btn}>Hitória do WRC</button>
              <button className={styles.btn}>Campeonato 2026</button>
              <button className={`${styles.btn} ${styles.btnPrimary}`}>Contato</button>
            </div>
          </div>
        </nav>

        {/* Conteúdo principal: lista + carrossel */}
        <div className={styles.content} id="main-container">
          <video
            className={styles.contentVideo}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          >
            <source src="/car-video/rally_highlights_30s_no_text (1).mp4" type="video/mp4" />
          </video>
          <div className={styles.contentOverlay} />
          <div className={styles.contentInner}>
            <Carrossel />
          </div>
        </div>
        <div className={styles.sectionWrap}>
          <TextContent />
        </div>
        <div className={styles.sectionWrap}>
          <Championship />
        </div>

        <footer id="footer"></footer>
      </main>
    </div>
  );
}