import express, { Application } from "express"; // Importing Application type from express
import { allRoutes, mainRoute } from "../routes/mainRoute";
import cors from "cors";
const session = require("express-session");
import cookieParser from "cookie-parser";
import { Next, Req, Res } from "../ServerTypes";
import { url } from "inspector";
const { Server } = require('socket.io');
import initializeSocket from "./socketIo";
import http from "http";
import { Socket } from "socket.io";
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

class NpmModule {
  constructor() {
    const app = express();
    const port = 4000;
    const server = http.createServer(app);
    initializeSocket(server) 
   


   
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
      cors({
        origin: ["http://localhost:5173", "http://10.4.5.21:5173",'https://sandeeppachat.in'],
        credentials: true, //
      })
    );

    app.use(
      session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
      })
    );

  

     
   

    app.use((req: Req, res: Res, next: Next) => {
      res.setHeader("Access-Control-Allow-Origin", 'https://sandeeppachat.in');
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      console.log("test");
      next();
    });

    const swaggerOptions = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "manGrow",
          version: "1.0.0",
          description:
            "manGrow is a communication analysis tool that empowers you to gain valuable insights from your communication activities.",
        },
        paths: allRoutes,
        servers: [
          {
            url: `http://localhost:${port}/`,
          },
        ],
        basePath: "/admin",
      },
      apis: ["./src/frameworks/routes/*.ts"],
    };
    
    const specs = swaggerJsdoc(swaggerOptions);
    // Serve Swagger UI
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    
    app.use(express.urlencoded({ extended: true }));
    app.use("/", mainRoute(express.Router()));
    
    

   
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
       
    });
    
  }
}

export default NpmModule;
