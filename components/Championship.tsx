"use client";

import { useEffect, useRef } from "react";
import styles from "./Championship.module.css";

const ESTATISTICAS_2026 = [
  {
    ranking: "1",
    tempo: "2h 43m 18.9s",
    piloto: "Sébastien Ogier",
    equipe: "Toyota Gazoo Racing",
    modelo: "Toyota GR Yaris Rally1",
  },
  {
    ranking: "2",
    tempo: "+19.9s",
    piloto: "Elfyn Evans",
    equipe: "Toyota Gazoo Racing",
    modelo: "Toyota GR Yaris Rally1",
  },
  {
    ranking: "3",
    tempo: "+1m 40.8s",
    piloto: "Sami Pajari",
    equipe: "Toyota Gazoo Racing WRT2",
    modelo: "Toyota GR Yaris Rally1",
  },
  {
    ranking: "4",
    tempo: "+1m 51.2s",
    piloto: "Takamoto Katsuta",
    equipe: "Toyota Gazoo Racing",
    modelo: "Toyota GR Yaris Rally1",
  },
  {
    ranking: "5",
    tempo: "+3m 29.5s",
    piloto: "Adrien Fourmaux",
    equipe: "Hyundai Motorsport",
    modelo: "Hyundai i20 N Rally1",
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
            Estatísticas WRC 2026 — Rally Islas Canarias (Etapa 5)
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