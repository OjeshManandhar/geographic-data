# Geographic data

This repo contains data about countries, states, timezone, continents, currencies, flags and phone number codes.

- [src/sources](./src/sources) folder has all the data I collected from online sources
- [src/index](./src/index.ts) file creates the generated and seedable files
- [src/generated](./src/generated) folder has files that I combined using the data from [sources](./src/sources)
- [src/seedable](./src//seedable/) folder has the data that should be read to be seeded. Check the [prisma schema](./prisma/schema.prisma) for the table definitions. Seed in the following order:
  1. continents and currencies
  2. countries
  3. states/ flags

---

## Some of the sources are

- [GitHub/annexare/Countries](https://github.com/annexare/Countries)
- [Stack overflow](https://stackoverflow.com/a/4900304/13219635)
