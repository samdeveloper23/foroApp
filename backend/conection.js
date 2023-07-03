const { createPool } = require("mysql2/promise");

async function main() {
    const conn = await createPool({
        host: "aws.connect.psdb.cloud",
        user: "orj0wm5sgb2jbcr49qm9",
        password: "pscale_pw_qz3852S93fQoPTEZYO1ubKG612c5jJFjF7WNVp0Uzy0",
        database: "developersam23",
    });

    console.log('connection ready');
}
main();