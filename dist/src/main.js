"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("./utils/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, swagger_1.addSwagger)(app);
    app.enableCors({
        origin: '*',
        methods: 'GET, PUT, POST, DELETE',
        allowedHeaders: 'Content-Type, Authorization',
    });
    await app.listen(process.env.NEST_PORT).then(() => {
        console.log(`Running on port ${process.env.NEST_PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map