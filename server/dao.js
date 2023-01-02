'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

const sqlite = require('sqlite3');
// open the database
const db = new sqlite.Database('indovinelli.db', (err) => {
    if (err) throw err;
});

exports.getAllAnonimousRiddles = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id,testo, difficolta, stato FROM indovinelli ';

        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const riddles = rows.map((r) => ({ id: r.id, testo: r.testo, difficolta: r.difficolta, stato: r.stato }));
            resolve(riddles);
        });
    });
};

exports.getAllRiddles = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id,testo, durata, stato, difficolta, user, scadenza FROM indovinelli ';

        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const riddles = rows.map((r) => ({ id: r.id, testo: r.testo, durata: r.durata, stato: r.stato, difficolta: r.difficolta, user: r.user, scadenza: r.scadenza }));
            resolve(riddles);
        });
    });
};

exports.getRiddle = (code) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM indovinelli WHERE id=?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: 'Riddle not found.' });
            } else {
                const course = { id: r.id, testo: r.testo, durata: r.durata, suggerimento1: r.suggerimento1, suggerimento2: r.suggerimento2, stato: r.stato, difficolta: r.difficolta, user: r.user };
                resolve(course);
            }
        });
    });
};

exports.getClosedRiddle = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, testo, risposta, vincitore FROM indovinelli WHERE id=?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: 'Riddle not found.' });
            } else {
                const riddle = { id: row.id, testo: row.testo, risposta: row.risposta, vincitore: row.vincitore };
                resolve(riddle);
            }
        });
    });
};


exports.getResponses = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, risposta FROM risposte WHERE indovinello = ? ';

        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const responses = rows.map((r) => ({ id: r.id, risposta: r.risposta }));
            resolve(responses);
        });
    });
};

exports.getAllResponses = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, risposta, indovinello, userId FROM risposte  ';

        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const responses = rows.map((r) => ({ id: r.id, risposta: r.risposta, indovinello: r.indovinello, userId: r.userId }));
            resolve(responses);
        });
    });
};


exports.getRiddleText = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, testo FROM indovinelli WHERE id=?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: 'Riddle not found.' });
            } else {
                const riddle = { id: row.id, testo: row.testo };
                resolve(riddle);
            }
        });
    });
};

exports.getRiddleScadenza = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, scadenza FROM indovinelli WHERE id=?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: 'Riddle not found.' });
            } else {
                const riddle = { id: row.id, scadenza: row.scadenza };
                resolve(riddle);
            }
        });
    });
};

exports.getRiddleResponse = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT risposta FROM indovinelli WHERE id=?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: 'Riddle not found.' });
            } else {
                const riddle = { risposta: row.risposta };
                resolve(riddle);
            }
        });
    });
};


exports.getRiddleSugg1 = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT suggerimento1 FROM indovinelli WHERE id=?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: 'Riddle not found.' });
            } else {
                const riddle = { suggerimento1: row.suggerimento1 };
                resolve(riddle);
            }
        });
    });
};

exports.getRiddleSugg2 = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT suggerimento2 FROM indovinelli WHERE id=?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: 'Riddle not found.' });
            } else {
                const riddle = { suggerimento2: row.suggerimento2 };
                resolve(riddle);
            }
        });
    });
};

exports.getClassification = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT DISTINCT points FROM users ORDER BY points DESC LIMIT 3 '
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const users = rows.map((u) => ({ points: u.points }));
            resolve(users);
        });
    });
};

exports.getUsersInTop3 = (top3) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id,name, points FROM users WHERE points=? OR points=? or points= ? ORDER BY points DESC '
        db.all(sql, [top3[0].points, top3[1].points, top3[2].points], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const users = rows.map((u) => ({ id: u.id, name: u.name, points: u.points }));
            resolve(users);
        });
    });

}

exports.createRiddle = (riddle, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO indovinelli(testo, durata, risposta, suggerimento1, suggerimento2, stato, difficolta, user) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(sql, [riddle.testo, riddle.durata, riddle.risposta, riddle.suggerimento1, riddle.suggerimento2, "aperto", riddle.difficolta, userId], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.createResponse = (response) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO risposte(risposta, indovinello, userId) VALUES(?, ?, ?)';
        db.run(sql, [response.testo, response.indovinello, response.userId], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.updateStato = (id, stato) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE indovinelli SET stato=? WHERE id = ? ';
        db.run(sql, [stato, id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.updateScadenza = (id, scadenza) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE indovinelli SET scadenza=? WHERE id = ? ';
        db.run(sql, [scadenza, id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.addVincitore = (id, vincitore) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE indovinelli SET Vincitore=? WHERE id = ? ';
        db.run(sql, [vincitore, id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};




