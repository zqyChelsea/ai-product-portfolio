# 张沁烨 · AI 产品经理作品集

浅色代码编辑器风格的个人作品集。包含文件树、标签页、快捷搜索（⌘ / Ctrl + K）、可跳过的代码雨开场，以及简体中文、香港繁体中文、英文内容。

## Local development

```bash
npm install
npm run dev
```

## Deployment

`main` 分支更新后，GitHub Actions 会自动构建并发布到 GitHub Pages。

```bash
NEXT_PUBLIC_BASE_PATH=/ai-product-portfolio npm run build:github
npm run lint
node scripts/check-export.mjs
```

默认入口为简体中文。语言首页为 `/zh-cn/`、`/zh-hk/`、`/en/`，内容文件位于 `/<locale>/files/<file>/`，均静态导出，支持直接访问和刷新。

## 内容维护

- `app/content.ts`：项目与实习案例，每段文字按简中、繁中、英文顺序存储。
- `app/components/Editor.tsx`：编辑器交互、个人介绍与简历。
- `app/globals.css`：响应式视觉系统、动画与打印样式。
- `public/profile/`：已缩放并去除 EXIF 元数据的 WebP 照片。

仅发布脱敏案例，不上传内部系统入口、真实用户会话、候选人信息或原始内部附件。公开网页简历可通过浏览器打印保存为 PDF；不会附带未经审查的原始简历文件。
