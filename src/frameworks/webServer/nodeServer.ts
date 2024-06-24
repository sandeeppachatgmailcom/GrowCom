import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import http from "http";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Server } from 'socket.io';
import initializeSocket from "./socketIo";
import { allRoutes, mainRoute } from "../routes/mainRoute"; // Adjust the path as per your actual routes
import { url } from "inspector";

class NpmModule {
  private app: Application;
  private server: http.Server;
  private port: number = 4000;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    initializeSocket(this.server);
    this.app.use(cors({ origin: "https://sandeeppachat.in", credentials: true }));
    this.configureMiddleware();
    this.setupSwagger();
    this.setupRoutes();
    this.startServer();
  }

  private configureMiddleware(): void {
    console.log('cors working')
    const allowedOrigins = ["https://sandeeppachat.in", "http://localhost:5173"];
 
    const corsOptions = {
      origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'PATCH', 'PUT', 'POST','DELETE'],
      allowedHeaders: ['Origin','Access-Control-Allow-Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-refresh-token', 'x-user-role','x-verify-token'],
      optionsSuccessStatus: 204,
    };
    
     this.app.use(cors(corsOptions))
    this.app.use(cors(corsOptions));
    this.app.options("*", cors());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(
      session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
      })
    );
  }

  private setupSwagger(): void {
    const swaggerOptions = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "manGrow",
          version: "1.0.0",
          description:
            "manGrow is a communication analysis tool that empowers you to gain valuable insights from your communication activities.",
        },
        paths: allRoutes, // Ensure allRoutes is properly defined in your routes/mainRoute file
        servers: [
          {
            url: `http://localhost:${this.port}/`,
          },
        ],
        basePath: "/admin",
      },
      apis: ["./src/frameworks/routes/*.ts"], // Adjust the path to match your actual route files
    };

    const specs = swaggerJsdoc(swaggerOptions);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private setupRoutes(): void {
    this.app.use("/", mainRoute(express.Router())); // Adjust this based on your main route configuration
  }

  private startServer(): void {
    this.server.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }
}

export default NpmModule;
