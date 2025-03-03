// pages/api/scraper.js
import puppeteer from "puppeteer";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const url = "https://github.com/joblessgod/";
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    let currentViews = 3827;

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        currentViews++;
        console.log("Page reloaded - Current Views:", currentViews);
        await browser.close();
        
        return res.status(200).json({ message: "Page reloaded", views: currentViews });
    } catch (error) {
        console.error("Error:", error);
        await browser.close();
        return res.status(500).json({ error: "Something went wrong" });
    }
}
