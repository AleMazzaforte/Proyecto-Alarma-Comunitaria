const express = require('express');
const paspoprt = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql2 = require('mysql2');
const { name } = require('ejs');

const paspoprtLocal = require('passport-local').Strategy;
const mainController = require('./src/controllers/mainController');

const app = express();

const port = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true}));
app.use(cookieParser('mi ultra hiper secreto'));
app.use(session({
    secret: 'mi ultra hiper secreto',
    resave: true,
    saveUninitialized: true
}))
app.use(paspoprt.initialize());
app.use(paspoprt.session());
paspoprt.use(new paspoprtLocal(function(username, password, done) {
    
    if(username === 'codigofacilito' && password === 'gatovolador')
        return done(null, { id:1, name: 'uriel'})
    done(null, false);
}));
// 1 => serializacion
paspoprt.serializeUser(function(user, done){
    done(null, user.id);
});
// desserializacion
paspoprt.deserializeUser(function(id, done) {
    done(null, { id: 1, name: 'uriel'})
})

app.set('view engine', 'ejs');


 app.get("/admin", (req, res,next) =>{
    //si ya iniciamos sesion
    if (req.isAuthenticated()) return next();
    //si no hemos iniciado sesion
    res.redirect('/login');
    //aqui sigue el return next()
 },(req, res) => {
    
     
     res.render('admin1')
    })

app.get('/login', (req, res) => {
        //mostrar login
        res.render('login')
})

app.get('/', (req, res) => {
    //mostrar index
    res.render('index')
})

app.post('/login', paspoprt.authenticate('local', {
     //recibir credenciales
   
    successRedirect: '/admin',
    failureRedirect:'/login'
}));
   
app.get('/api/data', mainController.getAllData);
app.post('/add', mainController.addData);
app.get('/delete/:control', mainController.deleteData);
app.post('/update/:control', mainController.updateData);
app.get('/update/:control', mainController.getUpdateData);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})
