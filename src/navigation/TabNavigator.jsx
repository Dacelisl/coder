import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import CartStack from './CartStack.jsx';
import ShopStack from './ShopStack.jsx';
import OrderStack from './OrderStack.jsx';
import AuthStack from './AuthStack';

import { logout } from '../redux/slices/authSlice.js';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Shop"
        component={ShopStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />

      {user ? (
        <>
          <Tab.Screen
            name="Order"
            component={OrderStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Logout"
            component={ShopStack}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                dispatch(logout());
              },
            }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="log-out-outline" size={size} color={color} />
              ),
              tabBarLabel: 'Salir',
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Login"
          component={AuthStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="log-in-outline" size={size} color={color} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;
