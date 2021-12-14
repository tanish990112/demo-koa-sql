const koa = require('koa');
const koaRouter  = require('koa-router');
const app = new koa();
const router = new koaRouter();
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');


const {db,user} = require('./models/user');
const query = require('./models/query');

app.use(bodyParser());
app.use(json());
app
    .use(router.routes())
    .use(router.allowedMethods());


router.get('/',async (ctx)=>{
    const people = await query.viewAll();
    ctx.body = people;
});

router.post('/add', async(ctx)=>{
    const body = ctx.request.body;
    const pass = CryptoJs.SHA256(body.password).toString(CryptoJs.enc.Base64);
    await query.add(body.username,pass);
    ctx.redirect('/');
})

router.post('/login' , async(ctx)=>{
    const body = ctx.request.body;
    const pass = CryptoJs.SHA256(body.password).toString(CryptoJs.enc.Base64);
    const user =  await query.findUser(body.username);
    if (!user) {
		ctx.body = "Invalid Login";
	}
    console.log(user);
    if(pass == user.password)
    {
        const token = jwt.sign(
            {
                username: user.username,
            },
            'secret123'
        )
        ctx.body = token;
        ctx.redirect('/hidden');
        
    }
    else{
        ctx.body = "Please Login or Signup";
        }
})

router.get('/hidden',async (ctx)=>{
    const token = ctx.request.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, 'secret123')
		const username = decoded.username
		const user = await query.findUser(username);
		ctx.body =  `This is hidden ${token} ${username}`; 
	} catch (error) {
		console.log(error)
		ctx.body = "Login first";
	}

    
})

app.listen(3000,()=>{
    console.log('Listening on port 3000');
})