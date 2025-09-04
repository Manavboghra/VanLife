import fs from 'fs';
import path from 'path';

function readData() {
    const filePath = path.resolve(process.cwd(), 'api', 'data.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

function writeData(data) {
    const filePath = path.resolve(process.cwd(), 'api', 'data.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); 
}

export default function handler(request, response) {
    const data = readData();

    if (request.method === 'GET') {
        const { id } = request.query;
        if (id) {
            const van = data.vans.find(v => v.id === id);
            if (van) {
                return response.status(200).json(van);
            } else {
                return response.status(404).json({ message: `Van with id ${id} not found.` });
            }
        } else {
            return response.status(200).json(data.vans);
        }
    }

    if (request.method === 'PUT') {
        const { id } = request.query;
        const newReview = request.body;

        const vanIndex = data.vans.findIndex(v => v.id === id);
        if (vanIndex !== -1) {
            if (!data.vans[vanIndex].reviews) {
                data.vans[vanIndex].reviews = [];
            }
            data.vans[vanIndex].reviews.push(newReview);
            writeData(data);
            return response.status(200).json(data.vans[vanIndex]);
        } else {
            return response.status(404).json({ message: `Van with id ${id} not found.` });
        }
    }

     if (request.method === 'POST') {
        const newVan = request.body;
        data.vans.push(newVan);
        writeData(data);
        return response.status(201).json(newVan);
    }

    response.setHeader('Allow', ['GET', 'PUT', 'POST']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
}

