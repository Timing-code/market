import { useState } from 'react';
import { Panel, PanelHeader, Group, Header, Button, Div, Card, CardGrid, Avatar, Text, Subhead, Separator, Search, Badge } from '@vkontakte/vkui';

const Catalog = ({ id, onNavigate, addToCartGlobal, selectedCategory, cartCount = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(selectedCategory || 'all');

  const products = [
    // 🎮 ВИДЕОКАРТЫ (25 шт)
    { id: 1, name: 'NVIDIA GeForce RTX 4090 24GB', category: 'Видеокарты', price: 189990, oldPrice: 199990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=RTX+4090', rating: 4.9, reviews: 127, inStock: true, badge: 'ХИТ', icon: '🎮' },
    { id: 2, name: 'NVIDIA GeForce RTX 4080 SUPER 16GB', category: 'Видеокарты', price: 119990, oldPrice: 129990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=RTX+4080', rating: 4.8, reviews: 98, inStock: true, badge: 'NEW', icon: '🎮' },
    { id: 3, name: 'NVIDIA GeForce RTX 4070 Ti SUPER 16GB', category: 'Видеокарты', price: 89990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=RTX+4070', rating: 4.7, reviews: 156, inStock: true, badge: 'ВЫГОДНО', icon: '🎮' },
    { id: 4, name: 'NVIDIA GeForce RTX 4070 SUPER 12GB', category: 'Видеокарты', price: 69990, oldPrice: 74990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=RTX+4070', rating: 4.7, reviews: 189, inStock: true, icon: '🎮' },
    { id: 5, name: 'NVIDIA GeForce RTX 4060 Ti 16GB', category: 'Видеокарты', price: 49990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=RTX+4060', rating: 4.6, reviews: 234, inStock: true, icon: '🎮' },
    { id: 6, name: 'NVIDIA GeForce RTX 4060 8GB', category: 'Видеокарты', price: 34990, oldPrice: 39990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=RTX+4060', rating: 4.5, reviews: 312, inStock: true, badge: '-13%', icon: '🎮' },
    { id: 7, name: 'AMD Radeon RX 7900 XTX 24GB', category: 'Видеокарты', price: 99990, oldPrice: 109990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=RX+7900', rating: 4.8, reviews: 87, inStock: true, badge: 'ХИТ', icon: '🎮' },
    { id: 8, name: 'AMD Radeon RX 7900 XT 20GB', category: 'Видеокарты', price: 79990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=RX+7900', rating: 4.7, reviews: 76, inStock: true, icon: '🎮' },
    { id: 9, name: 'AMD Radeon RX 7800 XT 16GB', category: 'Видеокарты', price: 59990, oldPrice: 64990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=RX+7800', rating: 4.6, reviews: 145, inStock: true, badge: '-8%', icon: '🎮' },
    { id: 10, name: 'AMD Radeon RX 7700 XT 12GB', category: 'Видеокарты', price: 49990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=RX+7700', rating: 4.5, reviews: 98, inStock: true, icon: '🎮' },
    { id: 11, name: 'AMD Radeon RX 7600 8GB', category: 'Видеокарты', price: 32990, oldPrice: 36990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=RX+7600', rating: 4.4, reviews: 167, inStock: true, icon: '🎮' },
    { id: 12, name: 'NVIDIA GeForce RTX 3060 12GB', category: 'Видеокарты', price: 29990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=RTX+3060', rating: 4.5, reviews: 456, inStock: true, badge: 'БЮДЖЕТ', icon: '🎮' },
    { id: 13, name: 'NVIDIA GeForce RTX 3050 8GB', category: 'Видеокарты', price: 24990, oldPrice: 27990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=RTX+3050', rating: 4.3, reviews: 289, inStock: true, icon: '🎮' },
    { id: 14, name: 'AMD Radeon RX 6600 8GB', category: 'Видеокарты', price: 22990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=RX+6600', rating: 4.4, reviews: 378, inStock: true, icon: '🎮' },
    { id: 15, name: 'NVIDIA GeForce RTX 4090 ROG STRIX', category: 'Видеокарты', price: 219990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=ROG+4090', rating: 5.0, reviews: 45, inStock: true, badge: 'PREMIUM', icon: '🎮' },
    { id: 16, name: 'NVIDIA GeForce RTX 4080 GAMING X', category: 'Видеокарты', price: 139990, oldPrice: 149990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=GAMING+4080', rating: 4.8, reviews: 67, inStock: true, icon: '🎮' },
    { id: 17, name: 'AMD Radeon RX 7900 GRE 16GB', category: 'Видеокарты', price: 69990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=RX+7900', rating: 4.6, reviews: 54, inStock: true, icon: '🎮' },
    { id: 18, name: 'NVIDIA GeForce RTX 4070 VENTUS', category: 'Видеокарты', price: 64990, oldPrice: 69990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=VENTUS+4070', rating: 4.6, reviews: 123, inStock: true, icon: '🎮' },
    { id: 19, name: 'AMD Radeon RX 6750 XT 12GB', category: 'Видеокарты', price: 39990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=RX+6750', rating: 4.5, reviews: 198, inStock: true, icon: '🎮' },
    { id: 20, name: 'NVIDIA GeForce RTX 4060 Ti GAMING', category: 'Видеокарты', price: 54990, oldPrice: 59990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=GAMING+4060', rating: 4.7, reviews: 87, inStock: true, icon: '🎮' },
    { id: 21, name: 'AMD Radeon RX 6650 XT 8GB', category: 'Видеокарты', price: 27990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=RX+6650', rating: 4.4, reviews: 156, inStock: false, badge: 'НЕТ', icon: '🎮' },
    { id: 22, name: 'NVIDIA GeForce RTX 3060 Ti 8GB', category: 'Видеокарты', price: 32990, oldPrice: 37990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=RTX+3060', rating: 4.6, reviews: 267, inStock: true, icon: '🎮' },
    { id: 23, name: 'AMD Radeon RX 6500 XT 4GB', category: 'Видеокарты', price: 16990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=RX+6500', rating: 4.1, reviews: 234, inStock: true, badge: 'БЮДЖЕТ', icon: '🎮' },
    { id: 24, name: 'NVIDIA GeForce RTX 4070 Ti GAMING', category: 'Видеокарты', price: 94990, image: 'https://placehold.co/150x150/FF6600/FFFFFF?text=GAMING+4070', rating: 4.8, reviews: 76, inStock: true, icon: '🎮' },
    { id: 25, name: 'AMD Radeon RX 7950 XT 20GB', category: 'Видеокарты', price: 89990, oldPrice: 94990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=RX+7950', rating: 4.7, reviews: 43, inStock: true, icon: '🎮' },

    // ⚡ ПРОЦЕССОРЫ (25 шт)
    { id: 26, name: 'Intel Core i9-14900K', category: 'Процессоры', price: 69990, oldPrice: 74990, image: 'https://placehold.co/150x150/0066FF/FFFFFF?text=i9-14900K', rating: 4.9, reviews: 89, inStock: true, badge: 'NEW', icon: '⚡' },
    { id: 27, name: 'Intel Core i9-13900K', category: 'Процессоры', price: 64990, image: 'https://placehold.co/150x150/0066FF/FFFFFF?text=i9-13900K', rating: 4.8, reviews: 156, inStock: true, badge: 'ХИТ', icon: '⚡' },
    { id: 28, name: 'Intel Core i9-13900KF', category: 'Процессоры', price: 59990, oldPrice: 64990, image: 'https://placehold.co/150x150/0066FF/FFFFFF?text=i9-13900KF', rating: 4.8, reviews: 98, inStock: true, icon: '⚡' },
    { id: 29, name: 'Intel Core i7-14700K', category: 'Процессоры', price: 49990, image: 'https://placehold.co/150x150/0066FF/FFFFFF?text=i7-14700K', rating: 4.8, reviews: 67, inStock: true, badge: 'NEW', icon: '⚡' },
    { id: 30, name: 'Intel Core i7-13700K', category: 'Процессоры', price: 44990, oldPrice: 49990, image: 'https://placehold.co/150x150/0066FF/FFFFFF?text=i7-13700K', rating: 4.7, reviews: 178, inStock: true, icon: '⚡' },
    { id: 31, name: 'Intel Core i7-13700KF', category: 'Процессоры', price: 39990, image: 'https://placehold.co/150x150/0066FF/FFFFFF?text=i7-13700KF', rating: 4.7, reviews: 134, inStock: true, icon: '⚡' },
    { id: 32, name: 'Intel Core i5-14600K', category: 'Процессоры', price: 37990, image: 'https://placehold.co/150x150/0066FF/FFFFFF?text=i5-14600K', rating: 4.7, reviews: 89, inStock: true, badge: 'NEW', icon: '⚡' },
    { id: 33, name: 'Intel Core i5-13600K', category: 'Процессоры', price: 32990, oldPrice: 36990, image: 'https://placehold.co/150x150/0066FF/FFFFFF?text=i5-13600K', rating: 4.6, reviews: 234, inStock: true, badge: 'ЛУЧШИЙ', icon: '⚡' },
    { id: 34, name: 'Intel Core i5-13600KF', category: 'Процессоры', price: 29990, image: 'https://placehold.co/150x150/0066FF/FFFFFF?text=i5-13600KF', rating: 4.6, reviews: 198, inStock: true, icon: '⚡' },
    { id: 35, name: 'Intel Core i5-13500', category: 'Процессоры', price: 24990, image: 'https://placehold.co/150x150/0066FF/FFFFFF?text=i5-13500', rating: 4.5, reviews: 167, inStock: true, icon: '⚡' },
    { id: 36, name: 'Intel Core i5-13400F', category: 'Процессоры', price: 19990, oldPrice: 22990, image: 'https://placehold.co/150x150/0066FF/FFFFFF?text=i5-13400F', rating: 4.5, reviews: 312, inStock: true, badge: 'БЮДЖЕТ', icon: '⚡' },
    { id: 37, name: 'AMD Ryzen 9 7950X3D', category: 'Процессоры', price: 69990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=Ryzen+9', rating: 4.9, reviews: 76, inStock: true, badge: 'PREMIUM', icon: '⚡' },
    { id: 38, name: 'AMD Ryzen 9 7950X', category: 'Процессоры', price: 59990, oldPrice: 64990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=Ryzen+9', rating: 4.8, reviews: 145, inStock: true, icon: '⚡' },
    { id: 39, name: 'AMD Ryzen 9 7900X3D', category: 'Процессоры', price: 54990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=Ryzen+9', rating: 4.8, reviews: 87, inStock: true, icon: '⚡' },
    { id: 40, name: 'AMD Ryzen 9 7900X', category: 'Процессоры', price: 49990, oldPrice: 54990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=Ryzen+9', rating: 4.7, reviews: 123, inStock: true, icon: '⚡' },
    { id: 41, name: 'AMD Ryzen 7 7800X3D', category: 'Процессоры', price: 44990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=Ryzen+7', rating: 4.9, reviews: 198, inStock: true, badge: 'ХИТ', icon: '⚡' },
    { id: 42, name: 'AMD Ryzen 7 7700X', category: 'Процессоры', price: 39990, oldPrice: 42990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=Ryzen+7', rating: 4.7, reviews: 167, inStock: true, icon: '⚡' },
    { id: 43, name: 'AMD Ryzen 7 7700', category: 'Процессоры', price: 36990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=Ryzen+7', rating: 4.6, reviews: 134, inStock: true, icon: '⚡' },
    { id: 44, name: 'AMD Ryzen 5 7600X3D', category: 'Процессоры', price: 32990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=Ryzen+5', rating: 4.7, reviews: 145, inStock: true, icon: '⚡' },
    { id: 45, name: 'AMD Ryzen 5 7600X', category: 'Процессоры', price: 24990, oldPrice: 27990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=Ryzen+5', rating: 4.6, reviews: 234, inStock: true, icon: '⚡' },
    { id: 46, name: 'AMD Ryzen 5 7500F', category: 'Процессоры', price: 19990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=Ryzen+5', rating: 4.5, reviews: 289, inStock: true, badge: 'БЮДЖЕТ', icon: '⚡' },
    { id: 47, name: 'AMD Ryzen 5 7600', category: 'Процессоры', price: 22990, oldPrice: 24990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=Ryzen+5', rating: 4.5, reviews: 198, inStock: true, icon: '⚡' },
    { id: 48, name: 'Intel Core i3-13100F', category: 'Процессоры', price: 12990, image: 'https://placehold.co/150x150/0066FF/FFFFFF?text=i3-13100F', rating: 4.3, reviews: 267, inStock: true, badge: 'БЮДЖЕТ', icon: '⚡' },
    { id: 49, name: 'AMD Ryzen 5 5600X', category: 'Процессоры', price: 16990, oldPrice: 19990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=Ryzen+5', rating: 4.6, reviews: 456, inStock: true, icon: '⚡' },
    { id: 50, name: 'Intel Core i7-12700K', category: 'Процессоры', price: 34990, image: 'https://placehold.co/150x150/0066FF/FFFFFF?text=i7-12700K', rating: 4.6, reviews: 189, inStock: false, badge: 'НЕТ', icon: '⚡' },

    // 🔷 МАТЕРИНСКИЕ ПЛАТЫ (25 шт)
    { id: 51, name: 'ASUS ROG Strix Z790-E Gaming WiFi', category: 'Материнские платы', price: 45990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=Z790-E', rating: 4.8, reviews: 67, inStock: true, badge: 'FLAGSHIP', icon: '🔷' },
    { id: 52, name: 'ASUS ROG Strix Z790-F Gaming WiFi', category: 'Материнские платы', price: 39990, oldPrice: 42990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=Z790-F', rating: 4.7, reviews: 89, inStock: true, icon: '🔷' },
    { id: 53, name: 'MSI MPG Z790 EDGE WiFi', category: 'Материнские платы', price: 37990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=Z790+EDGE', rating: 4.7, reviews: 76, inStock: true, icon: '🔷' },
    { id: 54, name: 'Gigabyte Z790 AORUS Elite', category: 'Материнские платы', price: 34990, oldPrice: 37990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=Z790+AORUS', rating: 4.6, reviews: 98, inStock: true, icon: '🔷' },
    { id: 55, name: 'ASRock Z790 Pro RS', category: 'Материнские платы', price: 29990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=Z790+Pro', rating: 4.5, reviews: 123, inStock: true, badge: 'ВЫГОДНО', icon: '🔷' },
    { id: 56, name: 'ASUS TUF Gaming Z790-Plus', category: 'Материнские платы', price: 32990, oldPrice: 35990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=Z790+TUF', rating: 4.6, reviews: 134, inStock: true, icon: '🔷' },
    { id: 57, name: 'MSI MAG Z790 TOMAHAWK WiFi', category: 'Материнские платы', price: 31990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=Z790+TOMAHAWK', rating: 4.7, reviews: 145, inStock: true, icon: '🔷' },
    { id: 58, name: 'Gigabyte Z790 GAMING X', category: 'Материнские платы', price: 27990, oldPrice: 29990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=Z790+GAMING', rating: 4.5, reviews: 167, inStock: true, icon: '🔷' },
    { id: 59, name: 'ASUS ROG Strix B650-E Gaming WiFi', category: 'Материнские платы', price: 34990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=B650-E', rating: 4.7, reviews: 87, inStock: true, icon: '🔷' },
    { id: 60, name: 'MSI MPG B650 EDGE WiFi', category: 'Материнские платы', price: 24990, oldPrice: 27990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=B650+EDGE', rating: 4.6, reviews: 112, inStock: true, badge: '-11%', icon: '🔷' },
    { id: 61, name: 'Gigabyte B650 AORUS Elite', category: 'Материнские платы', price: 22990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=B650+AORUS', rating: 4.5, reviews: 134, inStock: true, icon: '🔷' },
    { id: 62, name: 'ASRock B650 Pro RS', category: 'Материнские платы', price: 19990, oldPrice: 21990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=B650+Pro', rating: 4.4, reviews: 156, inStock: true, icon: '🔷' },
    { id: 63, name: 'ASUS TUF Gaming B650-Plus', category: 'Материнские платы', price: 21990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=B650+TUF', rating: 4.5, reviews: 145, inStock: true, icon: '🔷' },
    { id: 64, name: 'MSI MAG B650 TOMAHAWK WiFi', category: 'Материнские платы', price: 23990, oldPrice: 25990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=B650+TOMAHAWK', rating: 4.6, reviews: 98, inStock: true, icon: '🔷' },
    { id: 65, name: 'Gigabyte B650 GAMING X', category: 'Материнские платы', price: 16990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=B650+GAMING', rating: 4.4, reviews: 178, inStock: true, badge: 'БЮДЖЕТ', icon: '🔷' },
    { id: 66, name: 'ASUS ROG Strix X670-E Gaming WiFi', category: 'Материнские платы', price: 49990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=X670-E', rating: 4.8, reviews: 54, inStock: true, badge: 'PREMIUM', icon: '🔷' },
    { id: 67, name: 'MSI MEG X670E ACE', category: 'Материнские платы', price: 54990, oldPrice: 59990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=X670E+ACE', rating: 4.9, reviews: 43, inStock: true, icon: '🔷' },
    { id: 68, name: 'Gigabyte X670 AORUS Elite', category: 'Материнские платы', price: 39990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=X670+AORUS', rating: 4.7, reviews: 67, inStock: true, icon: '🔷' },
    { id: 69, name: 'ASRock X670E Steel Legend', category: 'Материнские платы', price: 36990, oldPrice: 39990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=X670E+Steel', rating: 4.6, reviews: 76, inStock: true, icon: '🔷' },
    { id: 70, name: 'ASUS Prime B760-Plus', category: 'Материнские платы', price: 18990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=B760+Prime', rating: 4.4, reviews: 189, inStock: true, icon: '🔷' },
    { id: 71, name: 'MSI PRO B760-P WiFi', category: 'Материнские платы', price: 17990, oldPrice: 19990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=B760+PRO', rating: 4.3, reviews: 167, inStock: true, icon: '🔷' },
    { id: 72, name: 'Gigabyte B760 GAMING X', category: 'Материнские платы', price: 16990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=B760+GAMING', rating: 4.4, reviews: 145, inStock: true, icon: '🔷' },
    { id: 73, name: 'ASRock B760M Pro RS', category: 'Материнские платы', price: 14990, oldPrice: 16990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=B760M+Pro', rating: 4.3, reviews: 198, inStock: true, badge: 'БЮДЖЕТ', icon: '🔷' },
    { id: 74, name: 'ASUS ROG Maximus Z790 Hero', category: 'Материнские платы', price: 64990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=Z790+Hero', rating: 4.9, reviews: 32, inStock: false, badge: 'НЕТ', icon: '🔷' },
    { id: 75, name: 'MSI MPG Z790 CARBON WiFi', category: 'Материнские платы', price: 42990, oldPrice: 46990, image: 'https://placehold.co/150x150/9B51E0/FFFFFF?text=Z790+CARBON', rating: 4.7, reviews: 56, inStock: true, icon: '🔷' },

    // 💾 ОПЕРАТИВНАЯ ПАМЯТЬ (25 шт)
    { id: 76, name: 'Corsair Vengeance 32GB DDR5 5600MHz', category: 'Оперативная память', price: 12990, oldPrice: 14990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=RAM+32GB', rating: 4.7, reviews: 234, inStock: true, badge: '-13%', icon: '💾' },
    { id: 77, name: 'Corsair Vengeance 64GB DDR5 5600MHz', category: 'Оперативная память', price: 24990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=RAM+64GB', rating: 4.8, reviews: 145, inStock: true, icon: '💾' },
    { id: 78, name: 'Corsair Vengeance 16GB DDR5 5200MHz', category: 'Оперативная память', price: 7990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=RAM+16GB', rating: 4.6, reviews: 312, inStock: true, badge: 'БЮДЖЕТ', icon: '💾' },
    { id: 79, name: 'Kingston Fury 32GB DDR5 5600MHz', category: 'Оперативная память', price: 11990, oldPrice: 13990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Kingston+32GB', rating: 4.6, reviews: 267, inStock: true, icon: '💾' },
    { id: 80, name: 'Kingston Fury 16GB DDR5 5200MHz', category: 'Оперативная память', price: 6990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Kingston+16GB', rating: 4.5, reviews: 389, inStock: true, icon: '💾' },
    { id: 81, name: 'Kingston Fury 64GB DDR5 6000MHz', category: 'Оперативная память', price: 26990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Kingston+64GB', rating: 4.7, reviews: 98, inStock: true, icon: '💾' },
    { id: 82, name: 'G.Skill Trident Z5 32GB DDR5 6000MHz', category: 'Оперативная память', price: 14990, oldPrice: 16990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Trident+32GB', rating: 4.8, reviews: 178, inStock: true, badge: 'RGB', icon: '💾' },
    { id: 83, name: 'G.Skill Trident Z5 64GB DDR5 6000MHz', category: 'Оперативная память', price: 28990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Trident+64GB', rating: 4.8, reviews: 87, inStock: true, icon: '💾' },
    { id: 84, name: 'G.Skill Trident Z5 16GB DDR5 5600MHz', category: 'Оперативная память', price: 8990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Trident+16GB', rating: 4.7, reviews: 234, inStock: true, icon: '💾' },
    { id: 85, name: 'G.Skill Ripjaws S5 32GB DDR5 5600MHz', category: 'Оперативная память', price: 11990, oldPrice: 12990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Ripjaws+32GB', rating: 4.6, reviews: 198, inStock: true, icon: '💾' },
    { id: 86, name: 'Crucial Pro 32GB DDR5 5600MHz', category: 'Оперативная память', price: 10990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Crucial+32GB', rating: 4.5, reviews: 167, inStock: true, icon: '💾' },
    { id: 87, name: 'Crucial Pro 16GB DDR5 5200MHz', category: 'Оперативная память', price: 6490, oldPrice: 7490, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Crucial+16GB', rating: 4.4, reviews: 289, inStock: true, icon: '💾' },
    { id: 88, name: 'Crucial Pro 64GB DDR5 5600MHz', category: 'Оперативная память', price: 23990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Crucial+64GB', rating: 4.6, reviews: 76, inStock: true, icon: '💾' },
    { id: 89, name: 'ADATA XPG Lancer 32GB DDR5 6000MHz', category: 'Оперативная память', price: 13990, oldPrice: 15990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=XPG+32GB', rating: 4.6, reviews: 145, inStock: true, badge: 'RGB', icon: '💾' },
    { id: 90, name: 'ADATA XPG Lancer 16GB DDR5 5600MHz', category: 'Оперативная память', price: 7990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=XPG+16GB', rating: 4.5, reviews: 198, inStock: true, icon: '💾' },
    { id: 91, name: 'TeamGroup T-Force 32GB DDR5 5600MHz', category: 'Оперативная память', price: 11490, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=T-Force+32GB', rating: 4.5, reviews: 134, inStock: true, icon: '💾' },
    { id: 92, name: 'TeamGroup T-Force 16GB DDR5 5200MHz', category: 'Оперативная память', price: 6790, oldPrice: 7790, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=T-Force+16GB', rating: 4.4, reviews: 167, inStock: true, icon: '💾' },
    { id: 93, name: 'Patriot Viper 32GB DDR5 5600MHz', category: 'Оперативная память', price: 10990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Viper+32GB', rating: 4.5, reviews: 123, inStock: true, icon: '💾' },
    { id: 94, name: 'Patriot Viper 16GB DDR5 5200MHz', category: 'Оперативная память', price: 6290, oldPrice: 7290, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Viper+16GB', rating: 4.4, reviews: 189, inStock: true, icon: '💾' },
    { id: 95, name: 'Corsair Dominator 64GB DDR5 6400MHz', category: 'Оперативная память', price: 34990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Dominator+64GB', rating: 4.9, reviews: 54, inStock: true, badge: 'PREMIUM', icon: '💾' },
    { id: 96, name: 'G.Skill Trident Z5 RGB 32GB DDR5 6400MHz', category: 'Оперативная память', price: 16990, oldPrice: 18990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=RGB+32GB', rating: 4.8, reviews: 98, inStock: true, icon: '💾' },
    { id: 97, name: 'Kingston Fury Beast 32GB DDR5 5200MHz', category: 'Оперативная память', price: 10490, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Beast+32GB', rating: 4.5, reviews: 178, inStock: true, icon: '💾' },
    { id: 98, name: 'Corsair Vengeance RGB 32GB DDR5 6000MHz', category: 'Оперативная память', price: 14490, oldPrice: 15990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=RGB+32GB', rating: 4.7, reviews: 145, inStock: true, badge: 'RGB', icon: '💾' },
    { id: 99, name: 'ADATA XPG 64GB DDR5 6000MHz', category: 'Оперативная память', price: 25990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=XPG+64GB', rating: 4.6, reviews: 67, inStock: false, badge: 'НЕТ', icon: '💾' },
    { id: 100, name: 'TeamGroup T-Force Delta 32GB DDR5 6000MHz', category: 'Оперативная память', price: 13490, oldPrice: 14990, image: 'https://placehold.co/150x150/FF6B00/FFFFFF?text=Delta+32GB', rating: 4.6, reviews: 112, inStock: true, badge: 'RGB', icon: '💾' },

    // 💿 SSD НАКОПИТЕЛИ (25 шт)
    { id: 101, name: 'Samsung 990 PRO 2TB NVMe', category: 'SSD накопители', price: 18990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=990+PRO+2TB', rating: 4.9, reviews: 312, inStock: true, badge: 'ТОП', icon: '💿' },
    { id: 102, name: 'Samsung 990 PRO 1TB NVMe', category: 'SSD накопители', price: 11990, oldPrice: 13990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=990+PRO+1TB', rating: 4.9, reviews: 456, inStock: true, icon: '💿' },
    { id: 103, name: 'Samsung 990 PRO 4TB NVMe', category: 'SSD накопители', price: 34990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=990+PRO+4TB', rating: 4.9, reviews: 87, inStock: true, badge: 'МАКСИМУМ', icon: '💿' },
    { id: 104, name: 'Samsung 980 PRO 2TB NVMe', category: 'SSD накопители', price: 16990, oldPrice: 18990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=980+PRO+2TB', rating: 4.8, reviews: 389, inStock: true, icon: '💿' },
    { id: 105, name: 'Samsung 980 PRO 1TB NVMe', category: 'SSD накопители', price: 9990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=980+PRO+1TB', rating: 4.8, reviews: 512, inStock: true, icon: '💿' },
    { id: 106, name: 'Kingston KC3000 2TB NVMe', category: 'SSD накопители', price: 14990, oldPrice: 16990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=KC3000+2TB', rating: 4.7, reviews: 267, inStock: true, badge: '-12%', icon: '💿' },
    { id: 107, name: 'Kingston KC3000 1TB NVMe', category: 'SSD накопители', price: 8990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=KC3000+1TB', rating: 4.7, reviews: 345, inStock: true, icon: '💿' },
    { id: 108, name: 'Kingston KC3000 512GB NVMe', category: 'SSD накопители', price: 5990, oldPrice: 6990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=KC3000+512GB', rating: 4.6, reviews: 423, inStock: true, icon: '💿' },
    { id: 109, name: 'WD Black SN850X 2TB NVMe', category: 'SSD накопители', price: 17990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=SN850X+2TB', rating: 4.8, reviews: 234, inStock: true, icon: '💿' },
    { id: 110, name: 'WD Black SN850X 1TB NVMe', category: 'SSD накопители', price: 10990, oldPrice: 12990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=SN850X+1TB', rating: 4.8, reviews: 298, inStock: true, icon: '💿' },
    { id: 111, name: 'WD Black SN850X 4TB NVMe', category: 'SSD накопители', price: 34990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=SN850X+4TB', rating: 4.8, reviews: 76, inStock: true, icon: '💿' },
    { id: 112, name: 'WD Black SN770 2TB NVMe', category: 'SSD накопители', price: 13990, oldPrice: 15990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=SN770+2TB', rating: 4.6, reviews: 189, inStock: true, icon: '💿' },
    { id: 113, name: 'WD Black SN770 1TB NVMe', category: 'SSD накопители', price: 7990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=SN770+1TB', rating: 4.6, reviews: 267, inStock: true, icon: '💿' },
    { id: 114, name: 'Crucial P5 Plus 2TB NVMe', category: 'SSD накопители', price: 14490, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=P5+Plus+2TB', rating: 4.6, reviews: 178, inStock: true, icon: '💿' },
    { id: 115, name: 'Crucial P5 Plus 1TB NVMe', category: 'SSD накопители', price: 8490, oldPrice: 9490, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=P5+Plus+1TB', rating: 4.6, reviews: 234, inStock: true, icon: '💿' },
    { id: 116, name: 'Crucial P3 Plus 2TB NVMe', category: 'SSD накопители', price: 11990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=P3+Plus+2TB', rating: 4.5, reviews: 198, inStock: true, icon: '💿' },
    { id: 117, name: 'Crucial P3 Plus 1TB NVMe', category: 'SSD накопители', price: 6990, oldPrice: 7990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=P3+Plus+1TB', rating: 4.5, reviews: 289, inStock: true, badge: 'БЮДЖЕТ', icon: '💿' },
    { id: 118, name: 'ADATA XPG GAMMIX S70 2TB NVMe', category: 'SSD накопители', price: 13490, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=S70+2TB', rating: 4.5, reviews: 145, inStock: true, icon: '💿' },
    { id: 119, name: 'ADATA XPG GAMMIX S70 1TB NVMe', category: 'SSD накопители', price: 7990, oldPrice: 8990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=S70+1TB', rating: 4.5, reviews: 198, inStock: true, icon: '💿' },
    { id: 120, name: 'TeamGroup MP34 2TB NVMe', category: 'SSD накопители', price: 12490, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=MP34+2TB', rating: 4.4, reviews: 134, inStock: true, icon: '💿' },
    { id: 121, name: 'TeamGroup MP34 1TB NVMe', category: 'SSD накопители', price: 6990, oldPrice: 7990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=MP34+1TB', rating: 4.4, reviews: 189, inStock: true, icon: '💿' },
    { id: 122, name: 'Patriot Viper VP4300 2TB NVMe', category: 'SSD накопители', price: 13990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=VP4300+2TB', rating: 4.5, reviews: 112, inStock: true, icon: '💿' },
    { id: 123, name: 'Patriot Viper VP4300 1TB NVMe', category: 'SSD накопители', price: 7990, oldPrice: 8990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=VP4300+1TB', rating: 4.5, reviews: 167, inStock: true, icon: '💿' },
    { id: 124, name: 'Samsung 990 EVO 2TB NVMe', category: 'SSD накопители', price: 15990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=990+EVO+2TB', rating: 4.7, reviews: 98, inStock: false, badge: 'НЕТ', icon: '💿' },
    { id: 125, name: 'Kingston NV2 2TB NVMe', category: 'SSD накопители', price: 10990, oldPrice: 12990, image: 'https://placehold.co/150x150/FF5C5C/FFFFFF?text=NV2+2TB', rating: 4.4, reviews: 234, inStock: true, badge: 'БЮДЖЕТ', icon: '💿' },

    // 🔌 БЛОКИ ПИТАНИЯ (25 шт)
    { id: 126, name: 'be quiet! Dark Power 13 1000W Titanium', category: 'Блоки питания', price: 24990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=1000W+Titanium', rating: 4.9, reviews: 78, inStock: true, badge: '80+ TITANIUM', icon: '🔌' },
    { id: 127, name: 'be quiet! Dark Power 13 850W Titanium', category: 'Блоки питания', price: 21990, oldPrice: 23990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=850W+Titanium', rating: 4.9, reviews: 65, inStock: true, icon: '🔌' },
    { id: 128, name: 'be quiet! Straight Power 12 850W Gold', category: 'Блоки питания', price: 16990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=850W+Gold', rating: 4.8, reviews: 123, inStock: true, icon: '🔌' },
    { id: 129, name: 'be quiet! Straight Power 12 750W Gold', category: 'Блоки питания', price: 14990, oldPrice: 16990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=750W+Gold', rating: 4.8, reviews: 145, inStock: true, icon: '🔌' },
    { id: 130, name: 'be quiet! Pure Power 12 M 750W Gold', category: 'Блоки питания', price: 11990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=750W+Pure', rating: 4.7, reviews: 178, inStock: true, badge: 'ВЫГОДНО', icon: '🔌' },
    { id: 131, name: 'be quiet! Pure Power 12 M 650W Gold', category: 'Блоки питания', price: 9990, oldPrice: 11990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=650W+Pure', rating: 4.7, reviews: 234, inStock: true, icon: '🔌' },
    { id: 132, name: 'Corsair RM1000x 1000W Gold', category: 'Блоки питания', price: 18990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=RM1000x', rating: 4.8, reviews: 156, inStock: true, icon: '🔌' },
    { id: 133, name: 'Corsair RM850e 850W Gold', category: 'Блоки питания', price: 14990, oldPrice: 16990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=RM850e', rating: 4.7, reviews: 198, inStock: true, icon: '🔌' },
    { id: 134, name: 'Corsair RM750e 750W Gold', category: 'Блоки питания', price: 12990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=RM750e', rating: 4.7, reviews: 234, inStock: true, icon: '🔌' },
    { id: 135, name: 'Corsair RM650e 650W Gold', category: 'Блоки питания', price: 10990, oldPrice: 12990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=RM650e', rating: 4.6, reviews: 267, inStock: true, icon: '🔌' },
    { id: 136, name: 'Corsair CX750M 750W Bronze', category: 'Блоки питания', price: 8990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=CX750M', rating: 4.5, reviews: 312, inStock: true, badge: 'БЮДЖЕТ', icon: '🔌' },
    { id: 137, name: 'Corsair CX650M 650W Bronze', category: 'Блоки питания', price: 7990, oldPrice: 8990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=CX650M', rating: 4.5, reviews: 345, inStock: true, icon: '🔌' },
    { id: 138, name: 'DeepCool PQ1000M 1000W Gold', category: 'Блоки питания', price: 12990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=PQ1000M', rating: 4.6, reviews: 134, inStock: true, icon: '🔌' },
    { id: 139, name: 'DeepCool PQ850M 850W Gold', category: 'Блоки питания', price: 10990, oldPrice: 12990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=PQ850M', rating: 4.6, reviews: 167, inStock: true, icon: '🔌' },
    { id: 140, name: 'DeepCool PQ750M 750W Gold', category: 'Блоки питания', price: 9490, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=PQ750M', rating: 4.5, reviews: 189, inStock: true, icon: '🔌' },
    { id: 141, name: 'DeepCool DQ750-M-V2L 750W Gold', category: 'Блоки питания', price: 8490, oldPrice: 9990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=DQ750', rating: 4.5, reviews: 212, inStock: true, icon: '🔌' },
    { id: 142, name: 'Seasonic Focus GX-850 850W Gold', category: 'Блоки питания', price: 15990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=GX-850', rating: 4.8, reviews: 145, inStock: true, icon: '🔌' },
    { id: 143, name: 'Seasonic Focus GX-750 750W Gold', category: 'Блоки питания', price: 13990, oldPrice: 15990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=GX-750', rating: 4.8, reviews: 178, inStock: true, icon: '🔌' },
    { id: 144, name: 'Seasonic Focus GX-650 650W Gold', category: 'Блоки питания', price: 11990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=GX-650', rating: 4.7, reviews: 234, inStock: true, icon: '🔌' },
    { id: 145, name: 'Seasonic Core GX-650 650W Gold', category: 'Блоки питания', price: 9990, oldPrice: 11990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=Core+GX-650', rating: 4.6, reviews: 267, inStock: true, icon: '🔌' },
    { id: 146, name: 'MSI MPG A850GF 850W Gold', category: 'Блоки питания', price: 13990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=A850GF', rating: 4.6, reviews: 123, inStock: true, icon: '🔌' },
    { id: 147, name: 'MSI MPG A750GF 750W Gold', category: 'Блоки питания', price: 11990, oldPrice: 13990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=A750GF', rating: 4.6, reviews: 156, inStock: true, icon: '🔌' },
    { id: 148, name: 'Gigabyte P850GM 850W Gold', category: 'Блоки питания', price: 12990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=P850GM', rating: 4.5, reviews: 134, inStock: true, icon: '🔌' },
    { id: 149, name: 'Gigabyte P750GM 750W Gold', category: 'Блоки питания', price: 10990, oldPrice: 12990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=P750GM', rating: 4.5, reviews: 167, inStock: false, badge: 'НЕТ', icon: '🔌' },
    { id: 150, name: 'Zalman Wattbit II 700W Bronze', category: 'Блоки питания', price: 5990, image: 'https://placehold.co/150x150/00B894/FFFFFF?text=700W+Bronze', rating: 4.3, reviews: 289, inStock: true, badge: 'БЮДЖЕТ', icon: '🔌' },

    // 📦 КОРПУСА (25 шт)
    { id: 151, name: 'Lian Li O11 Dynamic EVO Black', category: 'Корпуса', price: 16990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=O11+EVO', rating: 4.8, reviews: 234, inStock: true, badge: 'POPULAR', icon: '📦' },
    { id: 152, name: 'Lian Li O11 Dynamic EVO White', category: 'Корпуса', price: 17990, oldPrice: 18990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=O11+White', rating: 4.8, reviews: 187, inStock: true, icon: '📦' },
    { id: 153, name: 'Lian Li Lancool 216 Black', category: 'Корпуса', price: 13990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=Lancool+216', rating: 4.7, reviews: 156, inStock: true, icon: '📦' },
    { id: 154, name: 'Lian Li Lancool 216 White', category: 'Корпуса', price: 14990, oldPrice: 15990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=Lancool+White', rating: 4.7, reviews: 134, inStock: true, icon: '📦' },
    { id: 155, name: 'Lian Li Lancool III Black', category: 'Корпуса', price: 15990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=Lancool+III', rating: 4.7, reviews: 123, inStock: true, icon: '📦' },
    { id: 156, name: 'NZXT H9 Flow Black', category: 'Корпуса', price: 14990, oldPrice: 16990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=H9+Flow', rating: 4.7, reviews: 167, inStock: true, badge: '-12%', icon: '📦' },
    { id: 157, name: 'NZXT H9 Flow White', category: 'Корпуса', price: 15990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=H9+White', rating: 4.7, reviews: 145, inStock: true, icon: '📦' },
    { id: 158, name: 'NZXT H7 Flow Black', category: 'Корпуса', price: 12990, oldPrice: 14990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=H7+Flow', rating: 4.6, reviews: 189, inStock: true, icon: '📦' },
    { id: 159, name: 'NZXT H7 Flow White', category: 'Корпуса', price: 13990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=H7+White', rating: 4.6, reviews: 156, inStock: true, icon: '📦' },
    { id: 160, name: 'NZXT H5 Flow Black', category: 'Корпуса', price: 9990, oldPrice: 11990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=H5+Flow', rating: 4.5, reviews: 234, inStock: true, badge: 'БЮДЖЕТ', icon: '📦' },
    { id: 161, name: 'Fractal Design Meshify 2 Black', category: 'Корпуса', price: 12990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=Meshify+2', rating: 4.6, reviews: 178, inStock: true, icon: '📦' },
    { id: 162, name: 'Fractal Design Meshify 2 White', category: 'Корпуса', price: 13990, oldPrice: 14990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=Meshify+White', rating: 4.6, reviews: 145, inStock: true, icon: '📦' },
    { id: 163, name: 'Fractal Design North Black', category: 'Корпуса', price: 16990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=North+Black', rating: 4.8, reviews: 98, inStock: true, badge: 'PREMIUM', icon: '📦' },
    { id: 164, name: 'Fractal Design North White', category: 'Корпуса', price: 17990, oldPrice: 18990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=North+White', rating: 4.8, reviews: 87, inStock: true, icon: '📦' },
    { id: 165, name: 'Fractal Design Pop Air Black', category: 'Корпуса', price: 8990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=Pop+Air', rating: 4.5, reviews: 212, inStock: true, icon: '📦' },
    { id: 166, name: 'Corsair 4000D Airflow Black', category: 'Корпуса', price: 9990, oldPrice: 11990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=4000D', rating: 4.6, reviews: 267, inStock: true, icon: '📦' },
    { id: 167, name: 'Corsair 4000D Airflow White', category: 'Корпуса', price: 10990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=4000D+White', rating: 4.6, reviews: 198, inStock: true, icon: '📦' },
    { id: 168, name: 'Corsair 5000D Airflow Black', category: 'Корпуса', price: 14990, oldPrice: 16990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=5000D', rating: 4.7, reviews: 156, inStock: true, icon: '📦' },
    { id: 169, name: 'Corsair 5000D Airflow White', category: 'Корпуса', price: 15990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=5000D+White', rating: 4.7, reviews: 134, inStock: true, icon: '📦' },
    { id: 170, name: 'Corsair 2000D RGB Black', category: 'Корпуса', price: 7990, oldPrice: 9990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=2000D+RGB', rating: 4.4, reviews: 234, inStock: true, badge: 'БЮДЖЕТ', icon: '📦' },
    { id: 171, name: 'DeepCool CH560 Black', category: 'Корпуса', price: 8990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=CH560', rating: 4.5, reviews: 189, inStock: true, icon: '📦' },
    { id: 172, name: 'DeepCool CH560 White', category: 'Корпуса', price: 9990, oldPrice: 10990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=CH560+White', rating: 4.5, reviews: 167, inStock: true, icon: '📦' },
    { id: 173, name: 'DeepCool MATREXX 55 Black', category: 'Корпуса', price: 6990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=MATREXX+55', rating: 4.4, reviews: 278, inStock: true, icon: '📦' },
    { id: 174, name: 'Zalman S2 Black', category: 'Корпуса', price: 4990, oldPrice: 5990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=Zalman+S2', rating: 4.2, reviews: 345, inStock: false, badge: 'НЕТ', icon: '📦' },
    { id: 175, name: 'AeroCool CS-107 Black', category: 'Корпуса', price: 3990, image: 'https://placehold.co/150x150/FD79A8/FFFFFF?text=CS-107', rating: 4.1, reviews: 412, inStock: true, badge: 'БЮДЖЕТ', icon: '📦' },

    // ❄️ ОХЛАЖДЕНИЕ (25 шт)
    { id: 176, name: 'Arctic Liquid Freezer III 360 Black', category: 'Охлаждение', price: 14990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=LF3+360', rating: 4.8, reviews: 189, inStock: true, badge: 'ТОП', icon: '❄️' },
    { id: 177, name: 'Arctic Liquid Freezer III 360 White', category: 'Охлаждение', price: 15990, oldPrice: 16990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=LF3+360+W', rating: 4.8, reviews: 156, inStock: true, icon: '❄️' },
    { id: 178, name: 'Arctic Liquid Freezer III 280 Black', category: 'Охлаждение', price: 13990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=LF3+280', rating: 4.7, reviews: 134, inStock: true, icon: '❄️' },
    { id: 179, name: 'Arctic Liquid Freezer III 240 Black', category: 'Охлаждение', price: 11990, oldPrice: 13990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=LF3+240', rating: 4.7, reviews: 178, inStock: true, icon: '❄️' },
    { id: 180, name: 'Arctic Liquid Freezer II 360 Black', category: 'Охлаждение', price: 10990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=LF2+360', rating: 4.6, reviews: 234, inStock: true, badge: 'ВЫГОДНО', icon: '❄️' },
    { id: 181, name: 'Noctua NH-D15 chromax.black', category: 'Охлаждение', price: 11990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=NH-D15', rating: 4.9, reviews: 312, inStock: true, badge: 'ЛЕГЕНДА', icon: '❄️' },
    { id: 182, name: 'Noctua NH-D15', category: 'Охлаждение', price: 10990, oldPrice: 11990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=NH-D15+Beige', rating: 4.9, reviews: 378, inStock: true, icon: '❄️' },
    { id: 183, name: 'Noctua NH-U12A chromax.black', category: 'Охлаждение', price: 9990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=NH-U12A', rating: 4.8, reviews: 198, inStock: true, icon: '❄️' },
    { id: 184, name: 'Noctua NH-U12S chromax.black', category: 'Охлаждение', price: 7990, oldPrice: 8990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=NH-U12S', rating: 4.7, reviews: 234, inStock: true, icon: '❄️' },
    { id: 185, name: 'DeepCool AK620 Black', category: 'Охлаждение', price: 5990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=AK620', rating: 4.6, reviews: 267, inStock: true, badge: 'БЮДЖЕТ', icon: '❄️' },
    { id: 186, name: 'DeepCool AK620 White', category: 'Охлаждение', price: 6490, oldPrice: 6990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=AK620+W', rating: 4.6, reviews: 198, inStock: true, icon: '❄️' },
    { id: 187, name: 'DeepCool AK400 Black', category: 'Охлаждение', price: 3990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=AK400', rating: 4.5, reviews: 345, inStock: true, icon: '❄️' },
    { id: 188, name: 'DeepCool AK400 White', category: 'Охлаждение', price: 4490, oldPrice: 4990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=AK400+W', rating: 4.5, reviews: 289, inStock: true, icon: '❄️' },
    { id: 189, name: 'DeepCool LS720 360 Black', category: 'Охлаждение', price: 13990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=LS720+360', rating: 4.7, reviews: 145, inStock: true, icon: '❄️' },
    { id: 190, name: 'DeepCool LS520 240 Black', category: 'Охлаждение', price: 10990, oldPrice: 12990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=LS520+240', rating: 4.6, reviews: 167, inStock: true, icon: '❄️' },
    { id: 191, name: 'MSI MAG CoreLiquid 360R V2', category: 'Охлаждение', price: 12990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=CoreLiquid+360', rating: 4.6, reviews: 134, inStock: true, icon: '❄️' },
    { id: 192, name: 'MSI MAG CoreLiquid 240R V2', category: 'Охлаждение', price: 9990, oldPrice: 11990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=CoreLiquid+240', rating: 4.5, reviews: 178, inStock: true, icon: '❄️' },
    { id: 193, name: 'Corsair iCUE H150i Elite 360', category: 'Охлаждение', price: 16990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=H150i+360', rating: 4.7, reviews: 123, inStock: true, badge: 'RGB', icon: '❄️' },
    { id: 194, name: 'Corsair iCUE H100i Elite 240', category: 'Охлаждение', price: 13990, oldPrice: 15990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=H100i+240', rating: 4.6, reviews: 156, inStock: true, icon: '❄️' },
    { id: 195, name: 'NZXT Kraken 360 RGB Black', category: 'Охлаждение', price: 17990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=Kraken+360', rating: 4.7, reviews: 98, inStock: true, icon: '❄️' },
    { id: 196, name: 'NZXT Kraken 240 RGB Black', category: 'Охлаждение', price: 14990, oldPrice: 16990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=Kraken+240', rating: 4.6, reviews: 134, inStock: true, icon: '❄️' },
    { id: 197, name: 'ID-COOLING SE-224-XTS Black', category: 'Охлаждение', price: 2990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=SE-224', rating: 4.4, reviews: 456, inStock: true, badge: 'БЮДЖЕТ', icon: '❄️' },
    { id: 198, name: 'ID-COOLING SE-214-XT Black', category: 'Охлаждение', price: 2490, oldPrice: 2990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=SE-214', rating: 4.3, reviews: 512, inStock: true, icon: '❄️' },
    { id: 199, name: 'Thermalright Peerless Assassin 120', category: 'Охлаждение', price: 4990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=Peerless+120', rating: 4.6, reviews: 234, inStock: false, badge: 'НЕТ', icon: '❄️' },
    { id: 200, name: 'Be quiet! Dark Rock Pro 4', category: 'Охлаждение', price: 8990, oldPrice: 9990, image: 'https://placehold.co/150x150/00CEC9/FFFFFF?text=Dark+Rock+Pro', rating: 4.8, reviews: 178, inStock: true, icon: '❄️' },

    // 🖥️ МОНИТОРЫ (25 шт)
    { id: 201, name: 'LG UltraGear 27" 4K 144Hz IPS', category: 'Мониторы', price: 54990, oldPrice: 59990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=LG+27+4K', rating: 4.8, reviews: 178, inStock: true, badge: '4K 144Hz', icon: '🖥️' },
    { id: 202, name: 'LG UltraGear 27" 2K 165Hz IPS', category: 'Мониторы', price: 39990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=LG+27+2K', rating: 4.7, reviews: 234, inStock: true, icon: '🖥️' },
    { id: 203, name: 'LG UltraGear 24" FHD 144Hz IPS', category: 'Мониторы', price: 24990, oldPrice: 27990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=LG+24+144', rating: 4.6, reviews: 312, inStock: true, icon: '🖥️' },
    { id: 204, name: 'Samsung Odyssey G7 32" 4K 144Hz', category: 'Мониторы', price: 64990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=Samsung+G7+32', rating: 4.7, reviews: 134, inStock: true, badge: 'PREMIUM', icon: '🖥️' },
    { id: 205, name: 'Samsung Odyssey G7 27" 2K 240Hz', category: 'Мониторы', price: 49990, oldPrice: 54990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=Samsung+G7+27', rating: 4.7, reviews: 167, inStock: true, icon: '🖥️' },
    { id: 206, name: 'Samsung Odyssey G5 27" 2K 165Hz', category: 'Мониторы', price: 34990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=Samsung+G5+27', rating: 4.5, reviews: 234, inStock: true, icon: '🖥️' },
    { id: 207, name: 'Samsung Odyssey G5 24" FHD 144Hz', category: 'Мониторы', price: 22990, oldPrice: 25990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=Samsung+G5+24', rating: 4.4, reviews: 289, inStock: true, icon: '🖥️' },
    { id: 208, name: 'ASUS ROG Swift 27" 4K 160Hz', category: 'Мониторы', price: 69990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=ROG+Swift+27', rating: 4.8, reviews: 98, inStock: true, badge: 'PREMIUM', icon: '🖥️' },
    { id: 209, name: 'ASUS ROG Swift 27" 2K 240Hz', category: 'Мониторы', price: 54990, oldPrice: 59990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=ROG+240Hz', rating: 4.7, reviews: 123, inStock: true, icon: '🖥️' },
    { id: 210, name: 'ASUS TUF Gaming 27" 2K 165Hz', category: 'Мониторы', price: 39990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=TUF+27+2K', rating: 4.6, reviews: 198, inStock: true, icon: '🖥️' },
    { id: 211, name: 'ASUS TUF Gaming 24" FHD 165Hz', category: 'Мониторы', price: 24990, oldPrice: 27990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=TUF+24+165', rating: 4.5, reviews: 267, inStock: true, icon: '🖥️' },
    { id: 212, name: 'MSI MAG 27" 4K 144Hz IPS', category: 'Мониторы', price: 49990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=MSI+27+4K', rating: 4.6, reviews: 145, inStock: true, icon: '🖥️' },
    { id: 213, name: 'MSI MAG 27" 2K 170Hz IPS', category: 'Мониторы', price: 34990, oldPrice: 37990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=MSI+27+2K', rating: 4.5, reviews: 189, inStock: true, icon: '🖥️' },
    { id: 214, name: 'MSI G24" FHD 144Hz IPS', category: 'Мониторы', price: 19990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=MSI+24+144', rating: 4.4, reviews: 312, inStock: true, badge: 'БЮДЖЕТ', icon: '🖥️' },
    { id: 215, name: 'Gigabyte M27Q 27" 2K 170Hz', category: 'Мониторы', price: 36990, oldPrice: 39990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=Gigabyte+M27Q', rating: 4.6, reviews: 167, inStock: true, icon: '🖥️' },
    { id: 216, name: 'Gigabyte M24F 24" FHD 165Hz', category: 'Мониторы', price: 21990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=Gigabyte+M24F', rating: 4.5, reviews: 234, inStock: true, icon: '🖥️' },
    { id: 217, name: 'AOC 27" 2K 144Hz IPS', category: 'Мониторы', price: 32990, oldPrice: 35990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=AOC+27+2K', rating: 4.5, reviews: 198, inStock: true, icon: '🖥️' },
    { id: 218, name: 'AOC 24" FHD 144Hz IPS', category: 'Мониторы', price: 18990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=AOC+24+144', rating: 4.4, reviews: 289, inStock: true, icon: '🖥️' },
    { id: 219, name: 'BenQ MOBIUZ 27" 2K 165Hz', category: 'Мониторы', price: 44990, oldPrice: 49990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=BenQ+27+2K', rating: 4.6, reviews: 134, inStock: true, icon: '🖥️' },
    { id: 220, name: 'BenQ ZOWIE 24" FHD 240Hz', category: 'Мониторы', price: 29990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=ZOWIE+240Hz', rating: 4.7, reviews: 178, inStock: true, badge: 'ESPORTS', icon: '🖥️' },
    { id: 221, name: 'Acer Nitro 27" 2K 170Hz IPS', category: 'Мониторы', price: 34990, oldPrice: 37990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=Acer+Nitro+27', rating: 4.5, reviews: 167, inStock: true, icon: '🖥️' },
    { id: 222, name: 'Acer Nitro 24" FHD 165Hz IPS', category: 'Мониторы', price: 20990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=Acer+Nitro+24', rating: 4.4, reviews: 234, inStock: true, icon: '🖥️' },
    { id: 223, name: 'Dell S2722DGM 27" 2K 165Hz', category: 'Мониторы', price: 39990, oldPrice: 42990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=Dell+S2722', rating: 4.6, reviews: 145, inStock: false, badge: 'НЕТ', icon: '🖥️' },
    { id: 224, name: 'HP X27q 27" 2K 165Hz IPS', category: 'Мониторы', price: 33990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=HP+X27q', rating: 4.5, reviews: 123, inStock: true, icon: '🖥️' },
    { id: 225, name: 'ViewSonic VX2428 24" FHD 165Hz', category: 'Мониторы', price: 17990, oldPrice: 19990, image: 'https://placehold.co/150x150/6C5CE7/FFFFFF?text=ViewSonic+24', rating: 4.3, reviews: 267, inStock: true, badge: 'БЮДЖЕТ', icon: '🖥️' },

    // 🖱️ ПЕРИФЕРИЯ (25 шт)
    { id: 226, name: 'Logitech G Pro X Superlight 2', category: 'Периферия', price: 14990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=G+Pro+X+2', rating: 4.9, reviews: 234, inStock: true, badge: 'ТОП', icon: '🖱️' },
    { id: 227, name: 'Logitech G Pro X Superlight', category: 'Периферия', price: 11990, oldPrice: 13990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=G+Pro+X', rating: 4.8, reviews: 456, inStock: true, icon: '🖱️' },
    { id: 228, name: 'Logitech G502 X Plus', category: 'Периферия', price: 12990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=G502+X', rating: 4.7, reviews: 312, inStock: true, icon: '🖱️' },
    { id: 229, name: 'Logitech G502 HERO', category: 'Периферия', price: 6990, oldPrice: 7990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=G502+HERO', rating: 4.7, reviews: 567, inStock: true, badge: 'ХИТ', icon: '🖱️' },
    { id: 230, name: 'Logitech G305 Lightspeed', category: 'Периферия', price: 4990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=G305', rating: 4.6, reviews: 678, inStock: true, badge: 'БЮДЖЕТ', icon: '🖱️' },
    { id: 231, name: 'Razer DeathAdder V3 Pro', category: 'Периферия', price: 13990, oldPrice: 15990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=DeathAdder+V3', rating: 4.8, reviews: 198, inStock: true, icon: '🖱️' },
    { id: 232, name: 'Razer DeathAdder V3', category: 'Периферия', price: 8990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=DeathAdder+V3', rating: 4.7, reviews: 267, inStock: true, icon: '🖱️' },
    { id: 233, name: 'Razer Viper V2 Pro', category: 'Периферия', price: 12990, oldPrice: 14990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=Viper+V2', rating: 4.7, reviews: 178, inStock: true, icon: '🖱️' },
    { id: 234, name: 'Razer Basilisk V3', category: 'Периферия', price: 7990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=Basilisk+V3', rating: 4.6, reviews: 234, inStock: true, icon: '🖱️' },
    { id: 235, name: 'SteelSeries Aerox 3 Wireless', category: 'Периферия', price: 7990, oldPrice: 8990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=Aerox+3', rating: 4.5, reviews: 189, inStock: true, icon: '🖱️' },
    { id: 236, name: 'SteelSeries Rival 3', category: 'Периферия', price: 3990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=Rival+3', rating: 4.4, reviews: 345, inStock: true, badge: 'БЮДЖЕТ', icon: '🖱️' },
    { id: 237, name: 'HyperX Pulsefire Haste', category: 'Периферия', price: 5990, oldPrice: 6990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=Pulsefire', rating: 4.5, reviews: 267, inStock: true, icon: '🖱️' },
    { id: 238, name: 'Corsair Dark Core RGB Pro', category: 'Периферия', price: 8990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=Dark+Core', rating: 4.6, reviews: 156, inStock: true, icon: '🖱️' },
    { id: 239, name: 'Glorious Model O Wireless', category: 'Периферия', price: 7990, oldPrice: 8990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=Model+O', rating: 4.6, reviews: 198, inStock: true, icon: '🖱️' },
    { id: 240, name: 'Finalmouse Starlight-12', category: 'Периферия', price: 18990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=Starlight-12', rating: 4.8, reviews: 87, inStock: false, badge: 'НЕТ', icon: '🖱️' },
    { id: 241, name: 'Logitech MX Master 3S', category: 'Периферия', price: 9990, oldPrice: 11990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=MX+Master+3S', rating: 4.8, reviews: 312, inStock: true, badge: 'OFFICE', icon: '🖱️' },
    { id: 242, name: 'Logitech MX Anywhere 3', category: 'Периферия', price: 6990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=MX+Anywhere', rating: 4.7, reviews: 234, inStock: true, icon: '🖱️' },
    { id: 243, name: 'Razer BlackWidow V4 Pro', category: 'Периферия', price: 19990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=BlackWidow+V4', rating: 4.7, reviews: 145, inStock: true, badge: 'PREMIUM', icon: '🖱️' },
    { id: 244, name: 'Logitech G915 TKL Wireless', category: 'Периферия', price: 17990, oldPrice: 19990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=G915+TKL', rating: 4.7, reviews: 178, inStock: true, icon: '🖱️' },
    { id: 245, name: 'Keychron K2 Pro Wireless', category: 'Периферия', price: 11990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=Keychron+K2', rating: 4.6, reviews: 198, inStock: true, icon: '🖱️' },
    { id: 246, name: 'HyperX Alloy Origins Core', category: 'Периферия', price: 7990, oldPrice: 8990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=Alloy+Origins', rating: 4.6, reviews: 267, inStock: true, icon: '🖱️' },
    { id: 247, name: 'Razer Huntsman Mini', category: 'Периферия', price: 9990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=Huntsman+Mini', rating: 4.5, reviews: 234, inStock: true, icon: '🖱️' },
    { id: 248, name: 'SteelSeries Apex Pro TKL', category: 'Периферия', price: 16990, oldPrice: 18990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=Apex+Pro', rating: 4.7, reviews: 156, inStock: true, icon: '🖱️' },
    { id: 249, name: 'Corsair K70 RGB Pro', category: 'Периферия', price: 14990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=K70+RGB', rating: 4.6, reviews: 189, inStock: true, icon: '🖱️' },
    { id: 250, name: 'Logitech G733 Wireless Headset', category: 'Периферия', price: 12990, oldPrice: 14990, image: 'https://placehold.co/150x150/FDCB6E/FFFFFF?text=G733', rating: 4.6, reviews: 234, inStock: true, badge: 'RGB', icon: '🖱️' },
  ];

  const categories = [
    { id: 'all', name: '📦 Все товары', color: '#FF6600' },
    { id: 'Видеокарты', name: '🎮 Видеокарты', color: '#FF6600' },
    { id: 'Процессоры', name: '⚡ Процессоры', color: '#FF6600' },
    { id: 'Материнские платы', name: '🔷 Материнские платы', color: '#FF6600' },
    { id: 'Оперативная память', name: '💾 Память', color: '#FF6600' },
    { id: 'SSD накопители', name: '💿 SSD', color: '#FF6600' },
    { id: 'Блоки питания', name: '🔌 БП', color: '#FF6600' },
    { id: 'Корпуса', name: '📦 Корпуса', color: '#FF6600' },
    { id: 'Охлаждение', name: '❄️ Охлаждение', color: '#FF6600' },
    { id: 'Мониторы', name: '🖥️ Мониторы', color: '#FF6600' },
  ];

  const filteredProducts = products.filter(product => {
    const query = searchQuery ? searchQuery.toLowerCase() : '';
    const matchesSearch = product.name.toLowerCase().includes(query) || 
                         product.category.toLowerCase().includes(query);
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    if (addToCartGlobal) {
      addToCartGlobal(product);
    }
  };

  const handleProductClick = (productId) => {
    if (onNavigate) {
      onNavigate('product', productId);
    }
  };

  const goHome = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const goToCart = () => {
    if (onNavigate) {
      onNavigate('cart');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <div onClick={goHome} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 24 }}>🖥️</span>
            <span style={{ fontWeight: 'bold', fontSize: 20, color: '#FF6600' }}>PC-Market</span>
          </div>
        }
        style={{ 
          background: '#FFFFFF', 
          borderBottom: '2px solid #FF6600',
          position: 'relative'
        }}
      >
        Каталог
        <div 
          onClick={goToCart} 
          style={{ 
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 12px',
            background: cartCount > 0 ? '#FF6600' : '#f5f5f5',
            borderRadius: '20px',
            zIndex: 10
          }}
        >
          <span style={{ fontSize: 20 }}>🛒</span>
          {cartCount > 0 && (
            <span style={{ fontWeight: 'bold', color: 'white', fontSize: 14 }}>
              {cartCount}
            </span>
          )}
        </div>
      </PanelHeader>

      <Group>
        <Search 
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="🔍 Поиск товаров..." 
        />
      </Group>

      <Group header={<Header mode="secondary" style={{ color: '#FF6600', fontWeight: 'bold' }}>🏷️ КАТЕГОРИИ</Header>}>
        <Div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '8px' }}>
          {categories.map(cat => (
            <Button 
              key={cat.id} 
              mode={activeCategory === cat.id ? 'primary' : 'secondary'} 
              size="s" 
              onClick={() => setActiveCategory(cat.id)}
              style={{ 
                background: activeCategory === cat.id ? '#FF6600' : '#FFFFFF',
                color: activeCategory === cat.id ? '#FFFFFF' : '#FF6600',
                border: activeCategory === cat.id ? 'none' : '2px solid #FF6600',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
                fontWeight: 'bold'
              }}
            >
              {cat.name}
            </Button>
          ))}
        </Div>
      </Group>

      <Group header={<Header mode="secondary" style={{ color: '#FF6600', fontWeight: 'bold' }}>📊 НАЙДЕНО: {filteredProducts.length} ТОВАРОВ</Header>}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <CardGrid key={product.id} size="l">
              <Card mode="shadow" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', background: '#1a1a2e' }}>
                <div style={{ padding: '16px' }} onClick={() => handleProductClick(product.id)}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
                    {product.badge && (
                      <Badge style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        background: '#FF6600',
                        color: 'white',
                        zIndex: 1,
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: 11,
                        fontWeight: 'bold'
                      }}>
                        {product.badge}
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge style={{ 
                        position: 'absolute', 
                        top: 0, 
                        right: 0, 
                        background: '#999',
                        color: 'white',
                        zIndex: 1,
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: 11
                      }}>
                        НЕТ
                      </Badge>
                    )}
                    <Avatar 
                      size={100} 
                      src={product.image} 
                      mode="image"
                      style={{ background: '#f5f5f5', borderRadius: '8px' }} 
                    />
                    <div style={{ marginLeft: '12px', flex: 1 }}>
                      <Subhead level="1" weight="bold" style={{ marginBottom: 4, fontSize: 14, color: '#FFFFFF' }}>{product.icon} {product.name}</Subhead>
                      <Text weight="regular" style={{ color: '#CCCCCC', fontSize: 12 }}>{product.category}</Text>
                      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Text weight="bold" style={{ fontSize: 20, color: '#FF6600' }}>{product.price.toLocaleString()} ₽</Text>
                        {product.oldPrice && (
                          <Text style={{ color: '#999', textDecoration: 'line-through', fontSize: 12 }}>{product.oldPrice.toLocaleString()} ₽</Text>
                        )}
                      </div>
                      <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Text weight="medium" style={{ color: '#FFB800', fontSize: 12 }}>★ {product.rating}</Text>
                        <Text weight="regular" style={{ color: '#CCCCCC', fontSize: 11 }}>({product.reviews})</Text>
                      </div>
                    </div>
                  </div>
                  <Separator style={{ marginTop: 12 }} />
                  <Div style={{ marginTop: 12, padding: 0 }}>
                    <Button 
                      mode="primary" 
                      stretched 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }} 
                      disabled={!product.inStock}
                      style={{ 
                        background: product.inStock ? '#FF6600' : '#999',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        padding: '12px'
                      }}
                    >
                      {product.inStock ? '🛒 В КОРЗИНУ' : '❌ НЕТ В НАЛИЧИИ'}
                    </Button>
                  </Div>
                </div>
              </Card>
            </CardGrid>
          ))
        ) : (
          <Div style={{ padding: '40px', textAlign: 'center' }}>
            <Text style={{ color: '#CCCCCC' }}>😔 Товары не найдены</Text>
            <Button mode="secondary" size="m" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} style={{ marginTop: 12, borderRadius: '8px' }}>
              Сбросить фильтры
            </Button>
          </Div>
        )}
      </Group>
    </Panel>
  );
};

export { Catalog };