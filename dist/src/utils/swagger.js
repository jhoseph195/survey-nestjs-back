"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const addSwagger = (app) => {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Survey')
        .setDescription('Documentación de uso del API')
        .setVersion('0.0.1')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        in: 'header'
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
};
exports.addSwagger = addSwagger;
//# sourceMappingURL=swagger.js.map