import { Page } from "./models/common"
import DataService from "./models/dataService"

export const DOMAIN = "http://localhost/api"

export const requestTime = 1000

export const dataServicesMock: DataService[] = [
    {id: 5, name: 'sectret', blob: '11100101', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 7, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 8, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 9, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 10, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 11, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 12, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 13, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 14, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 15, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
]

export const mainPage: Page = {link: '/', title: 'Данные для шифрования'}

export const navTitle = 'ШИФРОВАНИЕ КОДОМ ДЛЯ КОРРЕКЦИИ ОШИБОК';

export const JWT_TOKEN_COOKIE = 'jwtToken';
