import styles from "./Championship.module.css";

const ESTATISTICAS_2026 = [
  {
    ranking: "1",
    tempo: "2h 48m 33.4s",
    piloto: "Kalle Rovanpera",
    equipe: "Toyota Gazoo Racing",
    modelo: "Toyota GR Yaris Rally1",
  },
  {
    ranking: "2",
    tempo: "+10.9s",
    piloto: "Thierry Neuville",
    equipe: "Hyundai Shell Mobis",
    modelo: "Hyundai i20 N Rally1",
  },
  {
    ranking: "3",
    tempo: "+21.7s",
    piloto: "Elfyn Evans",
    equipe: "Toyota Gazoo Racing",
    modelo: "Toyota GR Yaris Rally1",
  },
  {
    ranking: "4",
    tempo: "+34.2s",
    piloto: "Ott Tanak",
    equipe: "Hyundai Shell Mobis",
    modelo: "Hyundai i20 N Rally1",
  },
  {
    ranking: "5",
    tempo: "+49.5s",
    piloto: "Adrien Fourmaux",
    equipe: "M-Sport Ford",
    modelo: "Ford Puma Rally1",
  },
];

export default function Championship() {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Estatisticas WRC 2026</h3>
      <div className={styles.grid}>
        <div className={styles.headerRow}>
          <span>Ranking</span>
          <span>Tempo</span>
          <span>Piloto</span>
          <span>Equipe</span>
          <span>Modelo</span>
        </div>
        {ESTATISTICAS_2026.map((item) => (
          <div key={item.ranking} className={styles.row}>
            <span>{item.ranking}</span>
            <span>{item.tempo}</span>
            <span>{item.piloto}</span>
            <span>{item.equipe}</span>
            <span>{item.modelo}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
