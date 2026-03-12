import { useState } from 'react';
import { Panel, PanelHeader, Group, Button, Text, Div, Avatar, Subhead, Separator, InfoRow, Tabs, TabsItem, Badge } from '@vkontakte/vkui';

const Product = ({ id, onNavigate, addToCartGlobal, productId }) => {
  const [activeTab, setActiveTab] = useState('description');

  const product = {
    id: productId || 1,
    name: 'NVIDIA GeForce RTX 4090 24GB GDDR6X',
    category: 'Видеокарты',
    price: 189990,
    oldPrice: 199990,
    image: 'https://via.placeholder.com/300/FF6600/FFFFFF?text=RTX+4090',
    rating: 4.9,
    reviews: 127,
    inStock: true,
    icon: '🎮',
    description: 'Флагманская видеокарта для игр и профессиональной работы.',
    fullDescription: 'NVIDIA GeForce RTX 4090 — это самая мощная видеокарта для геймеров и создателей контента. Она обеспечивает огромный скачок производительности, эффективности и поддерживается технологиями AI.',
    specs: {
      'Графический процессор': 'NVIDIA Ada Lovelace',
      'Память': '24 GB GDDR6X',
      'Частота ядра': '2520 MHz (Boost)',
      'Шина памяти': '384 бит',
      'TDP': '450W',
      'Выходы': '3x DisplayPort 1.4a, 1x HDMI 2.1',
    },
    features: [
      '✅ Трассировка лучей в реальном времени',
      '✅ DLSS 3.0 с генерацией кадров',
      '✅ NVIDIA Reflex для низкой задержки',
      '✅ NVIDIA Broadcast для стримеров',
    ]
  };

  const handleAddToCart = () => {
    if (addToCartGlobal) {
      addToCartGlobal(product);
    } else {
      alert('✅ ТОВАР ДОБАВЛЕН В КОРЗИНУ!\n🎁 Вам начислено 1900 бонусных баллов!');
    }
  };

  const goHome = () => {
    if (onNavigate) {
      onNavigate('home');
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
        style={{ background: '#FFFFFF', borderBottom: '2px solid #FF6600' }}
      >
        Товар
      </PanelHeader>

      <Group>
        <Div style={{ 
          textAlign: 'center', 
          padding: '24px',
          background: '#FFFFFF',
          borderRadius: '8px',
          margin: '12px',
          border: '1px solid #e0e0e0'
        }}>
          <Badge style={{ background: '#FF6600', color: 'white', marginBottom: 16, padding: '6px 12px', fontWeight: 'bold' }}>
            🔥 ХИТ ПРОДАЖ
          </Badge>
          <br/>
          <Avatar 
            size={240} 
            src={product.image} 
            mode="image"
            style={{ 
              background: '#f5f5f5',
              marginBottom: 16,
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}
          />
          <Subhead level="1" weight="bold" style={{ marginBottom: 8, fontSize: 18, color: '#333' }}>{product.icon} {product.name}</Subhead>
          <Text weight="regular" style={{ color: '#999', marginBottom: 16 }}>{product.category}</Text>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Text weight="bold" style={{ fontSize: 32, color: '#FF6600' }}>{product.price.toLocaleString()} ₽</Text>
            {product.oldPrice && (
              <Text style={{ color: '#999', textDecoration: 'line-through', fontSize: 20 }}>
                {product.oldPrice.toLocaleString()} ₽
              </Text>
            )}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, marginBottom: 16 }}>
            <Text weight="medium" style={{ color: '#FFB800', fontSize: 16 }}>★ {product.rating}</Text>
            <Text weight="regular" style={{ color: '#999', fontSize: 13 }}>({product.reviews} отзывов)</Text>
          </div>
          
          {product.inStock ? (
            <Badge style={{ background: '#00AA00', color: 'white', padding: '6px 12px', fontWeight: 'bold' }}>
              ✓ В НАЛИЧИИ • ДОСТАВКА ЗАВТРА
            </Badge>
          ) : (
            <Badge style={{ background: '#999', color: 'white', padding: '6px 12px' }}>✗ НЕТ В НАЛИЧИИ</Badge>
          )}
        </Div>
      </Group>

      <Group>
        <Tabs>
          <TabsItem selected={activeTab === 'description'} onClick={() => setActiveTab('description')} style={{ fontWeight: 'bold' }}>
            📖 ОПИСАНИЕ
          </TabsItem>
          <TabsItem selected={activeTab === 'specs'} onClick={() => setActiveTab('specs')} style={{ fontWeight: 'bold' }}>
            ⚙️ ХАРАКТЕРИСТИКИ
          </TabsItem>
          <TabsItem selected={activeTab === 'features'} onClick={() => setActiveTab('features')} style={{ fontWeight: 'bold' }}>
            ✨ ПРЕИМУЩЕСТВА
          </TabsItem>
        </Tabs>
      </Group>

      {activeTab === 'description' && (
        <Group>
          <Div style={{ padding: '16px', background: '#FFFFFF' }}>
            <Text style={{ lineHeight: 1.6, fontSize: 14, color: '#333' }}>{product.fullDescription}</Text>
            <Separator style={{ margin: '16px 0' }} />
            <Text weight="bold" style={{ marginBottom: 8, color: '#FF6600' }}>📦 КОМПЛЕКТАЦИЯ:</Text>
            <Text style={{ fontSize: 13, color: '#666', lineHeight: 1.8 }}>
              • Видеокарта NVIDIA GeForce RTX 4090
              {'\n'}• Адаптер питания 12VHPWR
              {'\n'}• Руководство пользователя
              {'\n'}• Гарантийный талон (3 года)
            </Text>
          </Div>
        </Group>
      )}

      {activeTab === 'specs' && (
        <Group>
          {Object.entries(product.specs).map(([key, value]) => (
            <InfoRow key={key} header={key} style={{ padding: '12px 16px', background: '#FFFFFF' }}>
              <Text weight="medium">{value}</Text>
            </InfoRow>
          ))}
        </Group>
      )}

      {activeTab === 'features' && (
        <Group>
          <Div style={{ padding: '16px', background: '#FFFFFF' }}>
            {product.features.map((feature, index) => (
              <Div key={index} style={{ padding: '10px 0', borderBottom: index < product.features.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                <Text style={{ fontSize: 14, color: '#333' }}>{feature}</Text>
              </Div>
            ))}
          </Div>
        </Group>
      )}

      <Group>
        <Div style={{ padding: '20px', background: '#FFF4E6', borderRadius: '8px', border: '2px solid #FF6600' }}>
          <Button mode="primary" size="l" stretched onClick={handleAddToCart} disabled={!product.inStock} style={{ 
            background: product.inStock ? '#FF6600' : '#999',
            borderRadius: '8px',
            padding: '18px',
            fontSize: 16,
            fontWeight: 'bold'
          }}>
            {product.inStock ? '🛒 ДОБАВИТЬ В КОРЗИНУ' : '❌ НЕТ В НАЛИЧИИ'}
          </Button>
          
          <Div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Button mode="secondary" size="m" stretched style={{ borderRadius: '8px', border: '2px solid #FF6600', color: '#FF6600' }}>
              ❤️ В ИЗБРАННОЕ
            </Button>
            <Button mode="secondary" size="m" stretched style={{ borderRadius: '8px', border: '2px solid #FF6600', color: '#FF6600' }}>
              📤 ПОДЕЛИТЬСЯ
            </Button>
          </Div>
          
          <Text weight="regular" style={{ color: '#999', fontSize: 11, textAlign: 'center', marginTop: 16 }}>
            🚚 Бесплатная доставка • 🔒 Гарантия 3 года • 💳 Рассрочка 0%
          </Text>
        </Div>
      </Group>
    </Panel>
  );
};

export { Product };