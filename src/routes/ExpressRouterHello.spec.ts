import chai from "chai";
import chaiHttp = require("chai-http");
import chaiJsonSchema = require("chai-json-schema");
import "mocha";

// tslint:disable: no-unused-expression

chai.use(chaiJsonSchema);
chai.use(chaiHttp);

const helloMessageSchema = {
    properties: {
        category: {
            type: "string",
        },
        message: {
            type: "string",
        },
    },
    required: ["message", "category"],
    title: "hello message schema",
    type: "object",
};

const testMessageSchema = (message) => {
    return chai.expect(message).to.be.jsonSchema(helloMessageSchema);
};

let helloMessageCreated = null;

describe("API health check", () => {
    describe("GET '/'", () => {
        let response = null;
        it("HTTP code 200 : OK", (done) => {
            chai.request(process.env.SERVER)
                .get("/")
                .end((err, res) => {
                    response = res;
                    chai.expect(err).to.be.null;
                    chai.expect(response).to.have.status(200);
                    done();
                });
        });
        it("Body return online status : { online: true }", (done) => {
            const checkObj = { online: true };
            chai.expect(response.body).to.eql(checkObj);
            done();
        });
    });
});

describe("Hello API : List all hello messages", () => {
    describe("GET '/api/'", () => {
        let response = null;
        it("HTTP code 200", (done) => {
            chai.request(process.env.SERVER)
                .get("/api/")
                .end((err, res) => {
                    response = res;
                    chai.expect(err).to.be.null;
                    chai.expect(response).to.have.status(200);
                    done();
                });
        });
        it("Body return list of hello messages", (done) => {
            const messages = response.body.response;
            chai.expect(messages).to.be.an("array");

            if (messages.length) {
                testMessageSchema(messages[0]);
            }
            done();
        });
    });
});

describe("Hello API : Create an hello message", () => {
    describe("POST '/api/:category'", () => {
        context("Missing 'category' param", () => {
            it("HTTP code 404 : Not found", (done) => {
                chai.request(process.env.SERVER)
                    .post("/api/")
                    .end((err, res) => {
                        chai.expect(err).to.be.null;
                        chai.expect(res).to.have.status(404);
                        done();
                    });
            });
        });
        context("Missing 'message' param", () => {
            it("HTTP code 400 : Bad Request", (done) => {
                chai.request(process.env.SERVER)
                    .post("/api/toto")
                    .end((err, res) => {
                        chai.expect(err).to.be.null;
                        chai.expect(res).to.have.status(400);
                        done();
                    });
            });
        });
        context("Correct params : { 'category': 'toto', 'message': 'tutu' }", () => {
            let response = null;
            it("HTTP code 201 : Created", (done) => {
                chai.request(process.env.SERVER)
                    .post("/api/toto")
                    .send({ message: "tutu" })
                    .end((err, res) => {
                        response = res;
                        chai.expect(err).to.be.null;
                        chai.expect(response).to.have.status(201);
                        done();
                    });
            });
            it("Body return the created hello message", (done) => {
                const messages = response.body.response;
                chai.expect(messages).to.be.an("array");

                helloMessageCreated = messages[0];
                testMessageSchema(helloMessageCreated);
                chai.expect(helloMessageCreated.category).to.be.eq("toto");
                chai.expect(helloMessageCreated.message).to.be.eq("tutu");
                done();
            });
        });
    });
});

describe("Hello API : Update an hello message", () => {
    describe("PATCH '/api/:helloId'", () => {
        context("Missing helloId URL param", () => {
            it("HTTP code 404 : Not found", (done) => {
                chai.request(process.env.SERVER)
                    .patch(`/api/`)
                    .end((err, res) => {
                        chai.expect(err).to.be.null;
                        chai.expect(res).to.have.status(404);
                        done();
                    });
            });
        });
        context("Missing body params", () => {
            it("HTTP code 400 : Bad Request", (done) => {
                chai.request(process.env.SERVER)
                    .patch(`/api/${helloMessageCreated.id}`)
                    .end((err, res) => {
                        chai.expect(err).to.be.null;
                        chai.expect(res).to.have.status(400);
                        done();
                    });
            });
        });
        context("Update 'category'", () => {
            let response = null;
            it("HTTP code 200 : OK", (done) => {
                chai.request(process.env.SERVER)
                    .patch(`/api/${helloMessageCreated.id}`)
                    .send({ category: "world" })
                    .end((err, res) => {
                        response = res;
                        chai.expect(err).to.be.null;
                        chai.expect(res).to.have.status(200);
                        done();
                    });
            });
            it("Body return the update message", (done) => {
                const messages = response.body.response;
                chai.expect(messages).to.be.an("array");

                const updated = messages[0];
                testMessageSchema(updated);
                chai.expect(updated.category).to.be.eq("world");
                chai.expect(updated.message).to.be.eq("tutu");
                done();
            });
        });
        context("Update 'message'", () => {
            let response = null;
            it("HTTP code 200 : OK", (done) => {
                chai.request(process.env.SERVER)
                    .patch(`/api/${helloMessageCreated.id}`)
                    .send({ message: "hello" })
                    .end((err, res) => {
                        response = res;
                        chai.expect(err).to.be.null;
                        chai.expect(res).to.have.status(200);
                        done();
                    });
            });
            it("Body return the update message", (done) => {
                const messages = response.body.response;
                chai.expect(messages).to.be.an("array");

                const updated = messages[0];
                testMessageSchema(updated);
                chai.expect(updated.category).to.be.eq("world");
                chai.expect(updated.message).to.be.eq("hello");
                done();
            });
        });
        context("Update 'caegory' and 'message'", () => {
            let response = null;
            it("HTTP code 200 : OK", (done) => {
                chai.request(process.env.SERVER)
                    .patch(`/api/${helloMessageCreated.id}`)
                    .send({ category: "deleted", message: "need_to_be" })
                    .end((err, res) => {
                        response = res;
                        chai.expect(err).to.be.null;
                        chai.expect(res).to.have.status(200);
                        done();
                    });
            });
            it("Body return the update message", (done) => {
                const messages = response.body.response;
                chai.expect(messages).to.be.an("array");

                const updated = messages[0];
                testMessageSchema(updated);
                chai.expect(updated.category).to.be.eq("deleted");
                chai.expect(updated.message).to.be.eq("need_to_be");
                done();
            });
        });
    });
});

describe("Hello API : Delete a hello messages", () => {
    describe("DELETE '/api/:helloId'", () => {
        context("Missing helloId URL param", () => {
            it("HTTP code 404 : Not Found", (done) => {
                chai.request(process.env.SERVER)
                    .delete(`/api/`)
                    .end((err, res) => {
                        chai.expect(err).to.be.null;
                        chai.expect(res).to.have.status(404);
                        done();
                    });
            });
        });
        context("Correct URL param", () => {
            let response = null;
            it("HTTP code 200", (done) => {
                chai.request(process.env.SERVER)
                    .delete(`/api/${helloMessageCreated.id}`)
                    .end((err, res) => {
                        response = res;
                        chai.expect(err).to.be.null;
                        chai.expect(response).to.have.status(200);
                        done();
                    });
            });
        });
    });
});
