import { createServer } from 'node:http'

const server = createServer((req, res) => {
    const url = req.url || '/'
    const method = req.method || 'GET'

    // Tạo hàm gửi
    function sendJSON(statusCode: number, success: boolean, message: string, data: any = null) {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' })
        const response = { success, status: statusCode, message , data: null }
        if (data !== null) response.data = data

        // kết thúc lệnh trả về
        res.end(JSON.stringify(response))
    }

    if (method === 'GET') {
        if (url === '/') sendJSON(200, true, 'Welcome to the Calculate programing')
        else if (url === '/sum') sendJSON(200, true, 'Welcome to Sum Calculate programing')
        else if (url === '/sub') sendJSON(200, true, 'Welcome to Subtract Calculate programing')
        else if (url === '/mul') sendJSON(200, true, 'Welcome to Multiply Calculate programing')
        else if (url === '/div') sendJSON(200, true, 'Welcome to Divide Calculate programing')
        else sendJSON(404, false, 'Not Found')
    } 
    else if (method === 'POST') {
        if (url === '/sum' || url === '/sub' || url === '/mul' || url === '/div') {
            let body = ''
            // Lấy data
            req.on('data', chunk => {
                body += chunk.toString()
            })

            req.on('end', () => {
                try {
                    const data = JSON.parse(body)
                    if (!Array.isArray(data)) {
                        sendJSON(400, false, 'Invalid data: expected an array')
                        return
                    }
                    if (data.length < 2) {
                        sendJSON(400, false, 'Array must have at least 2 numbers')
                        return
                    }
                    if (data.some(item => typeof item !== 'number')) {
                        sendJSON(400, false, 'Invalid data: all items must be numbers')
                        return
                    }

                    let result: number

                    switch (url) {
                        case '/sum':
                            result = data.reduce((acc, val) => acc + val, 0)
                            sendJSON(200, true, 'Sum calculated successfully', { result })
                            break
                        case '/sub':
                            // Lấy số đầu trừ dần các số còn lại
                            result = data.slice(1).reduce((acc, val) => acc - val, data[0])
                            sendJSON(200, true, 'Subtraction calculated successfully', { result })
                            break
                        case '/mul':
                            result = data.reduce((acc, val) => acc * val, 1)
                            sendJSON(200, true, 'Multiplication calculated successfully', { result })
                            break
                        case '/div':
                            // Kiểm tra chia cho 0
                            if (data.slice(1).some(val => val === 0)) {
                                sendJSON(400, false, 'Division by zero error')
                                return
                            }
                            result = data.slice(1).reduce((acc, val) => acc / val, data[0])
                            sendJSON(200, true, 'Division calculated successfully', { result })
                            break
                        default:
                            sendJSON(404, false, 'Not Found')
                    }
                } catch {
                    sendJSON(400, false, 'Invalid JSON')
                }
            })
        } 
        else if (url === '/') sendJSON(400, false, 'Cannot POST to "/"')
        else sendJSON(404, false, 'Not Found')
    }
    else sendJSON(405, false, `Method ${method} Not Allowed`)
})

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
