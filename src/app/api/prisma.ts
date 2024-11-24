import { PrismaClient } from "@prisma/client";

import fs from "fs"

const caCertificate = fs.readFileSync(process.env.CERT_PATH!,'utf8')

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
})
let pg;
if (typeof window === "undefined") {
    pg = require("pg");
}
pg.defaults.ssl = {
    rejectUnauthorized: true,
    ca: caCertificate,
};

export default prisma;