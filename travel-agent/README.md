# Kansai Journey Agent

一个与作品集分开的、可运行的五日关西规划应用。前端借鉴 Trip.Planner 的「助手 / 景点 / 行程」工作台结构，但使用独立品牌和原创样式。用户在生成前选择日期、预算、公共交通、周边城市、兴趣，以及大阪城、环球影城、阿倍野 Harukas 等必去景点；选项不合适时才输入自定义内容。

## 运行

需要 Node.js 22+，无第三方运行依赖。

1. 复制 `.env.example` 为 `.env`，保留 `DATA_MODE=fixture` 先体验流程。不要把真实密钥提交到仓库。
2. 在本目录运行 `npm run dev`，打开 `http://localhost:4300/`。
3. 运行 `npm test` 检查日期、必去景点、样例标记和预算边界。

公开的 [GitHub Pages 前端](https://zqychelsea.github.io/ai-product-portfolio/travel-agent/) 包含已标明的样例方案。GitHub Pages 不能运行服务端或安全保存 API Key，因此「生成可行路线」需要另行部署此服务端，在页面的「连接你的规划服务」填写其 HTTPS 地址，并把该页面的 origin 加入 `ALLOWED_ORIGIN`。页面只保存服务地址，不保存密钥。

## Agent 工作流

`POST /api/plan` 先验证五日四夜、预算、景点 ID 和偏好，然后：

1. 根据兴趣提议景点；必去景点是硬约束。环球影城预留整天，周边城市最多一天。安排不下的项目进入 `unresolved`，不会被静默删除。
2. 并行向机票、酒店、景点门票与交通网关请求数据。航班严格筛选 `HKG → KIX`；往返关西机场的公共交通计入预算，公共交通选项不接受驾车路线。
3. 对同一天景点比较已返回的车程、费用、换乘次数；没有完整交通数据时只给地理草案，不伪造车次与分钟数。
4. 预算模块计算机票、四晚酒店、交通、门票和明确标注的餐费假设。缺少报价或 JPY/HKD 汇率则为 `unknown`，样例模式为 `sample`，不会宣称「预算内」。
5. 若配置兼容 `/chat/completions` 的语言模型，Agent 解释取舍与可改进项。路线、费用、来源及预算由服务端规则和供应商数据确定，语言模型不可改写。

`CLAUDE.md` 记录项目约束；`skills/` 分别定义景点发现、授权数据、顺路规划与预算校验。密钥变量按要求使用 `xxxxx-api`，URL 用 `xxxxx-url` 占位。

## 授权数据适配

`DATA_MODE=live` 不使用样例兜底。当前客户端请求的是你拥有的**规范化网关**，不是臆造的 Trip.com 或 JR 官方公共 API；拿到正式合作文档后，要在网关里映射实际字段、认证方式和限流。仅替换 URL/Key 而不做字段映射通常无法直接接通。

| 请求 | 网关路径 | 最小请求字段 | 返回要求 |
| --- | --- | --- | --- |
| 机票 | `POST /flights/search` | `origin,destination,departureDate,returnDate,passengers,currency` | `options[]`，每项含 `origin,destination,amount,currency,source,quotedAt` |
| 酒店 | `POST /hotels/search` | `city,checkIn,checkOut,rooms,adults,currency,preferredDistricts` | `options[]`，每项含四晚总价及 `source,quotedAt` |
| 景点票 | `POST /attractions/quotes` | `ids,date,currency` | 每个付费景点一条 `id,amount,currency,source,quotedAt` |
| 公共交通 | `POST /routes/batch` | `legs[{day,from,to}],departureDate,transport,avoidDriving` | 每条候选边一条 `day,from,to,mode,durationMinutes,transfers,amount,currency,source,quotedAt` |

所有响应顶层为 `{ "options": [...] }`；金额非负，机酒币种 HKD、交通/门票 JPY，报价时间必须在 30 分钟内。机票 `amount` 应是含税的往返单人总价，酒店应是四晚总价，交通是单条乘车路线费用，门票是单人入场费。`bookingUrl` 可选且只允许 HTTPS。`JPY_PER_HKD` 是服务端配置汇率，界面会说明它尚需核对。生产版应换成有来源时间戳的汇率服务，并补上库存有效期、航班落地时间、酒店取消条件、营业时间和无障碍路由。

Trip.com 的[开发者平台](https://developers.trip.com/?lang=en-US)是合作接入入口；[JR 西日本](https://www.jr-odekake.net/railroad/index.html)和[大阪地铁](https://kensaku.osakametro.co.jp/route/howto/en.html)提供旅客查询页面。JR 与大阪地铁是不同运营体系；这些网页不是通用、授权的机器读取接口，本项目不抓取网页充当实时 API。

## 仍需完成的生产接入

- 取得 Trip.com/其他供应商的机酒和门票接入资格、实际 schema 与沙箱凭据。
- 取得覆盖 JR、私铁与 Osaka Metro 的合法交通路线/票价数据源；目前的网关契约为接入点，不代表已获授权。
- 在独立服务器部署此项目并设置真实密钥、HTTPS、允许的前端 origin、观测与限流策略。公开演示默认样例数据，不能用于订票。
