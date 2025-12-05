import Consultation from './src/models/Consultation.js';
import { sequelize } from './src/config/db.js';

(async ()=>{
  try{
    await sequelize.sync({ force: true });
    const c = await Consultation.create({ doctor_id:1, patient_id:2, type:'video', date:new Date(), notes:'x'});
    console.log('created', c.toJSON());
  } catch(e) {
    console.error('ERR', e);
    console.error('message', e && e.message);
    console.error('parent', e && e.parent && e.parent.message);
    console.error('sql', e && e.sql);
  } finally {
    try{ await sequelize.close(); } catch(e){}
  }
})();
