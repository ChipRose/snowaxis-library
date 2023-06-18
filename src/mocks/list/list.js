import { faker } from '@faker-js/faker';

export const getRandomItem = () => ({
  id: faker.datatype.uuid(),
  product: faker.commerce.productMaterial(),
  dateTo: faker.date.future().toDateString(),
  country: faker.address.country(),
  company: faker.company.bs(),
  collapsible: {
    material: faker.commerce.productMaterial(),
    description:faker.commerce.productDescription(),
    extraInfo: faker.lorem.paragraph(3)
  }
})