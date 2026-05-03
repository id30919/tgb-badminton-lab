import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 針對 GitHub Pages 的部署路徑設定
  // 格式為 '/專案名稱/'，確保編譯後的資產路徑正確
  base: '/tgb-badminton-lab/', 
})