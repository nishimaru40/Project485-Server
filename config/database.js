import * as mongooseDef from "mongoose"; 
let mongoose = mongooseDef.default;
import {config} from './dbConfig.js';
 
let mongooseDbConnect = (url=config.database, options=config.connectOptions) => {
	if (typeof url !== 'string') 
		throw new TypeError('url must be string!');

    return (req, res, next) => {
        mongoose.connect(config.database, config.connectOptions);
        mongoose.connection.on('connected', () => { 
            console.log('Connected to database '+config.database);
            next();    
        });
        mongoose.connection.on('error', (err) => {
            console.log('---Database error---', err);
            next(err)
        });
        mongoose.connection.on("disconnected", () =>  console.log("Disconnected from " + config.database));
        
        process.on("SIGINT", function() {
            mongoose.connection.close(function() {
                console.log("Disconnected from " + config.database + " through app termination");
                process.exit(0);
            });
        });
    }
};
export default  mongooseDbConnect;