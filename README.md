# HmEditor 模板制作工具前端 <br/>

[![Angular](https://img.shields.io/badge/Angular-4.x-red)](https://angular.io/) [![PrimeNG](https://img.shields.io/badge/PrimeNG-4.1.2-blue)](https://www.primefaces.org/primeng/) [![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue)](https://www.typescriptlang.org/) [![License: LGPL v2.1](https://img.shields.io/badge/License-LGPL%20v2.1-blue.svg)](https://www.gnu.org/licenses/lgpl-2.1.html)

> **HmEditor Admin Web** 是 HmEditor 电子病历编辑器的模板制作与数据元管理前端工具，对应后端服务为 `hm_editor.admin.service`。

---

## 📚 目录
- [HmEditor 模板制作工具前端 ](#hmeditor-模板制作工具前端-)
  - [📚 目录](#-目录)
  - [主要功能模块](#主要功能模块)
  - [技术栈与依赖环境](#技术栈与依赖环境)
  - [开发环境搭建](#开发环境搭建)
  - [构建生产环境](#构建生产环境)
  - [Docker 部署](#docker-部署)
  - [贡献指南](#贡献指南)
  - [其他说明](#其他说明)

---

## 主要功能模块
- **模板制作**：支持电子病历等多类型模板的创建、编辑、发布与版本管理。
- **数据元管理**：支持数据元的维护、查询与管理，便于模板字段标准化。

---

## 技术栈与依赖环境
- **框架**：Angular 4.x
- **UI 组件**：PrimeNG 4.1.2
- **响应式编程**：RxJS 5.x
- **图标库**：Font Awesome 4.x
- **语言**：TypeScript 2.x
- **其他依赖**：jQuery、ng2-file-upload、date-fns、underscore 等

---

## 开发环境搭建

```bash
# 安装依赖
npm install

# 启动开发服务器（默认端口 23071）
npm start
```

---

## 构建生产环境

```bash
# 构建生产环境代码
npm run build
```

---

## Docker 部署

项目自带 Dockerfile，可用于容器化部署：

```bash
docker build -t your_repo/hm_editor_admin_web .
docker run -d -p 23071:23071 your_repo/hm_editor_admin_web
```

---

## 贡献指南

欢迎提交 Issue 和 Pull Request！如有建议或发现问题，欢迎反馈。

---

## 其他说明
- 前端所有 UI 组件均基于 PrimeNG 实现。
- 如需配合后端服务，请确保 `hm_editor.admin.service` 已正确部署并配置 API 地址。
