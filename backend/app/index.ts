import * as dotenv from "dotenv";

import Server from "./server";

dotenv.config({path: process.env.PWD + '/.env'});

let app : any = Server.bootstrapServer();

//console.log(process.env);
