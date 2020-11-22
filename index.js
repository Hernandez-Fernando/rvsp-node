const dotenv = require('dotenv').config();
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()

const { Pool } = require('pg');
const conString = process.env.DATABASE_URL


const pg = new Pool({ connectionString: conString })


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))

app.post('/reservation', handleReservation)


app.listen(PORT, () => console.log(`App ready on ${PORT}`))



function handleReservation(req, res) {
    let rCode = req.body.code
    console.log(rCode)
    getReservation(res, rCode)
}

function getReservation(res, rCode) {
    pg.connect(function(err, client, done) {
        if (err) {
          return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query(`SELECT * FROM guests WHERE guestCode = '${rCode}'`, function(err, result) {
          done();
          if (err) {
            return console.error('error running query', err);
          }

          //res.json(result)
          res.send(result);
          console.log(result);
        });
      });
}