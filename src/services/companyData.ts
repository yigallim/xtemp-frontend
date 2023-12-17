export type CompanyData = {
  name: string;
  image: string;
  contact: string;
  location: string;
  description: string;
};

export function getCompanyData() : CompanyData {
  return {
    name: "Delicious Eats",
    image: "/banner.png",
    contact: "123-456-7890",
    location: "123 Food Street, Flavor Town",
    description: "Serving the best dishes from around the world.",
  };
}
