import React from 'react';
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

type IconName = 'home' | 'home-outline' | 'search' | 'search-outline';

interface TabConfig {
  name: string;
  title: string;
  icon: IconName;
  iconOutline: IconName;
}

const TAB_CONFIG: TabConfig[] = [
  {
    name: 'index',
    title: 'Home',
    icon: 'home',
    iconOutline: 'home-outline',
  },
  {
    name: 'search',
    title: 'Search',
    icon: 'search',
    iconOutline: 'search-outline',
  },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2B2D42',
        tabBarInactiveTintColor: '#fff',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#8D99AE',
        },
      }}
    >
      {TAB_CONFIG.map(({ name, title, icon, iconOutline }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? icon : iconOutline} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
