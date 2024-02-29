import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.cidade).count<[{count: number}]>('* as count')
    if (!Number.isInteger(count) || Number(count) > 0) return

    const cidadesToInsert = cidadesDoAcre.map(nomeDaCidade => ({ nome: nomeDaCidade}))
    await knex(ETableNames.cidade).insert(cidadesToInsert)
}

const cidadesDoAcre = [
    "Acrelândia",
    "Assis Brasil",
    "Brasiléia",
    "Bujari",
    "Capixaba",
    "Cruzeiro do Sul",
    "Epitaciolândia",
    "Feijó",
    "Jordão",
    "Mâncio Lima",
    "Manoel Urbano",
    "Marechal Thaumaturgo",
    "Plácido de Castro",
    "Porto Acre",
    "Porto Walter",
    "Rio Branco",
    "Rodrigues Alves",
    "Santa Rosa do Purus",
    "Sena Madureira",
    "Senador Guiomard",
    "Tarauacá",
    "Xapuri"
  ]