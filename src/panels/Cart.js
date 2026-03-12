import { useState } from 'react';
import { Panel, PanelHeader, Group, Button, Text, Div, FormItem, Input, Radio, RadioGroup } from '@vkontakte/vkui';

const Cart = ({ id, onNavigate, cartItems, updateCart }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');  // ✅ ДОБАВИЛ
  const [city, setCity] = useState('');
  const [delivery, setDelivery] = useState('courier');

  const total = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const count = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // КОРЗИНА
  if (step === 0) {
    if (!cartItems || cartItems.length === 0) {
      return (
        <Panel id={id}>
          <PanelHeader>Корзина</PanelHeader>
          <Div style={{ padding: 40, textAlign: 'center' }}>
            <Text>Корзина пуста</Text>
            <Button mode="primary" onClick={() => onNavigate?.('catalog')} style={{ marginTop: 16, background: '#FF6600' }}>
              В каталог
            </Button>
          </Div>
        </Panel>
      );
    }

    return (
      <Panel id={id}>
        <PanelHeader>Корзина ({count})</PanelHeader>
        <Group>
          {cartItems.map(item => (
            <Div key={item.id} style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
              <Text weight="bold">{item.name}</Text>
              <Text style={{ color: '#FF6600' }}>{item.price.toLocaleString()} ₽ × {item.quantity}</Text>
              <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <Button size="s" onClick={() => {
                  const newItems = cartItems.map(i => 
                    i.id === item.id ? {...i, quantity: i.quantity - 1} : i
                  ).filter(i => i.quantity > 0);
                  updateCart?.(newItems);
                }}>−</Button>
                <span>{item.quantity}</span>
                <Button size="s" onClick={() => {
                  const newItems = cartItems.map(i => 
                    i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                  );
                  updateCart?.(newItems);
                }}>+</Button>
              </div>
            </Div>
          ))}
        </Group>
        <Group>
          <Div style={{ padding: 16 }}>
            <Text weight="bold" style={{ fontSize: 20 }}>Итого: {total.toLocaleString()} ₽</Text>
            <Button mode="primary" stretched onClick={() => setStep(1)} style={{ marginTop: 12, background: '#FF6600' }}>
              Оформить заказ
            </Button>
          </Div>
        </Group>
      </Panel>
    );
  }

  // ШАГ 1: Данные (с Email)
  if (step === 1) {
    return (
      <Panel id={id}>
        <PanelHeader before={<div onClick={() => setStep(0)} style={{cursor:'pointer'}}>← Назад</div>}>
          Шаг 1 из 3
        </PanelHeader>
        <Group>
          <Div style={{ padding: 16 }}>
            <Text weight="bold" style={{ marginBottom: 16 }}>👤 Контактные данные</Text>
            <FormItem top="Имя *" style={{ marginBottom: 12 }}>
              <Input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Иванов Иван"
              />
            </FormItem>
            <FormItem top="Телефон *" style={{ marginBottom: 12 }}>
              <Input 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                placeholder="+7 999 000-00-00"
                type="tel"
              />
            </FormItem>
            <FormItem top="Email" style={{ marginBottom: 12 }}>  {/* ✅ ДОБАВИЛ */}
              <Input 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="example@mail.ru"
                type="email"
              />
            </FormItem>
            <Button 
              mode="primary" 
              stretched 
              onClick={() => {
                if (name.length < 2) { alert('Введите имя'); return; }
                if (phone.length < 5) { alert('Введите телефон'); return; }
                if (email && !email.includes('@')) { alert('Введите корректный email'); return; }  // ✅ ПРОВЕРКА EMAIL
                setStep(2);
              }}
              style={{ background: '#FF6600' }}
            >
              Далее →
            </Button>
          </Div>
        </Group>
      </Panel>
    );
  }

  // ШАГ 2: Доставка
  if (step === 2) {
    return (
      <Panel id={id}>
        <PanelHeader before={<div onClick={() => setStep(1)} style={{cursor:'pointer'}}>← Назад</div>}>
          Шаг 2 из 3
        </PanelHeader>
        <Group>
          <Div style={{ padding: 16 }}>
            <Text weight="bold" style={{ marginBottom: 16 }}>🚚 Доставка</Text>
            <FormItem top="Город *" style={{ marginBottom: 12 }}>
              <select 
                value={city} 
                onChange={e => setCity(e.target.value)}
                style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd' }}
              >
                <option value="">Выберите город</option>
                <option value="Москва">Москва</option>
                <option value="СПб">Санкт-Петербург</option>
                <option value="Новосибирск">Новосибирск</option>
                <option value="Екатеринбург">Екатеринбург</option>
              </select>
            </FormItem>
            <Text weight="bold" style={{ marginBottom: 8 }}>Способ:</Text>
            <RadioGroup style={{ marginBottom: 16 }}>
              <Radio name="d" value="courier" checked={delivery === 'courier'} onChange={() => setDelivery('courier')}>
                📦 Курьер (500 ₽)
              </Radio>
              <Radio name="d" value="pickup" checked={delivery === 'pickup'} onChange={() => setDelivery('pickup')}>
                🏪 Самовывоз (0 ₽)
              </Radio>
            </RadioGroup>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button mode="secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>← Назад</Button>
              <Button 
                mode="primary" 
                onClick={() => {
                  if (!city) { alert('Выберите город'); return; }
                  setStep(3);
                }}
                style={{ flex: 1, background: '#FF6600' }}
              >
                Далее →
              </Button>
            </div>
          </Div>
        </Group>
      </Panel>
    );
  }

  // ШАГ 3: Оплата
  if (step === 3) {
    const finalPrice = total + (delivery === 'courier' ? 500 : 0);
    return (
      <Panel id={id}>
        <PanelHeader before={<div onClick={() => setStep(2)} style={{cursor:'pointer'}}>← Назад</div>}>
          Шаг 3 из 3
        </PanelHeader>
        <Group>
          <Div style={{ padding: 16 }}>
            <Text weight="bold" style={{ marginBottom: 16, color: '#000000' }}>💳 Оплата</Text>
            <Div style={{ padding: 16, background: '#FFFFFF', borderRadius: 8, marginBottom: 16, border: '2px solid #FF6600' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={{ color: '#000000', fontSize: 14 }}>Товары:</Text>
                <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 14 }}>{total.toLocaleString()} ₽</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={{ color: '#000000', fontSize: 14 }}>Доставка:</Text>
                <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 14 }}>{delivery === 'courier' ? '500 ₽' : '0 ₽'}</Text>
              </div>
              <div style={{ borderTop: '2px solid #FF6600', paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                <Text weight="bold" style={{ color: '#000000', fontSize: 18 }}>Итого:</Text>
                <Text weight="bold" style={{ color: '#FF6600', fontSize: 24 }}>{finalPrice.toLocaleString()} ₽</Text>
              </div>
            </Div>
            
            {/* ✅ ИНФОРМАЦИЯ О ЗАКАЗЕ */}
            <Div style={{ padding: 12, background: '#f5f5f5', borderRadius: 8, marginBottom: 16 }}>
              <Text style={{ color: '#666666', fontSize: 12 }}>
                👤 {name}<br/>
                📞 {phone}<br/>
                {email && <>✉️ {email}<br/></>}
                🚚 {delivery === 'courier' ? 'Курьер' : 'Самовывоз'}
              </Text>
            </Div>
            
            <div style={{ display: 'flex', gap: 8 }}>
              <Button mode="secondary" onClick={() => setStep(2)} style={{ flex: 1 }}>← Назад</Button>
              <Button 
                mode="primary" 
                onClick={() => {
                  alert(`✅ Заказ оформлен!\n\n👤 ${name}\n📞 ${phone}\n${email ? '✉️ ' + email + '\n' : ''}💰 Сумма: ${finalPrice.toLocaleString()} ₽\n\nМы перезвоним на ${phone}`);
                  updateCart?.([]);
                  setStep(0);
                  setName('');
                  setPhone('');
                  setEmail('');
                  setCity('');
                  setDelivery('courier');
                  onNavigate?.('home');
                }}
                style={{ flex: 1, background: '#FF6600' }}
              >
                ✅ Оплатить
              </Button>
            </div>
            <Text weight="regular" style={{ color: '#666666', fontSize: 12, textAlign: 'center', marginTop: 12 }}>
              🔒 Безопасная оплата • 📄 Чек будет отправлен на email
            </Text>
          </Div>
        </Group>
      </Panel>
    );
  }

  return null;
};

export { Cart };