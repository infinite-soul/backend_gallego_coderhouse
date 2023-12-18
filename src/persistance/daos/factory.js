//------ Mongo ------//
import * as productDaoMongo from './mongodb/productDaoMongo.js'
import * as userDaoMongo from './mongodb/userDaoMongo.js'
import * as cartDaoMongo from './mongodb/cartDaoMongo.js'
import { conectionMongoose } from "./mongodb/conection.js";

//------ FS ------//
import * as productDaoFS from './filesystem/productDaoFS.js'
import * as userDaoFS from './filesystem/userDaoFS.js'
import * as cartDaoFS from './filesystem/cartDaoFS.js'

const daos = {
    file: {
        userDao: userDaoFS,
        prodDao: productDaoFS,
        cartDao: cartDaoFS,
    },
    mongo: {
        async init() {
            await conectionMongoose();
            return {
                userDao: userDaoMongo,
                prodDao: productDaoMongo,
                cartDao: cartDaoMongo,
            };
        },
    },
};

const selectedPersistence = process.argv[3] || 'mongo';
const selectedDAOs = daos[selectedPersistence] || daos.mongo;

export default selectedDAOs instanceof Function ? await selectedDAOs.init() : selectedDAOs;
