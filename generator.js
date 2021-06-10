const fs = require("fs");
const apiData = "./apidoc/api_data.json";
const outputFile = "webservice-output.json";

// Generate output file
try {
    const package = fs.readFileSync("package.json", "utf-8");
    const packageObject = JSON.parse(package);
    const fileContent = fs.readFileSync(apiData, "utf-8");
    const fileContentObject = JSON.parse(fileContent);
    const routesFormatted = formatRoutesForWSCollection(fileContentObject);
    const webservice = {
        name: packageObject.name,
        description: packageObject.description,
        routes: routesFormatted,
    };
    fs.writeFileSync(outputFile, JSON.stringify(webservice, null, 4));
} catch (error) {
    console.error(error);
}

// Webservice format function
function formatRoutesForWSCollection(fileContentObject) {
    const formatted = fileContentObject.map((call) => {
        const _class = "route_" + call.type;
        const name = call.name;
        const description = call.description.replace("<p>", "").replace("</p>", "");
        const path = call.url;
        let urlParams = [];
        let bodyParams = [];

        if (call.parameter) {
            if (call.parameter.fields.url) {
                urlParams = call.parameter.fields.url.map((param) => {
                    return {
                        _class: "castParam",
                        paramName: param.field,
                        type: param.type,
                        param: param.field,
                    };
                });
            }
            if (call.parameter.fields.body) {
                bodyParams = call.parameter.fields.body.map((param) => {
                    return {
                        _class: "castParam",
                        paramName: param.field,
                        type: param.type,
                        param: param.field,
                    };
                });
            }
        }

        let parameters = null;
        if (urlParams.length || bodyParams.length) {
            parameters = [...urlParams, ...bodyParams].filter((v) => v);
        }

        const obj = {
            _class,
            name,
            description,
            path,
            params: parameters,
        };

        console.log(obj);

        return {
            _class,
            name,
            description,
            path,
            params: parameters,
        };
    });
    return formatted;
}
