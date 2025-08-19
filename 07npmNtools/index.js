const http = require('http')

const server = http.createServer((req,res)=>{
    if(req.url==="/"){
        res.setHeader('Content-Type','text/html')

        res.write('</html>')
        res.write('<head>')
        res.write('<title> My Page')
        res.write('</title>')
        res.write('</head>')
        res.write('<body>')
        res.write('<h1>Welcome to my page</h1>')
        res.write('<h1>Welcome to my page</h1>')
        res.write('</body>')
        res.write('</html>')
        return res.end()
    }
})

const PORT = 3000

server.listen(PORT, ()=>{
    console.log("listeing on port: ", PORT)
})