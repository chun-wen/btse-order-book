# Demo 展示
| 影片 
| ---- | 
|   <img style="width: 350px" src='' alt='demo video' />   |  

## 專案結構

btse/
├── src/  
│ ├── app/  
│ │ ├── page.tsx  
│ │ ├── layout.tsx  
│ │ └── globals.css  
│ ├── components/  
│ │ ├── Table.tsx  
│ │ ├── Arrow.tsx  
│ │ └── Container.tsx
│ ├── context/
│ │ └── WebSocketContext   
│ ├── features/  
│ │ ├── order-book/  
│ │ └── trade/  
│ ├── hooks/  
│ │ ├── useWebSocket  
│ ├── utils/  
│ └── constant.ts  
├── public/  
├── next.config.ts  
├── package.json  
├── tsconfig.json  
└── tailwind.config.js

## 技術棧 (Tech Stack)

- **前端框架**：

  - Next.js 15.2.1
  - React 19
  - TypeScript

- **樣式**：

  - Tailwind CSS 4.0
  - tailwind-merge
  - clsx

- **狀態管理與數據流**：

  - 自定義 hooks 管理數據獲取和狀態
  - WebSocket Provider 共享數據

- **開發工具**：
  - ESLint 9
  - Prettier
  - Husky

## 系統設計說明

### 核心功能模塊

1. **訂單簿 (Order Book)**

   - 實時顯示買入和賣出訂單
   - 使用 WebSocket 實時接收訂單數據
   - 數據按價格排序並限制顯示最大數量（通過 MAX_DISPLAYED_ORDERS 常量控制）

2. **交易 (Trade)**

   - 顯示最新的交易價格記錄
   - 追蹤價格變動趨勢

3. **WebSocket 通信**
   - 使用 WebSocketProvider 封裝 WebSocket 連接邏輯
   - 實現實時數據訂閱和更新

### **數據流設計**

1. **訂單簿數據流**：

   - WebSocket 連接訂閱訂單簿數據
   - 通過 useOrderBook hook 處理和格式化訂單數據
   - 使用工具函數 getAsksOrderBookTableData 和 getBidsOrderBookTableData 轉換數據格式
   - 由 OrderBookTable 元件負責渲染數據

2. **最新交易價格記錄**：
   - 使用 useLatestTradePriceRecord hook 獲取最新交易價格
   - 提供價格變動趨勢指示

### UI 組件設計

- **表格組件 (Table.tsx)**：用於顯示訂單簿數據
- **箭頭組件 (Arrow.tsx)**：指示價格變動方向
- **容器組件 (Container.tsx)**：提供一致的佈局容器
