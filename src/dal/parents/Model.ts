import * as daesign_pl from "daesign_pl_lib";
import * as infra_lib from "infra_lib_nodejs";
import * as ssoLib from "sso_lib_nodejs";
import { IHttpResult } from "utils";

export class Model {
    protected currentApp: any;
    protected coreDomain: string;
    protected servicesDomaine: string;
    protected sso: ssoLib.services.Api_plateforme;
    protected infra: infra_lib.services.Api_plateforme;
    protected pl: daesign_pl.services.Api_plateforme;

    constructor(currentApp: any) {
        this.currentApp = currentApp;
        // Setup communicators
        this.sso = new ssoLib.services.Api_plateforme({
            secure: this.currentApp.secu,
            url: this.currentApp.conf.ssoBdUrl,
        });
        this.infra = new infra_lib.services.Api_plateforme({
            secure: this.currentApp.secu,
            url: this.currentApp.conf.infraBdUrl,
        });
        this.pl = new daesign_pl.services.Api_plateforme({
            secure: this.currentApp.secu,
            url: this.currentApp.conf.platformBdUrl,
        });

        this.coreDomain = process.env.CORE_DOMAINE;
        this.servicesDomaine = process.env.SERVICES_DOMAINE;
    }

    /**
     * Wrap Mongo HTTP responses: cast response in case of 200, throw Error otherwise.
     * @param message Error message prefix
     */
    public result<T>(message: string) {
        return (dataResult: IHttpResult<T>): Promise<T[]> => {
            if (dataResult.code === 200) {
                return Promise.resolve(dataResult.response);
            } else {
                throw new Error(`${message} : ${dataResult.message}`);
            }
        };
    }
}
