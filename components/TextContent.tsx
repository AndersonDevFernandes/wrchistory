"use client";

import { useEffect, useRef } from "react";
import styles from "./TextContent.module.css";

export default function TextContent() {
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
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <p className={styles.heroSubtitulo}>Os Maiores Carros da Historia do WRC</p>

      <p className={styles.heroTexto}>
        Explore a era dourada do World Rally Championship e descubra os carros que redefiniram o
        limite entre tecnologia, potencia e controle.
      </p>
      <p className={styles.heroTexto}>
        De lendas do Grupo B ate os Rally1 modernos, cada maquina nesta pagina representa uma fase
        historica do campeonato e uma revolucao na engenharia do automobilismo.
      </p>

      {/* heading grande com clip-reveal + shimmer */}
      <h3 className={styles.heroSecaoTitulo}>
        <span className={styles.inner}>
          <span className={styles.shimmer}>Muito mais que velocidade</span>
        </span>
      </h3>
      <p className={styles.heroTexto}>
        Aqui, vencer exige desempenho em qualquer terreno: lama, neve, cascalho e asfalto. A
        combinacao entre confiabilidade mecanica e pilotagem de elite decide cada etapa.
      </p>

      <h3 className={styles.heroSecaoTitulo}>
        <span className={styles.inner}>
          <span className={styles.shimmer}>Engenharia e inovacao</span>
        </span>
      </h3>
      <p className={styles.heroTexto}>
        Tracao integral, aerodinamica ativa e motores turbo de alta resposta transformaram o WRC
        em um laboratorio de inovacao que influenciou carros de rua no mundo todo.
      </p>
    </section>
  );
}