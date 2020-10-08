const express = require('express');
const app = express();
const {verifyToken} = require('../auth/jwt_validation');
const userRouter = require('../routes/users');
const articleRouter = require('../routes/articles');
const payRouter = require('../routes/pay-orders');
const testRouter = require('../routes/test');

app.set('port', process.env.PORT || 3000)
app.use(express.json());


///////// Router
// app.use(require('../routes/articles'));
// app.use(require('../routes/pay-orders'));
// app.use(require('../queries/users'));
// app.use(require('../routes/pay-article-relation'));
app.use("/api/users", userRouter);
app.use("/api/articles",articleRouter);
app.use("/api/pay-orders",payRouter);
app.use("/api/test",testRouter);

app.listen(app.get('port'),() =>{
    console.log("Server on port", app.get('port'))
})

