const MockDocentiDB = require('./mock/mock-docenti-db');
const MysqlDocentiDB = require('./real/mysql-docenti-db');

module.exports.DocentiDB = function(){
    if (process.env.AMBIENTE === 'MOCK') {
        return new MockDocentiDB();
    }
    return new MysqlDocentiDB();
}