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
export const loginPage: Page = {link: '/login', title: 'Войти'}
export const registerPage: Page = {link: '/register', title: 'Регистрация'}
export const requestsPage: Page = {link: '/requests', title: 'Запросы на шифрование'}

export const navTitle = 'ШИФРОВАНИЕ КОДОМ ДЛЯ КОРРЕКЦИИ ОШИБОК';
export const footerTitle = '2023 ШИФРОВАННЯ/ДЕШИФРОВАННЯ ДЛЯ БУДЬ-КОГО СВІТУ 2023'

export const JWT_TOKEN_COOKIE = 'jwtToken';

export const isModeratorMock = false;
