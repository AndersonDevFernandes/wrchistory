"use client";

import { useState, useEffect } from "react";
import carrosData from "@/data/carros.json";
import styles from "./Carrossel.module.css";
import VideoPlayer from "./VideoPlayer";

interface Carro {
  id: string;
  nome: string;
  anos: string;
  categoria: string;
  motor: string;
  potencia: string;
  tração: string;
  campeonatos: number;
  pilotos: string[];
  descricao: string;
  curiosidade: string;
  cor: string;
  imagem: string;
  video: string;
}

const ORDEM_IDS = [
  "lancia-stratos",
  "audi-quattro",
  "toyota-celica",
  "lancia-delta",
  "peugeot-205",
  "citroen-c4",
  "subaru-impreza",
  "mitsubishi-lancer-evo",
  "renault-5",
  "ford-fiesta-wrc",
  "toyota-gr-yaris",
  "hyundai-i20n",
];

export default function Carrossel() {
  const [carroSelecionado, setCarroSelecionado] = useState<Carro | null>(null);
  const [videoAberto, setVideoAberto] = useState(false);
  const [isLandscape, setIsLandscape] = useState(true);

  const carrosMap: Record<string, Carro> = Object.fromEntries(
    (carrosData as Carro[]).map((c) => [c.id, c])
  );

  useEffect(() => {
    const checkOrientation = () => {
      const landscape = window.matchMedia("(orientation: landscape)").matches;
      setIsLandscape(landscape);
    };

    checkOrientation();
    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("resize", checkOrientation);

    return () => {
      window.removeEventListener("orientationchange", checkOrientation);
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  function handleClicar(id: string) {
    const carro = carrosMap[id];
    if (!carro) return;
    if (carroSelecionado?.id === id) {
      setCarroSelecionado(null);
      setVideoAberto(false);
    } else {
      setCarroSelecionado(carro);
      setVideoAberto(false); // reseta o player ao trocar de carro
    }
  }

  function handleFechar() {
    setCarroSelecionado(null);
    setVideoAberto(false);
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const videoDisabled = isMobile && !isLandscape;

  return (
    <div className={styles.wrapper}>
      <section className={styles.carsBar}>
        <ul className={styles.carsList}>
          {ORDEM_IDS.map((id) => {
            const carro = carrosMap[id];
            return (
              <li key={id}>
                <div
                  className={styles.iconContainer}
                  data-name={carro?.nome}
                  onClick={() => handleClicar(id)}
                >
                  <img
                    className={styles.carIcon}
                    src={carro?.imagem}
                    alt={carro?.nome}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <div className={styles.painel}>
        {carroSelecionado ? (
          <div className={styles.glass}>
            {/* Botão fechar */}
            <button className={styles.fechar} onClick={handleFechar} aria-label="Fechar">
              ✕
            </button>

            <div className={styles.carroLayout}>
              <div className={styles.carroImagemCol}>
                <img
                  src={carroSelecionado.imagem}
                  alt={carroSelecionado.nome}
                  className={styles.carroImagem}
                />
              </div>

              <div className={styles.carroInfoCol}>
                {/* Cabeçalho */}
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardNome} style={{ color: carroSelecionado.cor }}>
                      {carroSelecionado.nome}
                    </h2>
                    <p className={styles.cardAnos}>{carroSelecionado.anos}</p>
                  </div>
                  <span className={styles.badge}>{carroSelecionado.categoria}</span>
                </div>

                {/* Descrição */}
                <p className={styles.descricao}>{carroSelecionado.descricao}</p>

                {/* Ficha técnica */}
                <div className={styles.fichaGrid}>
                  {[
                    { label: "Motor", valor: carroSelecionado.motor },
                    { label: "Potência", valor: carroSelecionado.potencia },
                    { label: "Tração", valor: carroSelecionado.tração },
                    {
                      label: "Títulos WRC",
                      valor: carroSelecionado.campeonatos > 0
                        ? `🏆 ${carroSelecionado.campeonatos}`
                        : "—",
                    },
                  ].map(({ label, valor }) => (
                    <div key={label} className={styles.fichaItem}>
                      <span className={styles.fichaLabel}>{label}</span>
                      <span className={styles.fichaValor}>{valor}</span>
                    </div>
                  ))}
                </div>

                {/* Pilotos */}
                <div className={styles.pilotos}>
                  <span className={styles.secaoLabel}>Pilotos notáveis</span>
                  <div className={styles.pilotosLista}>
                    {carroSelecionado.pilotos.map((p) => (
                      <span key={p} className={styles.pilotoTag}>{p}</span>
                    ))}
                  </div>
                </div>

                {/* Curiosidade */}
                <div
                  className={styles.curiosidade}
                  style={{ borderLeftColor: carroSelecionado.cor }}
                >
                  <span className={styles.secaoLabel}>💡 Curiosidade</span>
                  <p>{carroSelecionado.curiosidade}</p>
                </div>

                {/* ── Seção de vídeo ── */}
                <div className={styles.videoSecao}>
                  {videoDisabled ? (
                    <button
                      className={styles.btnVideo}
                      style={{ borderColor: carroSelecionado.cor, color: carroSelecionado.cor, opacity: 0.5, cursor: "not-allowed" }}
                      disabled
                      title="Vídeo disponível apenas em landscape"
                    >
                      ▶ Gire para landscape
                    </button>
                  ) : !videoAberto ? (
                    <button
                      className={styles.btnVideo}
                      style={{ borderColor: carroSelecionado.cor, color: carroSelecionado.cor }}
                      onClick={() => setVideoAberto(true)}
                    >
                      ▶ Ver vídeo do {carroSelecionado.nome}
                    </button>
                  ) : (
                    <VideoPlayer
                      url={carroSelecionado.video}
                      nome={carroSelecionado.nome}
                      cor={carroSelecionado.cor}
                      styles={styles}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.heroStandalone}>
            <h1 className={styles.heroTitulo}>WRC HISTORY</h1>
            <h3 className={styles.heroSubtitulo}>Role Para baixo e confira nosso conteúdo</h3>
            <h3 className={styles.heroSubtitulo}>↡</h3>
            <div className={styles.rallyCar} aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}
