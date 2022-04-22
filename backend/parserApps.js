const apps = (item) => `
  <strong>${item.title}</strong>
  <strong>Дата ${item.day}.${item.month}.${item.year}</strong>
  <strong>Описание ${item.alt}</strong>
`;

const news = (item) => `
  ${item.urlToImage}
  ${item.title}
  ${item.description}
  ${item.content}
  ${item.publishedAt}
`;

const kurs = (item) => `
  Курсы Фиата:
  USDRUB ${item.USDRUB}
  EURRUB ${item.EURRUB}
  
  Курсы Крипты:
  BTCUSD ${item.BTCUSD}
  BTCRUB ${item.BTCRUB}
  BTCEUR ${item.BTCEUR}
  ETHRUB ${item.ETHRUB}
  ETHUSD ${item.ETHUSD}
  ETHEUR ${item.ETHEUR}
`;

module.exports = {
  apps,
  news,
  kurs,
};
