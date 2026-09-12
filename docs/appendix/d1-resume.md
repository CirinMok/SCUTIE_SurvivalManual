---
title: D.1 华工简历模板
pageClass: resume-page
---

# D.1 华工简历模板

一份用 **LaTeX** 写的单页简历模板，专门为华工同学求职准备。核心思路是**用调整排版的方式提高一页纸里的信息密度**，并提供超链接、脚注、非重点内容的排版示例。

配套 AI 工具使用效果最好——你只需要提要求、改 `main.tex` 里的内容，编译交给 LaTeX。

- **仓库（含源码与编译成品）**：[Linch4444/SCUT-Resume-](https://github.com/Linch4444/SCUT-Resume-)
- **基于**：[fky2015/resume-ng](https://github.com/fky2015/resume-ng) 改进，新增了竞赛、实践、社团等项目标题
- **已内置校徽**：华南理工、中山、华南农业、华南师范、暨南大学

## 效果预览

![华工简历模板效果预览](/resume-preview.png)

## 怎么用

### 第一步：拿到项目

```bash
git clone https://github.com/Linch4444/SCUT-Resume-.git
```

仓库里的 `粤港澳大湾区各大学简历/main/` 才是模板本体。目录结构：

| 文件 | 作用 |
|---|---|
| `main.tex` | **简历正文——只改这一个文件** |
| `resume.cls` | 模板样式，不要动 |
| `latexmkrc` | 编译配置（已指定 XeLaTeX） |
| `main.pdf` | 最新的编译成品，可直接投递 |
| `assets/` | 校徽、头像、牌坊、校训等图片素材 |

推荐用 VS Code 或 Notepad++ 打开 `main.tex`。**不要用 Word**，会破坏格式。

### 第二步：改内容

章节顺序是：**教育经历 → 技术能力 → 实习经历 → 项目与科研经历**。

一条经历的标准写法：

```latex
\ResumeItem{单位}{岗位}[一句话项目名][起始—结束]
{\zihao{5} 背景与任务，一句话说清问题和目标}
\begin{itemize}
    \item \textbf{加粗小标题}：具体做法、数据、结果
\end{itemize}
```

注意 `\ResumeItem` 的参数顺序：第一个 `{}` 是单位，第一个 `[]` 是岗位，第二个 `[]` 是时间，**别写反**。

换头像／校徽：把新图片按原名（`touxiang.jpg`／`xiaohui.png`）覆盖 `assets/` 里的文件即可。

### 第三步：编译成 PDF

**编译器必须是 XeLaTeX**，不能用 pdfLaTeX——中文和字体依赖它。

命令行最稳，在项目文件夹里打开终端：

```bash
xelatex main.tex
xelatex main.tex
```

**必须连着跑两遍**。校徽、头像、牌坊、校训都是用 `remember picture` 叠加定位的，需要上一遍 `.aux` 里记录的坐标；只跑一遍，装饰会错位或跑到别处。

其他两种方式：

- **VS Code**：装 LaTeX Workshop 插件，打开 `main.tex` 后保存即自动编译
- **Overleaf**：整个文件夹打包上传，编译器选 **XeLaTeX**

## 排版要点

**简历必须控制在一页。** 改完如果溢出成两页，优先删这些：

- 重复的收尾句
- 没有数字的形容词句
- 别人也能写的通用描述

**不要删量化成果**（例如「31.6% 降至 9%」「节省约 20 万元」）——那才是简历里最值钱的东西。

图片路径写的是 `assets/xxx`。如果移动或重命名图片，必须同步改 `main.tex` 里对应的 `\includegraphics`（共 6 处：校徽、头像、牌坊、校训三张），否则编译报错。

## 两个可调的装饰

模板右下角有华工五山校区石牌坊底纹，页脚有校训「博学 · 慎思 · 笃行」。两个都能调，也能关掉。

**石牌坊底纹**——在 `main.tex` 里搜 `south east`：

| 参数 | 说明 |
|---|---|
| `width` / `height` | 图案大小。想更宽就加大 `width`，**别超过 6.5cm**，会爬上最后两行正文 |
| `opacity` | 深浅。0 全透明，1 实色。**别调到 0.3 以上**，线条会明显压在文字上 |
| `inner sep` | 距页面右下角的距离 |

不想要，把那三行前面各加一个 `%` 注释掉。

**页脚校训**——在 `main.tex` 里搜 `boxue`：

| 参数 | 说明 |
|---|---|
| `height` | 字幅高度，**别超过 1.35cm**，会压到正文最后一行 |
| `opacity` | 深浅，想更醒目可以调到 1.0 |
| `\hspace{4cm}` | 两列之间的间距，**最大约 4.3cm**，再大「笃行」会压到牌坊上 |

## 一个提醒

模板本身只能帮你把纸面做得工整，**它不会替你想清楚要写什么**。简历上那些数字从哪来、项目怎么讲，取决于你前三年干了什么——那部分得回到[第二章 基本方向](/ch2/02-employment)去看。

---

> 本页素材来自 [Linch4444/SCUT-Resume-](https://github.com/Linch4444/SCUT-Resume-) 仓库的 README 说明。
> 模板基于 [resume-ng](https://github.com/fky2015/resume-ng) 二次开发。
