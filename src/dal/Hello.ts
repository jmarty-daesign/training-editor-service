import { Ihello } from "infra_lib_nodejs/dist/lib/modelObj/Interfaces";
import { Model } from "./parents/Model";

export class Hello extends Model {
    constructor(currentApp: any) {
        super(currentApp);
    }

    /**
     * Get an hello message
     * @param helloId string The hello identifier
     */
    public async get(helloId: string): Promise<Ihello> {
        const helloObject = await this.infra.collections.hello
            .get(helloId)
            .then(this.result(`[GET] hello : ${helloId}`));

        return helloObject[0];
    }

    /**
     * List all hello messages
     */
    public async list(): Promise<Ihello[]> {
        const helloObjects = await this.infra.collections.hello.get().then(this.result("[GET] all hello"));

        return helloObjects;
    }

    /**
     * Create a hello message
     * @param category string The category of the message
     * @param message string The message
     */
    public async create(category: string, message: string): Promise<Ihello> {
        const hello: Ihello = {
            category,
            message,
        };

        const createdObject = await this.infra.collections.hello
            .post(hello)
            .then(this.result(`[POST] hello with dataset : ${JSON.stringify(hello)}`));

        return createdObject[0];
    }

    /**
     * Update an hello message
     * @param helloId string The hello identifier
     * @param category string The category of the message
     * @param message string The message
     */
    public async update(helloId: string, category: string, message: string): Promise<Ihello> {
        const hello: Ihello = {
            _id: helloId,
            category,
            message,
        };

        const updatedObject = await this.infra.collections.hello
            .patch(hello)
            .then(this.result(`[PATCH] hello with dataset : ${JSON.stringify(hello)}`));

        return updatedObject[0];
    }

    /**
     * Delete an hello message
     * @param helloId string The hello identifier
     */
    public async delete(helloId: string): Promise<Ihello> {
        const deletedObject = await this.infra.collections.hello
            .delete(helloId)
            .then(this.result(`[DELETE] hello : ${helloId}`));

        return deletedObject[0];
    }
}
