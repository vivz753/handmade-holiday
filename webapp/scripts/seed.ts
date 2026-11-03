
import { getClient } from "@/app/lib/server/db"

async function seed() {
	
	const client = getClient();

	try {

		await client.connect();
	} catch (err) {
		console.error(err);
	}
	const res = await client.query("select 1");
	console.log(res.rows);
	await client.end();
}

seed();