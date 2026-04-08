"use client";

import { useState, useEffect, useCallback } from "react";

interface VideoPlayerProps {
  url: string;
  nome: string;
  cor: string;
  styles: Record<string, string>;
}

function parseYouTube(url: string): { id: string; thumb: string; embedUrl: string } | null {
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  const longMatch  = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  const id = shortMatch?.[1] ?? longMatch?.[1];
  if (!id) return null;
  return {
    id,
    thumb:    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`,
  };
}

export default function VideoPlayer({ url, nome, cor, styles }: VideoPlayerProps) {
  const [modalAberto, setModalAberto] = useState(false);
  const parsed = parseYouTube(url);

  const fecharModal = useCallback(() => setModalAberto(false), []);

  useEffect(() => {
    if (!modalAberto) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") fecharModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalAberto, fecharModal]);

  useEffect(() => {
    document.body.style.overflow = modalAberto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalAberto]);

  if (!parsed) {
    return <p style={{ color: "#aaa", fontSize: "0.85rem" }}>Vídeo indisponível.</p>;
  }

  return (
    <>
      {/* ── Thumbnail clicável ── */}
      <button
        onClick={() => setModalAberto(true)}
        aria-label={`Reproduzir vídeo: ${nome}`}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          padding: 0,
          border: `2px solid ${cor}44`,
          borderRadius: "10px",
          cursor: "pointer",
          background: "#000",
          overflow: "hidden",
          display: "block",
        }}
      >
        <img
          src={parsed.thumb}
          alt={`Preview: ${nome}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75, display: "block" }}
        />
        <span style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
        }} />
        <span style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            width: "60px", height: "60px", borderRadius: "50%",
            background: cor,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 32px ${cor}88`,
          }}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
        <span style={{
          position: "absolute", bottom: "0.75rem", left: "0.9rem",
          color: "#fff", fontSize: "0.8rem", fontWeight: 700,
          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          textTransform: "uppercase", letterSpacing: "0.06em",
          fontFamily: "var(--font-khand), 'Segoe UI', sans-serif",
        }}>
          ▶ {nome}
        </span>
      </button>

      {/* ── Modal fullscreen ── */}
      {modalAberto && (
        <div
          onClick={fecharModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
            animation: "fadeInModal 0.22s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(92vw, 1020px)",
              aspectRatio: "16 / 9",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: `0 0 0 2px ${cor}55, 0 32px 80px rgba(0,0,0,0.8)`,
              animation: "scaleInModal 0.24s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <iframe
              src={parsed.embedUrl}
              title={`Vídeo: ${nome}`}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <button
            onClick={fecharModal}
            aria-label="Fechar vídeo"
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(207,4,4,0.75)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeInModal {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleInModal {
          from { transform: scale(0.88); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
      `}</style>
    </>
  );
}
