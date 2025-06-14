import React from 'react';
import { FiCreditCard, FiPlus, FiRefreshCw, FiLock, FiEye, FiEyeOff, FiShare2 } from 'react-icons/fi';
import Navbar from './Navbar';

export const Kartlar = () => {
  const [activeTab, setActiveTab] = React.useState('aktif');
  const [hiddenCards, setHiddenCards] = React.useState([]);

  const cards = [
    {
      id: 1,
      type: 'VISA',
      number: '•••• •••• •••• 4512',
      name: 'AHMET YILMAZ',
      expiry: '09/25',
      balance: 12500.75,
      currency: 'TRY',
      status: 'aktif',
      bgColor: 'bg-gradient-to-r from-purple-600 to-indigo-600'
    },
    {
      id: 2,
      type: 'MASTERCARD',
      number: '•••• •••• •••• 7843',
      name: 'AHMET YILMAZ',
      expiry: '12/24',
      balance: 845.20,
      currency: 'USD',
      status: 'aktif',
      bgColor: 'bg-gradient-to-r from-amber-500 to-orange-500'
    },
    {
      id: 3,
      type: 'VISA',
      number: '•••• •••• •••• 9012',
      name: 'AHMET YILMAZ',
      expiry: '03/23',
      balance: 0,
      currency: 'TRY',
      status: 'pasif',
      bgColor: 'bg-gradient-to-r from-gray-500 to-gray-700'
    }
  ];

  const toggleCardVisibility = (cardId) => {
    if (hiddenCards.includes(cardId)) {
      setHiddenCards(hiddenCards.filter(id => id !== cardId));
    } else {
      setHiddenCards([...hiddenCards, cardId]);
    }
  };

  const filteredCards = cards.filter(card => 
    activeTab === 'tum' ? true : card.status === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
        <Navbar />
            <main className="p-4 md:p-8 pt-6"></main>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Kartlarım</h1>
            <p className="text-white">Kayıtlı banka kartlarınız ve özellikleri</p>
          </div>
          
          <button className="mt-4 md:mt-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors">
            <FiPlus className="mr-2" />
            Yeni Kart Ekle
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6 bg-white p-1 rounded-xl shadow-inner">
          {['aktif', 'pasif', 'tum'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'aktif' ? 'Aktif Kartlar' : tab === 'pasif' ? 'Pasif Kartlar' : 'Tüm Kartlar'}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <div 
              key={card.id} 
              className={`${card.bgColor} rounded-2xl shadow-xl overflow-hidden text-white transition-transform hover:scale-[1.02]`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <FiCreditCard className="text-2xl opacity-80" />
                    <p className="text-sm opacity-80 mt-2">{card.type}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => toggleCardVisibility(card.id)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      {hiddenCards.includes(card.id) ? <FiEyeOff /> : <FiEye />}
                    </button>
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                      <FiShare2 />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xl font-mono mb-1">
                    {hiddenCards.includes(card.id) ? '•••• •••• •••• ••••' : card.number}
                  </p>
                  <p className="text-sm opacity-80">{card.name}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs opacity-80">Son Kullanma</p>
                    <p className="text-sm">{card.expiry}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-80">Bakiye</p>
                    <p className="text-lg font-bold">
                      {card.currency} {card.balance.toLocaleString('tr-TR')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 px-6 py-3 flex justify-between items-center">
                <div className="flex items-center text-sm">
                  <FiLock className="mr-2" />
                  {card.status === 'aktif' ? 'Aktif Kart' : 'Pasif Kart'}
                </div>
                <div className="flex space-x-3">
                  {card.status === 'aktif' && (
                    <>
                      <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors">
                        Kilit Aç
                      </button>
                      <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors">
                        Detay
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Hızlı İşlemler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <FiRefreshCw className="text-blue-600" />, label: 'Limit Artırımı' },
              { icon: <FiLock className="text-green-600" />, label: 'Kart Kilidi' },
              { icon: <FiCreditCard className="text-purple-600" />, label: 'Sanal Kart' },
              { icon: <FiPlus className="text-orange-600" />, label: 'Ek Kart Talep' }
            ].map((action, index) => (
              <button 
                key={index}
                className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kartlar;