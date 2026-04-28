import session from 'express-session';
import MongoStore from 'connect-mongo';

const sessionConfig = session({
    secret: process.env.PASSWORD,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO,
        ttl: 1 * 60 * 60
    }),
    cookie: {
        httpOnly: true,
        secure: true,   // Obligatorio para HTTPS de Cloudflare
        sameSite: 'none', // Obligatorio para dominios cruzados
        maxAge: 1000 * 60 * 60
    }
});

export default sessionConfig;