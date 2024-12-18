import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, Plus, X } from 'lucide-react';

interface SavedCard {
  id: string;
  last4: string;
  expiry: string;
  name: string;
  brand: string;
}

interface CardData {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}

interface CardError {
  number?: string;
  expiry?: string;
  cvc?: string;
  name?: string;
}

export default function PaymentSettings() {
  const { t } = useTranslation();
  const [showCardForm, setShowCardForm] = useState(false);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [cardData, setCardData] = useState<CardData>({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  const [errors, setErrors] = useState<CardError>({});

  const validateCard = (): boolean => {
    const newErrors: CardError = {};
    let isValid = true;

    // Card number validation (16 digits)
    if (!/^\d{16}$/.test(cardData.number.replace(/\s/g, ''))) {
      newErrors.number = t('settings.payment.errors.invalidNumber');
      isValid = false;
    }

    // Expiry date validation (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(cardData.expiry)) {
      newErrors.expiry = t('settings.payment.errors.invalidExpiry');
      isValid = false;
    } else {
      const [month, year] = cardData.expiry.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      if (expiry < new Date()) {
        newErrors.expiry = t('settings.payment.errors.expired');
        isValid = false;
      }
    }

    // CVC validation (3-4 digits)
    if (!/^\d{3,4}$/.test(cardData.cvc)) {
      newErrors.cvc = t('settings.payment.errors.invalidCVC');
      isValid = false;
    }

    // Name validation (at least 3 characters, letters and spaces only)
    if (!/^[A-Za-z\s]{3,}$/.test(cardData.name)) {
      newErrors.name = t('settings.payment.errors.invalidName');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const formatCardNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(' ').substr(0, 19);
  };

  const formatExpiry = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return `${digits.substr(0, 2)}/${digits.substr(2, 2)}`;
    }
    return digits;
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateCard()) {
      return;
    }

    const newCard: SavedCard = {
      id: Date.now().toString(),
      last4: cardData.number.slice(-4),
      expiry: cardData.expiry,
      name: cardData.name,
      brand: 'visa'
    };
    setSavedCards(prev => [...prev, newCard]);
    setShowCardForm(false);
    setCardData({ number: '', expiry: '', cvc: '', name: '' });
  };

  if (!showCardForm) {
    return (
      <div>
        {savedCards.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">{t('settings.payment.methods')}</h3>
              <button 
                onClick={() => setShowCardForm(true)}
                className="px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition text-sm flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>{t('settings.payment.addCard')}</span>
              </button>
            </div>
            <div className="space-y-3">
              {savedCards.map(card => (
                <div 
                  key={card.id}
                  className="p-4 bg-gray-700 rounded-lg flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-6 w-6 text-emerald-500" />
                    <div>
                      <p className="font-medium">•••• {card.last4}</p>
                      <p className="text-sm text-gray-400">
                        {card.name} • {t('settings.payment.expires')} {card.expiry}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSavedCards(cards => cards.filter(c => c.id !== card.id))}
                    className="p-2 rounded-lg text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CreditCard className="h-12 w-12 text-emerald-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('settings.payment.methods')}</h3>
            <p className="text-sm text-gray-400 mb-6">{t('settings.payment.noCards')}</p>
            <button 
              onClick={() => setShowCardForm(true)}
              className="px-6 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition text-sm flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>{t('settings.payment.addCard')}</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleCardSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">
          {t('settings.payment.cardNumber')}
        </label>
        <input
          type="text"
          value={cardData.number}
          onChange={(e) => setCardData({ 
            ...cardData, 
            number: formatCardNumber(e.target.value)
          })}
          maxLength={19}
          className={`w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 ${
            errors.number ? 'ring-2 ring-red-500' : 'focus:ring-emerald-500'
          }`}
          placeholder="1234 5678 9012 3456"
          required
        />
        {errors.number && (
          <p className="mt-1 text-sm text-red-500">{errors.number}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('settings.payment.expiry')}
          </label>
          <input
            type="text"
            value={cardData.expiry}
            onChange={(e) => setCardData({ 
              ...cardData, 
              expiry: formatExpiry(e.target.value)
            })}
            maxLength={5}
            placeholder="MM/YY"
            className={`w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 ${
              errors.expiry ? 'ring-2 ring-red-500' : 'focus:ring-emerald-500'
            }`}
            required
          />
          {errors.expiry && (
            <p className="mt-1 text-sm text-red-500">{errors.expiry}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t('settings.payment.cvc')}
          </label>
          <input
            type="text"
            value={cardData.cvc}
            onChange={(e) => setCardData({ 
              ...cardData, 
              cvc: e.target.value.replace(/\D/g, '').slice(0, 4)
            })}
            maxLength={4}
            className={`w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 ${
              errors.cvc ? 'ring-2 ring-red-500' : 'focus:ring-emerald-500'
            }`}
            placeholder="123"
            required
          />
          {errors.cvc && (
            <p className="mt-1 text-sm text-red-500">{errors.cvc}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t('settings.payment.cardholderName')}
        </label>
        <input
          type="text"
          value={cardData.name}
          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
          className={`w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 ${
            errors.name ? 'ring-2 ring-red-500' : 'focus:ring-emerald-500'
          }`}
          placeholder="JOHN DOE"
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
        >
          {t('settings.payment.addCard')}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowCardForm(false);
            setErrors({});
          }}
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
        >
          {t('settings.payment.cancel')}
        </button>
      </div>
    </form>
  );
}