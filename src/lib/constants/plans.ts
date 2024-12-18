export const SUBSCRIPTION_PLANS = {
  basic: {
    name: "Базовый",
    description: "Базовый набор каналов",
    monthlyPrice: 7.47,
    quarterlyPrice: 19.99,
    yearlyPrice: 79.99,
    features: [
      "3 основных канала",
      "HD качество",
      "Просмотр на 2 устройствах",
      "7-дневный архив",
      "Поддержка 24/7"
    ]
  },
  adult: {
    name: "Взрослый 18+",
    description: "Развлекательный контент для взрослых",
    monthlyPrice: 14.99,
    quarterlyPrice: 39.99,
    yearlyPrice: 149.99,
    features: [
      "Все каналы базового пакета",
      "Контент 18+",
      "4K Ultra HD качество",
      "Просмотр на 4 устройствах",
      "30-дневный архив",
      "Без рекламы"
    ]
  },
  sport: {
    name: "Спортивный",
    description: "Все виды спорта",
    monthlyPrice: 19.99,
    quarterlyPrice: 49.99,
    yearlyPrice: 189.99,
    features: [
      "Все каналы базового пакета",
      "Премиум спортивный контент",
      "Прямые трансляции",
      "4K Ultra HD качество",
      "Мультиэкранный режим",
      "Спортивная статистика"
    ]
  },
  vip: {
    name: "VIP ALL",
    description: "Максимальный пакет развлечений",
    monthlyPrice: 24.99,
    quarterlyPrice: 64.99,
    yearlyPrice: 239.99,
    features: [
      "Все доступные каналы",
      "4K Ultra HD качество",
      "Просмотр на 6 устройствах",
      "90-дневный архив",
      "Приоритетная поддержка",
      "Эксклюзивный контент"
    ]
  }
} as const;