'use strict'
require('./check-versions')()
const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const bodyParser=require('body-parser')
const express = require('express')
const mongoose=require('mongoose');
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

global.dbHandel = require('../database/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/graduation");
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))  //解析表单数据需要用到的模块
app.use(bodyParser.json())
//声明后端接口的访问路由
const login=require('../server/api/login')
const register=require('../server/api/register')
const spend=require('../server/api/spend')
const spendList=require('../server/api/spendList')
const income=require('../server/api/income')
const incomeList=require('../server/api/incomeList')
const spendEdit=require('../server/api/spendEdit')
const incomeEdit=require('../server/api/incomeEdit')
const spendDel=require('../server/api/spendDel')
const incomeDel=require('../server/api/incomeDel')
const account=require('../server/api/accountMoney')
const spendCategory=require('../server/api/spendCategory');
const incomeCategory=require('../server/api/incomeCategory');
const updateImg=require('../server/api/updateImg');
const assetMoney=require('../server/api/assetMoney');
const compare=require('../server/api/comapre');
const updateInfo=require('../server/api/updateInfo');
const assetData=require('../server/api/assetData');
app.use('/api', login)
app.use('/api',register)
app.use('/api',spend)
app.use('/api',spendList)
app.use('/api',income)
app.use('/api',incomeList)
app.use('/api',spendEdit)
app.use('/api',incomeEdit)
app.use('/api',spendDel)
app.use('/api',incomeDel)
app.use('/api',account)
app.use('/api',spendCategory);
app.use('/api',incomeCategory);
app.use('/api',updateImg);
app.use('/api',assetMoney);
app.use('/api',compare);
app.use('/api',updateInfo);
app.use('/api',assetData);
/************************/
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
