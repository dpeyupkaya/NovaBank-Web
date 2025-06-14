import React, { useState } from 'react';
import { FiBell, FiCheck, FiTrash2, FiFilter, FiSearch } from 'react-icons/fi';
import Navbar from './Navbar';

export const Bildirimler = () => {
  const [activeTab, setActiveTab] = useState('tum');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const notificationTypes = [
    { id: 'tum', label: 'Tüm Bildirimler' },
    { id: 'okunmamis', label: 'Okunmamış' },
    { id: 'odeme', label: 'Ödemeler' },
    { id: 'transfer', label: 'Transferler' },
    { id: 'guvenlik', label: 'Güvenlik' }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Para Transferi Başarılı',
      message: 'Mehmet Yılmaz hesabına 1.250,00 TL transfer edildi.',
      date: '10 dakika önce',
      read: false,
      type: 'transfer',
      icon: '💰'
    },
    {
      id: 2,
      title: 'Fatura Ödemeniz Alındı',
      message: 'Elektrik faturanız başarıyla ödendi. Tutar: 325,50 TL',
      date: '2 saat önce',
      read: true,
      type: 'odeme',
      icon: '🧾'
    },
    {
      id: 3,
      title: 'Yeni Giriş Algılandı',
      message: 'İstanbul konumundan yeni bir cihazla giriş yapıldı.',
      date: '1 gün önce',
      read: false,
      type: 'guvenlik',
      icon: '🔐'
    },
    {
      id: 4,
      title: 'Kart İşlemi',
      message: '**** 4512 nolu kartınızla 245,90 TL tutarında işlem yapıldı.',
      date: '2 gün önce',
      read: true,
      type: 'odeme',
      icon: '💳'
    },
    {
      id: 5,
      title: 'Döviz Alımı',
      message: '500,00 USD alım işleminiz tamamlandı. Kur: 26,45',
      date: '1 hafta önce',
      read: true,
      type: 'transfer',
      icon: '💱'
    }
  ];

  const filteredNotifications = notifications
    .filter(notification => 
      activeTab === 'tum' || 
      (activeTab === 'okunmamis' ? !notification.read : notification.type === activeTab)
    )
    .filter(notification => 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const toggleSelectNotification = (id) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(notificationId => notificationId !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const markAsRead = (ids) => {
    // API çağrısı simülasyonu
    console.log(`${ids.join(', ')} numaralı bildirimler okundu olarak işaretlendi`);
    setSelectedNotifications([]);
  };

  const deleteNotifications = (ids) => {
    // API çağrısı simülasyonu
    console.log(`${ids.join(', ')} numaralı bildirimler silindi`);
    setSelectedNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
        <Navbar />
            <main className="p-4 md:p-8 pt-6"></main>
      <div className="max-w-4xl mx-auto">
        {/* Başlık ve Aksiyon Butonları */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
              <FiBell className="mr-3 text-white" />
              Bildirimler
            </h1>
            <p className="text-white">Hesap aktiviteleriniz ve bildirimleriniz</p>
          </div>
          
          <div className="flex space-x-2">
            {selectedNotifications.length > 0 && (
              <>
                <button 
                  onClick={() => markAsRead(selectedNotifications)}
                  className="flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <FiCheck className="mr-2" />
                  Okundu İşaretle
                </button>
                <button 
                  onClick={() => deleteNotifications(selectedNotifications)}
                  className="flex items-center px-3 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <FiTrash2 className="mr-2" />
                  Sil
                </button>
              </>
            )}
          </div>
        </div>

        {/* Arama ve Filtreleme */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Bildirimlerde ara..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600 hidden md:block"><FiFilter /></span>
              <select 
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                {notificationTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tab Navigation (Mobile) */}
        <div className="flex overflow-x-auto pb-2 mb-6 md:hidden">
          <div className="flex space-x-2">
            {notificationTypes.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bildirim Listesi */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FiBell className="mx-auto text-4xl mb-3 text-gray-300" />
              <p>Gösterilecek bildirim bulunamadı</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <li 
                  key={notification.id}
                  className={`hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start px-4 py-4">
                    <div className="flex-shrink-0 pt-1">
                      <span className="text-2xl">{notification.icon}</span>
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className={`text-sm font-medium ${!notification.read ? 'text-blue-800' : 'text-gray-800'}`}>
                          {notification.title}
                        </p>
                        <span className="text-xs text-gray-500">{notification.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification.id)}
                        onChange={() => toggleSelectNotification(notification.id)}
                        className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Toplu İşlemler (Mobile) */}
        {selectedNotifications.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-center space-x-4 md:hidden">
            <button 
              onClick={() => markAsRead(selectedNotifications)}
              className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
            >
              <FiCheck className="mr-2" />
              Okundu
            </button>
            <button 
              onClick={() => deleteNotifications(selectedNotifications)}
              className="flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
            >
              <FiTrash2 className="mr-2" />
              Sil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bildirimler;