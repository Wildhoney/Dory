import express from 'express';
const app = express();

app.use(express.static(__dirname + '/core/build'));
app.listen(process.env.PORT);
