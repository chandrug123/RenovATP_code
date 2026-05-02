import { useState, useEffect } from 'react';
import servicesData from '@/data/services.json';

export interface ServiceItem {
  name: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  services: ServiceItem[];
  popular: boolean;
}

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface QuickBundle {
  id: string;
  label: string;
  icon: string;
  services: string[];
}

export interface ServicesDataType {
  categories: ServiceCategory[];
  heroSlides: HeroSlide[];
  quickBundles: QuickBundle[];
}

export const useServicesData = () => {
  const [data, setData] = useState<ServicesDataType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async load (can be replaced with API call later)
    const loadData = async () => {
      try {
        setData(servicesData as ServicesDataType);
      } catch (error) {
        console.error('Failed to load services data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    categories: data?.categories || [],
    heroSlides: data?.heroSlides || [],
    quickBundles: data?.quickBundles || [],
    loading
  };
};
