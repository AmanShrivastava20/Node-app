// to run the test use >>>> npm run test

const getStatus = require("./app");
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
test("http://google.com is having the higher priority", async () => {
    expect(await getStatus(servers)).toBe(
        `http://google.com is having the higher priority`
    );
});