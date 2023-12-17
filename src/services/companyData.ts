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
    location: "Lot G25A, Ground Floor, AEON Alpha Angle Shopping Centre, Jalan R1, Seksyen 1, 53300, Federal Territory of Kuala Lumpur",
    description: "Serving the japanese cuisines from around the world.",
  };
}