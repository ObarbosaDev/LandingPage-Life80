/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LIFE80_WHATSAPP_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
