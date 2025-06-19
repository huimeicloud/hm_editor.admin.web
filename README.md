# 惠每电子病历编辑器模板制作工具-前端

本项目是 HmEditor 自带的模板制作与数据元管理工具的前端部分，对应后台服务为 "hm_editor.admin.service"。

## 主要功能模块
- **模板制作**：支持电子病历等多类型模板的创建、编辑、发布与版本管理。
- **数据元管理**：支持数据元的维护、查询与管理，便于模板字段标准化。

## 技术栈与依赖环境
- Angular 4.x
- PrimeNG 4.1.2
- RxJS 5.x
- Font Awesome 4.x
- TypeScript 2.x
- 其他依赖：jQuery、ng2-file-upload、date-fns、underscore 等

## 开发环境搭建

```bash
# 安装依赖
npm install

# 启动开发服务器（默认端口23071）
npm start
```

## 构建生产环境

```bash
# 构建生产环境代码
npm run build
```

## Docker 部署

项目自带 Dockerfile，可用于容器化部署：

```bash
docker build -t your_repo/hm_editor_admin_web .
docker run -d -p 23071:23071 your_repo/hm_editor_admin_web
```

## 其他说明
- 前端所有 UI 组件均基于 PrimeNG 实现。
- 如需配合后端服务，请确保 "hm_editor.admin.service" 已正确部署并配置 API 地址。
