import { Knex } from "./server/database/knex";
import { server } from "./server/server";

const startServer = () => {
    server.listen(process.env.PORT || 3333, () => {
        console.log("App rodando!!")
    });
}

if (process.env.IS_LOCALHOST !== 'true') {
    console.log("Rodando migrations")

    Knex.migrate
    .latest()
    .then(() => {
        Knex.seed.run()
        .then(() => startServer())
        .catch(console.log)
    })
    .catch(console.log)
} else {
    startServer()
}