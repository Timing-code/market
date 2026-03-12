import { useState } from 'react';
import { Panel, PanelHeader, Group, Header, SimpleCell, Button, Div, Card, CardGrid, Avatar, Text, Subhead, Separator, Badge } from '@vkontakte/vkui';

const Home = ({ id, onNavigate, previousPage, cartCount = 0 }) => {
  const products = [
    { 
      id: 1, 
      name: 'NVIDIA GeForce RTX 4090', 
      category: 'Видеокарты',
      price: 189990, 
      oldPrice: 199990,
      image: 'https://via.placeholder.com/150/FF6600/FFFFFF?text=RTX+4090',
      rating: 4.9,
      reviews: 127,
      badge: 'ХИТ',
      badgeColor: '#FF6600',
      icon: '🎮'
    },
    { 
      id: 2, 
      name: 'Intel Core i9-13900K', 
      category: 'Процессоры',
      price: 64990, 
      image: 'https://via.placeholder.com/150/FF6600/FFFFFF?text=i9-13900K',
      rating: 4.8,
      reviews: 89,
      badge: 'NEW',
      badgeColor: '#00AA00',
      icon: '⚡'
    },
    { 
      id: 3, 
      name: 'Corsair Vengeance 32GB DDR5', 
      category: 'Оперативная память',
      price: 12990, 
      oldPrice: 14990,
      image: 'https://via.placeholder.com/150/FF6600/FFFFFF?text=RAM+32GB',
      rating: 4.7,
      reviews: 234,
      badge: '-13%',
      badgeColor: '#FF6600',
      icon: '💾'
    },
    { 
      id: 4, 
      name: 'Samsung 990 PRO 2TB', 
      category: 'SSD накопители',
      price: 18990, 
      image: 'https://via.placeholder.com/150/FF6600/FFFFFF?text=SSD+2TB',
      rating: 4.9,
      reviews: 312,
      badge: 'ТОП',
      badgeColor: '#00AA00',
      icon: '💿'
    },
  ];

  const addToCart = (product) => {
    if (window.addToCartGlobal) {
      window.addToCartGlobal(product);
    }
  };

  const categories = [
    { name: 'Видеокарты', count: 156, color: '#FF6600', icon: '🎮', filterId: 'Видеокарты' },
    { name: 'Процессоры', count: 89, color: '#FF6600', icon: '⚡', filterId: 'Процессоры' },
    { name: 'Материнские платы', count: 67, color: '#FF6600', icon: '🔷', filterId: 'Материнские платы' },
    { name: 'Оперативная память', count: 124, color: '#FF6600', icon: '💾', filterId: 'Оперативная память' },
    { name: 'SSD накопители', count: 98, color: '#FF6600', icon: '💿', filterId: 'SSD накопители' },
    { name: 'Блоки питания', count: 45, color: '#FF6600', icon: '🔌', filterId: 'Блоки питания' },
    { name: 'Корпуса', count: 78, color: '#FF6600', icon: '📦', filterId: 'Корпуса' },
    { name: 'Охлаждение', count: 56, color: '#FF6600', icon: '❄️', filterId: 'Охлаждение' },
    { name: 'Мониторы', count: 112, color: '#FF6600', icon: '🖥️', filterId: 'Мониторы' },
    { name: 'Периферия', count: 234, color: '#FF6600', icon: '🖱️', filterId: 'Периферия' },
  ];

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

  const goToCategory = (filterId) => {
    if (onNavigate) {
      onNavigate('catalog', filterId);
    }
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
        {/* Кнопка корзины */}
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
            <span style={{ 
              fontWeight: 'bold', 
              color: 'white',
              fontSize: 14
            }}>
              {cartCount}
            </span>
          )}
        </div>
      </PanelHeader>

      {/* Баннер в стиле DNS */}
      <Div style={{ 
        padding: '24px', 
        background: 'linear-gradient(135deg, #FF6600 0%, #FF8800 100%)',
        borderRadius: '0',
        margin: '0',
        color: 'white'
      }}>
        <Text weight="bold" style={{ fontSize: 24, marginBottom: 8 }}>🔥 РАСПРОДАЖА ДО 30%</Text>
        <Text style={{ fontSize: 14, opacity: 0.95 }}>На видеокарты и процессоры до конца месяца!</Text>
        <Button mode="primary" size="m" style={{ marginTop: 16, background: 'white', color: '#FF6600', fontWeight: 'bold', borderRadius: '8px' }} onClick={() => onNavigate && onNavigate('catalog')}>
          СМОТРЕТЬ АКЦИИ →
        </Button>
      </Div>

      {previousPage && (
        <Div style={{ padding: '8px', background: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
          <Button mode="secondary" size="m" onClick={() => onNavigate && onNavigate(previousPage)} stretched style={{ borderRadius: '8px' }}>
            ← Назад
          </Button>
        </Div>
      )}

      {/* Категории в стиле DNS */}
      <Group header={<Header mode="secondary" style={{ color: '#FF6600', fontWeight: 'bold' }}>📂 КАТЕГОРИИ</Header>}>
        <Div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '8px',
          padding: '8px'
        }}>
          {categories.map((cat) => (
            <Div
              key={cat.name}
              onClick={() => goToCategory(cat.filterId)}
              style={{
                padding: '16px 12px',
                background: '#FFFFFF',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: 32, marginBottom: '8px' }}>{cat.icon}</div>
              <Text weight="bold" style={{ fontSize: 13, color: '#333' }}>{cat.name}</Text>
              <Text style={{ fontSize: 11, color: '#999' }}>{cat.count} товаров</Text>
            </Div>
          ))}
        </Div>
      </Group>

      {/* Популярные товары */}
      <Group header={<Header mode="secondary" style={{ color: '#FF6600', fontWeight: 'bold' }}>⭐ ПОПУЛЯРНЫЕ ТОВАРЫ</Header>}>
        {products.map((product) => (
          <CardGrid key={product.id} size="l">
            <Card mode="shadow" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', background: '#1a1a2e' }}>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
                  {product.badge && (
                    <Badge style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      background: product.badgeColor,
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
                  <Avatar 
                    size={100} 
                    src={product.image} 
                    mode="image"
                    style={{ 
                      background: '#f5f5f5',
                      borderRadius: '8px'
                    }} 
                  />
                  <div style={{ marginLeft: '12px', flex: 1 }}>
                    <Subhead level="1" weight="bold" style={{ marginBottom: 4, fontSize: 14, color: '#FFFFFF' }}>
                      {product.icon} {product.name}
                    </Subhead>
                    <Text weight="regular" style={{ color: '#CCCCCC', fontSize: 12 }}>
                      {product.category}
                    </Text>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Text weight="bold" style={{ fontSize: 20, color: '#FF6600' }}>
                        {product.price.toLocaleString()} ₽
                      </Text>
                      {product.oldPrice && (
                        <Text style={{ color: '#999', textDecoration: 'line-through', fontSize: 13 }}>
                          {product.oldPrice.toLocaleString()} ₽
                        </Text>
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
                    onClick={() => addToCart(product)}
                    style={{ 
                      background: '#FF6600',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      padding: '12px'
                    }}
                  >
                    🛒 В КОРЗИНУ
                  </Button>
                </Div>
              </div>
            </Card>
          </CardGrid>
        ))}
      </Group>

      <Group>
        <SimpleCell
          onClick={() => onNavigate && onNavigate('catalog')}
          multiline
          style={{ background: '#FFF4E6', borderRadius: '8px', border: '1px solid #FF6600' }}
        >
          📦 Смотреть все товары (1000+) →
        </SimpleCell>
      </Group>

      {/* Информация о магазине */}
      <Group header={<Header mode="secondary" style={{ color: '#FF6600', fontWeight: 'bold' }}>ℹ️ О МАГАЗИНЕ</Header>}>
        <Div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <Text style={{ fontSize: 13, color: '#666', lineHeight: 1.8 }}>
            🖥️ <b style={{ color: '#FF6600' }}>PC-Market</b> — ваш надёжный партнёр в мире компьютерных комплектующих с 2020 года.
            {'\n\n'}
            ✅ Официальная гарантия на все товары
            {'\n'}✅ Бесплатная доставка от 50 000 ₽
            {'\n'}✅ Рассрочка 0% на 12 месяцев
            {'\n'}✅ Техподдержка 24/7
            {'\n'}✅ Более 100 000 довольных клиентов
          </Text>
        </Div>
      </Group>
    </Panel>
  );
};

export { Home };