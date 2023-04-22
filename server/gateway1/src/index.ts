import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

export const PORT = process.env.GATEWAY_1_PORT || 5000

const app = express()
dotenv.config()

app.use(morgan('dev'))
app.use(cors({
    origin: "*"
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send("Hello")
})

export default app