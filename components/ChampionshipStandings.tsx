// ChampionshipStandings.tsx — classificação completa do campeonato de pilotos
"use client";

import { useEffect, useRef } from "react";
import styles from "./Championship.module.css";

const CLASSIFICACAO_PILOTOS_2026 = [
  { posicao: "1", piloto: "Elfyn Evans", equipe: "Toyota", pontos: "201" },
  { posicao: "2", piloto: "Sami Pajari", equipe: "Toyota", pontos: "171" },
  { posicao: "3", piloto: "Takamoto Katsuta", equipe: "Toyota", pontos: "160" },
  { posicao: "4", piloto: "Oliver Solberg", equipe: "Toyota", pontos: "156" },
  { posicao: "5", piloto: "Sébastien Ogier", equipe: "Toyota", pontos: "139" },
  { posicao: "6", piloto: "Adrien Fourmaux", equipe: "Hyundai", pontos: "129" },
  { posicao: "7", piloto: "Thierry Neuville", equipe: "Hyundai", pontos: "125" },
  { posicao: "8", piloto: "Esapekka Lappi", equipe: "Hyundai", pontos: "25" },
  { posicao: "9", piloto: "Hayden Paddon", equipe: "Hyundai", pontos: "21" },
  { posicao: "10", piloto: "Joshua McErlean", equipe: "Ford", pontos: "21" },
  { posicao: "11", piloto: "Yohan Rossel", equipe: "Lancia", pontos: "20" },
  { posicao: "12", piloto: "Léo Rossel", equipe: "Citroen", pontos: "18" },
  { posicao: "13", piloto: "Jon Armstrong", equipe: "Ford", pontos: "16" },
  { posicao: "14", piloto: "Robert Virves", equipe: "Skoda", pontos: "15" },
  { posicao: "15", piloto: "Mārtinš Sesks", equipe: "Ford", pontos: "12" },
  { posicao: "16", piloto: "Nikolay Gryazin", equipe: "Lancia", pontos: "10" },
  { posicao: "17", piloto: "Dani Sordo", equipe: "Hyundai", pontos: "10" },
  { posicao: "18", piloto: "Gus Greensmith", equipe: "Toyota", pontos: "8" },
  { posicao: "19", piloto: "Alejandro Cachón", equipe: "Toyota", pontos: "7" },
  { posicao: "20", piloto: "Fau Zaldívar", equipe: "Skoda", pontos: "6" },
];

export default function ChampionshipStandings() {
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
      <h3 className={styles.title}>
        <span className={styles.inner}>
          <span className={styles.shimmer}>
            Classificação do Campeonato — Pilotos 2026 (após Etapa 10/14)
          </span>
        </span>
      </h3>

      <div className={styles.grid}>
        <div className={styles.headerRow}>
          <span>Pos.</span>
          <span>Piloto</span>
          <span>Equipe</span>
          <span>Pontos</span>
        </div>

        {CLASSIFICACAO_PILOTOS_2026.map((item) => (
          <div key={item.posicao} className={styles.row}>
            <span>{item.posicao}</span>
            <span>{item.piloto}</span>
            <span>{item.equipe}</span>
            <span>{item.pontos}</span>
          </div>
        ))}
      </div>
    </section>
  );
}