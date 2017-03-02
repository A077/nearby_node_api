import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { init as initDb } from './mongoose';
import api from '../api';
import path from 'path';

initDb();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.disable('x-powered-by');
//app.use(express.static(__dirname+'public')); static content not yet needed 

//security configurations
//app.use(helmet());
app.use(function (req, res, next) {
	//need to send only if client sents origin header
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use('/api', api);

app.use('*', function(req,res,next){
	res.writeHead(404,{"Content-Type":"text/plain"});
	res.end("What are you doing here ? :)");
	next();
})

export default app;
