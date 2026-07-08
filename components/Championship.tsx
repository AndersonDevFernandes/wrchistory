"use client";

import { useEffect, useRef } from "react";
import styles from "./Championship.module.css";

const ESTATISTICAS_2026 = [
  {
    ranking: "1",
    tempo: "3h 36m 40.7s",
    piloto: "Sébastien Ogier",
    equipe: "Toyota Gazoo Racing WRT",
    modelo: "Toyota GR Yaris Rally1",
  },
  {
    ranking: "2",
    tempo: "+58.3s",
    piloto: "Thierry Neuville",
    equipe: "Hyundai Shell Mobis WRT",
    modelo: "Hyundai i20 N Rally1",
  },
  {
    ranking: "3",
    tempo: "+3m 04.8s",
    piloto: "Takamoto Katsuta",
    equipe: "Toyota Gazoo Racing WRT",
    modelo: "Toyota GR Yaris Rally1",
  },
  {
    ranking: "4",
    tempo: "+5m 02.2s",
    piloto: "Sami Pajari",
    equipe: "Toyota Gazoo Racing WRT2",
    modelo: "Toyota GR Yaris Rally1",
  },
  {
    ranking: "5",
    tempo: "+5m 54.9s",
    piloto: "Elfyn Evans",
    equipe: "Toyota Gazoo Racing WRT",
    modelo: "Toyota GR Yaris Rally1",
  },
];

export default function Championship() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* título grande com clip-reveal + shimmer dourado */}
      <h3 className={styles.title}>
        <span className={styles.inner}>
          <span className={styles.shimmer}>
            Estatísticas WRC 2026 — EKO Acropolis Rally Greece (Etapa 8)
          </span>
        </span>
      </h3>

      <div className={styles.grid}>
        <div className={styles.headerRow}>
          <span>Pos.</span>
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