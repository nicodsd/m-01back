import { Agenda } from 'agenda';

const agenda = new Agenda({ db: { address: process.env.MONGO, collection: 'agendaJobs' } });

agenda.on('ready', () => {
    console.log("📅 Agenda started and connected to MongoDB");
    agenda.start();
});

export default agenda;