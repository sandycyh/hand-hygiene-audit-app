import express from 'express';

import orgRoutes from './routes/org.routes.js';
import deptRoutes from './routes/departments.routes.js';
import auditorRoutes from './routes/auditors.routes.js';
import HCWRoutes from './routes/HCW.routes.js';
import momentRoutes from './routes/moments.routes.js';
import actionRoutes from './routes/actions.routes.js';
import gloveRoutes from './routes/gloves.routes.js';

const app = express();

app.use('/api/Organisation', orgRoutes)


app.use('/api/Department', deptRoutes)


app.use('/api/Auditors', auditorRoutes)


app.use('/api/HCW', HCWRoutes)


app.use('/api/Moments', momentRoutes) 


app.use('/api/Actions', actionRoutes)


app.use('/api/Glove', gloveRoutes)


app.listen(3000, () => console.log('API running on http://localhost:3000'));

