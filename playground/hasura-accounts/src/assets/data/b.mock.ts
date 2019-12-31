import { create, defaults, router } from 'json-server';

const data = {};

const port = process.env.NIAMA_API_PORT;
const server = create();
server.use(defaults());
server.use(router(data));
server.listen(port, () => console.log(`NIAMA MOCK SERVER is running on port ${port}`));
