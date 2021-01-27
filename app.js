const http = require("http");


const servers = [
    {
        url: "http://doesNotExist.kratikal.com",
        priority: 1,
    },
    {
        url: "http://kratikal.com",
        priority: 7,
    },
    {
        url: "http://offline.kratikal.com",
        priority: 2,
    },
    {
        url: "http://google.com",
        priority: 4,
    },
];

const findServer = async (serverData) => {
    try {
        let promise = serverData.map((server) => {
            return new Promise((resolve, reject) => {
                let request = http.get(server.url, (req, res) => {
                    resolve(server);
                });
                request.on("error", (err) => {
                    if (err) {
                        reject(err.hostname);
                    }
                });
                request.end();
            });
        });
        let pData = await promise.map(async (item) => {
            try {
                return await item;
            } catch (err) { }
        });
        return await pData;
    } catch (err) {
        console.log("err===>1", err);
    }
};

const getStatus = async (serverData) => {
    try {
        return await findServer(serverData)
            .then(async (result) => {
                return await Promise.all(result)
                    .then(async (res) => {
                        if (res) {
                            let arr = res.filter((a) => a);
                            let data = arr.sort((a, b) => a.priority - b.priority);
                            return `${data[0].url} is having the higher priority`;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((error) => {
                console.log(error, "does not exist");
            });
    } catch (err) {
        console.log("err====>2", err.message);
    }
};
getStatus(servers).then((res) => {
    console.log(res);
});
module.exports = getStatus;
