# وحدة الدوري (League Module)

## نظرة عامة

وحدة الدوري مسؤولة عن جميع الوظائف المتعلقة بإدارة وعرض الدوريات في تطبيق Ballot.

## المسؤوليات

- إنشاء وإدارة الدوريات
- عرض معلومات الدوري والمباريات
- إدارة المشاركين في الدوري
- نظام الترتيب والنقاط
- الدردشة داخل الدوري
- الجوائز والإعلانات

## هيكل الوحدة

```
modules/frontend_ballot_league/
├── components/              # مكونات الدوري
│   ├── league/             # مكونات عرض الدوري
│   │   ├── Champions.tsx
│   │   ├── Chat.tsx
│   │   ├── CreateLeagueButton.tsx
│   │   ├── GradientText.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── LeagueItem.tsx
│   │   ├── Match.tsx
│   │   ├── NewChat.tsx
│   │   ├── Overview.tsx
│   │   └── Plan.tsx
│   └── createLeague/       # مكونات إنشاء الدوري
│       ├── AlertFeature.tsx
│       ├── DiamondBox.tsx
│       ├── FeatureBox.tsx
│       ├── FeatureCard.tsx
│       ├── FeatureModal.tsx
│       ├── Features.tsx
│       ├── GiftCard.tsx
│       ├── GiftSection.tsx
│       ├── LeagueSettingsModal.tsx
│       ├── LeagueSettingsModal2.tsx
│       ├── Money.tsx
│       ├── SessionSettings.tsx
│       ├── TimeSet.tsx
│       ├── VoiceChatModal.tsx
│       ├── WinnerAward.tsx
│       └── icons.ts
├── screens/                # شاشات الدوري
│   ├── League.tsx         # شاشة الدوري الرئيسية
│   └── CreateLeague.tsx   # شاشة إنشاء الدوري
├── schema/                # GraphQL schemas
│   └── league.ts          # طلبات الدوري
├── types/                 # أنواع TypeScript
│   ├── league.ts          # أنواع الدوري
│   └── components/
│       └── createLeague.ts
├── assets/                # أصول الدوري
│   ├── icons.ts
│   └── Vector (2).svg
├── index.ts              # صادرات الوحدة
└── README.md            # هذا الملف
```

## الاستخدام

```typescript
import {
  League,
  CreateLeague,
  LeagueType,
  CreateLeagueInput,
} from '@frontend_ballot/league';
```

## التبعيات

هذه الوحدة تعتمد على:

- `@apollo/client` للاستعلامات GraphQL
- `expo-router` للتنقل
- `react-native-reanimated` للرسوم المتحركة
- `react-native-svg` للأيقونات والرسومات

## التطوير

### إضافة مكون جديد

1. أضف المكون في المجلد المناسب (`components/league` أو `components/createLeague`)
2. قم بتصديره من `index.ts`
3. حدّث هذا الملف لتوثيق المكون الجديد

### تعديل الأنواع

جميع أنواع TypeScript موجودة في مجلد `types/`. تأكد من تحديث الأنواع عند إضافة ميزات جديدة.

## الملاحظات

- هذه وحدة مستقلة ويمكن استخدامها في مشاريع أخرى
- تأكد من عدم إضافة تبعيات خارجية غير ضرورية
- اتبع نفس نمط البرمجة المستخدم في باقي المشروع
