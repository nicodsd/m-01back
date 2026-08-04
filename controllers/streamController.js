import User from "../models/UserAuth.js";
import Menu from "../models/Menu.js";
import Visits from "../models/Visita.js";

let sseClients = [];

export const streamMetrics = async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  const clientId = Date.now();
  sseClients.push({ id: clientId, res });
  
  try {
    const totalUsers = await User.countDocuments();
    const totalMenus = await Menu.countDocuments();
    const totalVisits = await Visits.countDocuments();
    
    res.write(`data: ${JSON.stringify({ type: 'INITIAL_METRICS', totalUsers, totalMenus, totalVisits })}\n\n`);
  } catch (error) {
    console.error("Error fetching initial metrics:", error);
  }
  
  req.on('close', () => {
    sseClients = sseClients.filter(client => client.id !== clientId);
  });
};

function broadcast(data) {
  sseClients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}

export const initChangeStreams = () => {
  try {
    const userStream = User.watch([{ $match: { operationType: 'insert' } }]);
    userStream.on('change', async (change) => {
      const totalUsers = await User.countDocuments();
      broadcast({ type: 'NEW_USER', user: change.fullDocument, totalUsers });
    });

    const menuStream = Menu.watch([{ $match: { operationType: 'insert' } }]);
    menuStream.on('change', async (change) => {
      const totalMenus = await Menu.countDocuments();
      broadcast({ type: 'NEW_MENU', menu: change.fullDocument, totalMenus });
    });

    const visitStream = Visits.watch([{ $match: { operationType: 'insert' } }]);
    visitStream.on('change', async (change) => {
      const totalVisits = await Visits.countDocuments();
      broadcast({ type: 'NEW_VISIT', visit: change.fullDocument, totalVisits });
    });

    console.log('📡 Change Streams activados para Users, Menus y Visits');
  } catch (error) {
    console.error('Error al iniciar Change Streams:', error);
  }
};
