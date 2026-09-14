# SCUTIE_SurvivalManual 运维指南（接力开发者版）

> 给人类看的手册；给 AI agent 看的浓缩版在上级目录 `SKILL.md`。
> 仓库：https://github.com/Linch4444/SCUTIE_SurvivalManual
> 线上：https://linch4444.github.io/SCUTIE_SurvivalManual/
> 技术栈：VitePress 1.6.4 + Vue 3.5 + Node 22 · 部署：GitHub Actions → GitHub Pages

---

## 0. 关键事实（先记住这四条）

1. **内容源头只有一个：`docs/`**。早期整篇合稿在 `text/_archive/`，只存档不参与构建。
2. **侧边栏是自动生成的**（`docs/.vitepress/sidebar.mts` 扫目录）。加小节不用改配置，加**整章**必须改配置。
3. **`.workbuddy/skills/` 随仓库分发**（.gitignore 已豁免），里面是这个项目的接力开发技能和本指南。`.workbuddy/memory/` 是本机状态，不上传。
4. **推送 `main` 就自动上线**，约 45 秒生效，不需要手动发布。

---

## 1. 下次怎么 clone（完整恢复流程）

```bash
cd ~/Desktop
git clone https://github.com/Linch4444/SCUTIE_SurvivalManual.git
cd SCUTIE_SurvivalManual
npm install          # 首次必须；严格锁版本用 npm ci
npm run docs:dev     # 改完自动热刷新
```

**预览地址注意**：`config.mts` 里 `base = '/SCUTIE_SurvivalManual/'`，开发服务器实际挂在：

> http://localhost:5173/SCUTIE_SurvivalManual/

打开 `localhost:5173` 根路径是空白页属正常，加上 `/SCUTIE_SurvivalManual/` 就对了。

**只想要文件不想装环境**：`git clone --depth 1 ...`（代价：丢掉 git 历史，站点「最后更新于」在 CI 上不受影响，但本地查不了提交记录）。

**首次 clone 必做的一次性检查** —— 确认提交能算到你账号上：

```bash
git config user.name
git config user.email   # 必须是你 GitHub 账号里已验证的邮箱，否则 commit 不算贡献记录
```

不符就 `git config user.email "你的GitHub验证邮箱"`。HTTPS 推送需要 PAT 凭据，SSH 推送需配密钥并加到 GitHub 账号。

---

## 2. 改内容 → 提交 → 上线（标准流程）

```bash
git pull --rebase          # ① 先同步，避免推送被拒（网页端可能有人改过）
npm run docs:dev           # ② 开本地预览
# ③ 改文件（只改 docs/ 下的 .md）
git status && git diff     # ④ 确认只动了该动的
git add docs/ch2/03-internship.md
git commit -m "ch2: 补充实习时间线与信息来源"   # ⑤ 前缀风格：ch2: / ci: / docs:
git push                   # ⑥ 推送 → 自动部署
```

push 后看进度：https://github.com/Linch4444/SCUTIE_SurvivalManual/actions ，约 45 秒生效。

**push 被拒（non-fast-forward）**：远端有新提交。`git fetch` 看改了什么，没冲突就 `git pull --rebase` 再 push。**永远不要 `--force`**——这个仓库的维护者会直接在 GitHub 网页上改文件，强推会覆盖别人的提交。

**四种改法**：

| 方式 | 适合场景 | 代价 |
|---|---|---|
| 网页直接改 | 改错别字、一两句话 | 页底「在 GitHub 上编辑此页」→ 提交 |
| 提 Issue | 发现问题但没素材 | 说明哪页、哪里错、正确内容 |
| 本地小改 | 推荐，改完即预览 | 需装 Node 环境 |
| 本地大改 + PR | 大重构 / 外部贡献 | 分支上做，再提 PR |

---

## 3. 怎么增加章节

### 情况 A：给已有章节加一个小节（最常见，不改任何配置）

1. 对应章节目录下新建 `序号-英文短名.md`（序号两位）
2. frontmatter 的 `title` 只写小节名，**不带编号**

例：`docs/ch2/07-postgrad-recommend.md` + `title: 保研` → 侧边栏自动出现「2.7 保研」。

- **新小节一律加到章末尾**，编号顺延
- 插中间必须把后面文件整体重编号（`03→04`…）
- **不要**写 `025-xxx.md`：会被解析成 2.25

### 情况 B：新增一整章（必须改代码）

1. 建 `docs/ch4/01-xxx.md`
2. `sidebar.mts` 的 `chapters` 数组加 `buildChapter('ch4', 4, '第四章 XXX')`，导出对象加 `'/ch4/': chapters`
3. 默认设计是进统一侧边栏（不用动 config.mts）；只有想顶部导航单独入口才改 `nav`

### 附录：A/B/C/D 已预留，加页不改配置

文件放 `docs/appendix/`，首字母 `a`/`b`/`c`/`d` → 自动分组；编号写进 `title`（如 `title: D.1 常用工具`）。

### 写作约定（别破坏）

- 一节一页，`序号-英文短名.md`，frontmatter 必须有 `title`
- 短句、直白、敢下判断，允许吐槽和网络语
- 引入新事实 → 页脚注明来源和日期
- 两条铁律：**不编造**（没素材写「待补充」）、**不发散**（严格按既定框架写）
- 素材 PDF/DOC 放 `text/ChapterN/`，**不要放 `docs/`**（docs 下的一切都会被构建成页面）

---

## 4. CI/CD 怎么跑

配置：`.github/workflows/deploy.yml`。触发：push 到 `main`，或 Actions 页手动 `workflow_dispatch`。

```
push main
   ↓
[build job]  ubuntu-latest
   checkout@v7 (fetch-depth: 0) → setup-node@v7 (node 22, cache: npm)
   → configure-pages@v6 → npm ci → npm run docs:build → upload-pages-artifact@v5
   ↓
[deploy job]  environment: github-pages
   deploy-pages@v5  →  https://linch4444.github.io/SCUTIE_SurvivalManual/
```

设计要点：
- `permissions` 三项缺一不可：`contents: read`、`pages: write`、`id-token: write`
- `fetch-depth: 0` 是**故意的**（「最后更新于」依赖 git 提交时间）
- `npm ci` 严格要求 lock 一致 → **改 `package.json` 必须连 `package-lock.json` 一起提交**
- actions 已升 node24 运行时版本，别降回 v4 系

换新仓库才需要的一次性步骤：Settings → Pages → Source 选 **GitHub Actions**；仓库名非 `<用户名>.github.io` 时 `base` 改 `'/仓库名/'`。

---

## 5. 常见故障对照表

| 现象 | 原因 | 处理 |
|---|---|---|
| Actions 报 `Resource not accessible by integration` | Pages 未启用 | Settings → Pages → Source 改 GitHub Actions。GITHUB_TOKEN 无权建站点，无法自动化 |
| 线上白屏 / 404 | `base` 与仓库名不一致 | 改 `BASE` 常量；head 里资源路径不会自动加 base，必须 `${BASE}` 拼 |
| 「最后更新于」不对 | `fetch-depth` 非 0 | 保持 `fetch-depth: 0` |
| 本地 build 报错 | 页面语法 / frontmatter | 先本地构建拦截，别 push 试错 |
| push 被拒 | 远端有新提交 | `git pull --rebase` 再 push |
| 新小节侧边栏没出现 | 命名 / title 问题 | 检查 `序号-短名.md` 与 frontmatter |
| 侧边栏「2.25」编号 | 三位序号 | 改两位 |
| 改 package.json 后 CI 失败 | lock 没同步 | 一起 commit |

---

## 6. 日常速查

```bash
npm install
npm run docs:dev       # http://localhost:5173/SCUTIE_SurvivalManual/
npm run docs:build && npm run docs:preview   # 本地验证构建
git pull --rebase
git add <文件> && git commit -m "ch2: 说明" && git push
```

**黄金规则**：`docs/` 是唯一内容源；`text/` 只放素材和存档；`dist/` 是产物永远不手改；
`.workbuddy/skills/` 是要随仓库维护的经验沉淀，改完东西把新经验写回去。

---

## 7. 给接力 agent 的话

- 你（AI 助手）读的浓缩版技能在上级目录 `SKILL.md`，那里有更多环境坑和内容铁律
- 你的新踩坑经验**必须写回 `SKILL.md`**，这是本项目跨届传承的核心机制
- 你的本机临时状态写 `.workbuddy/memory/`（不上传）；跨届要传的写 skill
- 维护者（学弟学妹 + 他们的 agent）会在网页端直接改文件，永远先 pull 再 push，永不 force
