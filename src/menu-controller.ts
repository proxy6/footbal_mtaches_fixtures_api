import { Request, Response } from 'express';
import { setupCache } from 'axios-cache-adapter'

import { PepperAPIResponse, Category } from './models';
import titles from './data/titles';
const cache = setupCache({
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
})


import * as Axios from 'axios';
const axiosClient = Axios.default;

const axios = axiosClient.create({
    adapter: cache.adapter
})


export class MenuController {
    static async get(req: Request, res: Response) {
        const { data: { categories } } = (await axios.get<PepperAPIResponse>('http://backend-challenge-pos.pepperhq.com/menu.json')
        .catch(err => {
            res.status(500).json('Sorry, could not fetch menu')
        })) as { data: PepperAPIResponse };

        res.json(categories.map(({id, products}: Category) => {
            return {
                id,
                products: products.map( ({id: productId, price}) => {
                    const productTitle = titles.find(({id: titleId}) => titleId === productId);
                    return {
                        id: productId,
                        price,
                        title: productTitle ? productTitle.title : ''
                    }
                })
            }
        }));
    }
}