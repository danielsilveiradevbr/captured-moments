import fastify from "fastify";
import { routes } from "./routes";

const app = fastify({logger: true})

app.register(routes);

app.listen({ port: 8000}, () => {
    console.log('O servidor está rodando na porta 8000!')
})

export default app;

