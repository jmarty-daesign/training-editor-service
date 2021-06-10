import * as express from "express";
import { ServerBase } from "utils";
import { ExpressRouterHello } from "./routes/ExpressRouterHello";
import "./utils/env";

export class Server extends ServerBase {
    protected async init(): Promise<any> {
        return super.init().then(() => {
            const helloRouter = ExpressRouterHello(this.currentApp);
            this.app.use(express.json());
            this.app.use("/api/", helloRouter);
        });
    }
}
