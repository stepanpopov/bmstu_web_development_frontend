import { Page } from "./models/common"
import DataService from "./models/dataService"

export const DOMAIN = "http://localhost/api"

export const requestTime = 1000

export const dataServicesMock: DataService[] = [
    {id: 5, name: 'sectret', blob: '11100101', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: '1010101001', encode: true, active: true, image: '0'},
]

export const mainPage: Page = {link: '/', title: 'Данные для шифрования'}

export const navTitle = 'ШИФРОВАНИЕ КОДОМ ДЛЯ КОРРЕКЦИИ ОШИБОК';
