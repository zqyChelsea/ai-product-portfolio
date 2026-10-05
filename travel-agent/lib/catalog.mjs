export const attractions = [
  { id: "osaka-castle", name: "大阪城", en: "Osaka Castle", district: "central", interests: ["history", "culture"], hours: 2.5, ticket: "paid", latitude: 34.6873, longitude: 135.5262 },
  { id: "usj", name: "日本环球影城", en: "Universal Studios Japan", district: "bay", interests: ["anime", "entertainment"], hours: 7, ticket: "paid", latitude: 34.6654, longitude: 135.4323, fullDay: true },
  { id: "abeno-harukas", name: "阿倍野 Harukas", en: "Abeno Harukas", district: "tennoji", interests: ["views", "culture"], hours: 1.5, ticket: "paid", latitude: 34.6461, longitude: 135.5132 },
  { id: "shinsaibashi", name: "心斋桥", en: "Shinsaibashi", district: "namba", interests: ["food", "culture", "shopping"], hours: 1.5, ticket: "free", latitude: 34.6747, longitude: 135.5001 },
  { id: "dotonbori", name: "道顿堀", en: "Dotonbori", district: "namba", interests: ["food", "culture"], hours: 1.5, ticket: "free", latitude: 34.6688, longitude: 135.5013 },
  { id: "kaiyukan", name: "大阪海游馆", en: "Osaka Aquarium Kaiyukan", district: "bay", interests: ["nature", "family"], hours: 3, ticket: "paid", latitude: 34.6545, longitude: 135.4289 },
  { id: "umeda-sky", name: "梅田蓝天大厦", en: "Umeda Sky Building", district: "kita", interests: ["views", "culture"], hours: 1.5, ticket: "paid", latitude: 34.7052, longitude: 135.49 },
  { id: "nipponbashi", name: "日本桥电电城", en: "Nipponbashi Den Den Town", district: "namba", interests: ["anime", "shopping"], hours: 2, ticket: "free", latitude: 34.659, longitude: 135.506 },
  { id: "minoh", name: "箕面公园", en: "Minoh Park", district: "north", interests: ["nature", "views"], hours: 3.5, ticket: "free", latitude: 34.8545, longitude: 135.4713 },
  { id: "sumiyoshi", name: "住吉大社", en: "Sumiyoshi Taisha", district: "south", interests: ["history", "culture"], hours: 2, ticket: "free", latitude: 34.6123, longitude: 135.4925 },
];

export const officialSources = {
  trip: "https://developers.trip.com/?lang=en-US",
  jrWest: "https://www.jr-odekake.net/railroad/index.html",
  osakaMetro: "https://kensaku.osakametro.co.jp/route/howto/en.html",
};

export const byId = new Map(attractions.map((item) => [item.id, item]));

export function discoverAttractions(interests = [], chosen = []) {
  const wanted = new Set(interests);
  const pinned = new Set(chosen);
  return attractions
    .map((place) => ({
      ...place,
      selected: pinned.has(place.id),
      match: place.interests.filter((tag) => wanted.has(tag)).length,
    }))
    .sort((a, b) => Number(b.selected) - Number(a.selected) || b.match - a.match || a.name.localeCompare(b.name, "zh"));
}
