export type CompanyData = {
  name: string;
  image: string;
  contact: string;
  location: string;
  description: string;
};

export function getCompanyData() : CompanyData {
  return {
    name: "Halo Ramen",
    image: "/banner.png",
    contact: "018-3862118",
    location: "AEON Alpha Angle Shopping Centre, Jalan R1, Seksyen 1, 53300, Federal Territory of Kuala Lumpur",
    description: "Serving the best and authentic japanese cuisines. Since 4th June 1996",
  };
}