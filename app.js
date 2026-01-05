const path=require('path');
const session=require('express-session');
const mysqlStore=require('express-mysql-session')(session)
const express=require('express');
const createError=require('http-errors')
const app=express();

const userRoutes=require('./routes/users');
const flash = require('express-flash');


app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');

const sOpt = {
    host: 'localhost',
    user: 'root',
    password: 'admin@12345',
    database: 'mysql_session',
}
const sessionStore = new mysqlStore(sOpt);
app.use(session({
    store: sessionStore,
    name: 'MyStrange-Cookie',
    secret: 'pharma-app',
    /*genid: function(req) {
        return uuid() // use UUIDs for session IDs
       },*/
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
  }))








// app.use(session({
//     cookie:{maxAge:60000},
//     saveUninitialized:true,
//     store:new session.MemoryStore,
//     resave:true,
//     secret:'secret'
// }))

app.use(flash());


app.use('/',userRoutes);


app.use(function(req,res,next){
    next(createError(404));
})

app.listen(4000,'localhost');