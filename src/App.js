import { useState } from 'react';
import { AdaptivityProvider, ConfigProvider, SplitLayout, SplitCol, View, Root } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Home } from './panels/Home';
import { Catalog } from './panels/Catalog';
import { Cart } from './panels/Cart';
import { Product } from './panels/Product';

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [previousPage, setPreviousPage] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigateTo = (panel, data = null) => {
    if (activePanel !== 'home') {
      setPreviousPage(activePanel);
    } else {
      setPreviousPage(null);
    }
    
    if (panel === 'catalog' && data) {
      setSelectedCategory(data);
    } else if (panel === 'home') {
      setSelectedCategory(null);
    }
    
    if (panel === 'product' && data) {
      setSelectedProductId(data);
    }
    
    setActivePanel(panel);
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    alert(`${product.icon || '📦'} ${product.name} добавлен в корзину!\n\n🛒 Товаров в корзине: ${cartItems.reduce((total, item) => total + (item.id === product.id ? item.quantity + 1 : item.quantity), 0)}`);
  };

  const updateCart = (newItems) => {
    setCartItems(newItems);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Делаем addToCart доступной глобально
  window.addToCartGlobal = addToCart;

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <SplitLayout>
          <SplitCol>
            <Root activeView="main">
              <View activePanel={activePanel} id="main">
                <Home 
                  id="home" 
                  onNavigate={navigateTo} 
                  previousPage={previousPage}
                  cartCount={getCartCount()}
                />
                <Catalog 
                  id="catalog" 
                  onNavigate={navigateTo} 
                  addToCartGlobal={addToCart} 
                  selectedCategory={selectedCategory}
                  cartCount={getCartCount()}
                />
                <Cart 
                  id="cart" 
                  onNavigate={navigateTo} 
                  cartItems={cartItems} 
                  updateCart={updateCart} 
                />
                <Product 
                  id="product" 
                  onNavigate={navigateTo} 
                  addToCartGlobal={addToCart} 
                  productId={selectedProductId}
                  cartCount={getCartCount()}
                />
              </View>
            </Root>
          </SplitCol>
        </SplitLayout>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export { App };