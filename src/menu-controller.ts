import { Request, Response } from 'express';
import * as Axios from 'axios';
const axios = Axios.default;
import { PepperAPIResponse, Category } from './models';
import titles from './data/titles';


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
                    const foundTitle = titles.find(({id: titleId}) => titleId === productId);
                    return {
                        id: productId,
                        price,
                        title: foundTitle ? foundTitle.title : ''
                    }
                })
            }
        }));
    }
}