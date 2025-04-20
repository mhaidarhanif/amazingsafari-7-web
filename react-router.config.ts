import { vercelPreset } from "@vercel/react-router/vite";
import type { Config } from "@react-router/dev/config";

export default {
  ssr: true, // client + server
  presets: [vercelPreset()],
} satisfies Config;
