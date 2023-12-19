export type RetailData = {
  name: string;
  image: string;
  contact: string;
  location: string;
  description: string;
};

export function getRetailData(): RetailData {
  return {
    name: "Halo Ramen",
    image: "/banner.png",
    contact: "018-3862118",
    location:
      "AEON Alpha Angle Shopping Centre, Jalan R1, Seksyen 1, 53300, Federal Territory of Kuala Lumpur",
    description: "Serving the best and authentic japanese cuisines. Since 4th June 1996",
  };
}

export function getRetailSeats() {
  return [
    "101",
    "102",
    "103",
    "104",
    "105",
    "106",
    "107",
    "108",
    "109",
    "110",
    "201",
    "202",
    "203",
    "204",
    "205",
    "206",
    "207",
    "208",
    "209",
    "210",
  ];
}
