import styles from "./TextContent.module.css";

export default function TextContent() {
  return (
    <section className={styles.section}>
      <p className={styles.heroSubtitulo}>Os Maiores Carros da Historia do WRC</p>
      <p className={styles.heroTexto}>
        Explore a era dourada do World Rally Championship e descubra os carros que redefiniram o
        limite entre tecnologia, potencia e controle.
      </p>
      <p className={styles.heroTexto}>
        De lendas do Grupo B ate os Rally1 modernos, cada maquina nesta pagina representa uma fase
        historica do campeonato e uma revolucao na engenharia do automobilismo.
      </p>

      <h3 className={styles.heroSecaoTitulo}>Muito mais que velocidade</h3>
      <p className={styles.heroTexto}>
        Aqui, vencer exige desempenho em qualquer terreno: lama, neve, cascalho e asfalto. A
        combinacao entre confiabilidade mecanica e pilotagem de elite decide cada etapa.
      </p>

      <h3 className={styles.heroSecaoTitulo}>Engenharia e inovacao</h3>
      <p className={styles.heroTexto}>
        Tracao integral, aerodinamica ativa e motores turbo de alta resposta transformaram o WRC
        em um laboratorio de inovacao que influenciou carros de rua no mundo todo.
      </p>
    </section>
  );
}
