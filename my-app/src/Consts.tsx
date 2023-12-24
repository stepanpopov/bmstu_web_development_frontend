import {DataService, Page} from "./models/models"

export const DOMAIN = "http://localhost/api"

export const requestTime = 1000

export const dataServicesMock: DataService[] = [
    {id: 5, name: 'sectret', blob: 'blalba', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: 'aaaa', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: 'aaaa', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: 'aaaa', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: 'aaaa', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: 'aaaa', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: 'aaaa', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: 'aaaa', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: 'aaaa', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: 'aaaa', encode: true, active: true, image: '0'},
    {id: 6, name: 'aaaa', blob: 'aaaa', encode: true, active: true, image: '0'},
]

export const mainPage: Page = {link: '/rip_frontend', title: 'Данные для шифрования'}

export const navTitle = 'ШИФРОВАНИЕ КОДОМ ДЛЯ КОРРЕКЦИИ ОШИБОК';
