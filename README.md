# UNESCO 2026 - Chatbot Educativo

Chatbot interactivo de UNEFCO para consultas sobre legalización de certificados, certificados supletorios y información general.

## Arquitectura

```
UNESCO-DOCS (Repositorio de Documentos)
    │
    │   ← Yo actualizo los documentos aquí
    │
    ▼
UNESCO-2026 (Este Repo - Chat UI)
    │
    │   ← GitHub Pages sirve la interfaz
    │
    ▼
┌─────────────┐
│   Usuario   │
└─────────────┘
```

## Documentación

Los documentos fuente están en el repositorio [UNESCO-DOCS](https://github.com/GilmarCh1010/UNESCO-DOCS)

### Carpetas del Vault UNESCO-DOCS

- `legalizacion/` - Requisitos para legalización de certificados
- `supletorios/` - Requisitos para certificados supletorios
- `general/` - Información general de UNEFCO
- `certificados/` - Otros documentos sobre certificados

## Tech Stack

- **Frontend:** React + TypeScript + TailwindCSS + Vite
- **Hosting:** GitHub Pages
- **Docs:** Markdown en repositorio UNESCO-DOCS

## Desarrollo Local

```bash
npm install
npm run dev
```

---

*UNEFCO - Educación para Bolivia*