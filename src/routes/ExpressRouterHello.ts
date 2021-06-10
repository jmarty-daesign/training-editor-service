import { Router } from "express";
import { UtilsSecu } from "utils";
import { HelloController } from "../controllers/HelloController";
import { logger } from "../utils/logger";

export function ExpressRouterHello(currentApp: any) {
    const toJsonRes = currentApp.toJsonRes;
    const toErrRes = currentApp.toErrRes;
    const router: Router = Router();
    const helloController: HelloController = new HelloController(currentApp);

    // Securize application
    if (!currentApp.secu) {
        currentApp.secu = new UtilsSecu(currentApp);
    }

    /**
     * @api {get} /api/ Get a list of hello messages
     * @apiName GetHelloMessagesList
     * @apiDescription Get all the hello messages stocked in the infra collection 'hello'
     * @apiVersion 1.0.0
     * @apiGroup Hello
     * @apiSuccess (200) {Hello[]} response The list of hello messages
     * @apiError (500) {string} response The server error
     */
    router.get("", async (req, res) => {
        try {
            const response = await helloController.list();
            res.send(toJsonRes(response));
        } catch (err) {
            logger.error(err.message);
            const error = toErrRes(err, err.code);
            res.status(error.code).send(error.message);
        }
    });

    /**
     * @api {get} /api/:helloId Get a hello message
     * @apiName GetHelloMessage
     * @apiDescription Get a hello message stocked in the infra collection 'hello'
     * @apiVersion 1.0.0
     * @apiGroup Hello
     * @apiParam (url) {string} helloId The hello message identifier
     * @apiSuccess (200) {Hello} response The founded hello message
     * @apiError (400) response The <code>helloId</code> is not defined.
     * @apiError (500) response The server error message
     */
    router.get("/:helloId", async (req, res) => {
        // Get required parameters
        const helloId = req.params.helloId;
        if (helloId) {
            try {
                const response = await helloController.get(helloId);
                res.send(toJsonRes(response));
            } catch (err) {
                logger.error(err.message);
                const error = toErrRes(err, err.code);
                res.status(error.code).send(error.message);
            }
        } else {
            res.send(400);
        }
    });

    /**
     * @api {post} /api/:category Create a hello message
     * @apiName CreateHelloMessage
     * @apiDescription Create a message in the infra collection 'hello'
     * @apiVersion 1.0.0
     * @apiGroup Hello
     * @apiParam (url) {string} category The category of the hello message
     * @apiParam (body) {string} message The text of the hello message
     * @apiSuccess (201) {Hello} response The created hello message
     * @apiError (400) response The <code>category</code> or the <code>message</code> is/are not defined.
     * @apiError (500) response The server error message
     */
    router.post("/:category", async (req, res) => {
        // Get required parameters
        const category = req.params.category;
        const message = req.body.message;
        if (category && message) {
            try {
                const response = await helloController.create(category, message);
                res.status(201).send(toJsonRes(response));
            } catch (err) {
                logger.error(err.message);
                const error = toErrRes(err, err.code);
                res.status(error.code).send(error.message);
            }
        } else {
            res.send(400);
        }
    });

    /**
     * @api {patch} /api/:helloId Update a hello message
     * @apiName UpdateHelloMessage
     * @apiDescription Update a message in the infra collection 'hello'
     * @apiVersion 1.0.0
     * @apiGroup Hello
     * @apiParam (helloId) {string} helloId The hello message identifier
     * @apiParam (body) {string} category The category of the hello message
     * @apiParam (body) {string} message The text of the hello message
     * @apiSuccess (201) {Hello} response The updated hello message
     * @apiError (400) response The <code>helloId</code> and/or
     * the <code>category</code> and/or the <code>message</code> is/are not defined.
     * @apiError (500) response The server error message
     */
    router.patch("/:helloId", async (req, res) => {
        // Get required parameters
        const helloId = req.params.helloId;
        const category = req.body.category;
        const message = req.body.message;
        if (helloId && (category || message)) {
            try {
                const response = await helloController.update(helloId, category, message);
                res.send(toJsonRes(response));
            } catch (err) {
                logger.error(err.message);
                const error = toErrRes(err, err.code);
                res.status(error.code).send(error.message);
            }
        } else {
            res.send(400);
        }
    });

    /**
     * @api {delete} /api/:helloId Delete a hello message
     * @apiName DeleteHelloMessage
     * @apiDescription Delete a hello message stocked in the infra collection 'hello'
     * @apiVersion 1.0.0
     * @apiGroup Hello
     * @apiParam (url) {string} helloId The hello message identifier
     * @apiSuccess (200) {Hello} response The deleted hello message
     * @apiError (400) response The <code>helloId</code> is not defined.
     * @apiError (500) response The server error message
     */
    router.delete("/:helloId", async (req, res) => {
        // Get required parameters
        const helloId = req.params.helloId;
        if (helloId) {
            try {
                const response = await helloController.delete(helloId);
                res.send(toJsonRes(response));
            } catch (err) {
                logger.error(err.message);
                const error = toErrRes(err, err.code);
                res.status(error.code).send(error.message);
            }
        } else {
            res.send(400);
        }
    });

    return router;
}
