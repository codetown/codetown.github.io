# 刘川 · 个人技术主页

一个无构建步骤的静态个人技术网站，使用 HTML、CSS、JavaScript 编写，可直接部署到 GitHub Pages。

## 本地预览

直接用浏览器打开 `index.html` 即可预览。若想使用本地 HTTP 服务，也可以在此目录运行：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 发布到 GitHub Pages

简历中记录的个人主页地址是 `https://codetown.github.io`。如果该地址属于你的 GitHub 账号，可按以下步骤更新：

1. 登录 GitHub，打开或创建名为 **`codetown.github.io`** 的仓库（仓库名必须与账号名完全对应）。
2. 将本目录中的 `index.html`、`styles.css`、`script.js`、`favicon.svg` 上传到仓库根目录。`README.md` 也可以一并上传。
3. 进入仓库 **Settings → Pages**。
4. 在 **Build and deployment** 中选择 **Deploy from a branch**，分支选 `main`，目录选 `/(root)`，保存。
5. 等待 GitHub Pages 构建完成，然后打开 `https://codetown.github.io` 查看。

如果你计划把网站放在另一个仓库（例如 `portfolio`），GitHub Pages 的访问地址会是 `https://你的用户名.github.io/portfolio/`；这种情况下也可以把项目文件放在该仓库根目录。

## 更新前请确认

- GitHub 链接目前按简历中的 `https://codetown.github.io` 对应的用户名 `codetown` 配置。若你的实际用户名不同，请在 `index.html` 中搜索 `codetown` 并替换。
- 公开主页只显示邮箱，没有公开简历中的手机号码，以减少个人联系方式被自动采集的风险。
- 项目介绍根据简历中的经历概括，未虚构指标、客户名称或项目成果数据。
- 网站使用 Google Fonts 加载 Manrope、Noto Sans SC 与 DM Mono；若访问者无法连接 Google Fonts，会自动回退到系统字体。页面核心内容与功能不依赖外部服务。

## 文件说明

- `index.html`：网站内容、SEO 元信息与结构化个人资料
- `styles.css`：响应式样式、深浅主题和项目视觉效果
- `script.js`：主题切换、移动端导航、项目筛选、邮箱复制和滚动显现
- `favicon.svg`：站点图标
