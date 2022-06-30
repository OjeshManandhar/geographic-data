// packages
import { PrismaClient } from '@prisma/client';

// data
const flags = require('./../src/seedable/flags');
const states = require('./../src/seedable/states');
const countries = require('./../src/seedable/countries');
const continents = require('./../src/seedable/continents');
const currencies = require('./../src/seedable/currencies');

const prisma = new PrismaClient();

async function seed() {
  await prisma.continent.createMany({
    skipDuplicates: true,
    data: continents,
  });

  await prisma.currency.createMany({
    skipDuplicates: true,
    data: currencies,
  });

  await prisma.country.createMany({
    skipDuplicates: true,
    data: countries,
  });

  await prisma.flag.createMany({
    skipDuplicates: true,
    data: flags,
  });

  await prisma.state.createMany({
    skipDuplicates: true,
    data: states,
  });
}

seed();
