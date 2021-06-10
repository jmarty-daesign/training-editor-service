import fetch from "node-fetch";
import "../../utils/env";
import { Model } from "./Model";

export class Service<T> extends Model {
    constructor(
        currentApp: any,
        private serviceID: string,
        private serviceClass: string,
        private supervisorServiceUrl: string
    ) {
        super(currentApp);
    }

    protected async read(): Promise<T> {
        const service = await this.infra.collections[this.serviceClass]
            .get(this.serviceID)
            .then(this.result(`[GET] ${this.serviceClass}`));
        return service[0];
    }

    protected async update(dataset: any): Promise<T> {
        // Collection update
        const service = await this.infra.collections[this.serviceClass]
            .patch(dataset)
            .then(this.result(`[PATCH] ${this.serviceClass} with dataset : ${JSON.stringify(dataset)}`));
        // Service update
        await this.reloadSupervisorProcess();
        return service[0];
    }

    private async reloadSupervisorProcess() {
        const resStop = await fetch(this.supervisorServiceUrl + "stop");
        const stop = await resStop.text();
        // Add a timer because node-supervisor service is shit
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const resStart = await fetch(this.supervisorServiceUrl + "start");
        const start = await resStart.text();
        return { stop, start };
    }
}
