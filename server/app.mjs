import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: path.resolve(__dirname, '../.env') }); //Load .env file. Ensure file path is correct for loading .env file. 
                                                            // Current __dirname ends at "server," but must go up a level with ".." bc .env is in root.
                                                            //path.resolve() to normalize the path with ".." so it becomes correct 
app.use(cors());

//body parsing middleware for urlencoded bodies, places parsed body into req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

console.log(process.env.PORT);

app.post("/checkURLReachable", async(req,res)=>{
    const {url }= req.body;
    console.log("url passed from frontend, this url is normalized", url);
    
    try {
        //Just return headers, don't need page content(whole html file of youtube.com) since we are just checking if page exists
        //In case there is a redirect, follow to new page
        const response = await fetch(url, {
            method: "HEAD",
            redirect: "follow",
        });

        res.json({reachable: true, status: response.status, message: "Site is reachable/responsive."})
    } catch (err) {
        //Only return reachable false if server has an unrelated error.
        //Even if the page returned a 404 or 500 status code, we return reachable true because the site still responded, meaning its reachable.
        res.json({reachable: false, status: null, message: "The site doesn't seem to respond. Add anyways?"});
    }
    
})

app.post("/canvasUniversities", async(req, res)=>{
    const {q} = req.body;
    
    try{
        const response = await fetch("https://api.theirstack.com/v1/companies/search",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.UNIVERSITIES_API_KEY}`,
                    "X-Use-Clickhouse": "true"
                },
                body: JSON.stringify(
                    {
                        order_by: [
                            { desc: true, field: "confidence" },
                            { desc: true, field: "jobs" },
                            { desc: true, field: "num_jobs" }
                        ],
                        company_technology_slug_or: ["canvas"],
                        company_country_code_or: ["US"],
                        blur_company_data: false,
                        page: 0,
                        limit: 25,
                        include_total_results: false
                    }
                )
            });

        const data = await response.json();
        console.log(data);
        res.json(data);
    }catch(err){
        res.json({error: "Failed to fetch universities"});
    }
})

app.listen(process.env.PORT || 3001);