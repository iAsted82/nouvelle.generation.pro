export type Currency = 'EUR' | 'MAD';

export interface CurrencyConfig {
  code: Currency;
  name: string;
  symbol: string;
  flag: string;
  decimals: number;
}

export const CURRENCIES: CurrencyConfig[] = [
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    flag: '🇪🇺',
    decimals: 2
  },
  {
    code: 'MAD',
    name: 'Dirham Marocain',
    symbol: 'د.م.',
    flag: '🇲🇦',
    decimals: 2
  }
];

// Exchange rates (in a real app, these would come from an API)
const EXCHANGE_RATES = {
  EUR: 1,
  MAD: 10.5 // 1 EUR = 10.5 MAD (approximate)
};

export interface PriceDisplay {
  amount: number;
  currency: Currency;
  formatted: string;
}

class CurrencyService {
  private static instance: CurrencyService;
  private currentCurrency: Currency = 'EUR';
  private listeners: Array<(currency: Currency) => void> = [];

  static getInstance(): CurrencyService {
    if (!CurrencyService.instance) {
      CurrencyService.instance = new CurrencyService();
    }
    return CurrencyService.instance;
  }

  constructor() {
    this.loadCurrency();
  }

  private loadCurrency(): void {
    const saved = localStorage.getItem('adminCurrency');
    if (saved && ['EUR', 'MAD'].includes(saved)) {
      this.currentCurrency = saved as Currency;
    }
  }

  private saveCurrency(): void {
    localStorage.setItem('adminCurrency', this.currentCurrency);
  }

  setCurrency(currency: Currency): void {
    this.currentCurrency = currency;
    this.saveCurrency();
    this.notifyListeners();
  }

  getCurrentCurrency(): Currency {
    return this.currentCurrency;
  }

  getCurrencyConfig(currency?: Currency): CurrencyConfig {
    const curr = currency || this.currentCurrency;
    return CURRENCIES.find(c => c.code === curr) || CURRENCIES[0];
  }

  convert(amount: number, from: Currency, to: Currency): number {
    if (from === to) return amount;
    
    // Convert to EUR first
    const eurAmount = amount / EXCHANGE_RATES[from];
    
    // Convert to target currency
    return eurAmount * EXCHANGE_RATES[to];
  }

  format(amount: number, currency?: Currency): string {
    const curr = currency || this.currentCurrency;
    const config = this.getCurrencyConfig(curr);
    
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: curr === 'MAD' ? 'MAD' : 'EUR',
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals
    }).format(amount);
  }

  formatWithSymbol(amount: number, currency?: Currency): string {
    const curr = currency || this.currentCurrency;
    const config = this.getCurrencyConfig(curr);
    
    return `${amount.toFixed(config.decimals)} ${config.symbol}`;
  }

  displayBoth(amount: number, baseCurrency: Currency = 'EUR'): PriceDisplay[] {
    const displays: PriceDisplay[] = [];
    
    for (const currencyConfig of CURRENCIES) {
      const convertedAmount = this.convert(amount, baseCurrency, currencyConfig.code);
      displays.push({
        amount: convertedAmount,
        currency: currencyConfig.code,
        formatted: this.formatWithSymbol(convertedAmount, currencyConfig.code)
      });
    }
    
    return displays;
  }

  getExchangeRate(from: Currency, to: Currency): number {
    if (from === to) return 1;
    
    const eurAmount = 1 / EXCHANGE_RATES[from];
    return eurAmount * EXCHANGE_RATES[to];
  }

  subscribe(listener: (currency: Currency) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentCurrency));
  }
}

export const currencyService = CurrencyService.getInstance();