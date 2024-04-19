const express= require ('express');
const bodyParser= require ('body-parser');
const todoRoutes= require('./routes/todoRoutes');

const app= express();
app.use(bodyParser.json());
app.use('/', todoRoutes);

const PORT= process.env.PORT||8080;
app.listen(PORT, ()=> console.log(`Server is running at port ${PORT}`));
module.exports=app;