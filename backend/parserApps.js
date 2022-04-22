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
  Курсы валют:
  USDRUB ${item.USDRUB}
  EURRUB ${item.EURRUB}
`;

module.exports = {
  apps,
  news,
  kurs,
};
