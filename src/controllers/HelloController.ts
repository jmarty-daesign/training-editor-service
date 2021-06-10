import { Ihello } from "infra_lib_nodejs/dist/lib/modelObj/Interfaces";
import { Hello } from "../dal/Hello";

export class HelloController {
    private helloDal: Hello;

    constructor(private currentApp: any) {
        this.helloDal = new Hello(currentApp);
    }

    // #region Methods

    /**
     * Get an hello message
     * @param helloId string The hello identifier
     */
    public async get(helloId: string): Promise<Ihello> {
        return this.helloDal.get(helloId);
    }

    /**
     * List all hello messages
     */
    public async list(): Promise<Ihello[]> {
        return this.helloDal.list();
    }

    /**
     * Create a hello message
     * @param category string The category of the message
     * @param message string The message
     */
    public async create(category: string, message: string): Promise<Ihello> {
        return this.helloDal.create(category, message);
    }

    /**
     * Update an hello message
     * @param helloId string The hello identifier
     * @param category string The category of the message
     * @param message string The message
     */
    public async update(helloId: string, category: string, message: string): Promise<Ihello> {
        return this.helloDal.update(helloId, category, message);
    }

    /**
     * Delete an hello message
     * @param helloId string The hello identifier
     */
    public async delete(helloId: string): Promise<Ihello> {
        return this.helloDal.delete(helloId);
    }

    // #endregion Methods
}
