import * as express from "express";
import * as dotenv from "dotenv";

import Server from "./server";

dotenv.config({path: '.env'});

let app : any = new Server();

console.log(process.env);
