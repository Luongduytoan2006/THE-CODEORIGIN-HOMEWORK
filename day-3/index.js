import { createServer } from "node:http"

const serverVip = createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.end(`<h1>Welcome to the VIP section!</h1>`)

})

serverVip.listen(8080, () => {
    console.log("VIP server is running on port 8080")
})