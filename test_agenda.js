import 'dotenv/config.js';
import { Agenda } from 'agenda';

console.log("MONGO:", process.env.MONGO);

try {
    const agenda = new Agenda({ db: { address: process.env.MONGO, collection: 'agendaJobs' } });
    console.log("Agenda initialized");
    process.exit(0);
} catch(e) {
    console.error("Error:", e);
    process.exit(1);
}
