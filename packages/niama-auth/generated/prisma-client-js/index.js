"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "AuthStatus",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "UserProfile",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `undefined`
});
exports.prisma = new exports.Prisma();
